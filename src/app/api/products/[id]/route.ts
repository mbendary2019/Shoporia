import { NextRequest, NextResponse } from 'next/server'
import { doc, getDoc, updateDoc, deleteDoc, increment } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { COLLECTIONS } from '@/lib/firebase/collections'
import { rateLimit, rateLimitResponse, getClientIP } from '@/lib/rate-limit'
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from '@/lib/api-auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

// Allowed fields for product update
const ALLOWED_UPDATE_FIELDS = [
  'name', 'description', 'price', 'comparePrice', 'category', 'subcategory',
  'images', 'status', 'stock', 'trackStock', 'lowStockThreshold',
  'options', 'variants', 'tags', 'weight', 'dimensions',
] as const

// GET /api/products/[id] - Get single product
export async function GET(request: NextRequest, { params }: RouteParams) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`products-id-get:${ip}`, { maxRequests: 30 })
  if (!limiter.success) return rateLimitResponse()

  try {
    const { id } = await params
    const docRef = doc(db, COLLECTIONS.PRODUCTS, id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
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
    if (process.env.NODE_ENV === 'development') console.error('Error fetching product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PATCH /api/products/[id] - Update product
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`products-id-patch:${ip}`, { maxRequests: 30 })
  if (!limiter.success) return rateLimitResponse()

  const user = getAuthUser(request)
  if (!user) return unauthorizedResponse()

  try {
    const { id } = await params
    const body = await request.json()
    const docRef = doc(db, COLLECTIONS.PRODUCTS, id)

    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check ownership: only store owner or admin can update
    const productData = docSnap.data()
    if (user.role !== 'admin' && productData.storeId !== user.storeId) {
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
      message: 'Product updated successfully',
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error updating product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`products-id-delete:${ip}`, { maxRequests: 30 })
  if (!limiter.success) return rateLimitResponse()

  const user = getAuthUser(request)
  if (!user) return unauthorizedResponse()

  try {
    const { id } = await params
    const docRef = doc(db, COLLECTIONS.PRODUCTS, id)

    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check ownership: only store owner or admin can delete
    const productData = docSnap.data()
    if (user.role !== 'admin' && productData.storeId !== user.storeId) {
      return forbiddenResponse()
    }

    await deleteDoc(docRef)

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error deleting product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
