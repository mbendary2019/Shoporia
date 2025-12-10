'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Badge, Input } from '@/components/ui'
import { useCartStore } from '@/store'
import { formatCurrency } from '@/utils/format'
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
  Store,
  Package,
  Check,
  MessageCircle,
} from 'lucide-react'

// Mock product data
const product = {
  id: '1',
  name: 'قميص قطن رجالي كلاسيك فاخر',
  description: `قميص رجالي فاخر مصنوع من أجود أنواع القطن المصري 100%. يتميز بتصميم عصري وأنيق يناسب جميع المناسبات سواء الرسمية أو الكاجوال.

مميزات المنتج:
• قطن مصري 100% عالي الجودة
• قصة مريحة وأنيقة
• أزرار لؤلؤية فاخرة
• خياطة دقيقة ومتقنة
• سهل الغسيل والكي
• يحافظ على شكله ولونه لفترة طويلة

تعليمات العناية:
• يُغسل في درجة حرارة 30 درجة
• يُكوى على درجة حرارة متوسطة
• لا يُستخدم المبيض`,
  price: 450,
  compareAtPrice: 599,
  images: [
    '/images/products/shirt-1.jpg',
    '/images/products/shirt-2.jpg',
    '/images/products/shirt-3.jpg',
    '/images/products/shirt-4.jpg',
  ],
  rating: 4.5,
  reviewCount: 128,
  soldCount: 256,
  quantity: 25,
  category: 'ملابس رجالي',
  sku: 'SKU-001',
  store: {
    id: 'store-1',
    name: 'متجر الأناقة',
    slug: 'elegance-store',
    rating: 4.8,
    productCount: 156,
  },
  options: [
    {
      name: 'المقاس',
      values: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      name: 'اللون',
      values: ['أبيض', 'أزرق', 'أسود', 'رمادي'],
    },
  ],
  tags: ['قطن', 'رجالي', 'كلاسيك', 'صيفي'],
}

const reviews = [
  {
    id: '1',
    customerName: 'أحمد محمد',
    rating: 5,
    comment: 'منتج ممتاز وجودة عالية. القماش ناعم جداً والخياطة متقنة. أنصح بالشراء.',
    date: '2024-12-05',
    helpful: 12,
  },
  {
    id: '2',
    customerName: 'محمود علي',
    rating: 4,
    comment: 'قميص جميل والمقاس مظبوط. التوصيل كان سريع. شكراً للمتجر.',
    date: '2024-12-01',
    helpful: 8,
  },
  {
    id: '3',
    customerName: 'سامي حسن',
    rating: 5,
    comment: 'أفضل قميص اشتريته. القطن المصري فعلاً مختلف. سأطلب ألوان أخرى.',
    date: '2024-11-28',
    helpful: 15,
  },
]

const relatedProducts = [
  {
    id: '2',
    name: 'بنطلون قماش رجالي',
    price: 550,
    compareAtPrice: 700,
    rating: 4.3,
  },
  {
    id: '3',
    name: 'حزام جلد طبيعي',
    price: 180,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'كرافت حرير',
    price: 120,
    compareAtPrice: 150,
    rating: 4.5,
  },
  {
    id: '5',
    name: 'قميص كاجوال',
    price: 380,
    rating: 4.2,
  },
]

