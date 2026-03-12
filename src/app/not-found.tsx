import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="mx-4 max-w-md text-center">
        <p className="text-8xl font-bold text-primary-500">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
          الصفحة غير موجودة
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
          >
            الصفحة الرئيسية
          </Link>
          <Link
            href="/marketplace"
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
          >
            تصفح المنتجات
          </Link>
        </div>
      </div>
    </div>
  )
}
