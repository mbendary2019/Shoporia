import type { Metadata } from 'next'
import { Cairo, Tajawal } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import './globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
})

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Shoporia - منصة التجارة الإلكترونية الذكية',
    template: '%s | Shoporia',
  },
  description:
    'منصة تجارة إلكترونية ذكية تمكّنك من بناء متجرك وإدارة أعمالك بسهولة باستخدام الذكاء الاصطناعي',
  keywords: [
    'تجارة إلكترونية',
    'متجر إلكتروني',
    'بيع أونلاين',
    'مصر',
    'shoporia',
    'ecommerce',
    'marketplace',
  ],
  authors: [{ name: 'Shoporia' }],
  creator: 'Shoporia',
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: 'https://shoporia.com',
    siteName: 'Shoporia',
    title: 'Shoporia - منصة التجارة الإلكترونية الذكية',
    description:
      'منصة تجارة إلكترونية ذكية تمكّنك من بناء متجرك وإدارة أعمالك بسهولة',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shoporia - منصة التجارة الإلكترونية الذكية',
    description:
      'منصة تجارة إلكترونية ذكية تمكّنك من بناء متجرك وإدارة أعمالك بسهولة',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${cairo.variable} ${tajawal.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-gray-50 font-sans antialiased dark:bg-gray-900">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
