'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Header, Footer } from '@/components/layout'
import { Button, Input, Textarea, Select, Card } from '@/components/ui'
import { storeSchema, type StoreInput } from '@/lib/validations'
import { STORE_CATEGORIES, GOVERNORATES } from '@/utils/constants'
import { useAuthStore } from '@/store'
import { createStore } from '@/services/store'
import { updateDoc } from 'firebase/firestore'
import { userDoc } from '@/lib/firebase'
import type { StoreCategory } from '@/types'
import { useTranslations } from 'next-intl'
import {
  Store,
  Sparkles,
  Upload,
  ChevronLeft,
  ChevronRight,
  Check,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'

export default function SellerRegisterPage() {
  const t = useTranslations('seller')
  const tc = useTranslations('common')
  const ta = useTranslations('auth')
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const steps = [
    { id: 1, name: t('step1Name'), description: t('step1Description') },
    { id: 2, name: t('step2Name'), description: t('step2Description') },
    { id: 3, name: t('step3Name'), description: t('step3Description') },
    { id: 4, name: t('step4Name'), description: t('step4Description') },
  ]

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<StoreInput>({
    resolver: zodResolver(storeSchema),
    mode: 'onChange',
  })

  const watchedValues = watch()

  const handleAIGenerate = async (field: 'name' | 'description') => {
    setIsGeneratingAI(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (field === 'name') {
      setValue('name', 'متجر الإبداع والتميز')
    } else {
      setValue(
        'description',
        'متجر متخصص في تقديم أفضل المنتجات بجودة عالية وأسعار منافسة. نسعى دائماً لتلبية احتياجات عملائنا وتقديم تجربة تسوق مميزة.'
      )
    }
    setIsGeneratingAI(false)
  }

  const onSubmit = async (data: StoreInput) => {
    if (!user) return

    try {
      setIsLoading(true)
      setSubmitError(null)

      const store = await createStore(user.id, {
        name: data.name,
        description: data.description,
        category: data.category as StoreCategory,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
        governorate: data.governorate,
        city: data.city,
        address: data.address,
      })

      // Update user role to seller and link store
      await updateDoc(userDoc(user.id), {
        role: 'seller',
        storeId: store.id,
      })

      router.push('/dashboard')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'حدث خطأ أثناء إنشاء المتجر'
      setSubmitError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = async () => {
    // Validate fields for current step before proceeding
    let fieldsToValidate: (keyof StoreInput)[] = []

    if (currentStep === 1) {
      fieldsToValidate = ['name', 'category', 'description']
    } else if (currentStep === 2) {
      fieldsToValidate = ['phone']
    }

    const isValid = await trigger(fieldsToValidate)

    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <Card className="mx-4 max-w-md p-8 text-center">
            <Store className="mx-auto h-16 w-16 text-primary-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
              {t('loginFirst')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('loginFirstDescription')}
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full">
                  {ta('login')}
                </Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button className="w-full">{ta('createAccount')}</Button>
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

      <main className="flex-1 bg-gray-50 py-12 dark:bg-gray-900">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('registerTitle')}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {t('registerSubtitle')}
              </p>
            </div>

            {/* Progress Steps */}
            <nav className="mt-8">
              <ol className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <li key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center ${
                        index < steps.length - 1 ? 'flex-1' : ''
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
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
                          step.id
                        )}
                      </div>
                      <div className="ms-3 hidden sm:block">
                        <p
                          className={`text-sm font-medium ${
                            step.id <= currentStep
                              ? 'text-gray-900 dark:text-white'
                              : 'text-gray-400'
                          }`}
                        >
                          {step.name}
                        </p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`mx-4 hidden h-0.5 w-16 sm:block ${
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

            {/* Form */}
            <Card className="mt-8 p-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Step 1: Store Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('storeNameLabel')}
                        </label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAIGenerate('name')}
                          disabled={isGeneratingAI}
                        >
                          <Sparkles className="h-4 w-4" />
                          {isGeneratingAI ? tc('generating') : tc('aiSuggestName') || 'اقتراح AI'}
                        </Button>
                      </div>
                      <Input
                        placeholder={t('storeNamePlaceholder')}
                        error={errors.name?.message}
                        {...register('name')}
                      />
                    </div>

                    <Select
                      label={t('storeCategoryLabel')}
                      placeholder={t('storeCategoryPlaceholder')}
                      options={STORE_CATEGORIES.map((cat) => ({
                        value: cat.id,
                        label: cat.name,
                        labelAr: cat.nameAr,
                      }))}
                      error={errors.category?.message}
                      {...register('category')}
                    />

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('storeDescriptionLabel')}
                        </label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAIGenerate('description')}
                          disabled={isGeneratingAI}
                        >
                          <Sparkles className="h-4 w-4" />
                          {isGeneratingAI ? tc('generating') : tc('aiWriteDescription') || 'كتابة AI'}
                        </Button>
                      </div>
                      <Textarea
                        placeholder={t('storeDescriptionPlaceholder')}
                        rows={4}
                        error={errors.description?.message}
                        {...register('description')}
                      />
                    </div>

                    {/* Logo Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('storeLogo')}
                      </label>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
                          <Store className="h-8 w-8 text-gray-400" />
                        </div>
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="h-4 w-4" />
                          {t('uploadImage')}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Info */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <Input
                      label={ta('phone')}
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      leftIcon={<Phone className="h-5 w-5" />}
                      error={errors.phone?.message}
                      {...register('phone')}
                    />

                    <Input
                      label={t('whatsappOptional')}
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      leftIcon={<Phone className="h-5 w-5" />}
                      error={errors.whatsapp?.message}
                      {...register('whatsapp')}
                    />

                    <Input
                      label={t('emailOptional')}
                      type="email"
                      placeholder="store@example.com"
                      leftIcon={<Mail className="h-5 w-5" />}
                      error={errors.email?.message}
                      {...register('email')}
                    />

                    <Select
                      label={tc('governorate') || 'المحافظة'}
                      placeholder={tc('governoratePlaceholder') || 'اختر المحافظة'}
                      options={GOVERNORATES.map((gov) => ({
                        value: gov.id,
                        label: gov.name,
                        labelAr: gov.nameAr,
                      }))}
                      error={errors.governorate?.message}
                      {...register('governorate')}
                    />

                    <Input
                      label={t('city')}
                      placeholder="مثال: مدينة نصر"
                      error={errors.city?.message}
                      {...register('city')}
                    />

                    <Textarea
                      label={t('detailedAddress')}
                      placeholder={t('detailedAddressPlaceholder')}
                      error={errors.address?.message}
                      {...register('address')}
                    />
                  </div>
                )}

                {/* Step 3: Documents */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                      <p>
                        <strong>{t('documentsNote').split(':')[0]}:</strong> {t('documentsNote').includes(':') ? t('documentsNote').split(':').slice(1).join(':') : t('documentsNote')}
                      </p>
                    </div>

                    {/* National ID */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('nationalIdPhoto')}
                      </label>
                      <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 dark:border-gray-600">
                        <div className="text-center">
                          <Upload className="mx-auto h-10 w-10 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {t('dragImageOr')}{' '}
                            <button
                              type="button"
                              className="text-primary-500 hover:underline"
                            >
                              {t('browse')}
                            </button>
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {t('maxImageSize5')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Commercial Register */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('commercialRegister')}
                      </label>
                      <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 dark:border-gray-600">
                        <div className="text-center">
                          <Upload className="mx-auto h-10 w-10 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {t('dragImageOr')}{' '}
                            <button
                              type="button"
                              className="text-primary-500 hover:underline"
                            >
                              {t('browse')}
                            </button>
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {t('maxDocSize10')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t('reviewStoreData')}
                    </h3>

                    <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700">
                      <div className="p-4">
                        <p className="text-sm text-gray-500">{t('storeNameLabel')}</p>
                        <p className="mt-1 font-medium text-gray-900 dark:text-white">
                          {watchedValues.name || '-'}
                        </p>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-500">{t('storeCategoryLabel')}</p>
                        <p className="mt-1 font-medium text-gray-900 dark:text-white">
                          {STORE_CATEGORIES.find(
                            (c) => c.id === watchedValues.category
                          )?.nameAr || '-'}
                        </p>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-500">{t('storeDescriptionLabel')}</p>
                        <p className="mt-1 font-medium text-gray-900 dark:text-white">
                          {watchedValues.description || '-'}
                        </p>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-500">{ta('phone')}</p>
                        <p className="mt-1 font-medium text-gray-900 dark:text-white">
                          {watchedValues.phone || '-'}
                        </p>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-500">{t('city')}</p>
                        <p className="mt-1 font-medium text-gray-900 dark:text-white">
                          {watchedValues.city && watchedValues.governorate
                            ? `${watchedValues.city}, ${GOVERNORATES.find((g) => g.id === watchedValues.governorate)?.nameAr}`
                            : '-'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        أوافق على{' '}
                        <Link
                          href="/seller/terms"
                          className="text-primary-500 hover:underline"
                        >
                          {t('sellerTerms')}
                        </Link>{' '}
                        و{' '}
                        <Link
                          href="/seller/policy"
                          className="text-primary-500 hover:underline"
                        >
                          {t('sellerPolicy')}
                        </Link>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
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
                      {t('createStore')}
                    </Button>
                  )}
                </div>

                {submitError && (
                  <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                    {submitError}
                  </div>
                )}
              </form>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
