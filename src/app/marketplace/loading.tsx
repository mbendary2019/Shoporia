import { Header, Footer } from '@/components/layout'

function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="mt-4 space-y-3">
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  )
}

export default function MarketplaceLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container-custom">
          {/* Search Skeleton */}
          <div className="mb-8 animate-pulse">
            <div className="h-12 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Filters Skeleton */}
          <div className="mb-6 flex gap-3 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
            ))}
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 15 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
