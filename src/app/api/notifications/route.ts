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
  QueryConstraint,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { COLLECTIONS } from '@/lib/firebase/collections'
import { rateLimit, rateLimitResponse, getClientIP } from '@/lib/rate-limit'
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from '@/lib/api-auth'

const BATCH_LIMIT = 500 // Firestore batch limit

// GET /api/notifications - Get user's notifications
export async function GET(request: NextRequest) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`notifications-get:${ip}`, { maxRequests: 30 })
  if (!limiter.success) return rateLimitResponse()

  const user = getAuthUser(request)
  if (!user) return unauthorizedResponse()

  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'
    const pageSize = Math.min(parseInt(searchParams.get('pageSize') || '50'), 100)

    const constraints: QueryConstraint[] = [where('userId', '==', user.id)]

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
      where('userId', '==', user.id),
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
    if (process.env.NODE_ENV === 'development') console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

// POST /api/notifications - Create new notification (internal use)
export async function POST(request: NextRequest) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`notifications-post:${ip}`, { maxRequests: 30 })
  if (!limiter.success) return rateLimitResponse()

  const user = getAuthUser(request)
  if (!user) return unauthorizedResponse()

  // Only admins or the system can create notifications for other users
  try {
    const body = await request.json()
    const { userId, type, title, message, link } = body

    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Only admin can send notifications to other users
    if (userId !== user.id && user.role !== 'admin') {
      return forbiddenResponse()
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
    if (process.env.NODE_ENV === 'development') console.error('Error creating notification:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create notification' },
      { status: 500 }
    )
  }
}

// PATCH /api/notifications - Mark notifications as read
export async function PATCH(request: NextRequest) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`notifications-patch:${ip}`, { maxRequests: 30 })
  if (!limiter.success) return rateLimitResponse()

  const user = getAuthUser(request)
  if (!user) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { notificationIds, markAll } = body

    if (markAll) {
      // Mark all as read (limited to BATCH_LIMIT)
      const q = query(
        collection(db, COLLECTIONS.NOTIFICATIONS),
        where('userId', '==', user.id),
        where('isRead', '==', false),
        limit(BATCH_LIMIT)
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
      // Limit batch size
      const ids = notificationIds.slice(0, BATCH_LIMIT)
      const batch = writeBatch(db)
      ids.forEach((id: string) => {
        batch.update(doc(db, COLLECTIONS.NOTIFICATIONS, id), {
          isRead: true,
        })
      })
      await batch.commit()

      return NextResponse.json({
        success: true,
        message: `Marked ${ids.length} notifications as read`,
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error updating notifications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update notifications' },
      { status: 500 }
    )
  }
}

// DELETE /api/notifications - Delete notifications
export async function DELETE(request: NextRequest) {
  const ip = getClientIP(request)
  const limiter = rateLimit(`notifications-delete:${ip}`, { maxRequests: 30 })
  if (!limiter.success) return rateLimitResponse()

  const user = getAuthUser(request)
  if (!user) return unauthorizedResponse()

  try {
    const searchParams = request.nextUrl.searchParams
    const notificationId = searchParams.get('notificationId')
    const deleteAll = searchParams.get('deleteAll') === 'true'

    if (deleteAll) {
      // Delete all (limited to BATCH_LIMIT)
      const q = query(
        collection(db, COLLECTIONS.NOTIFICATIONS),
        where('userId', '==', user.id),
        limit(BATCH_LIMIT)
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
      // Delete specific notification - verify ownership
      const notifDoc = await getDocs(query(
        collection(db, COLLECTIONS.NOTIFICATIONS),
        where('userId', '==', user.id),
      ))
      const owned = notifDoc.docs.find(d => d.id === notificationId)
      if (!owned) {
        return forbiddenResponse()
      }

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
    if (process.env.NODE_ENV === 'development') console.error('Error deleting notifications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete notifications' },
      { status: 500 }
    )
  }
}
