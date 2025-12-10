'use client'

import { useState } from 'react'
import { Card, Button, Badge } from '@/components/ui'
import { formatCurrency } from '@/utils/format'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Eye,
  Star,
  ArrowUpRight,
  Calendar,
  Download,
  RefreshCw,
} from 'lucide-react'

// Mock data
const stats = [
  {
    name: 'إجمالي الإيرادات',
    value: 125000,
    change: '+18%',
    changeType: 'positive' as const,
    icon: DollarSign,
    format: 'currency',
  },
  {
    name: 'الطلبات',
    value: 234,
    change: '+12%',
    changeType: 'positive' as const,
    icon: ShoppingCart,
    format: 'number',
  },
  {
    name: 'العملاء الجدد',
    value: 89,
    change: '+5%',
    changeType: 'positive' as const,
    icon: Users,
    format: 'number',
  },
  {
    name: 'زيارات المتجر',
    value: 12500,
    change: '-3%',
    changeType: 'negative' as const,
    icon: Eye,
    format: 'number',
  },
]

const topProducts = [
  { id: '1', name: 'ساعة ذكية متطورة', sales: 45, revenue: 112500, rating: 4.8 },
  { id: '2', name: 'حقيبة يد جلد طبيعي', sales: 38, revenue: 47500, rating: 4.6 },
  { id: '3', name: 'سماعات بلوتوث لاسلكية', sales: 32, revenue: 28768, rating: 4.5 },
  { id: '4', name: 'قميص قطن فاخر', sales: 28, revenue: 12600, rating: 4.7 },
  { id: '5', name: 'بنطلون جينز', sales: 25, revenue: 16250, rating: 4.4 },
]

const recentOrders = [
  { id: 'SH-001', customer: 'أحمد محمد', amount: 2500, status: 'delivered' },
  { id: 'SH-002', customer: 'سارة أحمد', amount: 1250, status: 'shipped' },
  { id: 'SH-003', customer: 'محمد علي', amount: 450, status: 'processing' },
  { id: 'SH-004', customer: 'نور حسن', amount: 899, status: 'pending' },
  { id: 'SH-005', customer: 'فاطمة علي', amount: 1800, status: 'delivered' },
]

const salesByDay = [
  { day: 'السبت', sales: 12500 },
  { day: 'الأحد', sales: 18000 },
  { day: 'الاثنين', sales: 15500 },
  { day: 'الثلاثاء', sales: 22000 },
  { day: 'الأربعاء', sales: 19500 },
  { day: 'الخميس', sales: 25000 },
  { day: 'الجمعة', sales: 12500 },
]

const statusColors = {
  delivered: 'bg-green-100 text-green-700',
  shipped: 'bg-purple-100 text-purple-700',
  processing: 'bg-blue-100 text-blue-700',
  pending: 'bg-yellow-100 text-yellow-700',
}

const statusLabels = {
  delivered: 'تم التوصيل',
  shipped: 'تم الشحن',
  processing: 'جاري التجهيز',
  pending: 'قيد الانتظار',
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('week')

  const maxSales = Math.max(...salesByDay.map((d) => d.sales))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            التحليلات والتقارير
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            إحصائيات أداء متجرك
          </p>
        </div>

        <div className="flex gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
          >
            <option value="today">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
            <option value="year">هذا العام</option>
          </select>

          <Button variant="outline">
            <Download className="h-4 w-4" />
            تصدير
          </Button>

          <Button variant="outline">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
              <span
                className={`flex items-center text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="me-1 h-4 w-4" />
                ) : (
                  <TrendingDown className="me-1 h-4 w-4" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
              {stat.format === 'currency'
                ? formatCurrency(stat.value)
                : stat.value.toLocaleString('ar-EG')}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            المبيعات اليومية
          </h2>

          <div className="mt-6">
            <div className="flex items-end justify-between gap-2" style={{ height: '200px' }}>
              {salesByDay.map((day) => (
                <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-primary-500 transition-all hover:bg-primary-600"
                    style={{ height: `${(day.sales / maxSales) * 100}%`, minHeight: '20px' }}
                  />
                  <span className="text-xs text-gray-500">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500">إجمالي الأسبوع</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(salesByDay.reduce((sum, d) => sum + d.sales, 0))}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">متوسط اليوم</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(Math.round(salesByDay.reduce((sum, d) => sum + d.sales, 0) / 7))}
              </p>
            </div>
          </div>
        </Card>

        {/* Top Products */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              أفضل المنتجات مبيعاً
            </h2>
            <Button variant="ghost" size="sm">
              عرض الكل
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-4"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {index + 1}
                </span>
                <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-700" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{product.sales} مبيعة</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </span>
                  </div>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(product.revenue)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              آخر الطلبات
            </h2>
            <Button variant="ghost" size="sm">
              عرض الكل
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {order.customer}
                    </p>
                    <p className="text-sm text-gray-500">{order.id}</p>
                  </div>
                </div>
                <div className="text-end">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(order.amount)}
                  </p>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      statusColors[order.status as keyof typeof statusColors]
                    }`}
                  >
                    {statusLabels[order.status as keyof typeof statusLabels]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Customer Insights */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            رؤى العملاء
          </h2>

          <div className="mt-4 space-y-4">
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">معدل التحويل</span>
                <span className="font-bold text-gray-900 dark:text-white">3.2%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-full w-[32%] rounded-full bg-primary-500" />
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">معدل الارتداد</span>
                <span className="font-bold text-gray-900 dark:text-white">45%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-full w-[45%] rounded-full bg-yellow-500" />
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">العملاء المتكررين</span>
                <span className="font-bold text-gray-900 dark:text-white">28%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-full w-[28%] rounded-full bg-green-500" />
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">متوسط قيمة الطلب</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatCurrency(534)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Traffic Sources */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          مصادر الزيارات
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <span className="font-bold text-blue-600">G</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">البحث</p>
                <p className="font-bold text-gray-900 dark:text-white">45%</p>
              </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div className="h-full w-[45%] rounded-full bg-blue-500" />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/30">
                <span className="font-bold text-pink-600">I</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">انستجرام</p>
                <p className="font-bold text-gray-900 dark:text-white">28%</p>
              </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div className="h-full w-[28%] rounded-full bg-pink-500" />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <span className="font-bold text-blue-600">F</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">فيسبوك</p>
                <p className="font-bold text-gray-900 dark:text-white">18%</p>
              </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div className="h-full w-[18%] rounded-full bg-blue-700" />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                <span className="font-bold text-gray-600">D</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">مباشر</p>
                <p className="font-bold text-gray-900 dark:text-white">9%</p>
              </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div className="h-full w-[9%] rounded-full bg-gray-500" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
