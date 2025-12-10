import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  DocumentSnapshot,
} from 'firebase/firestore'
import { db, bookingsRef, bookingDoc } from '@/lib/firebase'
import type { Booking, BookingStatus, PaymentMethod } from '@/types'

// Generate booking number
function generateBookingNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `BK-${timestamp}${random}`
}

// Create a new booking
export async function createBooking(
  customerId: string,
  storeId: string,
  serviceId: string,
  data: {
    packageId?: string
    date: Date
    startTime: string
    endTime: string
    duration: number
    price: number
    discount?: number
    customerName: string
    customerPhone: string
    customerEmail?: string
    notes?: string
    paymentMethod: PaymentMethod
  }
): Promise<Booking> {
  const bookingId = doc(bookingsRef).id
  const bookingNumber = generateBookingNumber()

  const total = data.price - (data.discount || 0)

  const booking: Booking = {
    id: bookingId,
    bookingNumber,
    customerId,
    storeId,
    serviceId,
    packageId: data.packageId,
    date: data.date,
    startTime: data.startTime,
    endTime: data.endTime,
    duration: data.duration,
    price: data.price,
    discount: data.discount,
    total,
    currency: 'EGP',
    paymentMethod: data.paymentMethod,
    paymentStatus: data.paymentMethod === 'cash' ? 'pending' : 'pending',
    status: 'pending',
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    customerEmail: data.customerEmail,
    notes: data.notes,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await setDoc(bookingDoc(bookingId), {
    ...booking,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return booking
}

// Get booking by ID
export async function getBookingById(bookingId: string): Promise<Booking | null> {
  const snapshot = await getDoc(bookingDoc(bookingId))

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as Booking
}

// Get booking by booking number
export async function getBookingByNumber(bookingNumber: string): Promise<Booking | null> {
  const q = query(bookingsRef, where('bookingNumber', '==', bookingNumber), limit(1))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return null
  }

  return snapshot.docs[0].data() as Booking
}

// Get bookings by customer
export async function getBookingsByCustomer(
  customerId: string,
  pageSize: number = 20,
  lastDoc?: DocumentSnapshot
): Promise<{ bookings: Booking[]; lastDoc: DocumentSnapshot | null }> {
  let q = query(
    bookingsRef,
    where('customerId', '==', customerId),
    orderBy('date', 'desc'),
    limit(pageSize)
  )

  if (lastDoc) {
    q = query(q, startAfter(lastDoc))
  }

  const snapshot = await getDocs(q)
  const bookings = snapshot.docs.map((doc) => doc.data() as Booking)
  const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null

  return { bookings, lastDoc: newLastDoc }
}

// Get bookings by store
export async function getBookingsByStore(
  storeId: string,
  status?: BookingStatus,
  pageSize: number = 20,
  lastDoc?: DocumentSnapshot
): Promise<{ bookings: Booking[]; lastDoc: DocumentSnapshot | null }> {
  let q = status
    ? query(
        bookingsRef,
        where('storeId', '==', storeId),
        where('status', '==', status),
        orderBy('date', 'desc'),
        limit(pageSize)
      )
    : query(
        bookingsRef,
        where('storeId', '==', storeId),
        orderBy('date', 'desc'),
        limit(pageSize)
      )

  if (lastDoc) {
    q = query(q, startAfter(lastDoc))
  }

  const snapshot = await getDocs(q)
  const bookings = snapshot.docs.map((doc) => doc.data() as Booking)
  const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null

  return { bookings, lastDoc: newLastDoc }
}

// Get bookings by date
export async function getBookingsByDate(
  storeId: string,
  date: Date
): Promise<Booking[]> {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  const q = query(
    bookingsRef,
    where('storeId', '==', storeId),
    where('date', '>=', startOfDay),
    where('date', '<=', endOfDay),
    orderBy('date', 'asc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Booking)
}

// Get bookings by service
export async function getBookingsByService(
  serviceId: string,
  date?: Date
): Promise<Booking[]> {
  let q = query(
    bookingsRef,
    where('serviceId', '==', serviceId),
    orderBy('date', 'desc')
  )

  if (date) {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    q = query(
      bookingsRef,
      where('serviceId', '==', serviceId),
      where('date', '>=', startOfDay),
      where('date', '<=', endOfDay)
    )
  }

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Booking)
}

// Update booking status
export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus
): Promise<void> {
  await updateDoc(bookingDoc(bookingId), {
    status,
    updatedAt: serverTimestamp(),
  })
}

// Update payment status
export async function updateBookingPaymentStatus(
  bookingId: string,
  paymentStatus: Booking['paymentStatus']
): Promise<void> {
  await updateDoc(bookingDoc(bookingId), {
    paymentStatus,
    updatedAt: serverTimestamp(),
  })
}

// Cancel booking
export async function cancelBooking(
  bookingId: string,
  reason?: string
): Promise<void> {
  const booking = await getBookingById(bookingId)
  if (!booking) throw new Error('Booking not found')

  // Can only cancel pending or confirmed bookings
  if (!['pending', 'confirmed'].includes(booking.status)) {
    throw new Error('Cannot cancel this booking')
  }

  await updateBookingStatus(bookingId, 'cancelled')
}

// Confirm booking
export async function confirmBooking(bookingId: string): Promise<void> {
  await updateBookingStatus(bookingId, 'confirmed')
}

// Complete booking
export async function completeBooking(bookingId: string): Promise<void> {
  await updateBookingStatus(bookingId, 'completed')
}

// Mark as no-show
export async function markAsNoShow(bookingId: string): Promise<void> {
  await updateBookingStatus(bookingId, 'no_show')
}

// Check slot availability
export async function checkSlotAvailability(
  serviceId: string,
  date: Date,
  startTime: string,
  endTime: string
): Promise<boolean> {
  const bookings = await getBookingsByService(serviceId, date)

  // Check if any existing booking overlaps with the requested time slot
  for (const booking of bookings) {
    if (booking.status === 'cancelled' || booking.status === 'no_show') continue

    const bookingStart = booking.startTime
    const bookingEnd = booking.endTime

    // Check for overlap
    if (
      (startTime >= bookingStart && startTime < bookingEnd) ||
      (endTime > bookingStart && endTime <= bookingEnd) ||
      (startTime <= bookingStart && endTime >= bookingEnd)
    ) {
      return false
    }
  }

  return true
}

// Get upcoming bookings for store
export async function getUpcomingBookings(
  storeId: string,
  limit_count: number = 10
): Promise<Booking[]> {
  const now = new Date()

  const q = query(
    bookingsRef,
    where('storeId', '==', storeId),
    where('date', '>=', now),
    where('status', 'in', ['pending', 'confirmed']),
    orderBy('date', 'asc'),
    limit(limit_count)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Booking)
}

// Get store booking stats
export async function getStoreBookingStats(storeId: string): Promise<{
  total: number
  pending: number
  confirmed: number
  completed: number
  cancelled: number
  revenue: number
}> {
  const bookingsSnapshot = await getDocs(
    query(bookingsRef, where('storeId', '==', storeId))
  )

  const bookings = bookingsSnapshot.docs.map((doc) => doc.data() as Booking)

  return {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    revenue: bookings
      .filter((b) => b.status === 'completed' && b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.total, 0),
  }
}
