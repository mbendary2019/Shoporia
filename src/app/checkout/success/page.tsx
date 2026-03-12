'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Header, Footer } from '@/components/layout'
import { Card, Button } from '@/components/ui'
import {
  CheckCircle,
  Package,
  Truck,
  Home,
  Phone,
  MessageCircle,
} from 'lucide-react'
import { APP_CONFIG } from '@/utils/constants'

export default function CheckoutSuccessPage() {
  const t = useTranslations('checkoutSuccess')
  const tc = useTranslations('common')

  const orderNumber = 'SH-ABC123XYZ' // This would come from the order creation

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center bg-gray-50 py-12 dark:bg-gray-900">
        <div className="container-custom">
          <Card className="mx-auto max-w-2xl p-8 text-center">
            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>

            {/* Title */}
            <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              {t('title')}
            </h1>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              {t('description')}
            </p>

            {/* Order Number */}
            <div className="mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('orderNumber')}</p>
              <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                {orderNumber}
              </p>
            </div>

            {/* Order Status Steps */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-1 flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t('orderPlaced')}
                  </p>
                </div>

                <div className="h-0.5 flex-1 bg-gray-300 dark:bg-gray-600" />

                <div className="flex flex-1 flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 text-gray-400 dark:border-gray-600">
                    <Package className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{t('preparing')}</p>
                </div>

                <div className="h-0.5 flex-1 bg-gray-300 dark:bg-gray-600" />

                <div className="flex flex-1 flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 text-gray-400 dark:border-gray-600">
                    <Truck className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{t('onTheWay')}</p>
                </div>

                <div className="h-0.5 flex-1 bg-gray-300 dark:bg-gray-600" />

                <div className="flex flex-1 flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 text-gray-400 dark:border-gray-600">
                    <Home className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{t('delivered')}</p>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4 text-start dark:border-blue-800 dark:bg-blue-900/20">
              <h3 className="font-medium text-blue-800 dark:text-blue-400">
                {t('whatNext')}
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-blue-700 dark:text-blue-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{t('emailConfirmation')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{t('smsUpdates')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{t('expectedDelivery')}</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/account/orders">
                <Button>
                  <Package className="h-4 w-4" />
                  {t('trackOrder')}
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button variant="outline">{tc('continueShopping')}</Button>
              </Link>
            </div>

            {/* Support */}
            <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('haveQuestion')}
              </p>
              <div className="mt-3 flex items-center justify-center gap-4">
                <a
                  href={`tel:${APP_CONFIG.supportPhone}`}
                  className="flex items-center gap-2 text-sm text-primary-500 hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  {APP_CONFIG.supportPhone}
                </a>
                <a
                  href={`https://wa.me/${APP_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-green-600 hover:underline"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t('whatsapp')}
                </a>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
