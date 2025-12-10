'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, Button, Badge } from '@/components/ui'
import { formatCurrency, formatDate } from '@/utils/format'
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  ChevronDown,
  Eye,
  RefreshCw,
} from 'lucide-react'

// Mock orders data
const orders = [
  {
    id: 'SH-ABC123',
    items: [
      { name: 'قميص قطن رجالي', quantity: 2, price: 450, image: '/products/shirt.jpg' },
      { name: 'بنطلون جينز', quantity: 1, price: 650, image: '/products/jeans.jpg' },
    ],
    total: 1550,
    status: 'delivered',
    paymentStatus: 'paid',
    createdAt: '2024-12-10T10:30:00',
    deliveredAt: '2024-12-14T15:00:00',
    store: 'متجر الأناقة',
  },
  {
    id: 'SH-DEF456',
    items: [
      { name: 'ساعة ذكية', quantity: 1, price: 2500, image: '/products/watch.jpg' },
    ],
    total: 2500,
    status: 'shipped',
    paymentStatus: 'paid',
    createdAt: '2024-12-12T09:15:00',
    trackingNumber: 'TRK123456789',
    store: 'متجر التقنية',
  },
  {
    id: 'SH-GHI789',
    items: [
      { name: 'حقيبة يد جلد', quantity: 1, price: 1250, image: '/products/bag.jpg' },
    ],
    total: 1250,
    status: 'processing',
    paymentStatus: 'paid',
    createdAt: '2024-12-13T16:45:00',
    store: 'بوتيك الجمال',
  },
  {
    id: 'SH-JKL012',
    items: [
      { name: 'سماعات بلوتوث', quantity: 1, price: 899, image: '/products/headphones.jpg' },
    ],
    total: 899,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-12-14T11:00:00',
    store: 'متجر التقنية',
  },
  {
    id: 'SH-MNO345',
    items: [
      { name: 'فستان سهرة', quantity: 1, price: 1800, image: '/products/dress.jpg' },
    ],
    total: 1800,
    status: 'cancelled',
    paymentStatus: 'refunded',
    createdAt: '2024-12-08T14:20:00',
    store: 'أزياء الشرق',
  },
]

const statusConfig = {
  pending: {
    label: 'قيد الانتظار',
    variant: 'warning' as const,
    icon: Clock,
    color: 'text-yellow-600',
  },
  confirmed: {
    label: 'تم التأكيد',
    variant: 'info' as const,
    icon: CheckCircle,
    color: 'text-blue-600',
  },
  processing: {
    label: 'جاري التجهيز',
    variant: 'info' as const,
    icon: Package,
    color: 'text-blue-600',
  },
  shipped: {
    label: 'تم الشحن',
    variant: 'default' as const,
    icon: Truck,
    color: 'text-purple-600',
  },
  delivered: {
    label: 'تم التوصيل',
    variant: 'success' as const,
    icon: CheckCircle,
    color: 'text-green-600',
  },
  cancelled: {
    label: 'ملغي',
    variant: 'danger' as const,
    icon: XCircle,
    color: 'text-red-600',
  },
}

export default function AccountOrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState('')

  const filteredOrders = filterStatus
    ? orders.filter((o) => o.status === filterStatus)
    : orders

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            طلباتي
          </h1>

          <div className="flex gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="ابحث برقم الطلب..."
                className="h-10 w-full rounded-lg border border-gray-300 bg-white pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="">كل الطلبات</option>
              <option value="pending">قيد الانتظار</option>
              <option value="processing">جاري التجهيز</option>
              <option value="shipped">تم الشحن</option>
              <option value="delivered">تم التوصيل</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const config = statusConfig[order.status as keyof typeof statusConfig]
          const isExpanded = expandedOrder === order.id

          return (
            <Card key={order.id} className="overflow-hidden">
              {/* Order Header */}
              <div
                className="flex cursor-pointer items-center justify-between p-4"
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 ${config.color}`}>
                    <config.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(new Date(order.createdAt), 'dd MMM yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-end">
                    <Badge variant={config.variant}>{config.label}</Badge>
                    <p className="mt-1 text-sm text-gray-500">
                      {order.items.length} منتج
                    </p>
                  </div>

                  <p className="font-bold text-gray-900 dark:text-white">
                    {formatCurrency(order.total)}
                  </p>

                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Order Details */}
              {isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                  {/* Store */}
                  <p className="mb-4 text-sm text-gray-500">
                    من: <span className="font-medium text-gray-900 dark:text-white">{order.store}</span>
                  </p>

                  {/* Items */}
                  <div className="mb-4 space-y-3">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-lg bg-white p-3 dark:bg-gray-800"
                      >
                        <div className="h-16 w-16 rounded-lg bg-gray-100 dark:bg-gray-700" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            الكمية: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tracking */}
                  {order.trackingNumber && (
                    <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20">
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        رقم التتبع: <span className="font-mono font-medium">{order.trackingNumber}</span>
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/account/orders/${order.id}`}>
                      <Button size="sm">
                        <Eye className="h-4 w-4" />
                        تفاصيل الطلب
                      </Button>
                    </Link>
                    {order.status === 'delivered' && (
                      <Button size="sm" variant="outline">
                        <RefreshCw className="h-4 w-4" />
                        إعادة الطلب
                      </Button>
                    )}
                    {order.status === 'pending' && (
                      <Button size="sm" variant="outline" className="text-red-600">
                        <XCircle className="h-4 w-4" />
                        إلغاء الطلب
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            لا توجد طلبات
          </p>
          <Link href="/marketplace" className="mt-4 inline-block">
            <Button>تسوق الآن</Button>
          </Link>
        </Card>
      )}
    </div>
  )
}
