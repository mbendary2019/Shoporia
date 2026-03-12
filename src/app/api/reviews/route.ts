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
import { getAuthUser, unauthorizedResponse } from '@/lib/api-auth'

const createReviewSchema = z.object({
  targetId: z.string().min(1, 'targetId is required'),
  storeId: z.string().min(1, 'storeId is required'),
  customerId: z.string().min(1, 'customerId is required'),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1, 'comment must be at least 1 character'),
  userId: z.string().optional(),
  productId: z.string().optional(),
  orderId: z.string().optional(),
  title: z.string().optional(),
  images: z.array(z.string()).optional(),
})

// GET /api/reviews - Get reviews
export async function GET(request: NextRequest) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`reviews-get:${ip}`, { maxRequests: 20 })
  if (!limiter.success) return rateLimitResponse()

  try {
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get('productId')
    const storeId = searchParams.get('storeId')
    const userId = searchParams.get('userId')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    const constraints: QueryConstraint[] = []

    if (productId) {
      constraints.push(where('productId', '==', productId))
    }

    if (storeId) {
      constraints.push(where('storeId', '==', storeId))
    }

    if (userId) {
      constraints.push(where('userId', '==', userId))
    }

    constraints.push(orderBy('createdAt', 'desc'))
    constraints.push(limit(pageSize))

    const q = query(collection(db, COLLECTIONS.REVIEWS), ...constraints)
    const snapshot = await getDocs(q)

    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Calculate stats
    const totalReviews = reviews.length
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum: number, r: Record<string, unknown>) => sum + (r.rating as number), 0) / totalReviews
        : 0

    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
      rating,
      count: reviews.filter((r: Record<string, unknown>) => r.rating === rating).length,
    }))

    return NextResponse.json({
      success: true,
      data: {
        reviews,
        stats: {
          totalReviews,
          averageRating: Math.round(averageRating * 10) / 10,
          ratingDistribution,
        },
      },
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST /api/reviews - Create new review
export async function POST(request: NextRequest) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`reviews-post:${ip}`, { maxRequests: 20 })
  if (!limiter.success) return rateLimitResponse()

  const user = getAuthUser(request)
  if (!user) return unauthorizedResponse()

  try {
    const body = await request.json()

    const parsed = createReviewSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors.map((e) => e.message).join(', ') },
        { status: 400 }
      )
    }

    const { productId, storeId, orderId, rating, title, comment, images, targetId } = parsed.data

    // Force userId to be the authenticated user (prevent impersonation)
    const reviewData = {
      userId: user.id,
      productId: productId || targetId,
      targetId,
      customerId: user.id,
      storeId: storeId || null,
      orderId: orderId || null,
      rating,
      title: title || null,
      comment: comment || null,
      images: images || [],
      isVerified: false, // Will be verified server-side by checking order ownership
      helpfulCount: 0,
      reply: null,
      isReported: false,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.REVIEWS), reviewData)

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        ...reviewData,
      },
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error creating review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
