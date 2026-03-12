'use client'

import { useTranslations } from 'next-intl'

export default function Loading() {
  const t = useTranslations('common')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-primary-500" />
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{t('loading')}</p>
      </div>
    </div>
  )
}
