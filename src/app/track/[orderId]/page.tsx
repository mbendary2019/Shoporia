'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import { formatDate, formatCurrency } from '@/utils/format'
import {
  Package,
  Truck,
  MapPin,
  CheckCircle,
  Clock,
  Phone,
  MessageSquare,
  Copy,
  ExternalLink,
  Box,
  PackageCheck,
  Home,
  ArrowLeft,
} from 'lucide-react'

// Mock order data
const orderData = {
  id: 'ORD-2024-001234',
  status: 'shipping',
  estimatedDelivery: '2024-12-15',
  shippingCompany: 'أرامكس',
  trackingNumber: 'ARX123456789EG',
  trackingUrl: 'https://aramex.com/track',
  items: [
    {
      id: '1',
      name: 'ساعة ذكية متطورة',
      image: '/products/watch.jpg',
      quantity: 1,
      price: 2499,
    },
    {
      id: '2',
      name: 'سماعات بلوتوث لاسلكية',
      image: '/products/earbuds.jpg',
      quantity: 2,
      price: 799,
    },
  ],
  shippingAddress: {
    name: 'أحمد محمد',
    phone: '01012345678',
    address: 'شارع التحرير، عمارة 15، شقة 5',
    city: 'القاهرة',
    area: 'الدقي',
  },
  timeline: [
    {
      status: 'confirmed',
      title: 'تم تأكيد الطلب',
      description: 'تم استلام طلبك وجاري تجهيزه',
      date: '2024-12-10T10:30:00',
      completed: true,
    },
    {
      status: 'processing',
      title: 'جاري التجهيز',
      description: 'يتم تجهيز طلبك للشحن',
      date: '2024-12-11T09:00:00',
      completed: true,
    },
    {
      status: 'shipped',
      title: 'تم الشحن',
      description: 'تم تسليم طلبك لشركة الشحن',
      date: '2024-12-12T14:20:00',
      completed: true,
    },
    {
      status: 'out_for_delivery',
      title: 'في الطريق إليك',
      description: 'المندوب في طريقه لتسليم طلبك',
      date: null,
      completed: false,
    },
    {
      status: 'delivered',
      title: 'تم التسليم',
      description: 'تم تسليم طلبك بنجاح',
      date: null,
      completed: false,
    },
  ],
  updates: [
    {
      date: '2024-12-12T14:20:00',
      location: 'مركز الفرز - القاهرة',
      description: 'تم استلام الشحنة من البائع',
    },
    {
      date: '2024-12-12T18:45:00',
      location: 'مركز التوزيع - الجيزة',
      description: 'الشحنة في طريقها للتوزيع',
    },
    {
      date: '2024-12-13T08:00:00',
      location: 'فرع الدقي',
      description: 'تم استلام الشحنة في الفرع المحلي',
    },
  ],
}

const statusConfig = {
  pending: { label: 'قيد الانتظار', color: 'bg-gray-500' },
  confirmed: { label: 'تم التأكيد', color: 'bg-blue-500' },
  processing: { label: 'جاري التجهيز', color: 'bg-yellow-500' },
  shipping: { label: 'جاري الشحن', color: 'bg-purple-500' },
  delivered: { label: 'تم التسليم', color: 'bg-green-500' },
  cancelled: { label: 'ملغي', color: 'bg-red-500' },
}

