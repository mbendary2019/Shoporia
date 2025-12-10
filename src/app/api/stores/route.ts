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

// GET /api/stores - Get stores
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const cursor = searchParams.get('cursor')

    const constraints: any[] = [where('status', '==', 'active')]

    if (category) {
      constraints.push(where('category', '==', category))
    }

    if (featured === 'true') {
      constraints.push(where('isFeatured', '==', true))
    }

    constraints.push(orderBy(sortBy, sortOrder as 'asc' | 'desc'))

    if (cursor) {
      const cursorDoc = await getDoc(doc(db, COLLECTIONS.STORES, cursor))
      if (cursorDoc.exists()) {
        constraints.push(startAfter(cursorDoc))
      }
    }

    constraints.push(limit(pageSize))

    const q = query(collection(db, COLLECTIONS.STORES), ...constraints)
    const snapshot = await getDocs(q)

    let stores = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      stores = stores.filter(
        (store: any) =>
          store.name?.toLowerCase().includes(searchLower) ||
          store.description?.toLowerCase().includes(searchLower)
      )
    }

    const lastDoc = snapshot.docs[snapshot.docs.length - 1]
    const nextCursor = lastDoc?.id || null

    return NextResponse.json({
      success: true,
      data: {
        stores,
        nextCursor,
        hasMore: snapshot.docs.length === pageSize,
      },
    })
  } catch (error) {
    console.error('Error fetching stores:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stores' },
      { status: 500 }
    )
  }
}
