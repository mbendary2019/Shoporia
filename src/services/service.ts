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
import { db, servicesRef, serviceDoc } from '@/lib/firebase'
import { slugify } from '@/utils/format'
import type { Service, ServiceAvailability, ServicePackage, ProductImage } from '@/types'

// Create a new service
export async function createService(
  storeId: string,
  data: Partial<Service>
): Promise<Service> {
  const serviceId = doc(servicesRef).id
  const slug = slugify(data.name || '') + '-' + serviceId.slice(0, 6)

  const defaultAvailability: ServiceAvailability = {
    sunday: { isAvailable: false, slots: [] },
    monday: { isAvailable: true, slots: [{ start: '09:00', end: '17:00' }] },
    tuesday: { isAvailable: true, slots: [{ start: '09:00', end: '17:00' }] },
    wednesday: { isAvailable: true, slots: [{ start: '09:00', end: '17:00' }] },
    thursday: { isAvailable: true, slots: [{ start: '09:00', end: '17:00' }] },
    friday: { isAvailable: false, slots: [] },
    saturday: { isAvailable: true, slots: [{ start: '09:00', end: '17:00' }] },
  }

  const service: Service = {
    id: serviceId,
    storeId,
    name: data.name || '',
    slug,
    description: data.description || '',
    category: data.category || '',
    price: data.price || 0,
    priceType: data.priceType || 'fixed',
    currency: 'EGP',
    duration: data.duration || 60,
    bufferTime: data.bufferTime,
    images: data.images || [],
    availability: data.availability || defaultAvailability,
    maxBookingsPerSlot: data.maxBookingsPerSlot || 1,
    packages: data.packages || [],
    status: 'active',
    isFeatured: false,
    viewCount: 0,
    bookingCount: 0,
    rating: 0,
    reviewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data,
  }

  await setDoc(serviceDoc(serviceId), {
    ...service,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return service
}

// Get service by ID
export async function getServiceById(serviceId: string): Promise<Service | null> {
  const snapshot = await getDoc(serviceDoc(serviceId))

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as Service
}

// Get service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const q = query(servicesRef, where('slug', '==', slug), limit(1))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return null
  }

  return snapshot.docs[0].data() as Service
}

// Get services by store
export async function getServicesByStore(
  storeId: string,
  pageSize: number = 20,
  lastDoc?: DocumentSnapshot
): Promise<{ services: Service[]; lastDoc: DocumentSnapshot | null }> {
  let q = query(
    servicesRef,
    where('storeId', '==', storeId),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  )

  if (lastDoc) {
    q = query(q, startAfter(lastDoc))
  }

  const snapshot = await getDocs(q)
  const services = snapshot.docs.map((doc) => doc.data() as Service)
  const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null

  return { services, lastDoc: newLastDoc }
}

// Get active services by store
export async function getActiveServicesByStore(
  storeId: string,
  pageSize: number = 20
): Promise<Service[]> {
  const q = query(
    servicesRef,
    where('storeId', '==', storeId),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Service)
}

// Get services by category
export async function getServicesByCategory(
  category: string,
  pageSize: number = 20
): Promise<Service[]> {
  const q = query(
    servicesRef,
    where('status', '==', 'active'),
    where('category', '==', category),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Service)
}