export default function TrackOrderPage() {
  const params = useParams()
  const orderId = params.orderId as string
  const [copied, setCopied] = useState(false)

  const currentStatus = statusConfig[orderData.status as keyof typeof statusConfig]
  const subtotal = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(orderData.trackingNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container-custom">
          {/* Back Link */}
          <Link
            href="/account/orders"
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة للطلبات
          </Link>

          {/* Order Header */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  تتبع الطلب
                </h1>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  رقم الطلب: {orderData.id}
                </p>
              </div>
              <Badge
                className={`${currentStatus.color} text-white px-4 py-2 text-sm`}
              >
                {currentStatus.label}
              </Badge>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Delivery Progress */}
              <Card className="p-6">
                <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                  حالة التوصيل
                </h2>

                {/* Progress Bar */}
                <div className="relative mb-8">
                  <div className="flex justify-between">
                    {orderData.timeline.map((step, index) => {
                      const isCompleted = step.completed
                      const isCurrent =
                        !step.completed &&
                        (index === 0 || orderData.timeline[index - 1].completed)

                      return (
                        <div
                          key={step.status}
                          className="relative flex flex-col items-center"
                          style={{ width: `${100 / orderData.timeline.length}%` }}
                        >
                          {/* Connector Line */}
                          {index > 0 && (
                            <div
                              className={`absolute top-5 -start-1/2 h-1 w-full ${
                                orderData.timeline[index - 1].completed
                                  ? 'bg-primary-500'
                                  : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                              style={{ zIndex: 0 }}
                            />
                          )}

                          {/* Icon */}
                          <div
                            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                              isCompleted
                                ? 'bg-primary-500 text-white'
                                : isCurrent
                                  ? 'bg-primary-100 text-primary-500 ring-4 ring-primary-100 dark:bg-primary-900 dark:ring-primary-900'
                                  : 'bg-gray-200 text-gray-400 dark:bg-gray-700'
                            }`}
                          >
                            {step.status === 'confirmed' && <CheckCircle className="h-5 w-5" />}
                            {step.status === 'processing' && <Box className="h-5 w-5" />}
                            {step.status === 'shipped' && <Truck className="h-5 w-5" />}
                            {step.status === 'out_for_delivery' && <PackageCheck className="h-5 w-5" />}
                            {step.status === 'delivered' && <Home className="h-5 w-5" />}
                          </div>

                          {/* Label */}
                          <p
                            className={`mt-2 text-center text-xs ${
                              isCompleted || isCurrent
                                ? 'font-medium text-gray-900 dark:text-white'
                                : 'text-gray-500'
                            }`}
                          >
                            {step.title}
                          </p>
                          {step.date && (
                            <p className="text-center text-xs text-gray-500">
                              {formatDate(new Date(step.date), 'dd/MM')}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Estimated Delivery */}
                <div className="rounded-lg bg-primary-50 p-4 dark:bg-primary-900/20">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        التسليم المتوقع
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {formatDate(new Date(orderData.estimatedDelivery), 'EEEE, dd MMMM yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Shipping Updates */}
              <Card className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    تحديثات الشحن
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{orderData.shippingCompany}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyTrackingNumber}
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="ms-1">{orderData.trackingNumber}</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {orderData.updates.map((update, index) => (
                    <div
                      key={index}
                      className="relative flex gap-4 pb-4 last:pb-0"
                    >
                      {/* Timeline connector */}
                      {index < orderData.updates.length - 1 && (
                        <div className="absolute start-2 top-6 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                      )}

                      {/* Dot */}
                      <div
                        className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full ${
                          index === 0
                            ? 'bg-primary-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />

                      {/* Content */}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {update.description}
                        </p>
                        <p className="text-sm text-gray-500">{update.location}</p>
                        <p className="text-xs text-gray-400">
                          {formatDate(new Date(update.date), 'dd MMM yyyy - HH:mm')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => window.open(orderData.trackingUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                  تتبع على موقع الشركة
                </Button>
              </Card>

              {/* Order Items */}
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                  محتويات الطلب
                </h2>

                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          الكمية: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Delivery Address */}
              <Card className="p-6">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                  <MapPin className="h-5 w-5 text-primary-500" />
                  عنوان التوصيل
                </h3>

                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {orderData.shippingAddress.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {orderData.shippingAddress.address}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {orderData.shippingAddress.area}، {orderData.shippingAddress.city}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {orderData.shippingAddress.phone}
                  </p>
                </div>
              </Card>

              {/* Order Summary */}
              <Card className="p-6">
                <h3 className="mb-4 font-bold text-gray-900 dark:text-white">
                  ملخص الطلب
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      المجموع الفرعي
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">الشحن</span>
                    <span className="text-green-600">مجاني</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900 dark:text-white">
                        الإجمالي
                      </span>
                      <span className="font-bold text-primary-500">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Contact Support */}
              <Card className="p-6">
                <h3 className="mb-4 font-bold text-gray-900 dark:text-white">
                  هل تحتاج مساعدة؟
                </h3>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4" />
                    اتصل بالدعم
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4" />
                    محادثة مباشرة
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
