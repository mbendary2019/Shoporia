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
import { db, productsRef, productDoc } from '@/lib/firebase'
import { slugify } from '@/utils/format'
import { incrementProductCount } from './store'
import type { Product, ProductImage, ProductVariant, ProductOption } from '@/types'

// Create a new product
export async function createProduct(
  storeId: string,
  data: Partial<Product>
): Promise<Product> {
  const productId = doc(productsRef).id
  const slug = slugify(data.name || '') + '-' + productId.slice(0, 6)

  const product: Product = {
    id: productId,
    storeId,
    name: data.name || '',
    slug,
    description: data.description || '',
    category: data.category || '',
    price: data.price || 0,
    currency: 'EGP',
    quantity: data.quantity || 0,
    trackInventory: data.trackInventory ?? true,
    images: data.images || [],
    hasVariants: data.hasVariants || false,
    status: 'draft',
    isFeatured: false,
    isDigital: false,
    viewCount: 0,
    soldCount: 0,
    rating: 0,
    reviewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data,
  }

  await setDoc(productDoc(productId), {
    ...product,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  // Increment store product count
  await incrementProductCount(storeId, 1)

  return product
}

// Get product by ID
export async function getProductById(productId: string): Promise<Product | null> {
  const snapshot = await getDoc(productDoc(productId))

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as Product
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(productsRef, where('slug', '==', slug), limit(1))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return null
  }

  return snapshot.docs[0].data() as Product
}

// Get products by store
export async function getProductsByStore(
  storeId: string,
  pageSize: number = 20,
  lastDoc?: DocumentSnapshot
): Promise<{ products: Product[]; lastDoc: DocumentSnapshot | null }> {
  let q = query(
    productsRef,
    where('storeId', '==', storeId),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  )

  if (lastDoc) {
    q = query(q, startAfter(lastDoc))
  }

  const snapshot = await getDocs(q)
  const products = snapshot.docs.map((doc) => doc.data() as Product)
  const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null

  return { products, lastDoc: newLastDoc }
}

// Get active products by store
export async function getActiveProductsByStore(
  storeId: string,
  pageSize: number = 20
): Promise<Product[]> {
  const q = query(
    productsRef,
    where('storeId', '==', storeId),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Product)
}

// Get products by category
export async function getProductsByCategory(
  category: string,
  pageSize: number = 20
): Promise<Product[]> {
  const q = query(
    productsRef,
    where('status', '==', 'active'),
    where('category', '==', category),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Product)
}

// Get featured products
export async function getFeaturedProducts(pageSize: number = 10): Promise<Product[]> {
  const q = query(
    productsRef,
    where('status', '==', 'active'),
    where('isFeatured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Product)
}

// Get best selling products
export async function getBestSellingProducts(pageSize: number = 10): Promise<Product[]> {
  const q = query(
    productsRef,
    where('status', '==', 'active'),
    orderBy('soldCount', 'desc'),
    limit(pageSize)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Product)
}

// Update product
export async function updateProduct(
  productId: string,
  data: Partial<Product>
): Promise<void> {
  await updateDoc(productDoc(productId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

// Update product status
export async function updateProductStatus(
  productId: string,
  status: Product['status']
): Promise<void> {
  await updateDoc(productDoc(productId), {
    status,
    updatedAt: serverTimestamp(),
  })
}

// Update product inventory
export async function updateProductInventory(
  productId: string,
  quantity: number
): Promise<void> {
  const product = await getProductById(productId)
  if (!product) throw new Error('Product not found')

  const newQuantity = product.quantity + quantity
  const status =
    newQuantity <= 0 && product.status === 'active'
      ? 'out_of_stock'
      : product.status === 'out_of_stock' && newQuantity > 0
        ? 'active'
        : product.status

  await updateDoc(productDoc(productId), {
    quantity: newQuantity,
    status,
    updatedAt: serverTimestamp(),
  })
}

// Increment product view count
export async function incrementProductViewCount(productId: string): Promise<void> {
  const product = await getProductById(productId)
  if (!product) return

  await updateDoc(productDoc(productId), {
    viewCount: product.viewCount + 1,
  })
}

// Increment product sold count
export async function incrementProductSoldCount(
  productId: string,
  amount: number = 1
): Promise<void> {
  const product = await getProductById(productId)
  if (!product) return

  await updateDoc(productDoc(productId), {
    soldCount: product.soldCount + amount,
    updatedAt: serverTimestamp(),
  })
}

// Delete product
export async function deleteProduct(productId: string): Promise<void> {
  const product = await getProductById(productId)
  if (!product) throw new Error('Product not found')

  await deleteDoc(productDoc(productId))

  // Decrement store product count
  await incrementProductCount(product.storeId, -1)
}

// Search products
export async function searchProducts(
  searchTerm: string,
  filters?: {
    category?: string
    minPrice?: number
    maxPrice?: number
    storeId?: string
  },
  pageSize: number = 20
): Promise<Product[]> {
  // Note: Firestore doesn't support full-text search
  // For production, use Algolia, Typesense, or similar
  let q = query(
    productsRef,
    where('status', '==', 'active'),
    where('name', '>=', searchTerm),
    where('name', '<=', searchTerm + '\uf8ff'),
    limit(pageSize)
  )

  const snapshot = await getDocs(q)
  let products = snapshot.docs.map((doc) => doc.data() as Product)

  // Apply client-side filters
  if (filters?.category) {
    products = products.filter((p) => p.category === filters.category)
  }
  if (filters?.minPrice !== undefined) {
    products = products.filter((p) => p.price >= filters.minPrice!)
  }
  if (filters?.maxPrice !== undefined) {
    products = products.filter((p) => p.price <= filters.maxPrice!)
  }
  if (filters?.storeId) {
    products = products.filter((p) => p.storeId === filters.storeId)
  }

  return products
}

// Duplicate product
export async function duplicateProduct(productId: string): Promise<Product> {
  const product = await getProductById(productId)
  if (!product) throw new Error('Product not found')

  const newProduct = await createProduct(product.storeId, {
    ...product,
    id: undefined,
    name: `${product.name} (نسخة)`,
    slug: undefined,
    status: 'draft',
    viewCount: 0,
    soldCount: 0,
    rating: 0,
    reviewCount: 0,
  })

  return newProduct
}
