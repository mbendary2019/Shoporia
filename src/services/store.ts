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
import { db, storesRef, storeDoc } from '@/lib/firebase'
import { slugify } from '@/utils/format'
import type { Store, StoreSettings } from '@/types'

// Create a new store
export async function createStore(
  ownerId: string,
  data: Partial<Store>
): Promise<Store> {
  const storeId = doc(storesRef).id
  const slug = slugify(data.name || '') + '-' + storeId.slice(0, 6)

  const defaultSettings: StoreSettings = {
    currency: 'EGP',
    language: 'ar',
    acceptsCash: true,
    acceptsCard: false,
    acceptsWallet: false,
  }

  const store: Store = {
    id: storeId,
    ownerId,
    name: data.name || '',
    slug,
    description: data.description || '',
    category: data.category || 'other',
    status: 'pending',
    rating: 0,
    reviewCount: 0,
    productCount: 0,
    serviceCount: 0,
    orderCount: 0,
    phone: data.phone || '',
    settings: data.settings || defaultSettings,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data,
  }

  await setDoc(storeDoc(storeId), {
    ...store,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return store
}

// Get store by ID
export async function getStoreById(storeId: string): Promise<Store | null> {
  const snapshot = await getDoc(storeDoc(storeId))

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as Store
}

// Get store by slug
export async function getStoreBySlug(slug: string): Promise<Store | null> {
  const q = query(storesRef, where('slug', '==', slug), limit(1))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return null
  }

  return snapshot.docs[0].data() as Store
}

// Get store by owner ID
export async function getStoreByOwnerId(ownerId: string): Promise<Store | null> {
  const q = query(storesRef, where('ownerId', '==', ownerId), limit(1))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return null
  }

  return snapshot.docs[0].data() as Store
}

// Get all active stores
export async function getActiveStores(
  pageSize: number = 20,
  lastDoc?: DocumentSnapshot
): Promise<{ stores: Store[]; lastDoc: DocumentSnapshot | null }> {
  let q = query(
    storesRef,
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  )

  if (lastDoc) {
    q = query(q, startAfter(lastDoc))
  }

  const snapshot = await getDocs(q)
  const stores = snapshot.docs.map((doc) => doc.data() as Store)
  const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null

  return { stores, lastDoc: newLastDoc }
}

// Get stores by category
export async function getStoresByCategory(
  category: string,
  pageSize: number = 20
): Promise<Store[]> {
  const q = query(
    storesRef,
    where('status', '==', 'active'),
    where('category', '==', category),
    orderBy('rating', 'desc'),
    limit(pageSize)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Store)
}

// Update store
export async function updateStore(
  storeId: string,
  data: Partial<Store>
): Promise<void> {
  await updateDoc(storeDoc(storeId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// Update store settings
export async function updateStoreSettings(
  storeId: string,
  settings: Partial<StoreSettings>
): Promise<void> {
  const store = await getStoreById(storeId)
  if (!store) throw new Error('Store not found')

  await updateDoc(storeDoc(storeId), {
    settings: { ...store.settings, ...settings },
    updatedAt: serverTimestamp(),
  })
}

// Update store status (admin only)
export async function updateStoreStatus(
  storeId: string,
  status: Store['status']
): Promise<void> {
  const updateData: Record<string, unknown> = {
    status,
    updatedAt: serverTimestamp(),
  }

  if (status === 'active') {
    updateData.approvedAt = serverTimestamp()
  }

  await updateDoc(storeDoc(storeId), updateData)
}

// Delete store
export async function deleteStore(storeId: string): Promise<void> {
  await deleteDoc(storeDoc(storeId))
}

// Increment store product count
export async function incrementProductCount(
  storeId: string,
  amount: number = 1
): Promise<void> {
  const store = await getStoreById(storeId)
  if (!store) throw new Error('Store not found')

  await updateDoc(storeDoc(storeId), {
    productCount: store.productCount + amount,
    updatedAt: serverTimestamp(),
  })
}

// Increment store order count
export async function incrementOrderCount(
  storeId: string,
  amount: number = 1
): Promise<void> {
  const store = await getStoreById(storeId)
  if (!store) throw new Error('Store not found')

  await updateDoc(storeDoc(storeId), {
    orderCount: store.orderCount + amount,
    updatedAt: serverTimestamp(),
  })
}

// Search stores
export async function searchStores(
  searchTerm: string,
  pageSize: number = 20
): Promise<Store[]> {
  // Note: Firestore doesn't support full-text search
  // For production, use Algolia, Typesense, or similar
  // This is a simple prefix search for demo purposes
  const q = query(
    storesRef,
    where('status', '==', 'active'),
    where('name', '>=', searchTerm),
    where('name', '<=', searchTerm + '\uf8ff'),
    limit(pageSize)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Store)
}
