'use client'

import Link from 'next/link'
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

export default function CheckoutSuccessPage() {
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
              تم استلام طلبك بنجاح!
            </h1>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              شكراً لك على طلبك. سنقوم بمعالجته وإرساله في أقرب وقت ممكن.
            </p>

            {/* Order Number */}
            <div className="mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">رقم الطلب</p>
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
                    تم الطلب
                  </p>
                </div>

                <div className="h-0.5 flex-1 bg-gray-300 dark:bg-gray-600" />

                <div className="flex flex-1 flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 text-gray-400 dark:border-gray-600">
                    <Package className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">قيد التجهيز</p>
                </div>

                <div className="h-0.5 flex-1 bg-gray-300 dark:bg-gray-600" />

                <div className="flex flex-1 flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 text-gray-400 dark:border-gray-600">
                    <Truck className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">في الطريق</p>
                </div>

                <div className="h-0.5 flex-1 bg-gray-300 dark:bg-gray-600" />

                <div className="flex flex-1 flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 text-gray-400 dark:border-gray-600">
                    <Home className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">تم التوصيل</p>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4 text-start dark:border-blue-800 dark:bg-blue-900/20">
              <h3 className="font-medium text-blue-800 dark:text-blue-400">
                ماذا بعد؟
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-blue-700 dark:text-blue-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>سيتم إرسال تأكيد الطلب على بريدك الإلكتروني ورقم هاتفك</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>سنقوم بتحديثك بحالة الطلب عبر الرسائل النصية</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>التوصيل المتوقع خلال 3-5 أيام عمل</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/account/orders">
                <Button>
                  <Package className="h-4 w-4" />
                  تتبع الطلب
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button variant="outline">متابعة التسوق</Button>
              </Link>
            </div>

            {/* Support */}
            <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                هل لديك سؤال؟ تواصل معنا
              </p>
              <div className="mt-3 flex items-center justify-center gap-4">
                <a
                  href="tel:01012345678"
                  className="flex items-center gap-2 text-sm text-primary-500 hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  01012345678
                </a>
                <a
                  href="https://wa.me/201012345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-green-600 hover:underline"
                >
                  <MessageCircle className="h-4 w-4" />
                  واتساب
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
