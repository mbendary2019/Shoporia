import { Card, Badge } from '@/components/ui'
import { formatCurrency } from '@/utils/format'
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from 'lucide-react'

const stats = [
  {
    name: 'إجمالي المبيعات',
    value: 125430,
    change: 12.5,
    changeType: 'increase',
    icon: DollarSign,
    format: 'currency',
  },
  {
    name: 'الطلبات',
    value: 456,
    change: 8.2,
    changeType: 'increase',
    icon: ShoppingCart,
    format: 'number',
  },
  {
    name: 'المنتجات',
    value: 89,
    change: -2.4,
    changeType: 'decrease',
    icon: Package,
    format: 'number',
  },
  {
    name: 'العملاء',
    value: 1234,
    change: 15.3,
    changeType: 'increase',
    icon: Users,
    format: 'number',
  },
]

const recentOrders = [
  {
    id: 'SH-ABC123',
    customer: 'أحمد محمد',
    product: 'قميص قطن رجالي',
    total: 450,
    status: 'pending',
    date: '2024-12-10',
  },
  {
    id: 'SH-DEF456',
    customer: 'سارة أحمد',
    product: 'حقيبة يد جلد',
    total: 1250,
    status: 'confirmed',
    date: '2024-12-10',
  },
  {
    id: 'SH-GHI789',
    customer: 'محمد علي',
    product: 'ساعة ذكية',
    total: 2500,
    status: 'shipped',
    date: '2024-12-09',
  },
  {
    id: 'SH-JKL012',
    customer: 'نور حسن',
    product: 'سماعات بلوتوث',
    total: 899,
    status: 'delivered',
    date: '2024-12-09',
  },
]

const topProducts = [
  { name: 'قميص قطن رجالي', sales: 156, revenue: 70200 },
  { name: 'حقيبة يد جلد طبيعي', sales: 89, revenue: 111250 },
  { name: 'ساعة ذكية سبورت', sales: 67, revenue: 167500 },
  { name: 'سماعات بلوتوث لاسلكية', sales: 234, revenue: 210366 },
]

const statusColors: Record<string, 'warning' | 'info' | 'default' | 'success'> = {
  pending: 'warning',
  confirmed: 'info',
  shipped: 'default',
  delivered: 'success',
}

const statusLabels: Record<string, string> = {
  pending: 'قيد الانتظار',
  confirmed: 'مؤكد',
  shipped: 'تم الشحن',
  delivered: 'تم التوصيل',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          لوحة التحكم
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          مرحباً بك! إليك نظرة عامة على أداء متجرك
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-500 dark:bg-primary-900/30">
                <stat.icon className="h-6 w-6" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.changeType === 'increase' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {stat.change}%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.format === 'currency'
                  ? formatCurrency(stat.value)
                  : stat.value.toLocaleString('ar-EG')}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.name}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts & Tables Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              أحدث الطلبات
            </h2>
            <button className="text-sm text-primary-500 hover:underline">
              عرض الكل
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-start text-sm font-medium text-gray-500">
                    رقم الطلب
                  </th>
                  <th className="pb-3 text-start text-sm font-medium text-gray-500">
                    العميل
                  </th>
                  <th className="pb-3 text-start text-sm font-medium text-gray-500">
                    المبلغ
                  </th>
                  <th className="pb-3 text-start text-sm font-medium text-gray-500">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {order.customer}
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="py-3">
                      <Badge variant={statusColors[order.status]}>
                        {statusLabels[order.status]}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Top Products */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              المنتجات الأكثر مبيعاً
            </h2>
            <button className="text-sm text-primary-500 hover:underline">
              عرض الكل
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-700">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.sales} مبيعات
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(product.revenue)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-primary-200 bg-gradient-to-r from-primary-50 to-secondary-50 p-6 dark:border-primary-800 dark:from-primary-900/20 dark:to-secondary-900/20">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-500 text-white">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              توصيات الذكاء الاصطناعي
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                <span>
                  <strong>زيادة السعر:</strong> المنتج &quot;سماعات بلوتوث&quot; لديه
                  طلب مرتفع، يمكنك زيادة السعر بنسبة 5-10%
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500" />
                <span>
                  <strong>تنبيه المخزون:</strong> المنتج &quot;قميص قطن رجالي&quot;
                  سينفذ خلال 3 أيام
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                <span>
                  <strong>فرصة:</strong> المنافسون رفعوا أسعارهم، هذا وقت مناسب
                  لحملة ترويجية
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
