import { NextRequest, NextResponse } from 'next/server'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { COLLECTIONS } from '@/lib/firebase/collections'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/orders/[id] - Get single order
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const docRef = doc(db, COLLECTIONS.ORDERS, id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: docSnap.id,
        ...docSnap.data(),
      },
    })
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

// PATCH /api/orders/[id] - Update order status
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, paymentStatus, trackingNumber, notes } = body

    const docRef = doc(db, COLLECTIONS.ORDERS, id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }

    const updateData: any = {
      updatedAt: new Date().toISOString(),
    }

    if (status) {
      updateData.status = status

      // Add status history
      const currentData = docSnap.data()
      const statusHistory = currentData.statusHistory || []
      statusHistory.push({
        status,
        timestamp: new Date().toISOString(),
      })
      updateData.statusHistory = statusHistory
    }

    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus
    }

    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber
    }

    if (notes !== undefined) {
      updateData.notes = notes
    }

    await updateDoc(docRef, updateData)

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
    })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
