'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Input, Textarea, Select } from '@/components/ui'
import { useCartStore, useAuthStore } from '@/store'
import { formatCurrency } from '@/utils/format'
import { GOVERNORATES } from '@/utils/constants'
import { createOrder } from '@/services/order'
import type { OrderItem, Address } from '@/types'
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
  paymentMethod: z.enum(['cash', 'knet', 'bank_transfer']),
})

type CheckoutInput = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const t = useTranslations('checkout')
  const tc = useTranslations('common')
  const tauth = useTranslations('auth')
  const tcart = useTranslations('cart')

  const { user, isAuthenticated } = useAuthStore()
  const { items, getSubtotal, getItemCount, clearCart, storeId: cartStoreId } = useCartStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard')

  const steps = [
    { id: 1, name: t('step.address'), icon: MapPin },
    { id: 2, name: t('step.payment'), icon: CreditCard },
    { id: 3, name: t('step.confirmation'), icon: Check },
  ]

  const paymentMethods = [
    {
      id: 'cash',
      name: t('cashOnDelivery'),
      description: t('cashOnDeliveryDesc'),
      icon: Banknote,
    },
    {
      id: 'knet',
      name: t('knet'),
      description: t('knetDesc'),
      icon: Smartphone,
    },
    {
      id: 'bank_transfer',
      name: t('bankTransfer'),
      description: t('bankTransferDesc'),
      icon: Building2,
    },
  ]

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
    if (!user) return

    try {
      setIsLoading(true)
      setOrderError(null)

      const orderItems: OrderItem[] = items.map((item) => ({
        productId: item.product.id,
        variantId: item.variant?.id,
        name: item.product.name,
        image: item.product.images?.[0]?.url || '',
        quantity: item.quantity,
        price: item.variant?.price ?? item.product.price,
        total: (item.variant?.price ?? item.product.price) * item.quantity,
        options: item.variant?.options,
      }))

      const deliveryAddress: Address = {
        id: crypto.randomUUID(),
        label: t('addressLabel'),
        fullName: data.fullName,
        phone: data.phone,
        street: data.street,
        city: data.city,
        governorate: data.governorate,
        isDefault: false,
      }

      const storeId = cartStoreId || items[0]?.product.storeId || ''

      await createOrder(
        user.id,
        storeId,
        orderItems,
        deliveryAddress,
        data.paymentMethod,
        {
          deliveryMethod,
          deliveryNotes: data.notes,
        }
      )

      clearCart()
      router.push('/checkout/success')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'حدث خطأ أثناء إنشاء الطلب'
      setOrderError(message)
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
              {t('cartEmpty')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('cartEmptyDescription')}
            </p>
            <Link href="/marketplace">
              <Button className="mt-6">{tc('browseProducts')}</Button>
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
              {tauth('loginRequired')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {tauth('loginRequiredDescription')}
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/login?redirect=/checkout" className="flex-1">
                <Button variant="outline" className="w-full">
                  {tauth('login')}
                </Button>
              </Link>
              <Link href="/register?redirect=/checkout" className="flex-1">
                <Button className="w-full">{tauth('createAccount')}</Button>
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
            {t('backToCart')}
          </Link>

          <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            {t('title')}
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
                      {t('deliveryAddress')}
                    </h2>

                    <div className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input
                          label={t('fullName')}
                          placeholder={t('fullNamePlaceholder')}
                          leftIcon={<User className="h-5 w-5" />}
                          error={errors.fullName?.message}
                          {...register('fullName')}
                        />

                        <Input
                          label={tauth('phone')}
                          type="tel"
                          placeholder="5xxxxxxx"
                          leftIcon={<Phone className="h-5 w-5" />}
                          error={errors.phone?.message}
                          {...register('phone')}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Select
                          label={t('governorate')}
                          placeholder={t('governoratePlaceholder')}
                          options={GOVERNORATES.map((gov) => ({
                            value: gov.id,
                            label: gov.name,
                            labelAr: gov.nameAr,
                          }))}
                          error={errors.governorate?.message}
                          {...register('governorate')}
                        />

                        <Input
                          label={t('cityArea')}
                          placeholder="مثال: السالمية"
                          error={errors.city?.message}
                          {...register('city')}
                        />
                      </div>

                      <Input
                        label={t('detailedAddress')}
                        placeholder={t('detailedAddressPlaceholder')}
                        leftIcon={<MapPin className="h-5 w-5" />}
                        error={errors.street?.message}
                        {...register('street')}
                      />

                      <div className="grid gap-4 sm:grid-cols-3">
                        <Input
                          label={t('building')}
                          placeholder={t('buildingPlaceholder')}
                          leftIcon={<Building className="h-5 w-5" />}
                          {...register('building')}
                        />

                        <Input
                          label={t('floor')}
                          placeholder={t('floorPlaceholder')}
                          {...register('floor')}
                        />

                        <Input
                          label={t('apartment')}
                          placeholder={t('apartmentPlaceholder')}
                          leftIcon={<Home className="h-5 w-5" />}
                          {...register('apartment')}
                        />
                      </div>

                      <Textarea
                        label={t('deliveryNotes')}
                        placeholder={t('deliveryNotesPlaceholder')}
                        rows={3}
                        {...register('notes')}
                      />

                      {/* Delivery Method */}
                      <div>
                        <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('deliveryMethod')}
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
                                  {t('standardDelivery')}
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {subtotal > 500 ? tc('free') : formatCurrency(50)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {t('standardDeliveryTime')}
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
                                  {t('expressDelivery')}
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {formatCurrency(75)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {t('expressDeliveryTime')}
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
                      {t('paymentMethod')}
                    </h2>

                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setValue('paymentMethod', method.id as CheckoutInput['paymentMethod'])}
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
                    {watchedValues.paymentMethod === 'knet' && (
                      <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                        <h4 className="font-medium text-blue-700 dark:text-blue-400">
                          {t('knetInstructions')}
                        </h4>
                        <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                          {t('knetInstructionsDesc')}
                        </p>
                      </div>
                    )}

                    {watchedValues.paymentMethod === 'bank_transfer' && (
                      <div className="mt-6 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                        <h4 className="font-medium text-green-700 dark:text-green-400">
                          {t('bankTransferInstructions')}
                        </h4>
                        <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                          {t('bankTransferInstructionsDesc')}
                        </p>
                      </div>
                    )}
                  </Card>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                  <Card className="p-6">
                    <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                      {t('reviewOrder')}
                    </h2>

                    {/* Address Summary */}
                    <div className="mb-6 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {t('deliveryAddress')}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-sm text-primary-500 hover:underline"
                        >
                          {tc('edit')}
                        </button>
                      </div>
                      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {watchedValues.fullName}
                        </p>
                        <p>{watchedValues.phone}</p>
                        <p className="mt-1">
                          {watchedValues.street}
                          {watchedValues.building && `, ${t('buildingLabel')} ${watchedValues.building}`}
                          {watchedValues.floor && `, ${t('floorLabel')} ${watchedValues.floor}`}
                          {watchedValues.apartment && `, ${t('apartmentLabel')} ${watchedValues.apartment}`}
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
                          {t('paymentMethod')}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="text-sm text-primary-500 hover:underline"
                        >
                          {tc('edit')}
                        </button>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {paymentMethods.find(m => m.id === watchedValues.paymentMethod)?.name}
                      </p>
                    </div>

                    {/* Items */}
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700">
                      <h3 className="border-b border-gray-200 p-4 font-medium text-gray-900 dark:border-gray-700 dark:text-white">
                        {tc('products')} ({getItemCount()})
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
                                  {/* TODO: add translation key for "الكمية:" */}
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
                          {/* TODO: add translation key for full terms acceptance text */}
                          أوافق على{' '}
                          <Link href="/terms" className="text-primary-500 hover:underline">
                            {t('termsOfUse')}
                          </Link>{' '}
                          و{' '}
                          <Link href="/privacy" className="text-primary-500 hover:underline">
                            {tauth('privacyPolicy')}
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
                    {tc('previous')}
                  </Button>

                  {currentStep < steps.length ? (
                    <Button type="button" onClick={nextStep}>
                      {tc('next')}
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" isLoading={isLoading}>
                      {t('placeOrder')}
                    </Button>
                  )}
                </div>

                {orderError && (
                  <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                    {orderError}
                  </div>
                )}
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <Card className="sticky top-24 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('orderSummary')}
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
                      {tc('moreItems', { count: items.length - 3 })}
                    </p>
                  )}
                </div>

                <div className="mt-6 space-y-3 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{tcart('subtotal')}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{tcart('delivery')}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">{tc('free')}</span>
                      ) : (
                        formatCurrency(deliveryFee)
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {tcart('total')}
                  </span>
                  <span className="text-xl font-bold text-primary-500">
                    {formatCurrency(total)}
                  </span>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 flex items-center justify-center gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Shield className="h-4 w-4" />
                    {t('securePayment')}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Truck className="h-4 w-4" />
                    {t('fastDelivery')}
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
