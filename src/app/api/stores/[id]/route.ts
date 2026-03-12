import { NextRequest, NextResponse } from 'next/server'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { COLLECTIONS } from '@/lib/firebase/collections'
import { rateLimit, rateLimitResponse, getClientIP } from '@/lib/rate-limit'
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from '@/lib/api-auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

// Allowed fields for store update
const ALLOWED_UPDATE_FIELDS = [
  'name', 'description', 'logo', 'cover', 'category', 'phone', 'email',
  'address', 'city', 'workingHours', 'socialMedia', 'settings',
  'deliveryFee', 'freeDeliveryThreshold', 'isVacation',
] as const

// GET /api/stores/[id] - Get single store
export async function GET(request: NextRequest, { params }: RouteParams) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`stores-id-get:${ip}`, { maxRequests: 30 })
  if (!limiter.success) return rateLimitResponse()

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
    if (process.env.NODE_ENV === 'development') console.error('Error fetching store:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch store' },
      { status: 500 }
    )
  }
}

// PATCH /api/stores/[id] - Update store
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`stores-id-patch:${ip}`, { maxRequests: 30 })
  if (!limiter.success) return rateLimitResponse()

  const user = getAuthUser(request)
  if (!user) return unauthorizedResponse()

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

    // Check ownership: only store owner or admin can update
    const storeData = docSnap.data()
    if (user.role !== 'admin' && storeData.ownerId !== user.id) {
      return forbiddenResponse()
    }

    // Only allow specific fields to be updated
    const sanitizedUpdate: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    }
    for (const field of ALLOWED_UPDATE_FIELDS) {
      if (body[field] !== undefined) {
        sanitizedUpdate[field] = body[field]
      }
    }

    await updateDoc(docRef, sanitizedUpdate)

    return NextResponse.json({
      success: true,
      message: 'Store updated successfully',
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error updating store:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update store' },
      { status: 500 }
    )
  }
}
