'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Input, Badge } from '@/components/ui'
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Search,
  Box,
  Home,
} from 'lucide-react'

const trackingSteps = [
  { id: 1, status: 'تم استلام الطلب', icon: Box, completed: true, date: '10 ديسمبر 2024 - 10:30 ص' },
  { id: 2, status: 'جاري التحضير', icon: Package, completed: true, date: '10 ديسمبر 2024 - 2:15 م' },
  { id: 3, status: 'تم الشحن', icon: Truck, completed: true, date: '11 ديسمبر 2024 - 9:00 ص' },
  { id: 4, status: 'في الطريق إليك', icon: MapPin, completed: false, current: true, date: 'متوقع: 12 ديسمبر 2024' },
  { id: 5, status: 'تم التوصيل', icon: Home, completed: false, date: '' },
]

export default function TrackPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [showTracking, setShowTracking] = useState(false)

  const handleTrack = () => {
    if (orderNumber.trim()) {
      setShowTracking(true)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-navy py-12">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-amazon-orange flex items-center justify-center mx-auto mb-6">
              <Truck className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              تتبع طلبك
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              أدخل رقم الطلب لمعرفة حالة شحنتك
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="py-8">
          <div className="container-custom">
            <Card className="max-w-xl mx-auto p-6">
              <div className="flex gap-3">
                <Input
                  placeholder="أدخل رقم الطلب (مثال: SHP-123456)"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleTrack}
                  className="bg-amazon-orange hover:bg-amazon-orangeHover"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Tracking Result */}
        {showTracking && (
          <section className="py-8">
            <div className="container-custom">
              <Card className="max-w-2xl mx-auto p-6">
                {/* Order Info */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b dark:border-gray-700">
                  <div>
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                      طلب #{orderNumber || 'SHP-123456'}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      تاريخ الطلب: 10 ديسمبر 2024
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">
                    في الطريق
                  </Badge>
                </div>

                {/* Tracking Steps */}
                <div className="relative">
                  {trackingSteps.map((step, index) => (
                    <div key={step.id} className="flex gap-4 mb-6 last:mb-0">
                      {/* Icon */}
                      <div className="relative">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            step.completed
                              ? 'bg-green-500 text-white'
                              : step.current
                              ? 'bg-amazon-orange text-white animate-pulse'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                          }`}
                        >
                          <step.icon className="h-5 w-5" />
                        </div>
                        {/* Line */}
                        {index < trackingSteps.length - 1 && (
                          <div
                            className={`absolute top-10 start-1/2 -translate-x-1/2 w-0.5 h-10 ${
                              step.completed
                                ? 'bg-green-500'
                                : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3
                          className={`font-medium ${
                            step.completed || step.current
                              ? 'text-gray-900 dark:text-white'
                              : 'text-gray-400'
                          }`}
                        >
                          {step.status}
                        </h3>
                        {step.date && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {step.date}
                          </p>
                        )}
                      </div>

                      {/* Status */}
                      {step.completed && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {step.current && (
                        <Clock className="h-5 w-5 text-amazon-orange" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Estimated Delivery */}
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Truck className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        موعد التوصيل المتوقع
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        12 ديسمبر 2024 - بين 2:00 م و 6:00 م
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Help */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              تحتاج مساعدة؟
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              تواصل مع خدمة العملاء للاستفسار عن طلبك
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline">
                واتساب
              </Button>
              <Button variant="outline">
                اتصل بنا
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
