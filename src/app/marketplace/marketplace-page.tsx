'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
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
  Loader2,
} from 'lucide-react'
import { STORE_CATEGORIES } from '@/utils/constants'
import { formatCurrency } from '@/utils/format'
import { cn } from '@/utils/cn'
import { useProducts } from '@/hooks/queries/use-products'
import type { Product } from '@/types'

// Map Firestore Product to ProductCard shape
function mapProductToCard(product: Product) {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    image: product.images?.[0]?.url,
    rating: product.rating,
    reviewCount: product.reviewCount,
    store: {
      name: product.storeId,
      slug: product.storeId,
    },
    category: product.category,
    isPrime: product.isFeatured,
    inStock: product.status === 'active' && product.quantity > 0,
    stockCount: product.quantity,
  }
}

export default function MarketplacePage() {
  const t = useTranslations('marketplace')
  const tc = useTranslations('common')
  const tsearch = useTranslations('search')
  const tnav = useTranslations('nav')
  const thome = useTranslations('home')

  const sortOptions = [
    { value: 'featured', label: tsearch('sortRelevance') },
    { value: 'newest', label: tsearch('sortNewest') },
    { value: 'bestselling', label: tsearch('sortBestSelling') },
    { value: 'price-asc', label: tsearch('sortPriceAsc') },
    { value: 'price-desc', label: tsearch('sortPriceDesc') },
    { value: 'rating', label: tsearch('sortRating') },
  ]

  const priceRanges = [
    { min: 0, max: 100, label: t('priceRanges.under100') },
    { min: 100, max: 500, label: t('priceRanges.100to500') },
    { min: 500, max: 1000, label: t('priceRanges.500to1000') },
    { min: 1000, max: 5000, label: t('priceRanges.1000to5000') },
    { min: 5000, max: Infinity, label: t('priceRanges.over5000') },
  ]

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)
  const [minRating, setMinRating] = useState<number | null>(null)
  const [primeOnly, setPrimeOnly] = useState(false)

  const { data: allProducts = [], isLoading } = useProducts({ status: 'active', limit: 50 })

  // Apply filters client-side
  const filteredProducts = useMemo(() => {
    let result = [...allProducts]

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    // Price range filter
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange]
      result = result.filter((p) => p.price >= range.min && p.price <= range.max)
    }

    // Rating filter
    if (minRating !== null) {
      result = result.filter((p) => p.rating >= minRating)
    }

    // Prime (featured) filter
    if (primeOnly) {
      result = result.filter((p) => p.isFeatured)
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'bestselling':
        result.sort((a, b) => b.soldCount - a.soldCount)
        break
      case 'newest':
        // Already sorted by createdAt desc from query
        break
      case 'featured':
      default:
        // Featured first, then by sold count
        result.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1
          if (!a.isFeatured && b.isFeatured) return 1
          return b.soldCount - a.soldCount
        })
        break
    }

    return result
  }, [allProducts, selectedCategories, selectedPriceRange, minRating, primeOnly, sortBy])

  const products = filteredProducts.map(mapProductToCard)

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
                {tnav('home')}
              </Link>
              <ChevronLeft className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">{t('allProducts')}</span>
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
                        {thome('fastDelivery')}
                      </span>
                    </div>
                  </label>
                </div>

                {/* Categories */}
                <div className="p-4 border-b">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                    {t('sections')}
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
                    {tc('viewMore')}
                  </button>
                </div>

                {/* Price Range */}
                <div className="p-4 border-b">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                    {t('priceLabel')}
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
                      placeholder={tc('from')}
                      className="w-full h-9 rounded border border-gray-300 px-2 text-sm focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange dark:border-gray-600 dark:bg-gray-800"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder={tc('to')}
                      className="w-full h-9 rounded border border-gray-300 px-2 text-sm focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange dark:border-gray-600 dark:bg-gray-800"
                    />
                    <Button size="sm" variant="outline" className="shrink-0">
                      {tc('apply')}
                    </Button>
                  </div>
                </div>

                {/* Rating */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                    {tsearch('customerRating')}
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
                              {tc('andAbove')}
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
                      {isLoading ? (
                        tc('loading')
                      ) : (
                        <>
                          {tc('showing')} <span className="font-bold text-amazon-orange">1-{products.length}</span> {tc('of')}{' '}
                          <span className="font-bold">{allProducts.length}</span> {tc('result')}
                        </>
                      )}
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
                          {tc('clearAll')}
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
                      {tc('filter')}
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
                          {tc('sortBy')}: {option.label}
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

              {/* Loading Skeleton */}
              {isLoading ? (
                <div
                  className={cn(
                    'gap-4',
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                      : 'flex flex-col'
                  )}
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                    >
                      <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-700" />
                      <div className="mt-4 space-y-3">
                        <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <div key={j} className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" />
                          ))}
                        </div>
                        <div className="h-6 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-10 w-full rounded bg-gray-200 dark:bg-gray-700" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                /* Products Grid */
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
              ) : (
                <Card className="p-12 text-center">
                  <Search className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    {t('noProducts')}
                  </p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {t('noProductsDescription')}
                  </p>
                </Card>
              )}

              {/* Pagination */}
              {!isLoading && products.length > 0 && (
                <div className="mt-8 flex items-center justify-center">
                  <nav className="flex items-center gap-1">
                    <Button variant="outline" size="sm" disabled>
                      {tc('previous')}
                    </Button>
                    <Button size="sm" className="min-w-[40px]">1</Button>
                    <Button variant="outline" size="sm" className="min-w-[40px]">2</Button>
                    <Button variant="outline" size="sm" className="min-w-[40px]">3</Button>
                    <span className="px-2 text-gray-400">...</span>
                    <Button variant="outline" size="sm" className="min-w-[40px]">10</Button>
                    <Button variant="outline" size="sm">
                      {tc('next')}
                    </Button>
                  </nav>
                </div>
              )}
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
            <h2 className="font-bold text-lg">{t('filterResults')}</h2>
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
                <span>{thome('fastDelivery')}</span>
              </label>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold mb-3">{t('sections')}</h3>
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
              <h3 className="font-bold mb-3">{t('priceLabel')}</h3>
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
              <h3 className="font-bold mb-3">{tsearch('rating')}</h3>
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
                        <span className="text-sm">{tc('andAbove')}</span>
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
              {tc('clearAll')}
            </Button>
            <Button
              className="flex-1"
              onClick={() => setShowFilters(false)}
            >
              {tc('showResults')}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
