'use client'

import { useState } from 'react'
import { Card, Button, Badge, Avatar } from '@/components/ui'
import { formatCurrency, formatDate } from '@/utils/format'
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  MoreVertical,
  Store,
  Package,
  ShoppingCart,
  Star,
  Ban,
  Trash2,
} from 'lucide-react'

// Mock stores data
const stores = [
  {
    id: '1',
    name: 'متجر الأناقة',
    slug: 'elegance-store',
    owner: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '01012345678',
    category: 'ملابس',
    status: 'active',
    verified: true,
    products: 45,
    orders: 234,
    revenue: 125000,
    rating: 4.8,
    createdAt: '2024-06-15',
  },
  {
    id: '2',
    name: 'بوتيك الجمال',
    slug: 'beauty-boutique',
    owner: 'سارة أحمد',
    email: 'sara@example.com',
    phone: '01098765432',
    category: 'مستحضرات تجميل',
    status: 'pending',
    verified: false,
    products: 0,
    orders: 0,
    revenue: 0,
    rating: 0,
    createdAt: '2024-12-10',
  },
  {
    id: '3',
    name: 'متجر التقنية',
    slug: 'tech-store',
    owner: 'محمد علي',
    email: 'mohamed@example.com',
    phone: '01155566677',
    category: 'إلكترونيات',
    status: 'active',
    verified: true,
    products: 120,
    orders: 567,
    revenue: 450000,
    rating: 4.6,
    createdAt: '2024-03-20',
  },
  {
    id: '4',
    name: 'أزياء الشرق',
    slug: 'east-fashion',
    owner: 'نور حسن',
    email: 'nour@example.com',
    phone: '01234567890',
    category: 'ملابس',
    status: 'suspended',
    verified: true,
    products: 78,
    orders: 143,
    revenue: 76000,
    rating: 4.2,
    createdAt: '2024-01-10',
  },
]

const statusConfig = {
  active: { label: 'نشط', variant: 'success' as const },
  pending: { label: 'قيد المراجعة', variant: 'warning' as const },
  suspended: { label: 'موقوف', variant: 'danger' as const },
  rejected: { label: 'مرفوض', variant: 'danger' as const },
}

export default function AdminStoresPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [selectedStore, setSelectedStore] = useState<string | null>(null)

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.includes(searchQuery) ||
      store.owner.includes(searchQuery) ||
      store.email.includes(searchQuery)
    const matchesStatus = !filterStatus || store.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            إدارة المتاجر
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            إدارة ومراجعة جميع متاجر المنصة
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="success">{stores.filter(s => s.status === 'active').length} نشط</Badge>
          <Badge variant="warning">{stores.filter(s => s.status === 'pending').length} معلق</Badge>
          <Badge variant="danger">{stores.filter(s => s.status === 'suspended').length} موقوف</Badge>
        </div>
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
              placeholder="ابحث باسم المتجر أو المالك..."
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
              <option value="pending">قيد المراجعة</option>
              <option value="suspended">موقوف</option>
            </select>

            <select className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800">
              <option value="">كل الفئات</option>
              <option value="clothes">ملابس</option>
              <option value="electronics">إلكترونيات</option>
              <option value="beauty">مستحضرات تجميل</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Stores Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  المتجر
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  المالك
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  الإحصائيات
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
              {filteredStores.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30">
                        <Store className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {store.name}
                          </p>
                          {store.verified && (
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{store.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {store.owner}
                    </p>
                    <p className="text-sm text-gray-500">{store.email}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Package className="h-4 w-4" />
                        {store.products} منتج
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <ShoppingCart className="h-4 w-4" />
                        {store.orders} طلب
                      </div>
                      {store.rating > 0 && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {store.rating}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={statusConfig[store.status as keyof typeof statusConfig].variant}>
                      {statusConfig[store.status as keyof typeof statusConfig].label}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {formatDate(new Date(store.createdAt), 'dd MMM yyyy')}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {store.status === 'pending' && (
                        <>
                          <Button size="sm" variant="ghost" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {store.status === 'active' && (
                        <Button size="sm" variant="ghost" className="text-orange-600">
                          <Ban className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-gray-700">
          <p className="text-sm text-gray-500">
            عرض 1 - {filteredStores.length} من {stores.length} متجر
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
