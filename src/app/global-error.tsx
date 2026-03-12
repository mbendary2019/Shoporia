'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('common')

  useEffect(() => {
    import('@/lib/error-tracking').then(({ reportError }) => {
      reportError(error, { source: 'global-error-boundary', digest: error.digest })
    })
  }, [error])

  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-gray-50">
        <div className="flex min-h-screen items-center justify-center">
          <div className="mx-4 max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-10 w-10 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              {t('unexpectedError') || 'حدث خطأ غير متوقع'}
            </h2>
            <p className="mt-2 text-gray-600">
              {t('tryAgainMessage') || 'نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى.'}
            </p>
            <button
              onClick={reset}
              className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              {t('tryAgain') || 'حاول مرة أخرى'}
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
