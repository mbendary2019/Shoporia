'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Input, Textarea, Select } from '@/components/ui'
import { useCartStore, useAuthStore } from '@/store'
import { formatCurrency } from '@/utils/format'
import { GOVERNORATES } from '@/utils/constants'
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Truck,
  Check,
  ChevronLeft,
  ChevronRight,
  Phone,
  User,
  Building,
  Home,
  Banknote,
  Smartphone,
  Building2,
  Package,
  Shield,
  ArrowLeft,
} from 'lucide-react'

const checkoutSchema = z.object({
  // Delivery Address
  fullName: z.string().min(3, 'الاسم مطلوب'),
  phone: z.string().min(10, 'رقم الهاتف مطلوب'),
  governorate: z.string().min(1, 'المحافظة مطلوبة'),
  city: z.string().min(2, 'المدينة مطلوبة'),
  street: z.string().min(5, 'العنوان التفصيلي مطلوب'),
  building: z.string().optional(),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  notes: z.string().optional(),
  // Payment
  paymentMethod: z.enum(['cash', 'vodafone_cash', 'instapay', 'fawry']),
})

type CheckoutInput = z.infer<typeof checkoutSchema>

const steps = [
  { id: 1, name: 'العنوان', icon: MapPin },
  { id: 2, name: 'الدفع', icon: CreditCard },
  { id: 3, name: 'التأكيد', icon: Check },
]

