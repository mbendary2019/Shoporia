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
  serverTimestamp,
} from 'firebase/firestore'
import { db, couponsRef, couponDoc } from '@/lib/firebase'
import type { Coupon, CouponType } from '@/types'

// Create a coupon
export async function createCoupon(
  storeId: string,
  data: {
    code: string
    type: CouponType
    value: number
    minOrderAmount?: number
    maxDiscount?: number
    usageLimit?: number
    startDate: Date
    endDate: Date
    applicableProducts?: string[]
    applicableCategories?: string[]
  }
): Promise<Coupon> {
  const couponId = doc(couponsRef).id

  const coupon: Coupon = {
    id: couponId,
    storeId,
    code: data.code.toUpperCase(),
    type: data.type,
    value: data.value,
    minOrderAmount: data.minOrderAmount,
    maxDiscount: data.maxDiscount,
    usageLimit: data.usageLimit,
    usedCount: 0,
    startDate: data.startDate,
    endDate: data.endDate,
    isActive: true,
    applicableProducts: data.applicableProducts,
    applicableCategories: data.applicableCategories,
    createdAt: new Date(),
  }

  await setDoc(couponDoc(couponId), {
    ...coupon,
    createdAt: serverTimestamp(),
  })

  return coupon
}

// Get coupon by ID
export async function getCouponById(couponId: string): Promise<Coupon | null> {
  const snapshot = await getDoc(couponDoc(couponId))

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as Coupon
}

// Get coupon by code
export async function getCouponByCode(
  storeId: string,
  code: string
): Promise<Coupon | null> {
  const q = query(
    couponsRef,
    where('storeId', '==', storeId),
    where('code', '==', code.toUpperCase()),
    limit(1)
  )

  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return null
  }

  return snapshot.docs[0].data() as Coupon
}

// Get store coupons
export async function getStoreCoupons(storeId: string): Promise<Coupon[]> {
  const q = query(
    couponsRef,
    where('storeId', '==', storeId),
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => doc.data() as Coupon)
}

// Get active store coupons
export async function getActiveStoreCoupons(storeId: string): Promise<Coupon[]> {
  const now = new Date()

  const q = query(
    couponsRef,
    where('storeId', '==', storeId),
    where('isActive', '==', true),
    where('endDate', '>=', now)
  )

  const snapshot = await getDocs(q)
  return snapshot.docs
    .map((doc) => doc.data() as Coupon)
    .filter((coupon) => new Date(coupon.startDate) <= now)
}

// Validate coupon
export async function validateCoupon(
  storeId: string,
  code: string,
  orderAmount: number,
  productIds?: string[],
  categoryIds?: string[]
): Promise<{
  valid: boolean
  coupon?: Coupon
  discount?: number
  error?: string
}> {
  const coupon = await getCouponByCode(storeId, code)

  if (!coupon) {
    return { valid: false, error: 'كود الخصم غير صالح' }
  }

  // Check if active
  if (!coupon.isActive) {
    return { valid: false, error: 'كود الخصم غير نشط' }
  }

  // Check dates
  const now = new Date()
  if (new Date(coupon.startDate) > now) {
    return { valid: false, error: 'كود الخصم لم يبدأ بعد' }
  }
  if (new Date(coupon.endDate) < now) {
    return { valid: false, error: 'كود الخصم منتهي الصلاحية' }
  }

  // Check usage limit
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, error: 'تم استنفاد كود الخصم' }
  }

  // Check minimum order amount
  if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) {
    return {
      valid: false,
      error: `الحد الأدنى للطلب ${coupon.minOrderAmount} ج.م`,
    }
  }

  // Check applicable products
  if (coupon.applicableProducts && coupon.applicableProducts.length > 0) {
    const hasApplicableProduct = productIds?.some((id) =>
      coupon.applicableProducts!.includes(id)
    )
    if (!hasApplicableProduct) {
      return { valid: false, error: 'كود الخصم لا ينطبق على هذه المنتجات' }
    }
  }

  // Check applicable categories
  if (coupon.applicableCategories && coupon.applicableCategories.length > 0) {
    const hasApplicableCategory = categoryIds?.some((id) =>
      coupon.applicableCategories!.includes(id)
    )
    if (!hasApplicableCategory) {
      return { valid: false, error: 'كود الخصم لا ينطبق على هذه الفئات' }
    }
  }

  // Calculate discount
  let discount = 0
  if (coupon.type === 'percentage') {
    discount = (orderAmount * coupon.value) / 100
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount
    }
  } else {
    discount = coupon.value
    if (discount > orderAmount) {
      discount = orderAmount
    }
  }

  return {
    valid: true,
    coupon,
    discount: Math.round(discount * 100) / 100,
  }
}

// Apply coupon (increment usage)
export async function applyCoupon(couponId: string): Promise<void> {
  const coupon = await getCouponById(couponId)
  if (!coupon) throw new Error('Coupon not found')

  await updateDoc(couponDoc(couponId), {
    usedCount: coupon.usedCount + 1,
  })
}

// Update coupon
export async function updateCoupon(
  couponId: string,
  data: Partial<Coupon>
): Promise<void> {
  await updateDoc(couponDoc(couponId), data)
}

// Toggle coupon status
export async function toggleCouponStatus(couponId: string): Promise<void> {
  const coupon = await getCouponById(couponId)
  if (!coupon) throw new Error('Coupon not found')

  await updateDoc(couponDoc(couponId), {
    isActive: !coupon.isActive,
  })
}

// Delete coupon
export async function deleteCoupon(couponId: string): Promise<void> {
  await deleteDoc(couponDoc(couponId))
}

// Generate random coupon code
export function generateCouponCode(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// Get coupon stats
export async function getCouponStats(storeId: string): Promise<{
  total: number
  active: number
  expired: number
  totalUsage: number
}> {
  const coupons = await getStoreCoupons(storeId)
  const now = new Date()

  return {
    total: coupons.length,
    active: coupons.filter(
      (c) => c.isActive && new Date(c.endDate) >= now
    ).length,
    expired: coupons.filter((c) => new Date(c.endDate) < now).length,
    totalUsage: coupons.reduce((sum, c) => sum + c.usedCount, 0),
  }
}
