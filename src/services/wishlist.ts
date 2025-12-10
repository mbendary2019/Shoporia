import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db, wishlistRef, wishlistDoc } from '@/lib/firebase'
// Local type definition since WishlistItem is not exported from types
interface WishlistItem {
  id: string
  userId: string
  productId: string
  addedAt: Date
}

// Add item to wishlist
export async function addToWishlist(
  userId: string,
  productId: string
): Promise<WishlistItem> {
  const itemId = `${userId}_${productId}`

  const existingItem = await getWishlistItem(userId, productId)
  if (existingItem) {
    return existingItem
  }

  const item: WishlistItem = {
    id: itemId,
    userId,
    productId,
    addedAt: new Date(),
  }

  await setDoc(wishlistDoc(itemId), {
    ...item,
    addedAt: serverTimestamp(),
  })

  return item
}

// Get wishlist item
export async function getWishlistItem(
  userId: string,
  productId: string
): Promise<WishlistItem | null> {
  const itemId = `${userId}_${productId}`
  const snapshot = await getDoc(wishlistDoc(itemId))

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as WishlistItem
}

// Check if item is in wishlist
export async function isInWishlist(
  userId: string,
  productId: string
): Promise<boolean> {
  const item = await getWishlistItem(userId, productId)
  return !!item
}

// Get user's wishlist
export async function getUserWishlist(userId: string): Promise<WishlistItem[]> {
  const q = query(
    wishlistRef,
    where('userId', '==', userId),
    orderBy('addedAt', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as WishlistItem)
}

// Remove item from wishlist
export async function removeFromWishlist(
  userId: string,
  productId: string
): Promise<void> {
  const itemId = `${userId}_${productId}`
  await deleteDoc(wishlistDoc(itemId))
}

// Toggle wishlist item
export async function toggleWishlist(
  userId: string,
  productId: string
): Promise<{ added: boolean }> {
  const exists = await isInWishlist(userId, productId)

  if (exists) {
    await removeFromWishlist(userId, productId)
    return { added: false }
  } else {
    await addToWishlist(userId, productId)
    return { added: true }
  }
}

// Clear wishlist
export async function clearWishlist(userId: string): Promise<void> {
  const items = await getUserWishlist(userId)

  await Promise.all(
    items.map((item) => deleteDoc(wishlistDoc(item.id)))
  )
}

// Get wishlist count
export async function getWishlistCount(userId: string): Promise<number> {
  const items = await getUserWishlist(userId)
  return items.length
}

// Move item from wishlist to cart (utility function)
export async function moveToCart(
  userId: string,
  productId: string
): Promise<void> {
  // Remove from wishlist - cart addition would be handled by cart store
  await removeFromWishlist(userId, productId)
}
