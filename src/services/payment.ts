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
  serverTimestamp,
} from 'firebase/firestore'
import { db, paymentsRef, paymentDoc } from '@/lib/firebase'
import type { Payment, PaymentMethod, PaymentStatus } from '@/types'

// Create a new payment record
export async function createPayment(data: {
  orderId?: string
  bookingId?: string
  storeId: string
  customerId: string
  amount: number
  method: PaymentMethod
  provider?: string
  metadata?: Record<string, unknown>
}): Promise<Payment> {
  const paymentId = doc(paymentsRef).id

  const payment: Payment = {
    id: paymentId,
    orderId: data.orderId,
    bookingId: data.bookingId,
    storeId: data.storeId,
    customerId: data.customerId,
    amount: data.amount,
    currency: 'KWD',
    method: data.method,
    status: 'pending',
    provider: data.provider,
    metadata: data.metadata,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await setDoc(paymentDoc(paymentId), {
    ...payment,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return payment
}

// Get payment by ID
export async function getPaymentById(paymentId: string): Promise<Payment | null> {
  const snapshot = await getDoc(paymentDoc(paymentId))

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as Payment
}

// Get payment by order ID
export async function getPaymentByOrderId(orderId: string): Promise<Payment | null> {
  const q = query(paymentsRef, where('orderId', '==', orderId), limit(1))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return null
  }

  return snapshot.docs[0].data() as Payment
}

// Get payment by booking ID
export async function getPaymentByBookingId(bookingId: string): Promise<Payment | null> {
  const q = query(paymentsRef, where('bookingId', '==', bookingId), limit(1))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return null
  }

  return snapshot.docs[0].data() as Payment
}

// Get payments by customer
export async function getPaymentsByCustomer(
  customerId: string,
  limit_count: number = 20
): Promise<Payment[]> {
  const q = query(
    paymentsRef,
    where('customerId', '==', customerId),
    orderBy('createdAt', 'desc'),
    limit(limit_count)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Payment)
}

// Get payments by store
export async function getPaymentsByStore(
  storeId: string,
  status?: PaymentStatus,
  limit_count: number = 20
): Promise<Payment[]> {
  let q = status
    ? query(
        paymentsRef,
        where('storeId', '==', storeId),
        where('status', '==', status),
        orderBy('createdAt', 'desc'),
        limit(limit_count)
      )
    : query(
        paymentsRef,
        where('storeId', '==', storeId),
        orderBy('createdAt', 'desc'),
        limit(limit_count)
      )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Payment)
}

// Update payment record status
export async function updatePaymentRecordStatus(
  paymentId: string,
  status: PaymentStatus,
  transactionId?: string
): Promise<void> {
  const updateData: Record<string, unknown> = {
    status,
    updatedAt: serverTimestamp(),
  }

  if (transactionId) {
    updateData.transactionId = transactionId
  }

  await updateDoc(paymentDoc(paymentId), updateData)
}

// Process cash payment (mark as paid when delivered)
export async function processCashPayment(paymentId: string): Promise<void> {
  await updatePaymentRecordStatus(paymentId, 'paid')
}

// Process KNET payment
export async function processKnetPayment(
  paymentId: string,
  transactionId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // In production, integrate with KNET payment gateway

    await updateDoc(paymentDoc(paymentId), {
      status: 'paid',
      transactionId,
      metadata: {
        provider: 'knet',
        paidAt: new Date().toISOString(),
      },
      updatedAt: serverTimestamp(),
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Payment failed' }
  }
}

// Process bank transfer payment
export async function processBankTransferPayment(
  paymentId: string,
  accountNumber: string,
  transactionId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // In production, integrate with bank transfer API

    await updateDoc(paymentDoc(paymentId), {
      status: 'paid',
      transactionId,
      metadata: {
        accountNumber,
        provider: 'bank_transfer',
        paidAt: new Date().toISOString(),
      },
      updatedAt: serverTimestamp(),
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Payment failed' }
  }
}

// Refund payment
export async function refundPayment(
  paymentId: string,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const payment = await getPaymentById(paymentId)
    if (!payment) {
      return { success: false, error: 'Payment not found' }
    }

    if (payment.status !== 'paid') {
      return { success: false, error: 'Payment has not been paid' }
    }

    await updateDoc(paymentDoc(paymentId), {
      status: 'refunded',
      metadata: {
        ...payment.metadata,
        refundReason: reason,
        refundedAt: new Date().toISOString(),
      },
      updatedAt: serverTimestamp(),
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Refund failed' }
  }
}

// Get payment method display info
export function getPaymentMethodInfo(method: PaymentMethod): {
  label: string
  labelAr: string
  icon: string
  description: string
} {
  const methods = {
    cash: {
      label: 'Cash on Delivery',
      labelAr: 'الدفع عند الاستلام',
      icon: 'banknotes',
      description: 'ادفع نقداً عند استلام طلبك',
    },
    card: {
      label: 'Credit/Debit Card',
      labelAr: 'بطاقة ائتمان',
      icon: 'credit-card',
      description: 'ادفع باستخدام Visa أو Mastercard',
    },
    knet: {
      label: 'KNET',
      labelAr: 'كي نت',
      icon: 'credit-card',
      description: 'ادفع عبر بوابة كي نت',
    },
    bank_transfer: {
      label: 'Bank Transfer',
      labelAr: 'تحويل بنكي',
      icon: 'building-bank',
      description: 'تحويل بنكي مباشر',
    },
  }

  return methods[method]
}

// Calculate store revenue
export async function getStoreRevenue(
  storeId: string,
  startDate?: Date,
  endDate?: Date
): Promise<{
  total: number
  byMethod: Record<PaymentMethod, number>
}> {
  let q = query(
    paymentsRef,
    where('storeId', '==', storeId),
    where('status', '==', 'paid')
  )

  const snapshot = await getDocs(q)
  let payments = snapshot.docs.map((doc) => doc.data() as Payment)

  // Filter by date if provided
  if (startDate) {
    payments = payments.filter((p) => new Date(p.createdAt) >= startDate)
  }
  if (endDate) {
    payments = payments.filter((p) => new Date(p.createdAt) <= endDate)
  }

  const byMethod: Record<PaymentMethod, number> = {
    cash: 0,
    card: 0,
    knet: 0,
    bank_transfer: 0,
  }

  const total = payments.reduce((sum, p) => {
    byMethod[p.method] += p.amount
    return sum + p.amount
  }, 0)

  return { total, byMethod }
}
