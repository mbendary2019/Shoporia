import { Header, Footer } from '@/components/layout'

function CartItemSkeleton() {
  return (
    <div className="flex gap-4 border-b border-gray-200 py-4 dark:border-gray-700 animate-pulse">
      {/* Item Image */}
      <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-gray-200 dark:bg-gray-700" />

      {/* Item Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-2">
          <div className="h-4 w-48 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex items-center justify-between">
          {/* Quantity */}
          <div className="h-8 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
          {/* Price */}
          <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  )
}

export default function CartLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container-custom">
          {/* Page Title */}
          <div className="mb-6 animate-pulse">
            <div className="h-8 w-40 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              {[1, 2, 3].map((i) => (
                <CartItemSkeleton key={i} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 h-fit">
              <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                  <div className="flex justify-between">
                    <div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              </div>
              {/* Checkout Button Placeholder */}
              <div className="mt-6 h-12 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
