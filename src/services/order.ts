import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  DocumentSnapshot,
  runTransaction,
} from 'firebase/firestore'
import { db, ordersRef, orderDoc } from '@/lib/firebase'
import { updateProductInventory, incrementProductSoldCount } from './product'
import { incrementOrderCount } from './store'
import type { Order, OrderItem, OrderStatus, PaymentMethod, Address } from '@/types'

// Generate order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `SH-${timestamp}${random}`
}

// Create a new order
export async function createOrder(
  customerId: string,
  storeId: string,
  items: OrderItem[],
  deliveryAddress: Address,
  paymentMethod: PaymentMethod,
  options?: {
    couponCode?: string
    couponDiscount?: number
    deliveryNotes?: string
    deliveryMethod?: 'standard' | 'express' | 'pickup'
  }
): Promise<Order> {
  const orderId = doc(ordersRef).id
  const orderNumber = generateOrderNumber()

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const discount = options?.couponDiscount || 0
  const deliveryFee = options?.deliveryMethod === 'express' ? 75 :
                      options?.deliveryMethod === 'pickup' ? 0 :
                      subtotal > 500 ? 0 : 50
  const tax = 0 // Tax can be configured later
  const total = subtotal - discount + deliveryFee + tax

  const order: Order = {
    id: orderId,
    orderNumber,
    customerId,
    storeId,
    items,
    subtotal,
    discount,
    deliveryFee,
    tax,
    total,
    currency: 'EGP',
    couponCode: options?.couponCode,
    couponDiscount: options?.couponDiscount,
    paymentMethod,
    paymentStatus: paymentMethod === 'cash' ? 'pending' : 'pending',
    deliveryAddress,
    deliveryMethod: options?.deliveryMethod || 'standard',
    deliveryNotes: options?.deliveryNotes,
    status: 'pending',
    statusHistory: [
      {
        status: 'pending',
        timestamp: new Date(),
        note: 'تم إنشاء الطلب',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await setDoc(orderDoc(orderId), {
    ...order,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    statusHistory: order.statusHistory.map(h => ({
      ...h,
      timestamp: serverTimestamp(),
    })),
  })

  // Update inventory and stats
  for (const item of items) {
    await updateProductInventory(item.productId, -item.quantity)
    await incrementProductSoldCount(item.productId, item.quantity)
  }

  // Increment store order count
  await incrementOrderCount(storeId, 1)

  return order
}

// Get order by ID
export async function getOrderById(orderId: string): Promise<Order | null> {
  const snapshot = await getDoc(orderDoc(orderId))

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as Order
}

// Get order by order number
export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const q = query(ordersRef, where('orderNumber', '==', orderNumber), limit(1))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return null
  }

  return snapshot.docs[0].data() as Order
}

// Get orders by customer
export async function getOrdersByCustomer(
  customerId: string,
  pageSize: number = 20,
  lastDoc?: DocumentSnapshot
): Promise<{ orders: Order[]; lastDoc: DocumentSnapshot | null }> {
  let q = query(
    ordersRef,
    where('customerId', '==', customerId),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  )

  if (lastDoc) {
    q = query(q, startAfter(lastDoc))
  }

  const snapshot = await getDocs(q)
  const orders = snapshot.docs.map((doc) => doc.data() as Order)
  const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null

  return { orders, lastDoc: newLastDoc }
}

// Get orders by store
export async function getOrdersByStore(
  storeId: string,
  status?: OrderStatus,
  pageSize: number = 20,
  lastDoc?: DocumentSnapshot
): Promise<{ orders: Order[]; lastDoc: DocumentSnapshot | null }> {
  let q = status
    ? query(
        ordersRef,
        where('storeId', '==', storeId),
        where('status', '==', status),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      )
    : query(
        ordersRef,
        where('storeId', '==', storeId),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      )

  if (lastDoc) {
    q = query(q, startAfter(lastDoc))
  }

  const snapshot = await getDocs(q)
  const orders = snapshot.docs.map((doc) => doc.data() as Order)
  const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null

  return { orders, lastDoc: newLastDoc }
}

// Update order status
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  note?: string,
  updatedBy?: string
): Promise<void> {
  const order = await getOrderById(orderId)
  if (!order) throw new Error('Order not found')

  const statusHistory = [
    ...order.statusHistory,
    {
      status,
      timestamp: new Date(),
      note,
      updatedBy,
    },
  ]

  const updateData: Record<string, unknown> = {
    status,
    statusHistory,
    updatedAt: serverTimestamp(),
  }

  // Set delivery date if delivered
  if (status === 'delivered') {
    updateData.actualDelivery = serverTimestamp()
  }

  await updateDoc(orderDoc(orderId), updateData)
}

// Update payment status
export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: Order['paymentStatus'],
  transactionId?: string
): Promise<void> {
  const updateData: Record<string, unknown> = {
    paymentStatus,
    updatedAt: serverTimestamp(),
  }

  if (transactionId) {
    updateData.paymentDetails = {
      transactionId,
      paidAt: serverTimestamp(),
    }
  }

  await updateDoc(orderDoc(orderId), updateData)
}

// Cancel order
export async function cancelOrder(
  orderId: string,
  reason?: string,
  cancelledBy?: string
): Promise<void> {
  const order = await getOrderById(orderId)
  if (!order) throw new Error('Order not found')

  // Can only cancel pending or confirmed orders
  if (!['pending', 'confirmed'].includes(order.status)) {
    throw new Error('Cannot cancel this order')
  }

  // Restore inventory
  for (const item of order.items) {
    await updateProductInventory(item.productId, item.quantity)
  }

  await updateOrderStatus(orderId, 'cancelled', reason, cancelledBy)
}

// Set tracking number
export async function setTrackingNumber(
  orderId: string,
  trackingNumber: string,
  estimatedDelivery?: Date
): Promise<void> {
  const updateData: Record<string, unknown> = {
    trackingNumber,
    updatedAt: serverTimestamp(),
  }

  if (estimatedDelivery) {
    updateData.estimatedDelivery = estimatedDelivery
  }

  await updateDoc(orderDoc(orderId), updateData)
}

// Get store order stats
export async function getStoreOrderStats(storeId: string): Promise<{
  total: number
  pending: number
  processing: number
  delivered: number
  cancelled: number
  revenue: number
}> {
  const ordersSnapshot = await getDocs(
    query(ordersRef, where('storeId', '==', storeId))
  )

  const orders = ordersSnapshot.docs.map((doc) => doc.data() as Order)

  return {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => ['confirmed', 'processing', 'shipped'].includes(o.status)).length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
    revenue: orders
      .filter((o) => o.status === 'delivered' && o.paymentStatus === 'paid')
      .reduce((sum, o) => sum + o.total, 0),
  }
}

// Get recent orders for dashboard
export async function getRecentOrders(
  storeId: string,
  limit_count: number = 5
): Promise<Order[]> {
  const q = query(
    ordersRef,
    where('storeId', '==', storeId),
    orderBy('createdAt', 'desc'),
    limit(limit_count)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Order)
}
