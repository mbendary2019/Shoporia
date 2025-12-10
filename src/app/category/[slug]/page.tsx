'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Header, Footer } from '@/components/layout'
import { ProductCard, Button, Card, Badge } from '@/components/ui'
import { STORE_CATEGORIES } from '@/utils/constants'
import {
  ChevronLeft,
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react'
import { cn } from '@/utils/cn'

// Mock products for each category
const mockProducts: Record<string, any[]> = {
  electronics: [
    {
      id: '1',
      name: 'سماعات آبل إيربودز برو 2 - إلغاء ضوضاء نشط',
      price: 8999,
      compareAtPrice: 11999,
      image: '/images/products/airpods.jpg',
      rating: 4.8,
      reviewCount: 2456,
      store: { name: 'تك ستور', slug: 'tech-store' },
      isPrime: true,
      inStock: true,
    },
    {
      id: '2',
      name: 'ساعة ذكية سامسونج جالاكسي واتش 6',
      price: 6499,
      compareAtPrice: 8999,
      image: '/images/products/watch.jpg',
      rating: 4.6,
      reviewCount: 1823,
      store: { name: 'موبايل شوب', slug: 'mobile-shop' },
      isPrime: true,
      inStock: true,
    },
    {
      id: '3',
      name: 'جهاز بلايستيشن 5 - نسخة ديجيتال',
      price: 18999,
      compareAtPrice: 22999,
      image: '/images/products/ps5.jpg',
      rating: 4.9,
      reviewCount: 3421,
      store: { name: 'جيمرز هب', slug: 'gamers-hub' },
      isPrime: true,
      inStock: true,
      stockCount: 5,
    },
    {
      id: '4',
      name: 'لابتوب ماك بوك إير M2',
      price: 42999,
      compareAtPrice: 54999,
      image: '/images/products/macbook.jpg',
      rating: 4.9,
      reviewCount: 892,
      store: { name: 'آبل ستور', slug: 'apple-store' },
      isPrime: true,
      inStock: true,
    },
    {
      id: '5',
      name: 'سماعات سوني WH-1000XM5',
      price: 7999,
      compareAtPrice: 10999,
      image: '/images/products/sony-headphones.jpg',
      rating: 4.8,
      reviewCount: 2156,
      store: { name: 'صوتيات', slug: 'audio-store' },
      isPrime: true,
      inStock: true,
    },
    {
      id: '6',
      name: 'سماعات رأس لاسلكية',
      price: 1299,
      compareAtPrice: 1999,
      image: '/images/products/headphones.jpg',
      rating: 4.3,
      reviewCount: 567,
      store: { name: 'تك ستور', slug: 'tech-store' },
      isPrime: false,
      inStock: true,
    },
  ],
  fashion: [
    {
      id: '7',
      name: 'حقيبة ظهر جلد طبيعي - تصميم إيطالي',
      price: 1299,
      compareAtPrice: 1899,
      image: '/images/products/bag.jpg',
      rating: 4.5,
      reviewCount: 567,
      store: { name: 'بوتيك الأناقة', slug: 'elegance-boutique' },
      isPrime: false,
      inStock: true,
    },
    {
      id: '8',
      name: 'قميص قطن كلاسيكي',
      price: 499,
      compareAtPrice: 799,
      image: '/images/products/shirt.jpg',
      rating: 4.4,
      reviewCount: 234,
      store: { name: 'فاشون هب', slug: 'fashion-hub' },
      isPrime: true,
      inStock: true,
    },
    {
      id: '9',
      name: 'حذاء رياضي نايك',
      price: 2499,
      compareAtPrice: 3499,
      image: '/images/products/shoes.jpg',
      rating: 4.7,
      reviewCount: 1234,
      store: { name: 'سبورت ستور', slug: 'sport-store' },
      isPrime: true,
      inStock: true,
    },
  ],
  home: [
    {
      id: '10',
      name: 'مكنسة روبوت ذكية',
      price: 3499,
      compareAtPrice: 5999,
      image: '/images/products/vacuum.jpg',
      rating: 4.4,
      reviewCount: 1234,
      store: { name: 'سمارت هوم', slug: 'smart-home' },
      isPrime: true,
      inStock: true,
    },
    {
      id: '11',
      name: 'طقم أواني طهي',
      price: 1899,
      compareAtPrice: 2499,
      image: '/images/products/cookware.jpg',
      rating: 4.6,
      reviewCount: 456,
      store: { name: 'هوم سنتر', slug: 'home-center' },
      isPrime: false,
      inStock: true,
    },
  ],
  beauty: [
    {
      id: '12',
      name: 'كريم ترطيب للبشرة',
      price: 299,
      compareAtPrice: 499,
      image: '/images/products/cream.jpg',
      rating: 4.5,
      reviewCount: 789,
      store: { name: 'بيوتي شوب', slug: 'beauty-shop' },
      isPrime: true,
      inStock: true,
    },
  ],
  sports: [
    {
      id: '9',
      name: 'حذاء رياضي نايك',
      price: 2499,
      compareAtPrice: 3499,
      image: '/images/products/shoes.jpg',
      rating: 4.7,
      reviewCount: 1234,
      store: { name: 'سبورت ستور', slug: 'sport-store' },
      isPrime: true,
      inStock: true,
    },
  ],
  kids: [
    {
      id: '8',
      name: 'قميص قطن للأطفال',
      price: 299,
      compareAtPrice: 499,
      image: '/images/products/shirt.jpg',
      rating: 4.4,
      reviewCount: 234,
      store: { name: 'كيدز فاشون', slug: 'kids-fashion' },
      isPrime: true,
      inStock: true,
    },
  ],
}

// Category images mapping
const categoryImages: Record<string, string> = {
  electronics: '/images/categories/electronics.jpg',
  fashion: '/images/categories/fashion.jpg',
  home: '/images/categories/home.jpg',
  beauty: '/images/categories/beauty.jpg',
  sports: '/images/categories/sports.jpg',
  kids: '/images/categories/kids.jpg',
  food: '/images/products/cookware.jpg',
  services: '/images/categories/home.jpg',
  health: '/images/products/cream.jpg',
  other: '/images/categories/electronics.jpg',
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const category = STORE_CATEGORIES.find((c) => c.id === slug)
  const products = mockProducts[slug] || mockProducts.electronics || []
  const categoryImage = categoryImages[slug] || '/images/categories/electronics.jpg'

  if (!category) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              القسم غير موجود
            </h1>
            <Link href="/">
              <Button>العودة للرئيسية</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Category Hero */}
        <section className="relative h-[200px] md:h-[300px] overflow-hidden">
          <Image
            src={categoryImage}
            alt={category.nameAr}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 start-0 end-0 p-6 md:p-12">
            <div className="container-custom">
              <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
                <Link href="/" className="hover:text-white">
                  الرئيسية
                </Link>
                <ChevronLeft className="h-4 w-4" />
                <span className="text-white">{category.nameAr}</span>
              </nav>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {category.nameAr}
              </h1>
              <p className="text-white/80">
                تصفح أفضل المنتجات في قسم {category.nameAr}
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-8">
          <div className="container-custom">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden"
                >
                  <Filter className="h-4 w-4 me-2" />
                  فلترة
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {products.length} منتج
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:border-amazon-orange focus:outline-none focus:ring-1 focus:ring-amazon-orange"
                >
                  <option value="featured">الأكثر شهرة</option>
                  <option value="price-low">السعر: من الأقل</option>
                  <option value="price-high">السعر: من الأعلى</option>
                  <option value="rating">التقييم</option>
                  <option value="newest">الأحدث</option>
                </select>

                {/* View Mode */}
                <div className="hidden md:flex items-center gap-1 border rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-1.5 rounded',
                      viewMode === 'grid'
                        ? 'bg-amazon-orange text-white'
                        : 'text-gray-500 hover:bg-gray-100'
                    )}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-1.5 rounded',
                      viewMode === 'list'
                        ? 'bg-amazon-orange text-white'
                        : 'text-gray-500 hover:bg-gray-100'
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-8">
              {/* Sidebar Filters - Desktop */}
              <aside className="hidden md:block w-64 shrink-0">
                <Card className="p-4 sticky top-24">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    الفلاتر
                  </h3>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      السعر
                    </h4>
                    <div className="space-y-2">
                      {['أقل من 500 جنيه', '500 - 1000', '1000 - 5000', 'أكثر من 5000'].map(
                        (range) => (
                          <label key={range} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-amazon-orange focus:ring-amazon-orange"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {range}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      التقييم
                    </h4>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-amazon-orange focus:ring-amazon-orange"
                          />
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'h-4 w-4',
                                  i < rating
                                    ? 'fill-amazon-star text-amazon-star'
                                    : 'text-gray-300'
                                )}
                              />
                            ))}
                            <span className="text-sm text-gray-500">وأعلى</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Prime */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-amazon-orange focus:ring-amazon-orange"
                      />
                      <Badge className="bg-amazon-navy text-white text-xs">
                        PRIME
                      </Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        توصيل سريع
                      </span>
                    </label>
                  </div>

                  <Button variant="outline" className="w-full">
                    مسح الفلاتر
                  </Button>
                </Card>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {products.length === 0 ? (
                  <Card className="p-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      لا توجد منتجات في هذا القسم حالياً
                    </p>
                    <Link href="/marketplace">
                      <Button>تصفح جميع المنتجات</Button>
                    </Link>
                  </Card>
                ) : (
                  <div
                    className={cn(
                      'gap-4',
                      viewMode === 'grid'
                        ? 'grid grid-cols-2 lg:grid-cols-3'
                        : 'flex flex-col'
                    )}
                  >
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        variant={viewMode === 'list' ? 'horizontal' : 'default'}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Categories */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              أقسام أخرى قد تعجبك
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {STORE_CATEGORIES.filter((c) => c.id !== slug)
                .slice(0, 6)
                .map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    className="group"
                  >
                    <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                      <div className="relative h-20 w-20 mx-auto mb-3 rounded-full overflow-hidden">
                        <Image
                          src={categoryImages[cat.id] || '/images/categories/electronics.jpg'}
                          alt={cat.nameAr}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-amazon-orange">
                        {cat.nameAr}
                      </h3>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
