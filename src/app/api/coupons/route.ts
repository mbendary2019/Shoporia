import { NextRequest, NextResponse } from 'next/server'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  increment,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { COLLECTIONS } from '@/lib/firebase/collections'

// GET /api/coupons - Get coupons
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const storeId = searchParams.get('storeId')
    const code = searchParams.get('code')
    const status = searchParams.get('status')

    const constraints: any[] = []

    if (storeId) {
      constraints.push(where('storeId', '==', storeId))
    }

    if (code) {
      constraints.push(where('code', '==', code.toUpperCase()))
    }

    if (status) {
      constraints.push(where('status', '==', status))
    }

    constraints.push(orderBy('createdAt', 'desc'))

    const q = query(collection(db, COLLECTIONS.COUPONS), ...constraints)
    const snapshot = await getDocs(q)

    const coupons = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      success: true,
      data: coupons,
    })
  } catch (error) {
    console.error('Error fetching coupons:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch coupons' },
      { status: 500 }
    )
  }
}

// POST /api/coupons - Create new coupon
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      storeId,
      code,
      type,
      value,
      minOrder,
      maxDiscount,
      usageLimit,
      startDate,
      endDate,
      products,
    } = body

    // Validate required fields
    if (!storeId || !code || !type || !value) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if code already exists for this store
    const existingQuery = query(
      collection(db, COLLECTIONS.COUPONS),
      where('storeId', '==', storeId),
      where('code', '==', code.toUpperCase())
    )
    const existingSnapshot = await getDocs(existingQuery)

    if (!existingSnapshot.empty) {
      return NextResponse.json(
        { success: false, error: 'Coupon code already exists' },
        { status: 400 }
      )
    }

    const couponData = {
      storeId,
      code: code.toUpperCase(),
      type, // 'percentage' or 'fixed'
      value,
      minOrder: minOrder || 0,
      maxDiscount: maxDiscount || null,
      usageLimit: usageLimit || null,
      usedCount: 0,
      startDate: startDate || new Date().toISOString(),
      endDate: endDate || null,
      products: products || 'all', // 'all' or array of product IDs
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.COUPONS), couponData)

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        ...couponData,
      },
    })
  } catch (error) {
    console.error('Error creating coupon:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create coupon' },
      { status: 500 }
    )
  }
}
