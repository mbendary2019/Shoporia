'use client'

import { useState } from 'react'
import { Card, Button, Badge } from '@/components/ui'
import { formatCurrency, formatDate } from '@/utils/format'
import {
  Search,
  Package,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  Star,
  Store,
  Filter,
  MoreVertical,
} from 'lucide-react'

// Mock products data
const products = [
  {
    id: '1',
    name: 'ساعة ذكية متطورة',
    store: 'متجر التقنية',
    storeId: 'tech-store',
    category: 'إلكترونيات',
    price: 2500,
    stock: 45,
    sold: 234,
    rating: 4.8,
    status: 'active',
    featured: true,
    createdAt: '2024-12-01',
  },
  {
    id: '2',
    name: 'حقيبة يد جلد طبيعي',
    store: 'بوتيك الجمال',
    storeId: 'beauty-boutique',
    category: 'أزياء',
    price: 1250,
    stock: 23,
    sold: 156,
    rating: 4.6,
    status: 'active',
    featured: false,
    createdAt: '2024-11-28',
  },
  {
    id: '3',
    name: 'سماعات بلوتوث لاسلكية',
    store: 'متجر التقنية',
    storeId: 'tech-store',
    category: 'إلكترونيات',
    price: 899,
    stock: 0,
    sold: 89,
    rating: 4.5,
    status: 'out_of_stock',
    featured: false,
    createdAt: '2024-11-25',
  },
  {
    id: '4',
    name: 'قميص قطن فاخر',
    store: 'متجر الأناقة',
    storeId: 'elegance-store',
    category: 'ملابس',
    price: 450,
    stock: 78,
    sold: 312,
    rating: 4.7,
    status: 'pending',
    featured: false,
    createdAt: '2024-12-10',
  },
  {
    id: '5',
    name: 'عطر فاخر',
    store: 'دار العطور',
    storeId: 'perfume-house',
    category: 'عطور',
    price: 1800,
    stock: 34,
    sold: 67,
    rating: 4.9,
    status: 'suspended',
    featured: false,
    createdAt: '2024-11-20',
  },
]

const statusConfig = {
  active: { label: 'نشط', variant: 'success' as const },
  pending: { label: 'قيد المراجعة', variant: 'warning' as const },
  out_of_stock: { label: 'نفد المخزون', variant: 'danger' as const },
  suspended: { label: 'موقوف', variant: 'danger' as const },
}

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.includes(searchQuery) ||
      product.store.includes(searchQuery)
    const matchesStatus = !filterStatus || product.status === filterStatus
    const matchesCategory = !filterCategory || product.category === filterCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            إدارة المنتجات
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            مراجعة وإدارة جميع منتجات المنصة
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="success">{products.filter(p => p.status === 'active').length} نشط</Badge>
          <Badge variant="warning">{products.filter(p => p.status === 'pending').length} معلق</Badge>
          <Badge variant="danger">{products.filter(p => p.status === 'suspended').length} موقوف</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إجمالي المنتجات</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">45,678</p>
            </div>
            <Package className="h-8 w-8 text-primary-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">قيد المراجعة</p>
              <p className="text-2xl font-bold text-yellow-600">23</p>
            </div>
            <Eye className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">نفد المخزون</p>
              <p className="text-2xl font-bold text-red-600">156</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">المميزة</p>
              <p className="text-2xl font-bold text-purple-600">48</p>
            </div>
            <Star className="h-8 w-8 text-purple-500" />
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
              placeholder="ابحث بالاسم أو المتجر..."
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
              <option value="out_of_stock">نفد المخزون</option>
              <option value="suspended">موقوف</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="">كل الفئات</option>
              <option value="إلكترونيات">إلكترونيات</option>
              <option value="ملابس">ملابس</option>
              <option value="أزياء">أزياء</option>
              <option value="عطور">عطور</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  المنتج
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  المتجر
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  السعر
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  المخزون
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  المبيعات
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  التقييم
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
              {filteredProducts.map((product) => {
                const status = statusConfig[product.status as keyof typeof statusConfig]
                return (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-700" />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {product.name}
                            </p>
                            {product.featured && (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {product.store}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-4">
                      <span className={product.stock === 0 ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-400">
                      {product.sold}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-600 dark:text-gray-400">{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {product.status === 'pending' && (
                          <>
                            <Button size="sm" variant="ghost" className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {product.status === 'active' && (
                          <Button size="sm" variant="ghost" className="text-yellow-600">
                            <Star className="h-4 w-4" />
                          </Button>
                        )}
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

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-gray-700">
          <p className="text-sm text-gray-500">
            عرض 1 - {filteredProducts.length} من {products.length} منتج
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
