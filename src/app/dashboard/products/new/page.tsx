'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, Button, Input, Textarea, Select, Badge } from '@/components/ui'
import { productWithVariantsSchema, type ProductWithVariantsInput } from '@/lib/validations'
import { STORE_CATEGORIES } from '@/utils/constants'
import { createProduct } from '@/services/product'
import { useAuthStore } from '@/store'
import { getStoreByOwnerId } from '@/services/store'
import { useImageUpload } from '@/hooks/use-image-upload'
import {
  ArrowRight,
  Save,
  Image as ImageIcon,
  Plus,
  X,
  Sparkles,
  Package,
  DollarSign,
  Layers,
  Tag,
  Upload,
  Trash2,
} from 'lucide-react'

export default function NewProductPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'basic' | 'pricing' | 'inventory' | 'variants'>('basic')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const { uploadMultiple, isUploading, progress, error: uploadError, clearError } = useImageUpload({
    folder: 'products',
    maxSizeMB: 5,
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductWithVariantsInput>({
    resolver: zodResolver(productWithVariantsSchema),
    defaultValues: {
      status: 'draft',
      trackInventory: true,
      hasVariants: false,
      quantity: 0,
      price: 0,
      images: [],
    },
  })

  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: 'options',
  })

  const watchedValues = watch()

  const handleAIGenerate = async (field: 'name' | 'description') => {
    setIsGeneratingAI(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (field === 'name') {
      setValue('name', 'قميص قطن رجالي فاخر')
    } else {
      setValue(
        'description',
        'قميص رجالي مصنوع من أجود أنواع القطن المصري 100%. تصميم عصري وأنيق يناسب جميع المناسبات. متوفر بعدة مقاسات وألوان. سهل الغسيل والكي ويحافظ على شكله ولونه لفترة طويلة.'
      )
    }
    setIsGeneratingAI(false)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    clearError()
    const remaining = 10 - uploadedImages.length
    const selectedFiles = Array.from(files).slice(0, remaining)

    const results = await uploadMultiple(selectedFiles)
    if (results.length > 0) {
      setUploadedImages((prev) => [...prev, ...results.map((r) => r.url)])
    }

    e.target.value = ''
  }

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ProductWithVariantsInput) => {
    if (!user) return

    try {
      setIsLoading(true)
      setSubmitError(null)

      // Get seller's store
      const store = await getStoreByOwnerId(user.id)
      if (!store) {
        setSubmitError('لم يتم العثور على متجرك. يرجى إنشاء متجر أولاً.')
        return
      }

      await createProduct(store.id, {
        name: data.name,
        description: data.description,
        shortDescription: data.shortDescription,
        category: data.category,
        subcategory: data.subcategory,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        costPrice: data.costPrice,
        quantity: data.quantity,
        trackInventory: data.trackInventory,
        sku: data.sku,
        barcode: data.barcode,
        lowStockThreshold: data.lowStockThreshold,
        hasVariants: data.hasVariants,
        status: data.status as 'draft' | 'active',
        isFeatured: data.isFeatured,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        images: uploadedImages.map((url, i) => ({
          id: crypto.randomUUID(),
          url,
          order: i,
        })),
      })

      router.push('/dashboard/products')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'حدث خطأ أثناء إنشاء المنتج'
      setSubmitError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'basic', label: 'المعلومات الأساسية', icon: Package },
    { id: 'pricing', label: 'التسعير', icon: DollarSign },
    { id: 'inventory', label: 'المخزون', icon: Layers },
    { id: 'variants', label: 'المتغيرات', icon: Tag },
  ]

  return (
    <div className="space-y-6">
      {submitError && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {submitError}
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/products"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              إضافة منتج جديد
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              أضف منتج جديد لمتجرك
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" type="button">
            حفظ كمسودة
          </Button>
          <Button onClick={handleSubmit(onSubmit)} isLoading={isLoading}>
            <Save className="h-4 w-4" />
            حفظ ونشر
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <Card className="p-1">
              <div className="flex gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  المعلومات الأساسية
                </h2>

                <div className="space-y-6">
                  {/* Product Name */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        اسم المنتج
                      </label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAIGenerate('name')}
                        disabled={isGeneratingAI}
                      >
                        <Sparkles className="h-4 w-4" />
                        {isGeneratingAI ? 'جاري التوليد...' : 'اقتراح AI'}
                      </Button>
                    </div>
                    <Input
                      placeholder="مثال: قميص قطن رجالي"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        وصف المنتج
                      </label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAIGenerate('description')}
                        disabled={isGeneratingAI}
                      >
                        <Sparkles className="h-4 w-4" />
                        {isGeneratingAI ? 'جاري التوليد...' : 'كتابة AI'}
                      </Button>
                    </div>
                    <Textarea
                      placeholder="اكتب وصفاً تفصيلياً للمنتج..."
                      rows={5}
                      error={errors.description?.message}
                      {...register('description')}
                    />
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      وصف مختصر (اختياري)
                    </label>
                    <Input
                      placeholder="وصف قصير يظهر في قوائم المنتجات"
                      {...register('shortDescription')}
                    />
                  </div>

                  {/* Category */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select
                      label="الفئة الرئيسية"
                      placeholder="اختر الفئة"
                      options={STORE_CATEGORIES.map((cat) => ({
                        value: cat.id,
                        label: cat.name,
                        labelAr: cat.nameAr,
                      }))}
                      error={errors.category?.message}
                      {...register('category')}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        الفئة الفرعية (اختياري)
                      </label>
                      <Input
                        placeholder="مثال: قمصان"
                        {...register('subcategory')}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      الوسوم (Tags)
                    </label>
                    <Input
                      placeholder="أدخل الوسوم مفصولة بفاصلة (قطن، رجالي، صيفي)"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">
                      الوسوم تساعد العملاء في العثور على منتجك
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  التسعير
                </h2>

                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="السعر"
                      type="number"
                      placeholder="0.00"
                      leftIcon={<span className="text-sm">ج.م</span>}
                      error={errors.price?.message}
                      {...register('price', { valueAsNumber: true })}
                    />

                    <Input
                      label="السعر قبل الخصم (اختياري)"
                      type="number"
                      placeholder="0.00"
                      leftIcon={<span className="text-sm">ج.م</span>}
                      {...register('compareAtPrice', { valueAsNumber: true })}
                    />
                  </div>

                  <Input
                    label="سعر التكلفة (اختياري)"
                    type="number"
                    placeholder="0.00"
                    leftIcon={<span className="text-sm">ج.م</span>}
                    helperText="لا يظهر للعملاء - يُستخدم لحساب الأرباح"
                    {...register('costPrice', { valueAsNumber: true })}
                  />

                  {watchedValues.price && watchedValues.compareAtPrice && watchedValues.compareAtPrice > watchedValues.price && (
                    <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                      <p className="text-sm text-green-700 dark:text-green-400">
                        <strong>نسبة الخصم:</strong>{' '}
                        {Math.round(
                          ((watchedValues.compareAtPrice - watchedValues.price) /
                            watchedValues.compareAtPrice) *
                            100
                        )}
                        %
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  المخزون
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="trackInventory"
                      className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      {...register('trackInventory')}
                    />
                    <label htmlFor="trackInventory" className="text-sm text-gray-700 dark:text-gray-300">
                      تتبع المخزون لهذا المنتج
                    </label>
                  </div>

                  {watchedValues.trackInventory && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        label="الكمية المتوفرة"
                        type="number"
                        placeholder="0"
                        error={errors.quantity?.message}
                        {...register('quantity', { valueAsNumber: true })}
                      />

                      <Input
                        label="حد التنبيه للمخزون"
                        type="number"
                        placeholder="10"
                        helperText="سيتم تنبيهك عندما يصل المخزون لهذا الحد"
                        {...register('lowStockThreshold', { valueAsNumber: true })}
                      />
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="رمز المنتج (SKU)"
                      placeholder="SKU-001"
                      {...register('sku')}
                    />

                    <Input
                      label="الباركود"
                      placeholder="1234567890123"
                      {...register('barcode')}
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Variants Tab */}
            {activeTab === 'variants' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  المتغيرات (Variants)
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="hasVariants"
                      className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      {...register('hasVariants')}
                    />
                    <label htmlFor="hasVariants" className="text-sm text-gray-700 dark:text-gray-300">
                      هذا المنتج له متغيرات (مثل المقاس أو اللون)
                    </label>
                  </div>

                  {watchedValues.hasVariants && (
                    <div className="space-y-4">
                      {optionFields.map((field, index) => (
                        <div
                          key={field.id}
                          className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              الخيار {index + 1}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeOption(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <Input
                              label="اسم الخيار"
                              placeholder="مثال: المقاس أو اللون"
                              {...register(`options.${index}.name`)}
                            />

                            <Input
                              label="القيم (مفصولة بفاصلة)"
                              placeholder="مثال: S, M, L, XL"
                            />
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => appendOption({ id: '', name: '', values: [] })}
                      >
                        <Plus className="h-4 w-4" />
                        إضافة خيار
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Images */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                صور المنتج
              </h2>

              <div className="space-y-4">
                {/* Upload Error */}
                {uploadError && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                    {uploadError}
                  </div>
                )}

                {/* Upload Area */}
                <label
                  className={`flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
                    isUploading
                      ? 'border-primary-400 bg-primary-50/50 dark:bg-primary-900/10'
                      : 'border-gray-300 hover:border-primary-500 dark:border-gray-600'
                  } ${uploadedImages.length >= 10 ? 'pointer-events-none opacity-50' : ''}`}
                >
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                    disabled={isUploading || uploadedImages.length >= 10}
                  />
                  <div className="text-center">
                    {isUploading ? (
                      <>
                        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500" />
                        <p className="mt-2 text-sm text-primary-600 dark:text-primary-400">
                          جاري رفع الصور... {progress}%
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          اضغط هنا لاختيار الصور
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          PNG, JPG, WebP حتى 5MB لكل صورة ({uploadedImages.length}/10)
                        </p>
                      </>
                    )}
                  </div>
                </label>

                {/* Uploaded Images */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {uploadedImages.map((image, index) => (
                      <div
                        key={index}
                        className="group relative aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image}
                          alt={`صورة المنتج ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        {index === 0 && (
                          <Badge className="absolute bottom-2 left-2" variant="success">
                            رئيسية
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                الحالة
              </h3>

              <Select
                options={[
                  { value: 'draft', label: 'Draft', labelAr: 'مسودة' },
                  { value: 'active', label: 'Active', labelAr: 'نشط' },
                ]}
                {...register('status')}
              />

              <div className="mt-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isFeatured"
                  className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  {...register('isFeatured')}
                />
                <label htmlFor="isFeatured" className="text-sm text-gray-700 dark:text-gray-300">
                  منتج مميز
                </label>
              </div>
            </Card>

            {/* Preview */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                معاينة
              </h3>

              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 mb-4 overflow-hidden">
                  {uploadedImages.length > 0 ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={uploadedImages[0]}
                      alt="معاينة المنتج"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                  {watchedValues.name || 'اسم المنتج'}
                </h4>

                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {watchedValues.shortDescription || watchedValues.description || 'وصف المنتج'}
                </p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-primary-500">
                    {watchedValues.price ? `${watchedValues.price} ج.م` : '0 ج.م'}
                  </span>
                  {watchedValues.compareAtPrice && watchedValues.compareAtPrice > (watchedValues.price || 0) && (
                    <span className="text-sm text-gray-500 line-through">
                      {watchedValues.compareAtPrice} ج.م
                    </span>
                  )}
                </div>
              </div>
            </Card>

            {/* SEO */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                تحسين محركات البحث (SEO)
              </h3>

              <div className="space-y-4">
                <Input
                  label="عنوان الصفحة"
                  placeholder="عنوان يظهر في نتائج البحث"
                  {...register('metaTitle')}
                />

                <Textarea
                  label="وصف الصفحة"
                  placeholder="وصف يظهر في نتائج البحث"
                  rows={3}
                  {...register('metaDescription')}
                />
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
