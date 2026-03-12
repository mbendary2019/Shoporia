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
import { useTranslations } from 'next-intl'

export default function AdminDashboard() {
  const t = useTranslations('admin')

  // Mock stats data
  const stats = [
    {
      name: t('totalStores'),
      value: '1,234',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Store,
      href: '/admin/stores',
    },
    {
      name: t('activeProducts'),
      value: '45,678',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Package,
      href: '/admin/products',
    },
    {
      name: t('todayOrders'),
      value: '892',
      change: '+23%',
      changeType: 'positive' as const,
      icon: ShoppingCart,
      href: '/admin/orders',
    },
    {
      name: t('users'),
      value: '56,789',
      change: '+5%',
      changeType: 'positive' as const,
      icon: Users,
      href: '/admin/users',
    },
    {
      name: t('todayRevenue'),
      value: formatCurrency(125000),
      change: '+18%',
      changeType: 'positive' as const,
      icon: DollarSign,
      href: '/admin/analytics',
    },
    {
      name: t('pendingReports'),
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
      action: t('newStoreRegistration'),
      details: 'متجر الأناقة الجديد',
      time: `${t('ago')} 5 ${t('minutes')}`,
      icon: Store,
      color: 'text-blue-500',
    },
    {
      id: '2',
      action: t('newReport'), // TODO: no exact key for "طلب جديد" (new order)
      details: 'طلب بقيمة 2,500 ج.م',
      time: `${t('ago')} 10 ${t('minutes')}`,
      icon: ShoppingCart,
      color: 'text-green-500',
    },
    {
      id: '3',
      action: t('newReport'),
      details: t('reportOnProduct'),
      time: `${t('ago')} 15 ${t('minute')}`,
      icon: AlertTriangle,
      color: 'text-red-500',
    },
    {
      id: '4',
      action: t('newUser'),
      details: t('newUserRegistration'),
      time: `${t('ago')} 20 ${t('minute')}`,
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('title')}
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          {t('platformOverview')}
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
              {t('pendingApprovals')}
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
            {t('viewAllLogs')}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Card>

        {/* Recent Activities */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('recentActivities')}
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
            {t('viewAllLogs')}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Card>
      </div>

      {/* Top Stores */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('topStores')}
          </h2>
          <Link
            href="/admin/stores"
            className="text-sm text-primary-500 hover:underline"
          >
            {t('viewAllLogs')}
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-start text-sm font-medium text-gray-500">
                  {t('storeColumn')}
                </th>
                <th className="pb-3 text-start text-sm font-medium text-gray-500">
                  {t('salesColumn')}
                </th>
                <th className="pb-3 text-start text-sm font-medium text-gray-500">
                  {t('ordersColumn')}
                </th>
                <th className="pb-3 text-start text-sm font-medium text-gray-500">
                  {t('ratingColumn')}
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
