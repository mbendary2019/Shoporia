'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Card, Button, Badge, Input } from '@/components/ui'
import { formatCurrency } from '@/utils/format'
import { usePaginatedQuery } from '@/hooks/use-paginated-query'
import { getProductsPaginated } from '@/services/product'
import { useTranslations } from 'next-intl'
import type { DocumentSnapshot } from 'firebase/firestore'
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
  Loader2,
} from 'lucide-react'

const PAGE_SIZE = 12

export default function ProductsPage() {
  const t = useTranslations('dashboard')
  const tCommon = useTranslations('common')

  const statusConfig = {
    active: { label: tCommon('available'), variant: 'success' as const },
    draft: { label: /* TODO: add translation key for 'مسودة' */ 'مسودة', variant: 'secondary' as const },
    out_of_stock: { label: /* TODO: add translation key for 'نفذ' */ 'نفذ', variant: 'danger' as const },
    archived: { label: /* TODO: add translation key for 'مؤرشف' */ 'مؤرشف', variant: 'secondary' as const },
  }

  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const fetchProducts = useCallback(
    async (cursor?: DocumentSnapshot) => {
      const result = await getProductsPaginated({
        pageSize: PAGE_SIZE,
        lastDoc: cursor,
      })
      return {
        items: result.products,
        lastDoc: result.lastDoc,
        hasMore: result.hasMore,
      }
    },
    []
  )

  const {
    items: products,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    error,
  } = usePaginatedQuery(fetchProducts)

  const filteredProducts = searchQuery
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id))
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
            {t('products')}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {/* TODO: add translation key for 'إدارة منتجات متجرك' */}
            إدارة منتجات متجرك
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Sparkles className="h-4 w-4" />
            {/* TODO: add translation key for 'توليد AI' */}
            توليد AI
          </Button>
          <Link href="/dashboard/products/new">
            <Button>
              <Plus className="h-4 w-4" />
              {/* TODO: add translation key for 'إضافة منتج' */}
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
              placeholder={`${tCommon('search')}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-300 bg-white pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            />
          </div>

          <div className="flex gap-3">
            <select className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800">
              <option value="">{/* TODO: add translation key */}كل الحالات</option>
              <option value="active">{tCommon('available')}</option>
              <option value="draft">مسودة</option>
              <option value="out_of_stock">نفذ</option>
              <option value="archived">مؤرشف</option>
            </select>

            <select className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800">
              <option value="">{/* TODO: add translation key */}كل الفئات</option>
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
              {/* TODO: add translation key */}
              تم تحديد {selectedProducts.length} منتج
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                {/* TODO: add translation key */}
                تعديل الحالة
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                {tCommon('delete')}
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          <span className="ms-3 text-gray-600 dark:text-gray-400">
            {tCommon('loading')}
          </span>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="p-6 text-center text-red-600">
          <p>{tCommon('error')}: {error.message}</p>
        </Card>
      )}

      {/* Products Table */}
      {!isLoading && !error && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="p-4 text-start">
                    <input
                      type="checkbox"
                      checked={
                        filteredProducts.length > 0 &&
                        selectedProducts.length === filteredProducts.length
                      }
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                  </th>
                  <th className="p-4 text-start text-sm font-medium text-gray-500">
                    {/* TODO: add translation key for 'المنتج' */}
                    المنتج
                  </th>
                  <th className="p-4 text-start text-sm font-medium text-gray-500">
                    {/* TODO: add translation key for 'الحالة' */}
                    الحالة
                  </th>
                  <th className="p-4 text-start text-sm font-medium text-gray-500">
                    {/* TODO: add translation key for 'المخزون' */}
                    المخزون
                  </th>
                  <th className="p-4 text-start text-sm font-medium text-gray-500">
                    {/* TODO: add translation key for 'السعر' */}
                    السعر
                  </th>
                  <th className="p-4 text-start text-sm font-medium text-gray-500">
                    {/* TODO: add translation key for 'الفئة' */}
                    الفئة
                  </th>
                  <th className="p-4 text-start text-sm font-medium text-gray-500">
                    {/* TODO: add translation key for 'الإجراءات' */}
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProducts.map((product) => (
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
                          <p className="text-xs text-gray-500">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          statusConfig[
                            product.status as keyof typeof statusConfig
                          ]?.variant ?? 'secondary'
                        }
                      >
                        {statusConfig[
                          product.status as keyof typeof statusConfig
                        ]?.label ?? product.status}
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

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Package className="h-12 w-12 text-gray-300" />
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {tCommon('noResults')}
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 p-4 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tCommon('showing')} {filteredProducts.length} {tCommon('product')}
            </p>
            <div className="flex gap-2">
              {hasMore && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {tCommon('loading')}
                    </>
                  ) : (
                    tCommon('viewMore')
                  )}
                </Button>
              )}
              {!hasMore && filteredProducts.length > 0 && (
                <span className="text-sm text-gray-500">
                  {/* TODO: add translation key for 'تم عرض جميع المنتجات' */}
                  تم عرض جميع المنتجات
                </span>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
