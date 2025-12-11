'use client'

import { Card } from '@/components/ui'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

const stats = [
  {
    title: 'إجمالي المبيعات',
    value: '125,430',
    unit: 'ج.م',
    change: '+12.5%',
    isPositive: true,
    icon: DollarSign,
    color: 'bg-green-500',
  },
  {
    title: 'الطلبات',
    value: '1,234',
    unit: 'طلب',
    change: '+8.2%',
    isPositive: true,
    icon: ShoppingCart,
    color: 'bg-blue-500',
  },
  {
    title: 'المستخدمين الجدد',
    value: '456',
    unit: 'مستخدم',
    change: '+15.3%',
    isPositive: true,
    icon: Users,
    color: 'bg-purple-500',
  },
  {
    title: 'الزيارات',
    value: '45,678',
    unit: 'زيارة',
    change: '-3.2%',
    isPositive: false,
    icon: Eye,
    color: 'bg-orange-500',
  },
]

const topProducts = [
  { name: 'آيفون 15 برو ماكس', sales: 234, revenue: 585000 },
  { name: 'سماعات آبل AirPods Pro', sales: 189, revenue: 94500 },
  { name: 'ساعة آبل Series 9', sales: 156, revenue: 234000 },
  { name: 'ماك بوك برو M3', sales: 89, revenue: 445000 },
  { name: 'آيباد برو 12.9', sales: 67, revenue: 134000 },
]

const topStores = [
  { name: 'متجر التقنية', orders: 456, revenue: 125000 },
  { name: 'أزياء المحلة', orders: 389, revenue: 98000 },
  { name: 'بيت الجمال', orders: 312, revenue: 76000 },
  { name: 'مطبخ الشيف', orders: 278, revenue: 45000 },
  { name: 'رياضة بلس', orders: 234, revenue: 67000 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          التقارير والإحصائيات
        </h1>
        <p className="text-gray-500">نظرة عامة على أداء المنصة</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg ${stat.color} p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span
                className={`flex items-center text-sm font-medium ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
                {stat.isPositive ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
                <span className="text-sm font-normal text-gray-500 ms-1">
                  {stat.unit}
                </span>
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            المبيعات الشهرية
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-center text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>رسم بياني للمبيعات</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            نمو المستخدمين
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-center text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>رسم بياني للنمو</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Lists */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            أفضل المنتجات مبيعاً
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amazon-orange/10 text-sm font-bold text-amazon-orange">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {product.name}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.revenue.toLocaleString()} ج.م
                  </p>
                  <p className="text-xs text-gray-500">{product.sales} مبيعة</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            أفضل المتاجر أداءً
          </h3>
          <div className="space-y-4">
            {topStores.map((store, index) => (
              <div
                key={store.name}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {store.name}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {store.revenue.toLocaleString()} ج.م
                  </p>
                  <p className="text-xs text-gray-500">{store.orders} طلب</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
