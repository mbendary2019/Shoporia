function StatSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-7 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  )
}

function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 px-6 py-4 dark:border-gray-700 animate-pulse">
      <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-32 flex-1 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
    </div>
  )
}

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-pulse">
        <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-2 h-4 w-64 rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <StatSkeleton key={i} />
        ))}
      </div>

      {/* Chart */}
      <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-6 h-64 rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Recent Orders */}
      <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700 animate-pulse">
          <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <TableRowSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
