'use client'

import { useState } from 'react'
import { Card, Button, Badge } from '@/components/ui'
import { formatCurrency, formatDate } from '@/utils/format'
import {
  Search,
  Filter,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  ChevronDown,
} from 'lucide-react'

// Mock orders data
const orders = [
  {
    id: 'SH-ABC123',
    customer: {
      name: 'أحمد محمد',
      phone: '01012345678',
      email: 'ahmed@example.com',
    },
    items: [
      { name: 'قميص قطن رجالي', quantity: 2, price: 450 },
      { name: 'بنطلون جينز', quantity: 1, price: 650 },
    ],
    total: 1550,
    status: 'pending',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    createdAt: '2024-12-10T10:30:00',
  },
  {
    id: 'SH-DEF456',
    customer: {
      name: 'سارة أحمد',
      phone: '01098765432',
      email: 'sara@example.com',
    },
    items: [{ name: 'حقيبة يد جلد', quantity: 1, price: 1250 }],
    total: 1250,
    status: 'confirmed',
    paymentMethod: 'vodafone_cash',
    paymentStatus: 'paid',
    createdAt: '2024-12-10T09:15:00',
  },
  {
    id: 'SH-GHI789',
    customer: {
      name: 'محمد علي',
      phone: '01155566677',
      email: 'mohamed@example.com',
    },
    items: [{ name: 'ساعة ذكية', quantity: 1, price: 2500 }],
    total: 2500,
    status: 'shipped',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    createdAt: '2024-12-09T16:45:00',
  },
  {
    id: 'SH-JKL012',
    customer: {
      name: 'نور حسن',
      phone: '01234567890',
      email: 'nour@example.com',
    },
    items: [
      { name: 'سماعات بلوتوث', quantity: 1, price: 899 },
      { name: 'كفر موبايل', quantity: 2, price: 150 },
    ],
    total: 1199,
    status: 'delivered',
    paymentMethod: 'instapay',
    paymentStatus: 'paid',
    createdAt: '2024-12-08T14:20:00',
  },
  {
    id: 'SH-MNO345',
    customer: {
      name: 'فاطمة علي',
      phone: '01011223344',
      email: 'fatma@example.com',
    },
    items: [{ name: 'فستان سهرة', quantity: 1, price: 1800 }],
    total: 1800,
    status: 'cancelled',
    paymentMethod: 'cash',
    paymentStatus: 'refunded',
    createdAt: '2024-12-07T11:00:00',
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

const paymentMethodLabels: Record<string, string> = {
  cash: 'نقدي',
  vodafone_cash: 'فودافون كاش',
  instapay: 'انستاباي',
  card: 'بطاقة',
  fawry: 'فوري',
}

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('')

  const filteredOrders = filterStatus
    ? orders.filter((o) => o.status === filterStatus)
    : orders

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            الطلبات
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            إدارة وتتبع طلبات العملاء
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = orders.filter((o) => o.status === key).length
          return (
            <button
              key={key}
              onClick={() =>
                setFilterStatus(filterStatus === key ? '' : key)
              }
              className={`rounded-lg border p-4 text-start transition-colors ${
                filterStatus === key
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <config.icon className={`h-5 w-5 ${config.color}`} />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {count}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {config.label}
              </p>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="ابحث برقم الطلب أو اسم العميل..."
              className="h-10 w-full rounded-lg border border-gray-300 bg-white pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            />
          </div>

          <div className="flex gap-3">
            <select className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800">
              <option value="">كل طرق الدفع</option>
              <option value="cash">نقدي</option>
              <option value="vodafone_cash">فودافون كاش</option>
              <option value="instapay">انستاباي</option>
              <option value="card">بطاقة</option>
            </select>

            <input
              type="date"
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
            />
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
                onClick={() =>
                  setExpandedOrder(isExpanded ? null : order.id)
                }
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(new Date(order.createdAt), 'dd MMM yyyy, hh:mm a')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-end">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {order.customer.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.items.length} منتج
                    </p>
                  </div>

                  <Badge variant={config.variant}>{config.label}</Badge>

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
                  <div className="grid gap-6 lg:grid-cols-3">
                    {/* Customer Info */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        معلومات العميل
                      </h4>
                      <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p>{order.customer.name}</p>
                        <p>{order.customer.phone}</p>
                        <p>{order.customer.email}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        المنتجات
                      </h4>
                      <div className="mt-2 space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600 dark:text-gray-400">
                              {item.name} × {item.quantity}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        الدفع
                      </h4>
                      <div className="mt-2 space-y-1 text-sm">
                        <p className="text-gray-600 dark:text-gray-400">
                          الطريقة:{' '}
                          {paymentMethodLabels[order.paymentMethod]}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          الحالة:{' '}
                          <Badge
                            variant={
                              order.paymentStatus === 'paid'
                                ? 'success'
                                : order.paymentStatus === 'refunded'
                                  ? 'danger'
                                  : 'warning'
                            }
                            className="ms-1"
                          >
                            {order.paymentStatus === 'paid'
                              ? 'مدفوع'
                              : order.paymentStatus === 'refunded'
                                ? 'مسترد'
                                : 'قيد الانتظار'}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                    <Button size="sm">
                      <Eye className="h-4 w-4" />
                      عرض التفاصيل
                    </Button>
                    {order.status === 'pending' && (
                      <>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-4 w-4" />
                          تأكيد
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600"
                        >
                          <XCircle className="h-4 w-4" />
                          إلغاء
                        </Button>
                      </>
                    )}
                    {order.status === 'confirmed' && (
                      <Button size="sm" variant="outline">
                        <Truck className="h-4 w-4" />
                        شحن
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
