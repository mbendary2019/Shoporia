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

// GET /api/wishlist - Get user's wishlist
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    const q = query(
      collection(db, COLLECTIONS.WISHLIST),
      where('userId', '==', userId)
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
    console.error('Error fetching wishlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}

// POST /api/wishlist - Add item to wishlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, productId } = body

    if (!userId || !productId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

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
    console.error('Error adding to wishlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add to wishlist' },
      { status: 500 }
    )
  }
}

// DELETE /api/wishlist - Remove item from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const productId = searchParams.get('productId')

    if (!userId || !productId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const q = query(
      collection(db, COLLECTIONS.WISHLIST),
      where('userId', '==', userId),
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
    console.error('Error removing from wishlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove from wishlist' },
      { status: 500 }
    )
  }
}
