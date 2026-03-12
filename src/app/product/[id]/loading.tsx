import { Header, Footer } from '@/components/layout'

export default function ProductDetailLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Placeholder */}
            <div className="animate-pulse">
              <div className="aspect-square w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
              <div className="mt-4 flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 w-20 rounded-lg bg-gray-200 dark:bg-gray-700" />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="animate-pulse space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
              </div>

              {/* Price */}
              <div className="h-10 w-32 rounded bg-gray-200 dark:bg-gray-700" />

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-28 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
              </div>

              {/* Description Lines */}
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-10 w-32 rounded-lg bg-gray-200 dark:bg-gray-700" />
              </div>

              {/* Add to Cart Button Placeholder */}
              <div className="h-12 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
