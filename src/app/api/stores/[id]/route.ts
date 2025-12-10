import { NextRequest, NextResponse } from 'next/server'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { COLLECTIONS } from '@/lib/firebase/collections'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/stores/[id] - Get single store
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const docRef = doc(db, COLLECTIONS.STORES, id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Store not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await updateDoc(docRef, {
      viewCount: increment(1),
    })

    return NextResponse.json({
      success: true,
      data: {
        id: docSnap.id,
        ...docSnap.data(),
      },
    })
  } catch (error) {
    console.error('Error fetching store:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch store' },
      { status: 500 }
    )
  }
}

// PATCH /api/stores/[id] - Update store
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const docRef = doc(db, COLLECTIONS.STORES, id)

    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Store not found' },
        { status: 404 }
      )
    }

    await updateDoc(docRef, {
      ...body,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Store updated successfully',
    })
  } catch (error) {
    console.error('Error updating store:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update store' },
      { status: 500 }
    )
  }
}
