'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Globe } from 'lucide-react'
import { cn } from '@/utils/cn'

interface LanguageSwitcherProps {
  variant?: 'header' | 'footer'
  className?: string
}

export function LanguageSwitcher({ variant = 'header', className }: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()

  const toggleLocale = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar'
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`
    router.refresh()
  }

  const label = locale === 'ar' ? 'English' : 'العربية'

  if (variant === 'footer') {
    return (
      <button
        onClick={toggleLocale}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded border border-gray-600 hover:border-white text-sm text-white transition-colors',
          className
        )}
      >
        <Globe className="h-4 w-4" />
        <span>{label}</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        'flex items-center gap-1.5 text-white p-2 rounded hover:outline hover:outline-1 hover:outline-white text-sm font-medium',
        className
      )}
      aria-label="تغيير اللغة"
    >
      <Globe className="h-4 w-4 text-white/70" />
      <span>{label}</span>
    </button>
  )
}
