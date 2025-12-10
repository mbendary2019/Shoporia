'use client'

import { useState } from 'react'
import { Card, Button, Badge, Avatar } from '@/components/ui'
import { formatCurrency, formatDate } from '@/utils/format'
import {
  Search,
  ShoppingCart,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Package,
  DollarSign,
  TrendingUp,
} from 'lucide-react'

// Mock orders data
const orders = [
  {
    id: 'SH-ABC123',
    customer: { name: 'أحمد محمد', email: 'ahmed@example.com' },
    store: 'متجر الأناقة',
    items: 3,
    total: 2500,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'vodafone_cash',
    createdAt: '2024-12-10T10:30:00',
  },
  {
    id: 'SH-DEF456',
    customer: { name: 'سارة أحمد', email: 'sara@example.com' },
    store: 'بوتيك الجمال',
    items: 1,
    total: 1250,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'instapay',
    createdAt: '2024-12-11T09:15:00',
  },
  {
    id: 'SH-GHI789',
    customer: { name: 'محمد علي', email: 'mohamed@example.com' },
    store: 'متجر التقنية',
    items: 2,
    total: 3400,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    createdAt: '2024-12-12T16:45:00',
  },
  {
    id: 'SH-JKL012',
    customer: { name: 'نور حسن', email: 'nour@example.com' },
    store: 'متجر الأناقة',
    items: 1,
    total: 899,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'cash',
    createdAt: '2024-12-13T11:00:00',
  },
  {
    id: 'SH-MNO345',
    customer: { name: 'فاطمة علي', email: 'fatma@example.com' },
    store: 'دار العطور',
    items: 2,
    total: 1800,
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'vodafone_cash',
    createdAt: '2024-12-08T14:20:00',
  },
]

const statusConfig = {
  pending: { label: 'قيد الانتظار', variant: 'warning' as const, icon: Clock },
  confirmed: { label: 'تم التأكيد', variant: 'info' as const, icon: CheckCircle },
  processing: { label: 'جاري التجهيز', variant: 'info' as const, icon: Package },
  shipped: { label: 'تم الشحن', variant: 'default' as const, icon: Truck },
  delivered: { label: 'تم التوصيل', variant: 'success' as const, icon: CheckCircle },
  cancelled: { label: 'ملغي', variant: 'danger' as const, icon: XCircle },
}

const paymentStatusConfig = {
  pending: { label: 'قيد الانتظار', variant: 'warning' as const },
  paid: { label: 'مدفوع', variant: 'success' as const },
  refunded: { label: 'مسترد', variant: 'danger' as const },
}

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPayment, setFilterPayment] = useState('')

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.includes(searchQuery) ||
      order.customer.name.includes(searchQuery) ||
      order.store.includes(searchQuery)
    const matchesStatus = !filterStatus || order.status === filterStatus
    const matchesPayment = !filterPayment || order.paymentStatus === filterPayment
    return matchesSearch && matchesStatus && matchesPayment
  })

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            إدارة الطلبات
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            متابعة وإدارة جميع طلبات المنصة
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إجمالي الطلبات</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-primary-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">قيد الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600">23</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">تم الشحن</p>
              <p className="text-2xl font-bold text-purple-600">56</p>
            </div>
            <Truck className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">مكتمل</p>
              <p className="text-2xl font-bold text-green-600">1,089</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">الإيرادات</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم الطلب أو العميل..."
              className="h-10 w-full rounded-lg border border-gray-300 bg-white pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="">كل الحالات</option>
              <option value="pending">قيد الانتظار</option>
              <option value="processing">جاري التجهيز</option>
              <option value="shipped">تم الشحن</option>
              <option value="delivered">تم التوصيل</option>
              <option value="cancelled">ملغي</option>
            </select>

            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="">كل المدفوعات</option>
              <option value="pending">قيد الانتظار</option>
              <option value="paid">مدفوع</option>
              <option value="refunded">مسترد</option>
            </select>

            <input
              type="date"
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
            />
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  رقم الطلب
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  العميل
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  المتجر
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  المنتجات
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  المبلغ
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  الدفع
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  الحالة
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  التاريخ
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig]
                const payment = paymentStatusConfig[order.paymentStatus as keyof typeof paymentStatusConfig]
                return (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {order.id}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar fallback={order.customer.name} size="sm" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {order.customer.name}
                          </p>
                          <p className="text-sm text-gray-500">{order.customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-400">
                      {order.store}
                    </td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-400">
                      {order.items} منتج
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={payment.variant}>{payment.label}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={status.variant}>
                        <status.icon className="me-1 h-3 w-3" />
                        {status.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {formatDate(new Date(order.createdAt), 'dd MMM yyyy')}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-gray-700">
          <p className="text-sm text-gray-500">
            عرض 1 - {filteredOrders.length} من {orders.length} طلب
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled>
              السابق
            </Button>
            <Button size="sm" variant="outline">
              التالي
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
