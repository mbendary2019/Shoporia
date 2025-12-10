'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/layout'
import { Card, Badge, Button, ProductCard } from '@/components/ui'
import Link from 'next/link'
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingCart,
  ChevronDown,
  ChevronLeft,
  X,
  Check,
} from 'lucide-react'
import { STORE_CATEGORIES } from '@/utils/constants'
import { formatCurrency } from '@/utils/format'
import { cn } from '@/utils/cn'

// Mock products data
const products = [
  {
    id: '1',
    name: 'قميص قطن رجالي كلاسيك - جودة عالية 100% قطن مصري',
    price: 450,
    compareAtPrice: 599,
    image: '/images/products/shirt.jpg',
    rating: 4.5,
    reviewCount: 128,
    store: { name: 'متجر الأناقة', slug: 'elegance-store' },
    category: 'fashion',
    isPrime: true,
    inStock: true,
  },
  {
    id: '2',
    name: 'سماعات بلوتوث لاسلكية - إلغاء ضوضاء نشط',
    price: 899,
    compareAtPrice: 1200,
    image: '/images/products/headphones.jpg',
    rating: 4.8,
    reviewCount: 256,
    store: { name: 'تك زون', slug: 'tech-zone' },
    category: 'electronics',
    isPrime: true,
    inStock: true,
  },
  {
    id: '3',
    name: 'حقيبة يد جلد طبيعي - تصميم إيطالي فاخر',
    price: 1250,
    image: '/images/products/bag.jpg',
    rating: 4.3,
    reviewCount: 89,
    store: { name: 'بوتيك سارة', slug: 'sara-boutique' },
    category: 'fashion',
    isPrime: false,
    inStock: true,
  },
  {
    id: '4',
    name: 'ساعة ذكية سبورت - مقاومة للماء IP68',
    price: 2500,
    compareAtPrice: 3200,
    image: '/images/products/watch.jpg',
    rating: 4.7,
    reviewCount: 312,
    store: { name: 'تك زون', slug: 'tech-zone' },
    category: 'electronics',
    isPrime: true,
    inStock: true,
    stockCount: 3,
  },
  {
    id: '5',
    name: 'كريم مرطب للبشرة - تركيبة طبيعية 100%',
    price: 180,
    image: '/images/products/cream.jpg',
    rating: 4.6,
    reviewCount: 445,
    store: { name: 'بيوتي كير', slug: 'beauty-care' },
    category: 'beauty',
    isPrime: true,
    inStock: true,
  },
  {
    id: '6',
    name: 'حذاء رياضي نايك اير ماكس - أصلي 100%',
    price: 1899,
    compareAtPrice: 2400,
    image: '/images/products/shoes.jpg',
    rating: 4.9,
    reviewCount: 567,
    store: { name: 'سبورت لايف', slug: 'sport-life' },
    category: 'sports',
    isPrime: true,
    inStock: true,
  },
  {
    id: '7',
    name: 'لابتوب ماك بوك برو M3 - 14 بوصة',
    price: 65999,
    compareAtPrice: 72999,
    image: '/images/products/macbook.jpg',
    rating: 4.9,
    reviewCount: 234,
    store: { name: 'آبل ستور', slug: 'apple-store' },
    category: 'electronics',
    isPrime: true,
    inStock: true,
  },
  {
    id: '8',
    name: 'طقم أواني طهي سيراميك - 10 قطع',
    price: 2499,
    compareAtPrice: 3500,
    image: '/images/products/cookware.jpg',
    rating: 4.4,
    reviewCount: 189,
    store: { name: 'مطبخي', slug: 'my-kitchen' },
    category: 'home',
    isPrime: false,
    inStock: true,
  },
]

const sortOptions = [
  { value: 'featured', label: 'الأكثر صلة' },
  { value: 'newest', label: 'الأحدث' },
  { value: 'bestselling', label: 'الأكثر مبيعاً' },
  { value: 'price-asc', label: 'السعر: الأقل للأعلى' },
  { value: 'price-desc', label: 'السعر: الأعلى للأقل' },
  { value: 'rating', label: 'التقييم' },
]

