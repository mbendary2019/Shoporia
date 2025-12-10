import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { db, notificationsRef, notificationDoc } from '@/lib/firebase'
import type { Notification, NotificationType } from '@/types'

// Create a notification
export async function createNotification(
  userId: string,
  type: NotificationType,
  data: {
    title: string
    titleAr?: string
    message: string
    messageAr?: string
    data?: Record<string, unknown>
  }
): Promise<Notification> {
  const notificationId = doc(notificationsRef).id

  const notification: Notification = {
    id: notificationId,
    userId,
    type,
    title: data.title,
    titleAr: data.titleAr,
    message: data.message,
    messageAr: data.messageAr,
    data: data.data,
    isRead: false,
    createdAt: new Date(),
  }

  await setDoc(notificationDoc(notificationId), {
    ...notification,
    createdAt: serverTimestamp(),
  })

  return notification
}

// Get user notifications
export async function getUserNotifications(
  userId: string,
  limit_count: number = 50
): Promise<Notification[]> {
  const q = query(
    notificationsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limit_count)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Notification)
}

// Get unread notifications count
export async function getUnreadCount(userId: string): Promise<number> {
  const q = query(
    notificationsRef,
    where('userId', '==', userId),
    where('isRead', '==', false)
  )

  const snapshot = await getDocs(q)
  return snapshot.size
}

// Mark notification as read
export async function markAsRead(notificationId: string): Promise<void> {
  await updateDoc(notificationDoc(notificationId), {
    isRead: true,
  })
}

// Mark all notifications as read
export async function markAllAsRead(userId: string): Promise<void> {
  const q = query(
    notificationsRef,
    where('userId', '==', userId),
    where('isRead', '==', false)
  )

  const snapshot = await getDocs(q)
  const batch = writeBatch(db)

  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, { isRead: true })
  })

  await batch.commit()
}

// Delete notification
export async function deleteNotification(notificationId: string): Promise<void> {
  await deleteDoc(notificationDoc(notificationId))
}

// Delete all user notifications
export async function deleteAllNotifications(userId: string): Promise<void> {
  const q = query(notificationsRef, where('userId', '==', userId))
  const snapshot = await getDocs(q)
  const batch = writeBatch(db)

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref)
  })

  await batch.commit()
}

// Send order notification
export async function sendOrderNotification(
  userId: string,
  orderId: string,
  orderNumber: string,
  status: string
): Promise<void> {
  const statusMessages: Record<string, { title: string; message: string }> = {
    pending: {
      title: 'طلب جديد',
      message: `تم استلام طلبك رقم ${orderNumber} بنجاح`,
    },
    confirmed: {
      title: 'تم تأكيد الطلب',
      message: `تم تأكيد طلبك رقم ${orderNumber} وجاري تجهيزه`,
    },
    shipped: {
      title: 'تم شحن الطلب',
      message: `طلبك رقم ${orderNumber} في الطريق إليك`,
    },
    delivered: {
      title: 'تم التوصيل',
      message: `تم توصيل طلبك رقم ${orderNumber} بنجاح`,
    },
    cancelled: {
      title: 'تم إلغاء الطلب',
      message: `تم إلغاء طلبك رقم ${orderNumber}`,
    },
  }

  const msg = statusMessages[status]
  if (msg) {
    await createNotification(userId, 'order_status', {
      title: msg.title,
      message: msg.message,
      data: { orderId, orderNumber, status },
    })
  }
}

// Send booking notification
export async function sendBookingNotification(
  userId: string,
  bookingId: string,
  bookingNumber: string,
  serviceName: string,
  status: string
): Promise<void> {
  const statusMessages: Record<string, { title: string; message: string }> = {
    pending: {
      title: 'حجز جديد',
      message: `تم استلام حجزك لخدمة ${serviceName}`,
    },
    confirmed: {
      title: 'تم تأكيد الحجز',
      message: `تم تأكيد حجزك لخدمة ${serviceName}`,
    },
    cancelled: {
      title: 'تم إلغاء الحجز',
      message: `تم إلغاء حجزك لخدمة ${serviceName}`,
    },
    completed: {
      title: 'تم إكمال الخدمة',
      message: `تم إكمال خدمة ${serviceName} بنجاح`,
    },
  }

  const msg = statusMessages[status]
  if (msg) {
    await createNotification(userId, 'booking_new', {
      title: msg.title,
      message: msg.message,
      data: { bookingId, bookingNumber, serviceName, status },
    })
  }
}

// Send low stock notification to seller
export async function sendLowStockNotification(
  sellerId: string,
  productId: string,
  productName: string,
  currentStock: number
): Promise<void> {
  await createNotification(sellerId, 'stock_low', {
    title: 'تنبيه المخزون',
    message: `المنتج "${productName}" وصل للحد الأدنى (${currentStock} قطعة متبقية)`,
    data: { productId, productName, currentStock },
  })
}

// Send new review notification
export async function sendNewReviewNotification(
  sellerId: string,
  reviewId: string,
  productName: string,
  rating: number,
  customerName: string
): Promise<void> {
  await createNotification(sellerId, 'review_new', {
    title: 'تقييم جديد',
    message: `${customerName} أضاف تقييم ${rating} نجوم على "${productName}"`,
    data: { reviewId, productName, rating, customerName },
  })
}

// Send payment notification
export async function sendPaymentNotification(
  userId: string,
  amount: number,
  status: 'received' | 'refunded'
): Promise<void> {
  const msg = status === 'received'
    ? { title: 'تم استلام الدفع', message: `تم استلام مبلغ ${amount} ج.م بنجاح` }
    : { title: 'تم استرداد المبلغ', message: `تم استرداد مبلغ ${amount} ج.م` }

  await createNotification(userId, 'payment_received', {
    ...msg,
    data: { amount, status },
  })
}

// Send promotion notification
export async function sendPromotionNotification(
  userId: string,
  title: string,
  message: string,
  link?: string
): Promise<void> {
  await createNotification(userId, 'promotion', {
    title,
    message,
    data: { link },
  })
}
