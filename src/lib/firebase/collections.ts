import {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryConstraint,
  CollectionReference,
} from 'firebase/firestore'
import { db } from './config'

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  STORES: 'stores',
  PRODUCTS: 'products',
  SERVICES: 'services',
  ORDERS: 'orders',
  BOOKINGS: 'bookings',
  REVIEWS: 'reviews',
  PAYMENTS: 'payments',
  NOTIFICATIONS: 'notifications',
  COUPONS: 'coupons',
  CATEGORIES: 'categories',
  BANNERS: 'banners',
  DELIVERY_REQUESTS: 'deliveryRequests',
  ANALYTICS: 'analytics',
  AI_LOGS: 'aiLogs',
  ACTIVITY_LOGS: 'activityLogs',
  WISHLIST: 'wishlist',
  CONVERSATIONS: 'conversations',
  MESSAGES: 'messages',
} as const

// Collection references
export const usersRef = collection(db, COLLECTIONS.USERS)
export const storesRef = collection(db, COLLECTIONS.STORES)
export const productsRef = collection(db, COLLECTIONS.PRODUCTS)
export const servicesRef = collection(db, COLLECTIONS.SERVICES)
export const ordersRef = collection(db, COLLECTIONS.ORDERS)
export const bookingsRef = collection(db, COLLECTIONS.BOOKINGS)
export const reviewsRef = collection(db, COLLECTIONS.REVIEWS)
export const paymentsRef = collection(db, COLLECTIONS.PAYMENTS)
export const notificationsRef = collection(db, COLLECTIONS.NOTIFICATIONS)
export const couponsRef = collection(db, COLLECTIONS.COUPONS)
export const categoriesRef = collection(db, COLLECTIONS.CATEGORIES)
export const bannersRef = collection(db, COLLECTIONS.BANNERS)
export const deliveryRequestsRef = collection(db, COLLECTIONS.DELIVERY_REQUESTS)
export const analyticsRef = collection(db, COLLECTIONS.ANALYTICS)
export const aiLogsRef = collection(db, COLLECTIONS.AI_LOGS)
export const activityLogsRef = collection(db, COLLECTIONS.ACTIVITY_LOGS)
export const wishlistRef = collection(db, COLLECTIONS.WISHLIST)
export const conversationsRef = collection(db, COLLECTIONS.CONVERSATIONS)
export const messagesRef = collection(db, COLLECTIONS.MESSAGES)

// Document references
export const userDoc = (userId: string) => doc(db, COLLECTIONS.USERS, userId)
export const storeDoc = (storeId: string) => doc(db, COLLECTIONS.STORES, storeId)
export const productDoc = (productId: string) => doc(db, COLLECTIONS.PRODUCTS, productId)
export const serviceDoc = (serviceId: string) => doc(db, COLLECTIONS.SERVICES, serviceId)
export const orderDoc = (orderId: string) => doc(db, COLLECTIONS.ORDERS, orderId)
export const bookingDoc = (bookingId: string) => doc(db, COLLECTIONS.BOOKINGS, bookingId)
export const reviewDoc = (reviewId: string) => doc(db, COLLECTIONS.REVIEWS, reviewId)
export const paymentDoc = (paymentId: string) => doc(db, COLLECTIONS.PAYMENTS, paymentId)
export const notificationDoc = (notificationId: string) => doc(db, COLLECTIONS.NOTIFICATIONS, notificationId)
export const couponDoc = (couponId: string) => doc(db, COLLECTIONS.COUPONS, couponId)
export const categoryDoc = (categoryId: string) => doc(db, COLLECTIONS.CATEGORIES, categoryId)
export const bannerDoc = (bannerId: string) => doc(db, COLLECTIONS.BANNERS, bannerId)
export const wishlistDoc = (itemId: string) => doc(db, COLLECTIONS.WISHLIST, itemId)
export const conversationDoc = (conversationId: string) => doc(db, COLLECTIONS.CONVERSATIONS, conversationId)
export const messageDoc = (messageId: string) => doc(db, COLLECTIONS.MESSAGES, messageId)

// Subcollection references
export const storeProductsRef = (storeId: string) =>
  query(productsRef, where('storeId', '==', storeId))

export const storeServicesRef = (storeId: string) =>
  query(servicesRef, where('storeId', '==', storeId))

export const storeOrdersRef = (storeId: string) =>
  query(ordersRef, where('storeId', '==', storeId))

export const storeBookingsRef = (storeId: string) =>
  query(bookingsRef, where('storeId', '==', storeId))

export const storeReviewsRef = (storeId: string) =>
  query(reviewsRef, where('storeId', '==', storeId))

export const userOrdersRef = (userId: string) =>
  query(ordersRef, where('customerId', '==', userId))

export const userBookingsRef = (userId: string) =>
  query(bookingsRef, where('customerId', '==', userId))

export const userNotificationsRef = (userId: string) =>
  query(notificationsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))

// Query helpers
export const createPaginatedQuery = (
  collectionRef: CollectionReference<DocumentData>,
  constraints: QueryConstraint[],
  pageSize: number,
  lastDoc?: DocumentData
) => {
  const baseConstraints = [...constraints, limit(pageSize)]

  if (lastDoc) {
    return query(collectionRef, ...baseConstraints, startAfter(lastDoc))
  }

  return query(collectionRef, ...baseConstraints)
}
