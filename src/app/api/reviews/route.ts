import { NextRequest, NextResponse } from 'next/server'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { COLLECTIONS } from '@/lib/firebase/collections'

// GET /api/reviews - Get reviews
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get('productId')
    const storeId = searchParams.get('storeId')
    const userId = searchParams.get('userId')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    const constraints: any[] = []

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
        ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / totalReviews
        : 0

    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
      rating,
      count: reviews.filter((r: any) => r.rating === rating).length,
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
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST /api/reviews - Create new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { userId, productId, storeId, orderId, rating, title, comment, images } = body

    // Validate required fields
    if (!userId || !productId || !rating) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    const reviewData = {
      userId,
      productId,
      storeId: storeId || null,
      orderId: orderId || null,
      rating,
      title: title || null,
      comment: comment || null,
      images: images || [],
      isVerified: !!orderId, // Verified if from an order
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
    console.error('Error creating review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