// Get featured services
export async function getFeaturedServices(pageSize: number = 10): Promise<Service[]> {
  const q = query(
    servicesRef,
    where('status', '==', 'active'),
    where('isFeatured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Service)
}

// Update service
export async function updateService(
  serviceId: string,
  data: Partial<Service>
): Promise<void> {
  await updateDoc(serviceDoc(serviceId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// Update service status
export async function updateServiceStatus(
  serviceId: string,
  status: Service['status']
): Promise<void> {
  await updateDoc(serviceDoc(serviceId), {
    status,
    updatedAt: serverTimestamp(),
  })
}

// Update service availability
export async function updateServiceAvailability(
  serviceId: string,
  availability: ServiceAvailability
): Promise<void> {
  await updateDoc(serviceDoc(serviceId), {
    availability,
    updatedAt: serverTimestamp(),
  })
}

// Add service package
export async function addServicePackage(
  serviceId: string,
  packageData: Omit<ServicePackage, 'id'>
): Promise<ServicePackage> {
  const service = await getServiceById(serviceId)
  if (!service) throw new Error('Service not found')

  const newPackage: ServicePackage = {
    id: `pkg_${Date.now()}`,
    ...packageData,
  }

  const packages = [...(service.packages || []), newPackage]

  await updateDoc(serviceDoc(serviceId), {
    packages,
    updatedAt: serverTimestamp(),
  })

  return newPackage
}

// Remove service package
export async function removeServicePackage(
  serviceId: string,
  packageId: string
): Promise<void> {
  const service = await getServiceById(serviceId)
  if (!service) throw new Error('Service not found')

  const packages = (service.packages || []).filter((p) => p.id !== packageId)

  await updateDoc(serviceDoc(serviceId), {
    packages,
    updatedAt: serverTimestamp(),
  })
}

// Increment service view count
export async function incrementServiceViewCount(serviceId: string): Promise<void> {
  const service = await getServiceById(serviceId)
  if (!service) return

  await updateDoc(serviceDoc(serviceId), {
    viewCount: service.viewCount + 1,
  })
}

// Increment service booking count
export async function incrementServiceBookingCount(
  serviceId: string,
  amount: number = 1
): Promise<void> {
  const service = await getServiceById(serviceId)
  if (!service) return

  await updateDoc(serviceDoc(serviceId), {
    bookingCount: service.bookingCount + amount,
    updatedAt: serverTimestamp(),
  })
}

// Delete service
export async function deleteService(serviceId: string): Promise<void> {
  await deleteDoc(serviceDoc(serviceId))
}

// Search services
export async function searchServices(
  searchTerm: string,
  filters?: {
    category?: string
    minPrice?: number
    maxPrice?: number
    storeId?: string
  },
  pageSize: number = 20
): Promise<Service[]> {
  let q = query(
    servicesRef,
    where('status', '==', 'active'),
    where('name', '>=', searchTerm),
    where('name', '<=', searchTerm + '\uf8ff'),
    limit(pageSize)
  )

  const snapshot = await getDocs(q)
  let services = snapshot.docs.map((doc) => doc.data() as Service)

  // Apply client-side filters
  if (filters?.category) {
    services = services.filter((s) => s.category === filters.category)
  }
  if (filters?.minPrice !== undefined) {
    services = services.filter((s) => s.price >= filters.minPrice!)
  }
  if (filters?.maxPrice !== undefined) {
    services = services.filter((s) => s.price <= filters.maxPrice!)
  }
  if (filters?.storeId) {
    services = services.filter((s) => s.storeId === filters.storeId)
  }

  return services
}

// Get available time slots for a service on a specific date
export function getAvailableTimeSlots(
  service: Service,
  date: Date,
  existingBookings: { startTime: string; endTime: string }[]
): { start: string; end: string }[] {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof ServiceAvailability
  const dayAvailability = service.availability[dayName]

  if (!dayAvailability?.isAvailable) {
    return []
  }

  const availableSlots: { start: string; end: string }[] = []

  for (const slot of dayAvailability.slots) {
    // Parse slot times
    const [slotStartHour, slotStartMin] = slot.start.split(':').map(Number)
    const [slotEndHour, slotEndMin] = slot.end.split(':').map(Number)

    const slotStartMinutes = slotStartHour * 60 + slotStartMin
    const slotEndMinutes = slotEndHour * 60 + slotEndMin

    // Generate time slots based on service duration
    let currentStart = slotStartMinutes

    while (currentStart + service.duration <= slotEndMinutes) {
      const currentEnd = currentStart + service.duration

      const startTime = `${Math.floor(currentStart / 60).toString().padStart(2, '0')}:${(currentStart % 60).toString().padStart(2, '0')}`
      const endTime = `${Math.floor(currentEnd / 60).toString().padStart(2, '0')}:${(currentEnd % 60).toString().padStart(2, '0')}`

      // Check if this slot conflicts with existing bookings
      const hasConflict = existingBookings.some((booking) => {
        const [bookingStartHour, bookingStartMin] = booking.startTime.split(':').map(Number)
        const [bookingEndHour, bookingEndMin] = booking.endTime.split(':').map(Number)

        const bookingStart = bookingStartHour * 60 + bookingStartMin
        const bookingEnd = bookingEndHour * 60 + bookingEndMin

        return (
          (currentStart >= bookingStart && currentStart < bookingEnd) ||
          (currentEnd > bookingStart && currentEnd <= bookingEnd) ||
          (currentStart <= bookingStart && currentEnd >= bookingEnd)
        )
      })

      if (!hasConflict) {
        availableSlots.push({ start: startTime, end: endTime })
      }

      // Move to next slot (including buffer time)
      currentStart = currentEnd + (service.bufferTime || 0)
    }
  }

  return availableSlots
}
