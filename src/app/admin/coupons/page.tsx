'use client'

import { useState } from 'react'
import { Card, Button, Badge } from '@/components/ui'
import { formatCurrency, formatDate } from '@/utils/format'
import {
  Search,
  Tag,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Copy,
  Percent,
  DollarSign,
  Calendar,
  Store,
} from 'lucide-react'

// Mock coupons data
const coupons = [
  {
    id: '1',
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    minOrder: 200,
    maxDiscount: 100,
    usageLimit: 1000,
    usedCount: 456,
    store: null, // Platform-wide
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    isActive: true,
  },
  {
    id: '2',
    code: 'TECH50',
    type: 'fixed',
    value: 50,
    minOrder: 500,
    maxDiscount: null,
    usageLimit: 500,
    usedCount: 234,
    store: 'متجر التقنية',
    startDate: '2024-12-01',
    endDate: '2024-12-20',
    isActive: true,
  },
  {
    id: '3',
    code: 'FASHION15',
    type: 'percentage',
    value: 15,
    minOrder: 300,
    maxDiscount: 75,
    usageLimit: 200,
    usedCount: 200,
    store: 'متجر الأناقة',
    startDate: '2024-11-01',
    endDate: '2024-11-30',
    isActive: false,
  },
  {
    id: '4',
    code: 'NEWYEAR25',
    type: 'percentage',
    value: 25,
    minOrder: 400,
    maxDiscount: 150,
    usageLimit: null,
    usedCount: 0,
    store: null,
    startDate: '2024-12-25',
    endDate: '2025-01-05',
    isActive: true,
  },
]

export default function AdminCouponsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      !filterStatus ||
      (filterStatus === 'active' && coupon.isActive) ||
      (filterStatus === 'inactive' && !coupon.isActive) ||
      (filterStatus === 'expired' && new Date(coupon.endDate) < new Date())
    return matchesSearch && matchesStatus
  })

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            إدارة الكوبونات
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            إنشاء وإدارة كوبونات الخصم
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4" />
          إنشاء كوبون
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إجمالي الكوبونات</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{coupons.length}</p>
            </div>
            <Tag className="h-8 w-8 text-primary-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">نشطة</p>
              <p className="text-2xl font-bold text-green-600">
                {coupons.filter((c) => c.isActive).length}
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-100 p-2">
              <div className="h-full w-full rounded-full bg-green-500" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">مرات الاستخدام</p>
              <p className="text-2xl font-bold text-blue-600">
                {coupons.reduce((sum, c) => sum + c.usedCount, 0)}
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 p-2 text-center text-sm font-bold text-blue-600">
              #
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">الخصم الممنوح</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(25600)}
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
              placeholder="ابحث بكود الكوبون..."
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
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
              <option value="expired">منتهي</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Coupons Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  الكود
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  الخصم
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  الشروط
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  الاستخدام
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  المتجر
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  الصلاحية
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  الحالة
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCoupons.map((coupon) => {
                const isExpired = new Date(coupon.endDate) < new Date()
                const isExhausted = coupon.usageLimit && coupon.usedCount >= coupon.usageLimit
                return (
                  <tr key={coupon.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white">
                          {coupon.code}
                        </code>
                        <button
                          onClick={() => copyCode(coupon.code)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 font-medium text-gray-900 dark:text-white">
                        {coupon.type === 'percentage' ? (
                          <>
                            <Percent className="h-4 w-4 text-primary-500" />
                            {coupon.value}%
                          </>
                        ) : (
                          <>
                            <DollarSign className="h-4 w-4 text-green-500" />
                            {formatCurrency(coupon.value)}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                      <div>حد أدنى: {formatCurrency(coupon.minOrder)}</div>
                      {coupon.maxDiscount && (
                        <div>حد أقصى: {formatCurrency(coupon.maxDiscount)}</div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {coupon.usedCount}
                        </span>
                        {coupon.usageLimit && (
                          <span className="text-gray-500"> / {coupon.usageLimit}</span>
                        )}
                      </div>
                      {coupon.usageLimit && (
                        <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-full rounded-full bg-primary-500"
                            style={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }}
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {coupon.store ? (
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <Store className="h-4 w-4" />
                          {coupon.store}
                        </div>
                      ) : (
                        <Badge variant="info">كل المنصة</Badge>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        {formatDate(new Date(coupon.startDate), 'dd/MM')} -{' '}
                        {formatDate(new Date(coupon.endDate), 'dd/MM')}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {isExpired ? (
                        <Badge variant="danger">منتهي</Badge>
                      ) : isExhausted ? (
                        <Badge variant="warning">مستنفد</Badge>
                      ) : coupon.isActive ? (
                        <Badge variant="success">نشط</Badge>
                      ) : (
                        <Badge variant="default">غير نشط</Badge>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
