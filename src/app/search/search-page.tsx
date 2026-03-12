'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import { formatCurrency } from '@/utils/format'
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  Star,
  Heart,
  ShoppingCart,
  X,
  ChevronDown,
  Store,
  Loader2,
} from 'lucide-react'
import { useSearchProducts } from '@/hooks/queries/use-products'
import type { Product } from '@/types'

const categories = ['الكل', 'إلكترونيات', 'ملابس', 'أزياء', 'عطور']
const sortOptions = [
  { id: 'relevance', label: 'الأكثر صلة' },
  { id: 'price_asc', label: 'السعر: من الأقل للأعلى' },
  { id: 'price_desc', label: 'السعر: من الأعلى للأقل' },
  { id: 'rating', label: 'التقييم' },
  { id: 'newest', label: 'الأحدث' },
]

// Map Firestore Product to display shape
function mapProduct(product: Product) {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.compareAtPrice || null,
    image: product.images?.[0]?.url || '',
    store: product.storeId,
    storeSlug: product.storeId,
    rating: product.rating,
    reviews: product.reviewCount,
    category: product.category,
    inStock: product.status === 'active' && product.quantity > 0,
  }
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category') || ''

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam ? categories.find((c) => c === categoryParam) || 'الكل' : 'الكل'
  )
  const [sortBy, setSortBy] = useState('relevance')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 })
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // Sync with URL params when they change (e.g. from header search)
  useEffect(() => {
    if (queryParam) setSearchQuery(queryParam)
    if (categoryParam) {
      const match = categories.find((c) => c === categoryParam)
      if (match) setSelectedCategory(match)
    }
  }, [queryParam, categoryParam])

  // Debounce the search query
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 400)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [searchQuery])

  const { data: firestoreProducts = [], isLoading } = useSearchProducts(debouncedQuery)

  // Map and apply client-side filters
  const allMapped = firestoreProducts.map(mapProduct)

  const filteredProducts = allMapped.filter((product) => {
    const matchesCategory =
      selectedCategory === 'الكل' || product.category === selectedCategory
    const matchesPrice =
      product.price >= priceRange.min && product.price <= priceRange.max
    return matchesCategory && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price
      case 'price_desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container-custom">
          {/* Search Header */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن منتجات، متاجر، فئات..."
                className="h-14 w-full rounded-xl border border-gray-300 bg-white pe-4 ps-12 text-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>

            {searchQuery && !isLoading && (
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {sortedProducts.length} نتيجة للبحث عن &quot;{searchQuery}&quot;
              </p>
            )}
            {isLoading && (
              <div className="mt-4 flex items-center gap-2 text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>جاري البحث...</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Filters Sidebar */}
            <div
              className={`${
                showFilters ? 'block' : 'hidden'
              } w-full lg:block lg:w-64`}
            >
              <Card className="sticky top-4 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    الفلاتر
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    الفئات
                  </h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full rounded-lg px-3 py-2 text-start text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30'
                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    نطاق السعر
                  </h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: +e.target.value })
                      }
                      placeholder="من"
                      className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: +e.target.value })
                      }
                      placeholder="إلى"
                      className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    التقييم
                  </h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      >
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i <= rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span>وأعلى</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  إعادة تعيين
                </Button>
              </Card>
            </div>

            {/* Results */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm lg:hidden dark:border-gray-600 dark:bg-gray-800"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  الفلاتر
                </button>

                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <div className="flex rounded-lg border border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${
                        viewMode === 'grid'
                          ? 'bg-gray-100 dark:bg-gray-700'
                          : ''
                      }`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${
                        viewMode === 'list'
                          ? 'bg-gray-100 dark:bg-gray-700'
                          : ''
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Loading Skeleton */}
              {isLoading ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
                      : 'space-y-4'
                  }
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="animate-pulse overflow-hidden">
                      <div className="aspect-square bg-gray-200 dark:bg-gray-700" />
                      <div className="p-4 space-y-3">
                        <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-6 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : sortedProducts.length > 0 ? (
                /* Products Grid/List */
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
                      : 'space-y-4'
                  }
                >
                  {sortedProducts.map((product) => (
                    <Card
                      key={product.id}
                      className={`overflow-hidden ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      <Link
                        href={`/product/${product.id}`}
                        className={`block ${
                          viewMode === 'list' ? 'w-48 shrink-0' : ''
                        }`}
                      >
                        <div
                          className={`relative bg-gray-100 dark:bg-gray-700 ${
                            viewMode === 'list' ? 'h-full' : 'aspect-square'
                          }`}
                        >
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-contain p-2"
                            />
                          )}
                          {product.originalPrice && (
                            <Badge
                              variant="danger"
                              className="absolute start-2 top-2"
                            >
                              -
                              {Math.round(
                                (1 - product.price / product.originalPrice) * 100
                              )}
                              %
                            </Badge>
                          )}
                          {!product.inStock && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <span className="rounded bg-white px-3 py-1 text-sm font-medium">
                                نفد المخزون
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="flex-1 p-4">
                        <Link
                          href={`/store/${product.storeSlug}`}
                          className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-500"
                        >
                          <Store className="h-3 w-3" />
                          {product.store}
                        </Link>

                        <Link href={`/product/${product.id}`}>
                          <h3 className="mt-1 font-medium text-gray-900 hover:text-primary-500 dark:text-white">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {product.rating}
                            </span>
                          </div>
                          <span className="text-sm text-gray-400">
                            ({product.reviews})
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-gray-900 dark:text-white">
                              {formatCurrency(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="ms-2 text-sm text-gray-500 line-through">
                                {formatCurrency(product.originalPrice)}
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-700">
                              <Heart className="h-5 w-5" />
                            </button>
                            <button
                              disabled={!product.inStock}
                              className="rounded-lg bg-primary-500 p-2 text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <ShoppingCart className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Search className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    لا توجد نتائج
                  </p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    جرب البحث بكلمات مختلفة أو تصفح الفئات
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
