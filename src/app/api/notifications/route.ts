import { NextRequest, NextResponse } from 'next/server'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  doc,
  writeBatch,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { COLLECTIONS } from '@/lib/firebase/collections'

// GET /api/notifications - Get user's notifications
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const type = searchParams.get('type')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'
    const pageSize = parseInt(searchParams.get('pageSize') || '50')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    const constraints: any[] = [where('userId', '==', userId)]

    if (type) {
      constraints.push(where('type', '==', type))
    }

    if (unreadOnly) {
      constraints.push(where('isRead', '==', false))
    }

    constraints.push(orderBy('createdAt', 'desc'))
    constraints.push(limit(pageSize))

    const q = query(collection(db, COLLECTIONS.NOTIFICATIONS), ...constraints)
    const snapshot = await getDocs(q)

    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Get unread count
    const unreadQuery = query(
      collection(db, COLLECTIONS.NOTIFICATIONS),
      where('userId', '==', userId),
      where('isRead', '==', false)
    )
    const unreadSnapshot = await getDocs(unreadQuery)

    return NextResponse.json({
      success: true,
      data: {
        notifications,
        unreadCount: unreadSnapshot.size,
      },
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

// POST /api/notifications - Create new notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, title, message, link } = body

    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const notificationData = {
      userId,
      type,
      title,
      message,
      link: link || null,
      isRead: false,
      createdAt: new Date().toISOString(),
    }

    const docRef = await addDoc(
      collection(db, COLLECTIONS.NOTIFICATIONS),
      notificationData
    )

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        ...notificationData,
      },
    })
  } catch (error) {
    console.error('Error creating notification:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create notification' },
      { status: 500 }
    )
  }
}

// PATCH /api/notifications - Mark notifications as read
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, notificationIds, markAll } = body

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    if (markAll) {
      // Mark all as read
      const q = query(
        collection(db, COLLECTIONS.NOTIFICATIONS),
        where('userId', '==', userId),
        where('isRead', '==', false)
      )
      const snapshot = await getDocs(q)

      const batch = writeBatch(db)
      snapshot.docs.forEach((docSnap) => {
        batch.update(doc(db, COLLECTIONS.NOTIFICATIONS, docSnap.id), {
          isRead: true,
        })
      })
      await batch.commit()

      return NextResponse.json({
        success: true,
        message: `Marked ${snapshot.size} notifications as read`,
      })
    } else if (notificationIds && Array.isArray(notificationIds)) {
      // Mark specific notifications as read
      const batch = writeBatch(db)
      notificationIds.forEach((id: string) => {
        batch.update(doc(db, COLLECTIONS.NOTIFICATIONS, id), {
          isRead: true,
        })
      })
      await batch.commit()

      return NextResponse.json({
        success: true,
        message: `Marked ${notificationIds.length} notifications as read`,
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error updating notifications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update notifications' },
      { status: 500 }
    )
  }
}

// DELETE /api/notifications - Delete notifications
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const notificationId = searchParams.get('notificationId')
    const deleteAll = searchParams.get('deleteAll') === 'true'

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    if (deleteAll) {
      // Delete all notifications
      const q = query(
        collection(db, COLLECTIONS.NOTIFICATIONS),
        where('userId', '==', userId)
      )
      const snapshot = await getDocs(q)

      const batch = writeBatch(db)
      snapshot.docs.forEach((docSnap) => {
        batch.delete(doc(db, COLLECTIONS.NOTIFICATIONS, docSnap.id))
      })
      await batch.commit()

      return NextResponse.json({
        success: true,
        message: `Deleted ${snapshot.size} notifications`,
      })
    } else if (notificationId) {
      // Delete specific notification
      await deleteDoc(doc(db, COLLECTIONS.NOTIFICATIONS, notificationId))

      return NextResponse.json({
        success: true,
        message: 'Notification deleted',
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error deleting notifications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete notifications' },
      { status: 500 }
    )
  }
}
