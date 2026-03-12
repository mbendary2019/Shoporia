'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Badge, Input } from '@/components/ui'
import { useCartStore } from '@/store'
import { formatCurrency } from '@/utils/format'
import { useProduct } from '@/hooks/queries/use-products'
import { getProductsByCategory } from '@/services/product'
import { getProductReviews } from '@/services/review'
import { getStoreById } from '@/services/store'
import type { Product, Review, Store } from '@/types'
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Store as StoreIcon,
  Package,
  Check,
  MessageCircle,
  Loader2,
} from 'lucide-react'

export default function ProductPage() {
  const params = useParams()
  const t = useTranslations('product')
  const tc = useTranslations('common')
  const tnav = useTranslations('nav')
  const thome = useTranslations('home')

  const { addItem } = useCartStore()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description')

  const productId = params.id as string

  const { data: product = null, isLoading, error: productError } = useProduct(productId)
  const error = productError ? tc('error') : (!isLoading && !product ? tc('noResults') : null)

  const { data: store = null } = useQuery<Store | null>({
    queryKey: ['store', product?.storeId],
    queryFn: () => getStoreById(product!.storeId),
    enabled: !!product?.storeId,
  })

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ['productReviews', productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!product,
  })

  const { data: relatedProductsRaw = [] } = useQuery<Product[]>({
    queryKey: ['relatedProducts', product?.category],
    queryFn: () => getProductsByCategory(product!.category, 5),
    enabled: !!product?.category,
  })

  const relatedProducts = relatedProductsRaw.filter(p => p.id !== productId)

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary-500" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">{tc('loading')}</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <Package className="mx-auto h-16 w-16 text-gray-300" />
            <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
              {error || tc('noResults')}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {/* TODO: add translation key for product-not-found description */}
              عذراً، لم نتمكن من العثور على المنتج المطلوب
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

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const handleAddToCart = () => {
    const variant = Object.keys(selectedOptions).length > 0 ? {
      id: `variant-${Date.now()}`,
      name: Object.values(selectedOptions).join(' / '),
      sku: product.sku || '',
      price: product.price,
      quantity: product.quantity,
      options: selectedOptions,
    } : undefined
    addItem(product, variant, quantity)
  }

  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value,
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-primary-500">{tnav('home')}</Link>
            <ChevronLeft className="h-4 w-4" />
            <Link href="/marketplace" className="hover:text-primary-500">{tc('products')}</Link>
            <ChevronLeft className="h-4 w-4" />
            <Link href={`/category/${product.category}`} className="hover:text-primary-500">
              {product.category}
            </Link>
            <ChevronLeft className="h-4 w-4" />
            <span className="text-gray-900 dark:text-white">{product.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <Card className="relative aspect-square overflow-hidden">
                <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[selectedImage]?.url}
                      alt={product.images[selectedImage]?.alt || product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package className="h-32 w-32 text-gray-300" />
                  )}
                </div>

                {/* Discount Badge */}
                {discount > 0 && (
                  <Badge className="absolute start-4 top-4" variant="danger">
                    {discount}% خصم
                  </Badge>
                )}

                {/* Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                      className="absolute start-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white dark:bg-gray-800/80"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
                      className="absolute end-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white dark:bg-gray-800/80"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                  </>
                )}
              </Card>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id || index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 ${
                        selectedImage === index
                          ? 'border-primary-500'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt || `${product.name} - ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Store Link */}
              {store && (
                <Link
                  href={`/store/${store.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-primary-500 hover:underline"
                >
                  <StoreIcon className="h-4 w-4" />
                  {store.name}
                </Link>
              )}

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                {product.name}
              </h1>

              {/* Rating & Sales */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {product.rating}
                  </span>
                  <span className="text-gray-500">({product.reviewCount} {t('reviews')})</span>
                </div>

                <span className="text-gray-300">|</span>

                <span className="text-gray-600 dark:text-gray-400">
                  {product.soldCount} {t('sales')}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary-500">
                  {formatCurrency(product.price)}
                </span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatCurrency(product.compareAtPrice)}
                    </span>
                    <Badge variant="danger">وفر {formatCurrency(product.compareAtPrice - product.price)}</Badge>
                  </>
                )}
              </div>

              {/* Options */}
              {product.options && product.options.map((option) => (
                <div key={option.name}>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {option.name}: <span className="text-primary-500">{selectedOptions[option.name] || 'اختر'}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        onClick={() => handleOptionSelect(option.name, value)}
                        className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                          selectedOptions[option.name] === value
                            ? 'border-primary-500 bg-primary-50 text-primary-500 dark:bg-primary-900/20'
                            : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('quantity')}
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="flex h-10 w-10 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => Math.min(product.quantity, prev + 1))}
                      className="flex h-10 w-10 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <span className="text-sm text-gray-500">
                    {product.quantity > 0 ? (
                      <span className="text-green-600">
                        <Check className="inline h-4 w-4" /> {t('inStock')} ({product.quantity})
                      </span>
                    ) : (
                      <span className="text-red-500">{t('outOfStock')}</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {t('addToCart')}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>

                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <div className="text-center">
                  <Truck className="mx-auto h-6 w-6 text-primary-500" />
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    {t('freeDelivery')}
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto h-6 w-6 text-primary-500" />
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    {/* TODO: add translation key for quality guarantee */}
                    ضمان الجودة
                  </p>
                </div>
                <div className="text-center">
                  <RotateCcw className="mx-auto h-6 w-6 text-primary-500" />
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    {thome('freeReturns')}
                  </p>
                </div>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?tag=${tag}`}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'border-b-2 border-primary-500 text-primary-500'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400'
                }`}
              >
                {t('description')}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-primary-500 text-primary-500'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400'
                }`}
              >
                {t('reviews')} ({product.reviewCount})
              </button>
            </div>

            <div className="py-6">
              {activeTab === 'description' && (
                <Card className="p-6">
                  <div className="prose prose-gray max-w-none dark:prose-invert">
                    <p className="whitespace-pre-line text-gray-600 dark:text-gray-400">
                      {product.description}
                    </p>
                  </div>
                </Card>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Reviews Summary */}
                  <Card className="p-6">
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900 dark:text-white">
                          {product.rating}
                        </div>
                        <div className="mt-2 flex justify-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.reviewCount} {t('reviews')}
                        </p>
                      </div>

                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = reviews.filter(r => r.rating === rating).length
                          const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0
                          return (
                            <div key={rating} className="flex items-center gap-2">
                              <span className="w-3 text-sm text-gray-600">{rating}</span>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                  className="h-full rounded-full bg-yellow-400"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="w-8 text-sm text-gray-500">
                                {percentage}%
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </Card>

                  {/* Reviews List */}
                  {reviews.length === 0 ? (
                    <Card className="p-6 text-center">
                      <MessageCircle className="mx-auto h-12 w-12 text-gray-300" />
                      <p className="mt-4 text-gray-500">{tc('noResults')}</p>
                    </Card>
                  ) : (
                    reviews.map((review) => (
                      <Card key={review.id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-medium text-primary-500 dark:bg-primary-900/30">
                              {review.customerName?.charAt(0) || '؟'}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {review.customerName || 'مستخدم'}
                              </p>
                              <p className="text-sm text-gray-500">
                                {review.createdAt instanceof Date
                                  ? review.createdAt.toLocaleDateString('ar-EG')
                                  : typeof review.createdAt === 'object' && review.createdAt && 'toDate' in review.createdAt
                                    ? (review.createdAt as { toDate: () => Date }).toDate().toLocaleDateString('ar-EG')
                                    : ''}
                              </p>
                            </div>
                          </div>

                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {review.title && (
                          <h4 className="mt-3 font-medium text-gray-900 dark:text-white">
                            {review.title}
                          </h4>
                        )}

                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                          {review.comment}
                        </p>

                        {review.sellerResponse && (
                          <div className="mt-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">رد البائع:</p>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{review.sellerResponse.comment}</p>
                          </div>
                        )}

                        <div className="mt-4 flex items-center gap-4">
                          <button className="text-sm text-gray-500 hover:text-primary-500">
                            <MessageCircle className="inline h-4 w-4" /> رد
                          </button>
                        </div>
                      </Card>
                    ))
                  )}

                  {reviews.length > 0 && (
                    <Button variant="outline" className="w-full">
                      {tc('viewMore')}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Store Info */}
          {store && (
            <Card className="mt-8 p-6">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                    {store.logo ? (
                      <img src={store.logo} alt={store.name} className="h-full w-full rounded-full object-cover" />
                    ) : (
                      <StoreIcon className="h-8 w-8 text-primary-500" />
                    )}
                  </div>
                  <div>
                    <Link
                      href={`/store/${store.slug}`}
                      className="text-lg font-semibold text-gray-900 hover:text-primary-500 dark:text-white"
                    >
                      {store.name}
                    </Link>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {store.rating}
                      </span>
                      <span>{store.productCount} {tc('product')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href={`/store/${store.slug}`}>
                    <Button variant="outline">
                      {/* TODO: add translation key for "visit store" */}
                      زيارة المتجر
                    </Button>
                  </Link>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4" />
                    {/* TODO: add translation key for "contact" */}
                    تواصل
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                {t('relatedProducts')}
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {relatedProducts.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="aspect-square bg-gray-100 dark:bg-gray-800">
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0].url}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package className="h-12 w-12 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-medium text-gray-900 hover:text-primary-500 dark:text-white">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-500">{item.rating}</span>
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-bold text-primary-500">
                          {formatCurrency(item.price)}
                        </span>
                        {item.compareAtPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(item.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
