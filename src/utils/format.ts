import { format, formatDistanceToNow } from 'date-fns'
import { ar, enUS } from 'date-fns/locale'

// Format currency
export function formatCurrency(
  amount: number,
  currency: string = 'EGP',
  locale: string = 'ar-EG'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Format number
export function formatNumber(num: number, locale: string = 'ar-EG'): string {
  return new Intl.NumberFormat(locale).format(num)
}

// Format percentage
export function formatPercentage(value: number, locale: string = 'ar-EG'): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value / 100)
}

// Format date
export function formatDate(
  date: Date | string,
  formatStr: string = 'dd MMM yyyy',
  locale: string = 'ar'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, formatStr, {
    locale: locale === 'ar' ? ar : enUS,
  })
}

// Format time
export function formatTime(
  date: Date | string,
  formatStr: string = 'hh:mm a',
  locale: string = 'ar'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, formatStr, {
    locale: locale === 'ar' ? ar : enUS,
  })
}

// Format relative time
export function formatRelativeTime(date: Date | string, locale: string = 'ar'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(dateObj, {
    addSuffix: true,
    locale: locale === 'ar' ? ar : enUS,
  })
}

// Format phone number
export function formatPhone(phone: string): string {
  if (!phone) return ''
  // Format Egyptian phone: 01X XXXX XXXX
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`
  }
  return phone
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Slugify text
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0621-\u064A-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

// Generate order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `SH-${timestamp}-${random}`
}

// Generate booking number
export function generateBookingNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `BK-${timestamp}-${random}`
}
