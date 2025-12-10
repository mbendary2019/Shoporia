'use client'

import { useState } from 'react'
import { Card, Button, Badge, Modal } from '@/components/ui'
import { formatDate, formatCurrency } from '@/utils/format'
import {
  Plus,
  Search,
  Tag,
  Copy,
  Edit,
  Trash2,
  Calendar,
  Percent,
  DollarSign,
  CheckCircle,
  Users,
  ShoppingBag,
  TrendingUp,
  X,
} from 'lucide-react'

// Mock coupons data
const coupons = [
  {
    id: '1',
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    minOrder: 100,
    maxDiscount: 50,
    usageLimit: 100,
    usedCount: 45,
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    status: 'active',
    products: 'all',
  },
  {
    id: '2',
    code: 'SAVE50',
    type: 'fixed',
    value: 50,
    minOrder: 200,
    maxDiscount: null,
    usageLimit: 50,
    usedCount: 30,
    startDate: '2024-12-01',
    endDate: '2024-12-20',
    status: 'active',
    products: 'all',
  },
  {
    id: '3',
    code: 'VIP30',
    type: 'percentage',
    value: 30,
    minOrder: 500,
    maxDiscount: 200,
    usageLimit: 20,
    usedCount: 20,
    startDate: '2024-11-15',
    endDate: '2024-12-15',
    status: 'exhausted',
    products: 'selected',
  },
  {
    id: '4',
    code: 'NEWYEAR25',
    type: 'percentage',
    value: 25,
    minOrder: 150,
    maxDiscount: 100,
    usageLimit: 200,
    usedCount: 0,
    startDate: '2024-12-25',
    endDate: '2025-01-05',
    status: 'scheduled',
    products: 'all',
  },
  {
    id: '5',
    code: 'SUMMER10',
    type: 'percentage',
    value: 10,
    minOrder: 0,
    maxDiscount: 30,
    usageLimit: 1000,
    usedCount: 890,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    status: 'expired',
    products: 'all',
  },
]

const statusConfig = {
  active: { label: 'نشط', variant: 'success' as const },
  scheduled: { label: 'مجدول', variant: 'info' as const },
  exhausted: { label: 'نفدت الكمية', variant: 'warning' as const },
  expired: { label: 'منتهي', variant: 'danger' as const },
}

export default function DashboardCouponsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !filterStatus || coupon.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const stats = {
    active: coupons.filter((c) => c.status === 'active').length,
    totalUsage: coupons.reduce((sum, c) => sum + c.usedCount, 0),
    totalSavings: 12500, // Mock value
    conversionRate: 23.5, // Mock value
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            الكوبونات
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            إنشاء وإدارة كوبونات الخصم
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4" />
          إنشاء كوبون
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">الكوبونات النشطة</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.active}
              </p>
            </div>
            <Tag className="h-8 w-8 text-primary-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إجمالي الاستخدام</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalUsage}
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">التوفير للعملاء</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.totalSavings)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">معدل التحويل</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.conversionRate}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
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
              placeholder="ابحث بكود الكوبون..."
              className="h-10 w-full rounded-lg border border-gray-300 bg-white pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
          >
            <option value="">كل الحالات</option>
            <option value="active">نشط</option>
            <option value="scheduled">مجدول</option>
            <option value="exhausted">نفدت الكمية</option>
            <option value="expired">منتهي</option>
          </select>
        </div>
      </Card>

      {/* Coupons List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCoupons.map((coupon) => {
          const status = statusConfig[coupon.status as keyof typeof statusConfig]
          const usagePercentage = (coupon.usedCount / coupon.usageLimit) * 100

          return (
            <Card key={coupon.id} className="overflow-hidden">
              {/* Coupon Header */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      {coupon.type === 'percentage' ? (
                        <Percent className="h-5 w-5" />
                      ) : (
                        <DollarSign className="h-5 w-5" />
                      )}
                      <span className="text-2xl font-bold">
                        {coupon.type === 'percentage'
                          ? `${coupon.value}%`
                          : formatCurrency(coupon.value)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-white/80">خصم</p>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>

                {/* Coupon Code */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 rounded-lg bg-white/20 px-4 py-2 font-mono text-lg font-bold">
                    {coupon.code}
                  </div>
                  <button
                    onClick={() => copyCode(coupon.code)}
                    className="rounded-lg bg-white/20 p-2 transition-colors hover:bg-white/30"
                  >
                    {copiedCode === coupon.code ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Coupon Details */}
              <div className="p-4 space-y-4">
                {/* Usage Progress */}
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">الاستخدام</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {coupon.usedCount} / {coupon.usageLimit}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className={`h-full rounded-full transition-all ${
                        usagePercentage >= 100
                          ? 'bg-red-500'
                          : usagePercentage >= 80
                            ? 'bg-yellow-500'
                            : 'bg-primary-500'
                      }`}
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Conditions */}
                <div className="space-y-2 text-sm">
                  {coupon.minOrder > 0 && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <ShoppingBag className="h-4 w-4" />
                      <span>الحد الأدنى: {formatCurrency(coupon.minOrder)}</span>
                    </div>
                  )}
                  {coupon.maxDiscount && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Tag className="h-4 w-4" />
                      <span>أقصى خصم: {formatCurrency(coupon.maxDiscount)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(new Date(coupon.startDate), 'dd/MM')} -{' '}
                      {formatDate(new Date(coupon.endDate), 'dd/MM/yyyy')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Edit className="h-4 w-4" />
                    تعديل
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-red-600">
                    <Trash2 className="h-4 w-4" />
                    حذف
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredCoupons.length === 0 && (
        <Card className="p-12 text-center">
          <Tag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            لا توجد كوبونات
          </h3>
          <p className="mt-2 text-gray-500">
            لم يتم العثور على كوبونات تطابق معايير البحث
          </p>
          <Button className="mt-4" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
            إنشاء كوبون جديد
          </Button>
        </Card>
      )}

      {/* Create Coupon Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="إنشاء كوبون جديد"
      >
        <form className="space-y-4">
          {/* Coupon Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              كود الكوبون
            </label>
            <input
              type="text"
              placeholder="مثال: SAVE20"
              className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm uppercase focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            />
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              نوع الخصم
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 p-3 hover:border-primary-500 dark:border-gray-600">
                <input
                  type="radio"
                  name="type"
                  value="percentage"
                  className="text-primary-500"
                  defaultChecked
                />
                <Percent className="h-4 w-4" />
                <span>نسبة مئوية</span>
              </label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 p-3 hover:border-primary-500 dark:border-gray-600">
                <input
                  type="radio"
                  name="type"
                  value="fixed"
                  className="text-primary-500"
                />
                <DollarSign className="h-4 w-4" />
                <span>مبلغ ثابت</span>
              </label>
            </div>
          </div>

          {/* Discount Value */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                قيمة الخصم
              </label>
              <input
                type="number"
                placeholder="20"
                className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                أقصى خصم (اختياري)
              </label>
              <input
                type="number"
                placeholder="100"
                className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Minimum Order & Usage Limit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                الحد الأدنى للطلب
              </label>
              <input
                type="number"
                placeholder="0"
                className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                عدد مرات الاستخدام
              </label>
              <input
                type="number"
                placeholder="100"
                className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                تاريخ البدء
              </label>
              <input
                type="date"
                className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                تاريخ الانتهاء
              </label>
              <input
                type="date"
                className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              إنشاء الكوبون
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