const paymentMethods = [
  {
    id: 'cash',
    name: 'الدفع عند الاستلام',
    description: 'ادفع نقداً عند استلام طلبك',
    icon: Banknote,
  },
  {
    id: 'vodafone_cash',
    name: 'فودافون كاش',
    description: 'ادفع عبر محفظة فودافون كاش',
    icon: Smartphone,
  },
  {
    id: 'instapay',
    name: 'انستاباي',
    description: 'تحويل بنكي فوري عبر انستاباي',
    icon: Building2,
  },
  {
    id: 'fawry',
    name: 'فوري',
    description: 'ادفع في أي فرع فوري',
    icon: Building,
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const { items, getSubtotal, getItemCount, clearCart } = useCartStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.displayName || '',
      phone: user?.phone || '',
      paymentMethod: 'cash',
    },
  })

  const watchedValues = watch()
  const subtotal = getSubtotal()
  const deliveryFee = deliveryMethod === 'express' ? 75 : subtotal > 500 ? 0 : 50
  const total = subtotal + deliveryFee

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: CheckoutInput) => {
    try {
      setIsLoading(true)
      console.log('Order data:', {
        ...data,
        items,
        subtotal,
        deliveryFee,
        total,
        deliveryMethod,
      })
      // TODO: Create order in Firestore
      clearCart()
      router.push('/checkout/success')
    } catch (error) {
      console.error('Error creating order:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
              السلة فارغة
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              أضف منتجات للسلة لإتمام الطلب
            </p>
            <Link href="/marketplace">
              <Button className="mt-6">تصفح المنتجات</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
          <Card className="mx-4 max-w-md p-8 text-center">
            <User className="mx-auto h-16 w-16 text-primary-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
              سجل دخولك لإتمام الطلب
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              يجب تسجيل الدخول أولاً لإكمال عملية الشراء
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/login?redirect=/checkout" className="flex-1">
                <Button variant="outline" className="w-full">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link href="/register?redirect=/checkout" className="flex-1">
                <Button className="w-full">إنشاء حساب</Button>
              </Link>
            </div>
          </Card>
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
          {/* Back Link */}
          <Link
            href="/cart"
            className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-primary-500 dark:text-gray-400"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة للسلة
          </Link>

          <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            إتمام الطلب
          </h1>

          {/* Progress Steps */}
          <nav className="mb-8">
            <ol className="flex items-center justify-center">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        step.id < currentStep
                          ? 'bg-primary-500 text-white'
                          : step.id === currentStep
                            ? 'border-2 border-primary-500 bg-white text-primary-500 dark:bg-gray-800'
                            : 'border-2 border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-gray-800'
                      }`}
                    >
                      {step.id < currentStep ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <step.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={`ms-3 text-sm font-medium ${
                        step.id <= currentStep
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-4 h-0.5 w-16 sm:w-24 ${
                        step.id < currentStep
                          ? 'bg-primary-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Step 1: Address */}
                {currentStep === 1 && (
                  <Card className="p-6">
                    <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                      عنوان التوصيل
                    </h2>

                    <div className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                          label="الاسم بالكامل"
                          placeholder="الاسم الأول والأخير"
                          leftIcon={<User className="h-5 w-5" />}
                          error={errors.fullName?.message}
                          {...register('fullName')}
                        />

                        <Input
                          label="رقم الهاتف"
                          type="tel"
                          placeholder="01xxxxxxxxx"
                          leftIcon={<Phone className="h-5 w-5" />}
                          error={errors.phone?.message}
                          {...register('phone')}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Select
                          label="المحافظة"
                          placeholder="اختر المحافظة"
                          options={GOVERNORATES.map((gov) => ({
                            value: gov.id,
                            label: gov.name,
                            labelAr: gov.nameAr,
                          }))}
                          error={errors.governorate?.message}
                          {...register('governorate')}
                        />

                        <Input
                          label="المدينة / المنطقة"
                          placeholder="مثال: مدينة نصر"
                          error={errors.city?.message}
                          {...register('city')}
                        />
                      </div>

                      <Input
                        label="العنوان التفصيلي"
                        placeholder="اسم الشارع، رقم المبنى..."
                        leftIcon={<MapPin className="h-5 w-5" />}
                        error={errors.street?.message}
                        {...register('street')}
                      />

                      <div className="grid gap-4 sm:grid-cols-3">
                        <Input
                          label="المبنى (اختياري)"
                          placeholder="رقم/اسم المبنى"
                          leftIcon={<Building className="h-5 w-5" />}
                          {...register('building')}
                        />

                        <Input
                          label="الطابق (اختياري)"
                          placeholder="رقم الطابق"
                          {...register('floor')}
                        />

                        <Input
                          label="الشقة (اختياري)"
                          placeholder="رقم الشقة"
                          leftIcon={<Home className="h-5 w-5" />}
                          {...register('apartment')}
                        />
                      </div>

                      <Textarea
                        label="ملاحظات التوصيل (اختياري)"
                        placeholder="أي تعليمات إضافية للمندوب..."
                        rows={3}
                        {...register('notes')}
                      />

                      {/* Delivery Method */}
                      <div>
                        <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          طريقة التوصيل
                        </label>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <button
                            type="button"
                            onClick={() => setDeliveryMethod('standard')}
                            className={`flex items-start gap-4 rounded-lg border p-4 text-start transition-colors ${
                              deliveryMethod === 'standard'
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
                            }`}
                          >
                            <div className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${
                              deliveryMethod === 'standard'
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}>
                              {deliveryMethod === 'standard' && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900 dark:text-white">
                                  توصيل عادي
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {subtotal > 500 ? 'مجاني' : formatCurrency(50)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                3-5 أيام عمل
                              </p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeliveryMethod('express')}
                            className={`flex items-start gap-4 rounded-lg border p-4 text-start transition-colors ${
                              deliveryMethod === 'express'
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
                            }`}
                          >
                            <div className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${
                              deliveryMethod === 'express'
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}>
                              {deliveryMethod === 'express' && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900 dark:text-white">
                                  توصيل سريع
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {formatCurrency(75)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                1-2 يوم عمل
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Step 2: Payment */}
                {currentStep === 2 && (
                  <Card className="p-6">
                    <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                      طريقة الدفع
                    </h2>

                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setValue('paymentMethod', method.id as any)}
                          className={`flex w-full items-start gap-4 rounded-lg border p-4 text-start transition-colors ${
                            watchedValues.paymentMethod === method.id
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
                          }`}
                        >
                          <div className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${
                            watchedValues.paymentMethod === method.id
                              ? 'border-primary-500 bg-primary-500'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {watchedValues.paymentMethod === method.id && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>

                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                            <method.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          </div>

                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {method.name}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {method.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Payment Instructions */}
                    {watchedValues.paymentMethod === 'vodafone_cash' && (
                      <div className="mt-6 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                        <h4 className="font-medium text-red-700 dark:text-red-400">
                          تعليمات فودافون كاش
                        </h4>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                          بعد إتمام الطلب، قم بتحويل المبلغ إلى الرقم: <strong>01012345678</strong>
                          <br />
                          ثم أرسل صورة إيصال التحويل عبر واتساب
                        </p>
                      </div>
                    )}

                    {watchedValues.paymentMethod === 'instapay' && (
                      <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                        <h4 className="font-medium text-blue-700 dark:text-blue-400">
                          تعليمات انستاباي
                        </h4>
                        <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                          بعد إتمام الطلب، قم بالتحويل إلى: <strong>shoporia@instapay</strong>
                          <br />
                          سيتم تأكيد طلبك تلقائياً بعد استلام المبلغ
                        </p>
                      </div>
                    )}

                    {watchedValues.paymentMethod === 'fawry' && (
                      <div className="mt-6 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                        <h4 className="font-medium text-yellow-700 dark:text-yellow-400">
                          تعليمات فوري
                        </h4>
                        <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
                          بعد إتمام الطلب، ستحصل على رقم مرجعي للدفع في أي فرع فوري خلال 48 ساعة
                        </p>
                      </div>
                    )}
                  </Card>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                  <Card className="p-6">
                    <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                      مراجعة الطلب
                    </h2>

                    {/* Address Summary */}
                    <div className="mb-6 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          عنوان التوصيل
                        </h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-sm text-primary-500 hover:underline"
                        >
                          تعديل
                        </button>
                      </div>
                      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {watchedValues.fullName}
                        </p>
                        <p>{watchedValues.phone}</p>
                        <p className="mt-1">
                          {watchedValues.street}
                          {watchedValues.building && `, مبنى ${watchedValues.building}`}
                          {watchedValues.floor && `, طابق ${watchedValues.floor}`}
                          {watchedValues.apartment && `, شقة ${watchedValues.apartment}`}
                        </p>
                        <p>
                          {watchedValues.city}, {GOVERNORATES.find(g => g.id === watchedValues.governorate)?.nameAr}
                        </p>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="mb-6 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          طريقة الدفع
                        </h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="text-sm text-primary-500 hover:underline"
                        >
                          تعديل
                        </button>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {paymentMethods.find(m => m.id === watchedValues.paymentMethod)?.name}
                      </p>
                    </div>

                    {/* Items */}
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700">
                      <h3 className="border-b border-gray-200 p-4 font-medium text-gray-900 dark:border-gray-700 dark:text-white">
                        المنتجات ({getItemCount()})
                      </h3>
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {items.map((item) => {
                          const price = item.variant?.price ?? item.product.price
                          return (
                            <div
                              key={`${item.product.id}-${item.variant?.id}`}
                              className="flex items-center gap-4 p-4"
                            >
                              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                <Package className="h-6 w-6 text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {item.product.name}
                                </p>
                                {item.variant && (
                                  <p className="text-sm text-gray-500">
                                    {Object.values(item.variant.options || {}).join(' / ')}
                                  </p>
                                )}
                                <p className="text-sm text-gray-500">
                                  الكمية: {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {formatCurrency(price * item.quantity)}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="mt-6">
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                          required
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          أوافق على{' '}
                          <Link href="/terms" className="text-primary-500 hover:underline">
                            شروط الاستخدام
                          </Link>{' '}
                          و{' '}
                          <Link href="/privacy" className="text-primary-500 hover:underline">
                            سياسة الخصوصية
                          </Link>
                        </span>
                      </label>
                    </div>
                  </Card>
                )}

                {/* Navigation Buttons */}
                <div className="mt-6 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                    السابق
                  </Button>

                  {currentStep < steps.length ? (
                    <Button type="button" onClick={nextStep}>
                      التالي
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" isLoading={isLoading}>
                      تأكيد الطلب
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <Card className="sticky top-24 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ملخص الطلب
                </h2>

                <div className="mt-6 space-y-4">
                  {items.slice(0, 3).map((item) => {
                    const price = item.variant?.price ?? item.product.price
                    return (
                      <div
                        key={`${item.product.id}-${item.variant?.id}`}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                          <Package className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-500">x{item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(price * item.quantity)}
                        </p>
                      </div>
                    )
                  })}

                  {items.length > 3 && (
                    <p className="text-sm text-gray-500 text-center">
                      +{items.length - 3} منتجات أخرى
                    </p>
                  )}
                </div>

                <div className="mt-6 space-y-3 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">المجموع الفرعي</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">التوصيل</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">مجاني</span>
                      ) : (
                        formatCurrency(deliveryFee)
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    الإجمالي
                  </span>
                  <span className="text-xl font-bold text-primary-500">
                    {formatCurrency(total)}
                  </span>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 flex items-center justify-center gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Shield className="h-4 w-4" />
                    دفع آمن
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Truck className="h-4 w-4" />
                    توصيل سريع
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
