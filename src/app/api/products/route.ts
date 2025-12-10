import { NextRequest, NextResponse } from 'next/server'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  doc,
  getDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { COLLECTIONS } from '@/lib/firebase/collections'

// GET /api/products - Get products with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const storeId = searchParams.get('storeId')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const cursor = searchParams.get('cursor')

    let q = query(collection(db, COLLECTIONS.PRODUCTS))

    // Apply filters
    const constraints: any[] = [where('status', '==', 'active')]

    if (category) {
      constraints.push(where('category', '==', category))
    }

    if (storeId) {
      constraints.push(where('storeId', '==', storeId))
    }

    if (minPrice) {
      constraints.push(where('price', '>=', parseFloat(minPrice)))
    }

    if (maxPrice) {
      constraints.push(where('price', '<=', parseFloat(maxPrice)))
    }

    // Apply sorting
    constraints.push(orderBy(sortBy, sortOrder as 'asc' | 'desc'))

    // Apply pagination
    if (cursor) {
      const cursorDoc = await getDoc(doc(db, COLLECTIONS.PRODUCTS, cursor))
      if (cursorDoc.exists()) {
        constraints.push(startAfter(cursorDoc))
      }
    }

    constraints.push(limit(pageSize))

    q = query(collection(db, COLLECTIONS.PRODUCTS), ...constraints)

    const snapshot = await getDocs(q)
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Filter by search term (client-side for simplicity)
    let filteredProducts = products
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = products.filter(
        (product: any) =>
          product.name?.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower)
      )
    }

    const lastDoc = snapshot.docs[snapshot.docs.length - 1]
    const nextCursor = lastDoc?.id || null

    return NextResponse.json({
      success: true,
      data: {
        products: filteredProducts,
        nextCursor,
        hasMore: snapshot.docs.length === pageSize,
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
