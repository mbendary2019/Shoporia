'use client'

import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Input } from '@/components/ui'
import { useCartStore } from '@/store'
import { formatCurrency } from '@/utils/format'
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  Tag,
} from 'lucide-react'

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal,
  } = useCartStore()

  const subtotal = getSubtotal()
  const deliveryFee = subtotal > 500 ? 0 : 50
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              سلتك فارغة
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              لم تقم بإضافة أي منتجات للسلة بعد
            </p>
            <Link href="/marketplace">
              <Button className="mt-6">
                <ShoppingBag className="h-4 w-4" />
                تصفح المنتجات
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container-custom">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            سلة التسوق ({getItemCount()} منتج)
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="divide-y divide-gray-200 dark:divide-gray-700">
                {items.map((item) => {
                  const price = item.variant?.price ?? item.product.price
                  const itemTotal = price * item.quantity

                  return (
                    <div key={`${item.product.id}-${item.variant?.id}`} className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                          <ShoppingBag className="h-8 w-8 text-gray-400" />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {item.product.name}
                              </h3>
                              {item.variant && (
                                <p className="mt-1 text-sm text-gray-500">
                                  {Object.entries(item.variant.options || {})
                                    .map(([key, value]) => `${key}: ${value}`)
                                    .join(', ')}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() =>
                                removeItem(item.product.id, item.variant?.id)
                              }
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-4">
                            {/* Quantity */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                    item.variant?.id
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                    item.variant?.id
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Price */}
                            <p className="font-bold text-gray-900 dark:text-white">
                              {formatCurrency(itemTotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Card>

              {/* Clear Cart */}
              <div className="mt-4 flex justify-between">
                <Link href="/marketplace">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4" />
                    متابعة التسوق
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="text-red-600"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4" />
                  إفراغ السلة
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ملخص الطلب
                </h2>

                {/* Coupon */}
                <div className="mt-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="كود الخصم"
                      leftIcon={<Tag className="h-4 w-4" />}
                    />
                    <Button variant="outline">تطبيق</Button>
                  </div>
                </div>

                <div className="mt-6 space-y-3 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      المجموع الفرعي
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      التوصيل
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {deliveryFee === 0 ? 'مجاني' : formatCurrency(deliveryFee)}
                    </span>
                  </div>

                  {subtotal < 500 && (
                    <p className="text-xs text-gray-500">
                      أضف منتجات بقيمة {formatCurrency(500 - subtotal)} للحصول
                      على توصيل مجاني
                    </p>
                  )}
                </div>

                <div className="mt-6 flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    الإجمالي
                  </span>
                  <span className="text-xl font-bold text-primary-500">
                    {formatCurrency(total)}
                  </span>
                </div>

                <Link href="/checkout">
                  <Button className="mt-6 w-full" size="lg">
                    إتمام الشراء
                  </Button>
                </Link>

                {/* Payment Methods */}
                <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <p className="text-center text-xs text-gray-500">
                    نقبل الدفع عبر
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-4">
                    <div className="rounded bg-gray-100 px-3 py-1 text-xs dark:bg-gray-700">
                      نقدي
                    </div>
                    <div className="rounded bg-gray-100 px-3 py-1 text-xs dark:bg-gray-700">
                      فودافون كاش
                    </div>
                    <div className="rounded bg-gray-100 px-3 py-1 text-xs dark:bg-gray-700">
                      انستاباي
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
