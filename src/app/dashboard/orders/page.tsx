'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Card, Button, Badge } from '@/components/ui'
import { formatCurrency, formatDate } from '@/utils/format'
import { usePaginatedQuery } from '@/hooks/use-paginated-query'
import { getOrdersPaginated } from '@/services/order'
import type { DocumentSnapshot } from 'firebase/firestore'
import type { Order, OrderStatus } from '@/types'
import {
  Search,
  Filter,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  ChevronDown,
  Loader2,
} from 'lucide-react'

const PAGE_SIZE = 10

export default function OrdersPage() {
  const t = useTranslations('dashboard')
  const tOrder = useTranslations('order')
  const tCommon = useTranslations('common')

  const statusConfig = {
    pending: {
      label: tOrder('statuses.pending'),
      variant: 'warning' as const,
      icon: Clock,
      color: 'text-yellow-600',
    },
    confirmed: {
      label: tOrder('statuses.confirmed'),
      variant: 'info' as const,
      icon: CheckCircle,
      color: 'text-blue-600',
    },
    processing: {
      label: tOrder('statuses.processing'),
      variant: 'info' as const,
      icon: Package,
      color: 'text-blue-600',
    },
    shipped: {
      label: tOrder('statuses.shipped'),
      variant: 'default' as const,
      icon: Truck,
      color: 'text-purple-600',
    },
    delivered: {
      label: tOrder('statuses.delivered'),
      variant: 'success' as const,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    cancelled: {
      label: tOrder('statuses.cancelled'),
      variant: 'danger' as const,
      icon: XCircle,
      color: 'text-red-600',
    },
  }

  const paymentMethodLabels: Record<string, string> = {
    cash: /* TODO: add translation key */ 'نقدي',
    knet: /* TODO: add translation key */ 'كي نت',
    bank_transfer: /* TODO: add translation key */ 'تحويل بنكي',
    card: /* TODO: add translation key */ 'بطاقة',
  }
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('')

  const fetchOrders = useCallback(
    async (cursor?: DocumentSnapshot) => {
      const result = await getOrdersPaginated({
        pageSize: PAGE_SIZE,
        lastDoc: cursor,
        status: filterStatus ? (filterStatus as OrderStatus) : undefined,
      })
      return {
        items: result.orders,
        lastDoc: result.lastDoc,
        hasMore: result.hasMore,
      }
    },
    [filterStatus]
  )

  const {
    items: orders,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    refresh,
    error,
  } = usePaginatedQuery(fetchOrders)

  const handleFilterStatus = (key: string) => {
    setFilterStatus(filterStatus === key ? '' : key)
    // Note: filtering by status triggers a new fetchFn via the dependency,
    // but the hook needs to be refreshed. We call refresh after state updates.
    setTimeout(() => refresh(), 0)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('orders')}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {/* TODO: add translation key */}
            إدارة وتتبع طلبات العملاء
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Object.entries(statusConfig).map(([key, config]) => {
          return (
            <button
              key={key}
              onClick={() => handleFilterStatus(key)}
              className={`rounded-lg border p-4 text-start transition-colors ${
                filterStatus === key
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <config.icon className={`h-5 w-5 ${config.color}`} />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {config.label}
              </p>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder={`${tCommon('search')}...`}
              className="h-10 w-full rounded-lg border border-gray-300 bg-white pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            />
          </div>

          <div className="flex gap-3">
            <select className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800">
              <option value="">{/* TODO: add translation key */}كل طرق الدفع</option>
              <option value="cash">نقدي</option>
              <option value="knet">كي نت</option>
              <option value="card">بطاقة</option>
              <option value="bank_transfer">تحويل بنكي</option>
            </select>

            <input
              type="date"
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
            />
          </div>
        </div>
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

      {/* Orders List */}
      {!isLoading && !error && (
        <div className="space-y-4">
          {orders.length === 0 && (
            <Card className="flex flex-col items-center justify-center p-12 text-center">
              <Package className="h-12 w-12 text-gray-300" />
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {tCommon('noResults')}
              </p>
            </Card>
          )}

          {orders.map((order) => {
            const config =
              statusConfig[order.status as keyof typeof statusConfig]
            const isExpanded = expandedOrder === order.id

            return (
              <Card key={order.id} className="overflow-hidden">
                {/* Order Header */}
                <div
                  className="flex cursor-pointer items-center justify-between p-4"
                  onClick={() =>
                    setExpandedOrder(isExpanded ? null : order.id)
                  }
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.createdAt
                          ? formatDate(
                              order.createdAt instanceof Date
                                ? order.createdAt
                                : new Date(order.createdAt),
                              'dd MMM yyyy, hh:mm a'
                            )
                          : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-end">
                      <p className="text-sm text-gray-500">
                        {order.items.length} منتج
                      </p>
                    </div>

                    {config && (
                      <Badge variant={config.variant}>{config.label}</Badge>
                    )}

                    <p className="font-bold text-gray-900 dark:text-white">
                      {formatCurrency(order.total)}
                    </p>

                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Order Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                    <div className="grid gap-6 lg:grid-cols-3">
                      {/* Delivery Info */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {/* TODO: add translation key */}
                          معلومات التوصيل
                        </h4>
                        <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          {order.deliveryAddress && (
                            <>
                              <p>{order.deliveryAddress.city}</p>
                              <p>{order.deliveryAddress.street}</p>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {t('products')}
                        </h4>
                        <div className="mt-2 space-y-2">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-600 dark:text-gray-400">
                                {item.name || item.productId} ×{' '}
                                {item.quantity}
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {formatCurrency(item.total)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {/* TODO: add translation key */}
                          الدفع
                        </h4>
                        <div className="mt-2 space-y-1 text-sm">
                          <p className="text-gray-600 dark:text-gray-400">
                            {/* TODO: add translation key */}الطريقة:{' '}
                            {paymentMethodLabels[order.paymentMethod] ||
                              order.paymentMethod}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {tOrder('status')}:{' '}
                            <Badge
                              variant={
                                order.paymentStatus === 'paid'
                                  ? 'success'
                                  : order.paymentStatus === 'refunded'
                                    ? 'danger'
                                    : 'warning'
                              }
                              className="ms-1"
                            >
                              {order.paymentStatus === 'paid'
                                ? /* TODO: add translation key */ 'مدفوع'
                                : order.paymentStatus === 'refunded'
                                  ? /* TODO: add translation key */ 'مسترد'
                                  : tOrder('statuses.pending')}
                            </Badge>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                      <Button size="sm">
                        <Eye className="h-4 w-4" />
                        {tOrder('details')}
                      </Button>
                      {order.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4" />
                            {tCommon('confirm')}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600"
                          >
                            <XCircle className="h-4 w-4" />
                            {tCommon('cancel')}
                          </Button>
                        </>
                      )}
                      {order.status === 'confirmed' && (
                        <Button size="sm" variant="outline">
                          <Truck className="h-4 w-4" />
                          {/* TODO: add translation key */}
                          شحن
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            )
          })}

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
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
            </div>
          )}

          {!hasMore && orders.length > 0 && (
            <p className="text-center text-sm text-gray-500">
              {/* TODO: add translation key */}
              تم عرض جميع الطلبات
            </p>
          )}
        </div>
      )}
    </div>
  )
}
