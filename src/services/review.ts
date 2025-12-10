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
} from 'firebase/firestore'
import { db, reviewsRef, reviewDoc } from '@/lib/firebase'
import type { Review } from '@/types'

// Create a review
export async function createReview(
  userId: string,
  data: {
    productId?: string
    storeId?: string
    serviceId?: string
    orderId?: string
    bookingId?: string
    rating: number
    title?: string
    comment: string
    images?: string[]
  }
): Promise<Review> {
  const reviewId = doc(reviewsRef).id

  // Determine the review type and target
  const type = data.productId ? 'product' : data.serviceId ? 'service' : 'store'
  const targetId = data.productId || data.serviceId || data.storeId || ''

  const review = {
    id: reviewId,
    type,
    targetId,
    storeId: data.storeId || '',
    customerId: userId,
    customerName: '', // Will be populated from user data
    rating: data.rating,
    title: data.title,
    comment: data.comment,
    images: data.images || [],
    isVerified: !!data.orderId || !!data.bookingId,
    isVisible: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Review

  await setDoc(reviewDoc(reviewId), {
    ...review,
    createdAt: serverTimestamp(),
  })

  return review
}

// Get review by ID
export async function getReviewById(reviewId: string): Promise<Review | null> {
  const snapshot = await getDoc(reviewDoc(reviewId))

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as Review
}

// Get product reviews
export async function getProductReviews(
  productId: string,
  limitCount: number = 20
): Promise<Review[]> {
  const q = query(
    reviewsRef,
    where('productId', '==', productId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Review)
}

// Get store reviews
export async function getStoreReviews(
  storeId: string,
  limitCount: number = 20
): Promise<Review[]> {
  const q = query(
    reviewsRef,
    where('storeId', '==', storeId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Review)
}

// Get service reviews
export async function getServiceReviews(
  serviceId: string,
  limitCount: number = 20
): Promise<Review[]> {
  const q = query(
    reviewsRef,
    where('serviceId', '==', serviceId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Review)
}

// Get user reviews
export async function getUserReviews(userId: string): Promise<Review[]> {
  const q = query(
    reviewsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Review)
}

// Check if user can review
export async function canUserReview(
  userId: string,
  productId?: string,
  serviceId?: string
): Promise<{ canReview: boolean; reason?: string }> {
  // Check if already reviewed
  const existingQuery = query(
    reviewsRef,
    where('userId', '==', userId),
    ...(productId ? [where('productId', '==', productId)] : []),
    ...(serviceId ? [where('serviceId', '==', serviceId)] : []),
    limit(1)
  )

  const existingSnapshot = await getDocs(existingQuery)

  if (!existingSnapshot.empty) {
    return { canReview: false, reason: 'لقد قمت بتقييم هذا المنتج/الخدمة مسبقاً' }
  }

  return { canReview: true }
}

// Update review
export async function updateReview(
  reviewId: string,
  data: Partial<Review>
): Promise<void> {
  await updateDoc(reviewDoc(reviewId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// Delete review
export async function deleteReview(reviewId: string): Promise<void> {
  await deleteDoc(reviewDoc(reviewId))
}

// Mark review as helpful
export async function markReviewHelpful(reviewId: string): Promise<void> {
  const review = await getReviewById(reviewId)
  if (!review) throw new Error('Review not found')

  const currentCount = (review as any).helpfulCount || 0
  await updateDoc(reviewDoc(reviewId), {
    helpfulCount: currentCount + 1,
  })
}

// Add reply to review (store owner)
export async function addReviewReply(
  reviewId: string,
  reply: string
): Promise<void> {
  await updateDoc(reviewDoc(reviewId), {
    reply,
    repliedAt: serverTimestamp(),
  })
}

// Get review stats for a product/store
export async function getReviewStats(
  type: 'product' | 'store' | 'service',
  id: string
): Promise<{
  averageRating: number
  totalReviews: number
  ratingDistribution: Record<number, number>
}> {
  let reviews: Review[] = []

  if (type === 'product') {
    reviews = await getProductReviews(id, 1000)
  } else if (type === 'store') {
    reviews = await getStoreReviews(id, 1000)
  } else {
    reviews = await getServiceReviews(id, 1000)
  }

  const totalReviews = reviews.length

  if (totalReviews === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    }
  }

  const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  let totalRating = 0

  reviews.forEach((review) => {
    totalRating += review.rating
    ratingDistribution[review.rating] = (ratingDistribution[review.rating] || 0) + 1
  })

  return {
    averageRating: Math.round((totalRating / totalReviews) * 10) / 10,
    totalReviews,
    ratingDistribution,
  }
}

// Report a review
export async function reportReview(
  reviewId: string,
  reason: string,
  reportedBy: string
): Promise<void> {
  await updateDoc(reviewDoc(reviewId), {
    isReported: true,
    reportReason: reason,
    reportedBy,
    reportedAt: serverTimestamp(),
  })
}
