import { NextRequest, NextResponse } from 'next/server'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { COLLECTIONS } from '@/lib/firebase/collections'

// POST /api/coupons/validate - Validate a coupon code
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, storeId, orderTotal, productIds } = body

    if (!code || !storeId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find the coupon
    const q = query(
      collection(db, COLLECTIONS.COUPONS),
      where('storeId', '==', storeId),
      where('code', '==', code.toUpperCase())
    )
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return NextResponse.json({
        success: false,
        error: 'كود الكوبون غير صالح',
        valid: false,
      })
    }

    const coupon = {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    } as any

    // Check if coupon is active
    if (coupon.status !== 'active') {
      return NextResponse.json({
        success: false,
        error: 'الكوبون غير نشط',
        valid: false,
      })
    }

    // Check start date
    if (coupon.startDate && new Date(coupon.startDate) > new Date()) {
      return NextResponse.json({
        success: false,
        error: 'الكوبون لم يبدأ بعد',
        valid: false,
      })
    }

    // Check end date
    if (coupon.endDate && new Date(coupon.endDate) < new Date()) {
      return NextResponse.json({
        success: false,
        error: 'انتهت صلاحية الكوبون',
        valid: false,
      })
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json({
        success: false,
        error: 'تم استنفاد عدد مرات استخدام الكوبون',
        valid: false,
      })
    }

    // Check minimum order
    if (orderTotal && coupon.minOrder && orderTotal < coupon.minOrder) {
      return NextResponse.json({
        success: false,
        error: `الحد الأدنى للطلب ${coupon.minOrder} جنيه`,
        valid: false,
      })
    }

    // Check product restrictions
    if (
      coupon.products !== 'all' &&
      Array.isArray(coupon.products) &&
      productIds
    ) {
      const hasValidProduct = productIds.some((id: string) =>
        coupon.products.includes(id)
      )
      if (!hasValidProduct) {
        return NextResponse.json({
          success: false,
          error: 'الكوبون غير صالح للمنتجات المحددة',
          valid: false,
        })
      }
    }

    // Calculate discount
    let discountAmount = 0
    if (coupon.type === 'percentage') {
      discountAmount = (orderTotal * coupon.value) / 100
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount
      }
    } else {
      discountAmount = coupon.value
    }

    return NextResponse.json({
      success: true,
      valid: true,
      data: {
        couponId: coupon.id,
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discountAmount,
        message: `تم تطبيق الكوبون بنجاح! خصم ${discountAmount} جنيه`,
      },
    })
  } catch (error) {
    console.error('Error validating coupon:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to validate coupon' },
      { status: 500 }
    )
  }
}
