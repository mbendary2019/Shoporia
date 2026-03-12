import { NextRequest, NextResponse } from 'next/server'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { COLLECTIONS } from '@/lib/firebase/collections'
import { rateLimit, rateLimitResponse, getClientIP } from '@/lib/rate-limit'
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from '@/lib/api-auth'

// GET /api/wishlist - Get user's wishlist
export async function GET(request: NextRequest) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`wishlist-get:${ip}`, { maxRequests: 30 })
  if (!limiter.success) return rateLimitResponse()

  const user = getAuthUser(request)
  if (!user) return unauthorizedResponse()

  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    // Users can only access their own wishlist
    if (userId && userId !== user.id && user.role !== 'admin') {
      return forbiddenResponse()
    }

    const q = query(
      collection(db, COLLECTIONS.WISHLIST),
      where('userId', '==', userId || user.id)
    )
    const snapshot = await getDocs(q)

    const wishlistItems = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      success: true,
      data: wishlistItems,
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error fetching wishlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}

// POST /api/wishlist - Add item to wishlist
export async function POST(request: NextRequest) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`wishlist-post:${ip}`, { maxRequests: 30 })
  if (!limiter.success) return rateLimitResponse()

  const user = getAuthUser(request)
  if (!user) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { productId } = body

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Always use authenticated user's ID
    const userId = user.id

    // Check if already in wishlist
    const existingQuery = query(
      collection(db, COLLECTIONS.WISHLIST),
      where('userId', '==', userId),
      where('productId', '==', productId)
    )
    const existingSnapshot = await getDocs(existingQuery)

    if (!existingSnapshot.empty) {
      return NextResponse.json({
        success: true,
        message: 'Item already in wishlist',
        data: {
          id: existingSnapshot.docs[0].id,
          ...existingSnapshot.docs[0].data(),
        },
      })
    }

    const wishlistData = {
      userId,
      productId,
      addedAt: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.WISHLIST), wishlistData)

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        ...wishlistData,
      },
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error adding to wishlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add to wishlist' },
      { status: 500 }
    )
  }
}

// DELETE /api/wishlist - Remove item from wishlist
export async function DELETE(request: NextRequest) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`wishlist-delete:${ip}`, { maxRequests: 30 })
  if (!limiter.success) return rateLimitResponse()

  const user = getAuthUser(request)
  if (!user) return unauthorizedResponse()

  try {
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Always use authenticated user's ID
    const q = query(
      collection(db, COLLECTIONS.WISHLIST),
      where('userId', '==', user.id),
      where('productId', '==', productId)
    )
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return NextResponse.json(
        { success: false, error: 'Item not found in wishlist' },
        { status: 404 }
      )
    }

    await deleteDoc(doc(db, COLLECTIONS.WISHLIST, snapshot.docs[0].id))

    return NextResponse.json({
      success: true,
      message: 'Item removed from wishlist',
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error removing from wishlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove from wishlist' },
      { status: 500 }
    )
  }
}