const priceRanges = [
  { min: 0, max: 100, label: 'أقل من 100 جنيه' },
  { min: 100, max: 500, label: '100 - 500 جنيه' },
  { min: 500, max: 1000, label: '500 - 1000 جنيه' },
  { min: 1000, max: 5000, label: '1000 - 5000 جنيه' },
  { min: 5000, max: Infinity, label: 'أكثر من 5000 جنيه' },
]

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)
  const [minRating, setMinRating] = useState<number | null>(null)
  const [primeOnly, setPrimeOnly] = useState(false)

  const activeFiltersCount = [
    selectedCategories.length > 0,
    selectedPriceRange !== null,
    minRating !== null,
    primeOnly,
  ].filter(Boolean).length

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedPriceRange(null)
    setMinRating(null)
    setPrimeOnly(false)
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-100 dark:bg-gray-900">
        {/* Breadcrumb */}
        <div className="bg-white dark:bg-gray-800 border-b">
          <div className="container-custom py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-amazon-link hover:text-amazon-linkHover hover:underline">
                الرئيسية
              </Link>
              <ChevronLeft className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">جميع المنتجات</span>
            </nav>
          </div>
        </div>

        <div className="container-custom py-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <Card className="sticky top-28 p-0 overflow-hidden">
                {/* Prime Filter */}
                <div className="p-4 border-b">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={primeOnly}
                      onChange={(e) => setPrimeOnly(e.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-amazon-orange focus:ring-amazon-orange"
                    />
                    <div className="flex items-center gap-2">
                      <span className="bg-amazon-navy text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        PRIME
                      </span>
                      <span className="text-sm group-hover:text-amazon-orange">
                        توصيل مجاني
                      </span>
                    </div>
                  </label>
                </div>

                {/* Categories */}
                <div className="p-4 border-b">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                    الأقسام
                  </h3>
                  <ul className="space-y-2">
                    {STORE_CATEGORIES.slice(0, 8).map((category) => (
                      <li key={category.id}>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => toggleCategory(category.id)}
                            className="h-4 w-4 rounded border-gray-300 text-amazon-orange focus:ring-amazon-orange"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-amazon-orange">
                            {category.nameAr}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-3 text-sm text-amazon-link hover:text-amazon-linkHover hover:underline">
                    عرض المزيد
                  </button>
                </div>

                {/* Price Range */}
                <div className="p-4 border-b">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                    السعر
                  </h3>
                  <ul className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <li key={index}>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="price"
                            checked={selectedPriceRange === index}
                            onChange={() => setSelectedPriceRange(index)}
                            className="h-4 w-4 border-gray-300 text-amazon-orange focus:ring-amazon-orange"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-amazon-orange">
                            {range.label}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>

                  {/* Custom Price Range */}
                  <div className="mt-4 flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="من"
                      className="w-full h-9 rounded border border-gray-300 px-2 text-sm focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange dark:border-gray-600 dark:bg-gray-800"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="إلى"
                      className="w-full h-9 rounded border border-gray-300 px-2 text-sm focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange dark:border-gray-600 dark:bg-gray-800"
                    />
                    <Button size="sm" variant="outline" className="shrink-0">
                      تطبيق
                    </Button>
                  </div>
                </div>

                {/* Rating */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                    تقييم العملاء
                  </h3>
                  <ul className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <li key={rating}>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="rating"
                            checked={minRating === rating}
                            onChange={() => setMinRating(rating)}
                            className="h-4 w-4 border-gray-300 text-amazon-orange focus:ring-amazon-orange"
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
                            <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-amazon-orange">
                              وأعلى
                            </span>
                          </div>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Results Count & Active Filters */}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      عرض <span className="font-bold text-amazon-orange">1-{products.length}</span> من{' '}
                      <span className="font-bold">{products.length}</span> نتيجة
                    </p>
                    {activeFiltersCount > 0 && (
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {primeOnly && (
                          <Badge className="bg-amazon-navy text-white text-xs gap-1">
                            PRIME
                            <button onClick={() => setPrimeOnly(false)}>
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        )}
                        {selectedCategories.map((catId) => {
                          const cat = STORE_CATEGORIES.find((c) => c.id === catId)
                          return (
                            <Badge key={catId} variant="secondary" className="text-xs gap-1">
                              {cat?.nameAr}
                              <button onClick={() => toggleCategory(catId)}>
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          )
                        })}
                        <button
                          onClick={clearFilters}
                          className="text-xs text-amazon-link hover:underline"
                        >
                          مسح الكل
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Sort & View Options */}
                  <div className="flex items-center gap-3">
                    {/* Mobile Filter Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden"
                      onClick={() => setShowFilters(true)}
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      تصفية
                      {activeFiltersCount > 0 && (
                        <Badge className="bg-amazon-orange text-white text-xs h-5 w-5 p-0 flex items-center justify-center rounded-full">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>

                    {/* Sort Dropdown */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="h-9 rounded border border-gray-300 bg-white px-3 text-sm focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange dark:border-gray-600 dark:bg-gray-800"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          الترتيب: {option.label}
                        </option>
                      ))}
                    </select>

                    {/* View Mode Toggle */}
                    <div className="hidden sm:flex rounded border border-gray-300 dark:border-gray-600 overflow-hidden">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={cn(
                          'flex h-9 w-9 items-center justify-center transition-colors',
                          viewMode === 'grid'
                            ? 'bg-amazon-orange text-white'
                            : 'bg-white text-gray-400 hover:text-gray-600 dark:bg-gray-800'
                        )}
                      >
                        <Grid3X3 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={cn(
                          'flex h-9 w-9 items-center justify-center border-s border-gray-300 dark:border-gray-600 transition-colors',
                          viewMode === 'list'
                            ? 'bg-amazon-orange text-white'
                            : 'bg-white text-gray-400 hover:text-gray-600 dark:bg-gray-800'
                        )}
                      >
                        <List className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div
                className={cn(
                  'gap-4',
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
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

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-center">
                <nav className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>
                    السابق
                  </Button>
                  <Button size="sm" className="min-w-[40px]">1</Button>
                  <Button variant="outline" size="sm" className="min-w-[40px]">2</Button>
                  <Button variant="outline" size="sm" className="min-w-[40px]">3</Button>
                  <span className="px-2 text-gray-400">...</span>
                  <Button variant="outline" size="sm" className="min-w-[40px]">10</Button>
                  <Button variant="outline" size="sm">
                    التالي
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden transition-all duration-300',
          showFilters ? 'visible' : 'invisible'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black transition-opacity',
            showFilters ? 'opacity-50' : 'opacity-0'
          )}
          onClick={() => setShowFilters(false)}
        />
        <div
          className={cn(
            'absolute top-0 start-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 overflow-y-auto',
            showFilters ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-amazon-navy text-white">
            <h2 className="font-bold text-lg">تصفية النتائج</h2>
            <button onClick={() => setShowFilters(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Filters Content */}
          <div className="p-4 space-y-6">
            {/* Prime */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={primeOnly}
                  onChange={(e) => setPrimeOnly(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-amazon-orange focus:ring-amazon-orange"
                />
                <span className="bg-amazon-navy text-white text-xs font-bold px-2 py-1 rounded">
                  PRIME
                </span>
                <span>توصيل مجاني</span>
              </label>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold mb-3">الأقسام</h3>
              <ul className="space-y-2">
                {STORE_CATEGORIES.slice(0, 8).map((category) => (
                  <li key={category.id}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="h-4 w-4 rounded border-gray-300 text-amazon-orange focus:ring-amazon-orange"
                      />
                      <span className="text-sm">{category.nameAr}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div>
              <h3 className="font-bold mb-3">السعر</h3>
              <ul className="space-y-2">
                {priceRanges.map((range, index) => (
                  <li key={index}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-price"
                        checked={selectedPriceRange === index}
                        onChange={() => setSelectedPriceRange(index)}
                        className="h-4 w-4 border-gray-300 text-amazon-orange focus:ring-amazon-orange"
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-bold mb-3">التقييم</h3>
              <ul className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <li key={rating}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="h-4 w-4 border-gray-300 text-amazon-orange focus:ring-amazon-orange"
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
                        <span className="text-sm">وأعلى</span>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 p-4 bg-white dark:bg-gray-800 border-t flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={clearFilters}
            >
              مسح الكل
            </Button>
            <Button
              className="flex-1"
              onClick={() => setShowFilters(false)}
            >
              عرض النتائج
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