export default function ProductPage() {
  const params = useParams()
  const { addItem } = useCartStore()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description')

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const handleAddToCart = () => {
    const productForCart = {
      id: product.id,
      storeId: product.store.slug,
      name: product.name,
      slug: product.id,
      description: product.description,
      category: product.category,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      currency: 'EGP',
      quantity: product.quantity,
      trackInventory: true,
      images: product.images.map((url, i) => ({ id: `img-${i}`, url, order: i })),
      hasVariants: product.options.length > 0,
      status: 'active' as const,
      isFeatured: false,
      isDigital: false,
      viewCount: 0,
      soldCount: product.soldCount,
      rating: product.rating,
      reviewCount: product.reviewCount,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const variant = Object.keys(selectedOptions).length > 0 ? {
      id: `variant-${Date.now()}`,
      name: Object.values(selectedOptions).join(' / '),
      sku: product.sku,
      price: product.price,
      quantity: product.quantity,
      options: selectedOptions,
    } : undefined
    addItem(productForCart, variant, quantity)
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
            <Link href="/" className="hover:text-primary-500">الرئيسية</Link>
            <ChevronLeft className="h-4 w-4" />
            <Link href="/marketplace" className="hover:text-primary-500">المنتجات</Link>
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
                  <Package className="h-32 w-32 text-gray-300" />
                </div>

                {/* Discount Badge */}
                {discount > 0 && (
                  <Badge className="absolute start-4 top-4" variant="danger">
                    {discount}% خصم
                  </Badge>
                )}

                {/* Navigation Arrows */}
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
              </Card>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 ${
                      selectedImage === index
                        ? 'border-primary-500'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                      <Package className="h-8 w-8 text-gray-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Store Link */}
              <Link
                href={`/store/${product.store.slug}`}
                className="inline-flex items-center gap-2 text-sm text-primary-500 hover:underline"
              >
                <Store className="h-4 w-4" />
                {product.store.name}
              </Link>

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
                  <span className="text-gray-500">({product.reviewCount} تقييم)</span>
                </div>

                <span className="text-gray-300">|</span>

                <span className="text-gray-600 dark:text-gray-400">
                  {product.soldCount} مبيعات
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
              {product.options.map((option) => (
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
                  الكمية
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
                        <Check className="inline h-4 w-4" /> متوفر ({product.quantity} قطعة)
                      </span>
                    ) : (
                      <span className="text-red-500">غير متوفر</span>
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
                  أضف للسلة
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
                    توصيل سريع
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto h-6 w-6 text-primary-500" />
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    ضمان الجودة
                  </p>
                </div>
                <div className="text-center">
                  <RotateCcw className="mx-auto h-6 w-6 text-primary-500" />
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    استرجاع سهل
                  </p>
                </div>
              </div>

              {/* Tags */}
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
                الوصف
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-primary-500 text-primary-500'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400'
                }`}
              >
                التقييمات ({product.reviewCount})
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
                          {product.reviewCount} تقييم
                        </p>
                      </div>

                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="w-3 text-sm text-gray-600">{rating}</span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-full rounded-full bg-yellow-400"
                                style={{ width: `${rating === 5 ? 60 : rating === 4 ? 25 : rating === 3 ? 10 : 5}%` }}
                              />
                            </div>
                            <span className="w-8 text-sm text-gray-500">
                              {rating === 5 ? '60%' : rating === 4 ? '25%' : rating === 3 ? '10%' : '5%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Reviews List */}
                  {reviews.map((review) => (
                    <Card key={review.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-medium text-primary-500 dark:bg-primary-900/30">
                            {review.customerName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {review.customerName}
                            </p>
                            <p className="text-sm text-gray-500">{review.date}</p>
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

                      <p className="mt-4 text-gray-600 dark:text-gray-400">
                        {review.comment}
                      </p>

                      <div className="mt-4 flex items-center gap-4">
                        <button className="text-sm text-gray-500 hover:text-primary-500">
                          مفيد ({review.helpful})
                        </button>
                        <button className="text-sm text-gray-500 hover:text-primary-500">
                          <MessageCircle className="inline h-4 w-4" /> رد
                        </button>
                      </div>
                    </Card>
                  ))}

                  <Button variant="outline" className="w-full">
                    عرض المزيد من التقييمات
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Store Info */}
          <Card className="mt-8 p-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                  <Store className="h-8 w-8 text-primary-500" />
                </div>
                <div>
                  <Link
                    href={`/store/${product.store.slug}`}
                    className="text-lg font-semibold text-gray-900 hover:text-primary-500 dark:text-white"
                  >
                    {product.store.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {product.store.rating}
                    </span>
                    <span>{product.store.productCount} منتج</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Link href={`/store/${product.store.slug}`}>
                  <Button variant="outline">زيارة المتجر</Button>
                </Link>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4" />
                  تواصل
                </Button>
              </div>
            </div>
          </Card>

          {/* Related Products */}
          <div className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
              منتجات ذات صلة
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {relatedProducts.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-800">
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-12 w-12 text-gray-300" />
                    </div>
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
