'use client'

import { useState } from 'react'
import { Card, Button, Badge } from '@/components/ui'
import { formatDate } from '@/utils/format'
import {
  Bell,
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  Star,
  Tag,
  MessageSquare,
  Trash2,
  Check,
  Settings,
} from 'lucide-react'

// Mock notifications data
const initialNotifications = [
  {
    id: '1',
    type: 'order_status',
    title: 'تم شحن طلبك',
    message: 'طلبك رقم SH-ABC123 في الطريق إليك',
    orderId: 'SH-ABC123',
    icon: Truck,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
    read: false,
    createdAt: '2024-12-10T10:30:00',
  },
  {
    id: '2',
    type: 'order_status',
    title: 'تم تأكيد طلبك',
    message: 'طلبك رقم SH-DEF456 قيد التجهيز',
    orderId: 'SH-DEF456',
    icon: Package,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    read: false,
    createdAt: '2024-12-10T09:15:00',
  },
  {
    id: '3',
    type: 'promotion',
    title: 'خصم 20% على الإلكترونيات',
    message: 'استخدم كود TECH20 للحصول على خصم 20%',
    icon: Tag,
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    read: true,
    createdAt: '2024-12-09T14:00:00',
  },
  {
    id: '4',
    type: 'review_reminder',
    title: 'قيّم منتجك',
    message: 'ما رأيك في "ساعة ذكية متطورة"؟ شاركنا تجربتك',
    productId: '123',
    icon: Star,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    read: true,
    createdAt: '2024-12-08T11:00:00',
  },
  {
    id: '5',
    type: 'order_delivered',
    title: 'تم توصيل طلبك',
    message: 'طلبك رقم SH-GHI789 تم توصيله بنجاح',
    orderId: 'SH-GHI789',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    read: true,
    createdAt: '2024-12-07T16:30:00',
  },
  {
    id: '6',
    type: 'message',
    title: 'رسالة جديدة من متجر الأناقة',
    message: 'شكراً لطلبك! إذا كان لديك أي استفسار لا تتردد...',
    storeId: 'elegance-store',
    icon: MessageSquare,
    color: 'text-primary-500',
    bgColor: 'bg-primary-100',
    read: true,
    createdAt: '2024-12-06T13:45:00',
  },
]

const filterOptions = [
  { id: 'all', label: 'الكل' },
  { id: 'unread', label: 'غير مقروءة' },
  { id: 'order_status', label: 'الطلبات' },
  { id: 'promotion', label: 'العروض' },
  { id: 'message', label: 'الرسائل' },
]

export default function AccountNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeFilter, setActiveFilter] = useState('all')

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'unread') return !notification.read
    return notification.type === activeFilter || notification.type.startsWith(activeFilter)
  })

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              الإشعارات
            </h1>
            {unreadCount > 0 && (
              <Badge variant="danger">{unreadCount} جديد</Badge>
            )}
          </div>

          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4" />
                قراءة الكل
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={clearAll}>
              <Trash2 className="h-4 w-4" />
              مسح الكل
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 transition-colors ${
                !notification.read
                  ? 'border-s-4 border-s-primary-500 bg-primary-50/50 dark:bg-primary-900/10'
                  : ''
              }`}
            >
              <div className="flex gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${notification.bgColor}`}
                >
                  <notification.icon className={`h-6 w-6 ${notification.color}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className={`font-medium ${
                          !notification.read
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {notification.message}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        {formatDate(new Date(notification.createdAt), 'dd MMM yyyy, hh:mm a')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
                          title="تعليم كمقروء"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {(notification.orderId || notification.productId) && (
                    <Button variant="ghost" size="sm" className="mt-2">
                      {notification.orderId ? 'عرض الطلب' : 'قيّم المنتج'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Bell className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            لا توجد إشعارات
          </p>
        </Card>
      )}
    </div>
  )
}
