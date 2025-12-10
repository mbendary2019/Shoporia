'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, Button, Badge, Input } from '@/components/ui'
import { formatCurrency } from '@/utils/format'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  Package,
  Sparkles,
} from 'lucide-react'

// Mock products data
const products = [
  {
    id: '1',
    name: 'قميص قطن رجالي كلاسيك',
    sku: 'SKU-001',
    price: 450,
    compareAtPrice: 599,
    quantity: 25,
    status: 'active',
    image: '/images/products/shirt.jpg',
    category: 'ملابس رجالي',
  },
  {
    id: '2',
    name: 'سماعات بلوتوث لاسلكية',
    sku: 'SKU-002',
    price: 899,
    compareAtPrice: 1200,
    quantity: 50,
    status: 'active',
    image: '/images/products/headphones.jpg',
    category: 'إلكترونيات',
  },
  {
    id: '3',
    name: 'حقيبة يد جلد طبيعي',
    sku: 'SKU-003',
    price: 1250,
    quantity: 0,
    status: 'out_of_stock',
    image: '/images/products/bag.jpg',
    category: 'حقائب',
  },
  {
    id: '4',
    name: 'ساعة ذكية سبورت',
    sku: 'SKU-004',
    price: 2500,
    compareAtPrice: 3200,
    quantity: 15,
    status: 'active',
    image: '/images/products/watch.jpg',
    category: 'إلكترونيات',
  },
  {
    id: '5',
    name: 'كريم مرطب للبشرة',
    sku: 'SKU-005',
    price: 180,
    quantity: 100,
    status: 'draft',
    image: '/images/products/cream.jpg',
    category: 'العناية بالبشرة',
  },
]

const statusConfig = {
  active: { label: 'نشط', variant: 'success' as const },
  draft: { label: 'مسودة', variant: 'secondary' as const },
  out_of_stock: { label: 'نفذ', variant: 'danger' as const },
  archived: { label: 'مؤرشف', variant: 'secondary' as const },
}

export default function ProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((p) => p.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            المنتجات
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            إدارة منتجات متجرك
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Sparkles className="h-4 w-4" />
            توليد AI
          </Button>
          <Link href="/dashboard/products/new">
            <Button>
              <Plus className="h-4 w-4" />
              إضافة منتج
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="ابحث في المنتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-300 bg-white pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            />
          </div>

          <div className="flex gap-3">
            <select className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800">
              <option value="">كل الحالات</option>
              <option value="active">نشط</option>
              <option value="draft">مسودة</option>
              <option value="out_of_stock">نفذ</option>
              <option value="archived">مؤرشف</option>
            </select>

            <select className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800">
              <option value="">كل الفئات</option>
              <option value="fashion">ملابس</option>
              <option value="electronics">إلكترونيات</option>
              <option value="beauty">تجميل</option>
            </select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="mt-4 flex items-center gap-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              تم تحديد {selectedProducts.length} منتج
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                تعديل الحالة
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                حذف
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Products Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-4 text-start">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === products.length}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                </th>
                <th className="p-4 text-start text-sm font-medium text-gray-500">
                  المنتج
                </th>
                <th className="p-4 text-start text-sm font-medium text-gray-500">
                  الحالة
                </th>
                <th className="p-4 text-start text-sm font-medium text-gray-500">
                  المخزون
                </th>
                <th className="p-4 text-start text-sm font-medium text-gray-500">
                  السعر
                </th>
                <th className="p-4 text-start text-sm font-medium text-gray-500">
                  الفئة
                </th>
                <th className="p-4 text-start text-sm font-medium text-gray-500">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={statusConfig[product.status as keyof typeof statusConfig].variant}>
                      {statusConfig[product.status as keyof typeof statusConfig].label}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-sm ${
                        product.quantity === 0
                          ? 'text-red-600'
                          : product.quantity < 10
                            ? 'text-yellow-600'
                            : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {product.quantity}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(product.price)}
                      </p>
                      {product.compareAtPrice && (
                        <p className="text-xs text-gray-500 line-through">
                          {formatCurrency(product.compareAtPrice)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button className="rounded p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Eye className="h-4 w-4 text-gray-500" />
                      </button>
                      <button className="rounded p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Edit className="h-4 w-4 text-gray-500" />
                      </button>
                      <button className="rounded p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Copy className="h-4 w-4 text-gray-500" />
                      </button>
                      <button className="rounded p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 p-4 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            عرض 1-{products.length} من {products.length} منتج
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              السابق
            </Button>
            <Button variant="outline" size="sm" disabled>
              التالي
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
