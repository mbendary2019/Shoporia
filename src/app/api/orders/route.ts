import { NextRequest, NextResponse } from 'next/server'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { COLLECTIONS } from '@/lib/firebase/collections'
import { z } from 'zod'
import { rateLimit, rateLimitResponse, getClientIP } from '@/lib/rate-limit'
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from '@/lib/api-auth'

const createOrderSchema = z.object({
  customerId: z.string().min(1, 'معرف العميل مطلوب'),
  storeId: z.string().min(1, 'معرف المتجر مطلوب'),
  items: z.array(z.object({
    productId: z.string().min(1),
    variantId: z.string().optional(),
    name: z.string().min(1),
    image: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().nonnegative(),
    total: z.number().nonnegative(),
    options: z.record(z.string()).optional(),
  })).min(1, 'يجب إضافة منتج واحد على الأقل'),
  shippingAddress: z.object({
    fullName: z.string().min(1),
    phone: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    governorate: z.string().min(1),
  }),
  paymentMethod: z.enum(['cash', 'card', 'knet', 'bank_transfer']),
  subtotal: z.number().nonnegative(),
  shippingCost: z.number().nonnegative().optional(),
  discount: z.number().nonnegative().optional(),
  total: z.number().nonnegative(),
  couponCode: z.string().optional(),
})

// GET /api/orders - Get orders
export async function GET(request: NextRequest) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`orders-get:${ip}`, { maxRequests: 30 })
  if (!limiter.success) return rateLimitResponse()

  const user = getAuthUser(request)
  if (!user) return unauthorizedResponse()

  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const storeId = searchParams.get('storeId')
    const status = searchParams.get('status')
    const pageSize = Math.min(parseInt(searchParams.get('pageSize') || '20'), 100)

    // Users can only access their own orders or their store's orders
    if (userId && userId !== user.id && user.role !== 'admin') {
      return forbiddenResponse()
    }
    if (storeId && storeId !== user.storeId && user.role !== 'admin') {
      return forbiddenResponse()
    }

    if (!userId && !storeId) {
      return NextResponse.json(
        { success: false, error: 'userId or storeId is required' },
        { status: 400 }
      )
    }

    const constraints: QueryConstraint[] = []

    if (userId) {
      constraints.push(where('customerId', '==', userId))
    }

    if (storeId) {
      constraints.push(where('storeId', '==', storeId))
    }

    if (status) {
      constraints.push(where('status', '==', status))
    }

    constraints.push(orderBy('createdAt', 'desc'))
    constraints.push(limit(pageSize))

    const q = query(collection(db, COLLECTIONS.ORDERS), ...constraints)
    const snapshot = await getDocs(q)

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      success: true,
      data: orders,
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`orders-post:${ip}`, { maxRequests: 20 })
  if (!limiter.success) return rateLimitResponse()

  const orderUser = getAuthUser(request)
  if (!orderUser) return unauthorizedResponse()

  try {
    const body = await request.json()

    const result = createOrderSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'بيانات غير صالحة', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const {
      customerId,
      storeId,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost,
      discount,
      total,
      couponCode,
    } = result.data

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

    // Force customerId to authenticated user to prevent impersonation
    const orderData = {
      orderNumber,
      customerId: orderUser.id,
      storeId,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost: shippingCost || 0,
      discount: discount || 0,
      total,
      couponCode: couponCode || null,
      status: 'pending',
      paymentStatus: 'pending',
      trackingNumber: null,
      notes: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.ORDERS), orderData)

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        ...orderData,
      },
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error creating order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
