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

// GET /api/orders - Get orders
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const storeId = searchParams.get('storeId')
    const status = searchParams.get('status')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    const constraints: any[] = []

    if (userId) {
      constraints.push(where('customerId', '==', userId))
    }

    if (storeId) {
      constraints.push(where('storeId', '==', storeId))
    }

    if (status) {
      constraints.push(where('status', '==', status))
    }

    constraints.push(orderBy('createdAt', 'desc'))
    constraints.push(limit(pageSize))

    const q = query(collection(db, COLLECTIONS.ORDERS), ...constraints)
    const snapshot = await getDocs(q)

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      success: true,
      data: orders,
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      customerId,
      storeId,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost,
      discount,
      total,
      couponCode,
    } = body

    // Validate required fields
    if (!customerId || !storeId || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

    const orderData = {
      orderNumber,
      customerId,
      storeId,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost: shippingCost || 0,
      discount: discount || 0,
      total,
      couponCode: couponCode || null,
      status: 'pending',
      paymentStatus: 'pending',
      trackingNumber: null,
      notes: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, COLLECTIONS.ORDERS), orderData)

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        ...orderData,
      },
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
