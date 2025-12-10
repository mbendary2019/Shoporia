'use client'

import { Card, Badge } from '@/components/ui'
import { formatCurrency } from '@/utils/format'
import {
  Store,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
} from 'lucide-react'
import Link from 'next/link'

// Mock stats data
const stats = [
  {
    name: 'إجمالي المتاجر',
    value: '1,234',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Store,
    href: '/admin/stores',
  },
  {
    name: 'المنتجات النشطة',
    value: '45,678',
    change: '+8%',
    changeType: 'positive' as const,
    icon: Package,
    href: '/admin/products',
  },
  {
    name: 'الطلبات اليوم',
    value: '892',
    change: '+23%',
    changeType: 'positive' as const,
    icon: ShoppingCart,
    href: '/admin/orders',
  },
  {
    name: 'المستخدمين',
    value: '56,789',
    change: '+5%',
    changeType: 'positive' as const,
    icon: Users,
    href: '/admin/users',
  },
  {
    name: 'إيرادات اليوم',
    value: formatCurrency(125000),
    change: '+18%',
    changeType: 'positive' as const,
    icon: DollarSign,
    href: '/admin/analytics',
  },
  {
    name: 'البلاغات المعلقة',
    value: '23',
    change: '-5%',
    changeType: 'negative' as const,
    icon: AlertTriangle,
    href: '/admin/reports',
  },
]

// Mock pending approvals
const pendingApprovals = [
  {
    id: '1',
    type: 'store',
    name: 'متجر الأناقة الجديد',
    owner: 'أحمد محمد',
    date: '2024-12-10',
  },
  {
    id: '2',
    type: 'store',
    name: 'بوتيك الجمال',
    owner: 'سارة أحمد',
    date: '2024-12-10',
  },
  {
    id: '3',
    type: 'product',
    name: 'ساعة ذكية فاخرة',
    store: 'متجر التقنية',
    date: '2024-12-09',
  },
]

// Mock recent activities
const recentActivities = [
  {
    id: '1',
    action: 'تسجيل متجر جديد',
    details: 'متجر الأناقة الجديد',
    time: 'منذ 5 دقائق',
    icon: Store,
    color: 'text-blue-500',
  },
  {
    id: '2',
    action: 'طلب جديد',
    details: 'طلب بقيمة 2,500 ج.م',
    time: 'منذ 10 دقائق',
    icon: ShoppingCart,
    color: 'text-green-500',
  },
  {
    id: '3',
    action: 'بلاغ جديد',
    details: 'بلاغ على منتج',
    time: 'منذ 15 دقيقة',
    icon: AlertTriangle,
    color: 'text-red-500',
  },
  {
    id: '4',
    action: 'مستخدم جديد',
    details: 'تسجيل مستخدم جديد',
    time: 'منذ 20 دقيقة',
    icon: Users,
    color: 'text-purple-500',
  },
]

// Mock top stores
const topStores = [
  { id: '1', name: 'متجر الأناقة', sales: 125000, orders: 234, rating: 4.8 },
  { id: '2', name: 'بوتيك الجمال', sales: 98000, orders: 187, rating: 4.7 },
  { id: '3', name: 'متجر التقنية', sales: 87500, orders: 156, rating: 4.6 },
  { id: '4', name: 'أزياء الشرق', sales: 76000, orders: 143, rating: 4.5 },
  { id: '5', name: 'دار العطور', sales: 65000, orders: 121, rating: 4.9 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          لوحة تحكم الإدارة
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          نظرة عامة على أداء المنصة
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="p-4 transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between">
                <stat.icon className="h-8 w-8 text-gray-400" />
                <span
                  className={`flex items-center text-sm font-medium ${
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
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
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.name}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Approvals */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              طلبات الموافقة المعلقة
            </h2>
            <Badge variant="warning">{pendingApprovals.length}</Badge>
          </div>

          <div className="mt-4 space-y-4">
            {pendingApprovals.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      item.type === 'store' ? 'bg-blue-100' : 'bg-green-100'
                    }`}
                  >
                    {item.type === 'store' ? (
                      <Store className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Package className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.type === 'store' ? item.owner : item.store} •{' '}
                      {item.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-green-100 p-2 text-green-600 hover:bg-green-200">
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200">
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/admin/stores?status=pending"
            className="mt-4 flex items-center justify-center gap-2 text-sm text-primary-500 hover:underline"
          >
            عرض الكل
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Card>

        {/* Recent Activities */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            آخر الأنشطة
          </h2>

          <div className="mt-4 space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 ${activity.color}`}
                >
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.details}</p>
                </div>
                <span className="flex items-center text-sm text-gray-400">
                  <Clock className="me-1 h-4 w-4" />
                  {activity.time}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/admin/logs"
            className="mt-4 flex items-center justify-center gap-2 text-sm text-primary-500 hover:underline"
          >
            عرض كل السجلات
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Card>
      </div>

      {/* Top Stores */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            أفضل المتاجر
          </h2>
          <Link
            href="/admin/stores"
            className="text-sm text-primary-500 hover:underline"
          >
            عرض الكل
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-start text-sm font-medium text-gray-500">
                  المتجر
                </th>
                <th className="pb-3 text-start text-sm font-medium text-gray-500">
                  المبيعات
                </th>
                <th className="pb-3 text-start text-sm font-medium text-gray-500">
                  الطلبات
                </th>
                <th className="pb-3 text-start text-sm font-medium text-gray-500">
                  التقييم
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {topStores.map((store, index) => (
                <tr key={store.id}>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {store.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600 dark:text-gray-400">
                    {formatCurrency(store.sales)}
                  </td>
                  <td className="py-4 text-gray-600 dark:text-gray-400">
                    {store.orders}
                  </td>
                  <td className="py-4">
                    <Badge variant="success">⭐ {store.rating}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
