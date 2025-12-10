'use client'

import { useState } from 'react'
import { Card, Button, Badge, Avatar } from '@/components/ui'
import { formatCurrency, formatDate } from '@/utils/format'
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// Mock bookings data
const bookings = [
  {
    id: 'BK-001',
    customer: {
      name: 'أحمد محمد',
      phone: '01012345678',
      email: 'ahmed@example.com',
    },
    service: 'جلسة استشارية',
    package: 'الباقة الأساسية',
    date: '2024-12-15',
    time: '10:00',
    duration: 60,
    price: 500,
    status: 'confirmed',
    createdAt: '2024-12-10T10:30:00',
    notes: 'يرجى الاتصال قبل الموعد بساعة',
  },
  {
    id: 'BK-002',
    customer: {
      name: 'سارة أحمد',
      phone: '01098765432',
      email: 'sara@example.com',
    },
    service: 'تصميم شعار',
    package: 'باقة VIP',
    date: '2024-12-15',
    time: '14:00',
    duration: 120,
    price: 1500,
    status: 'pending',
    createdAt: '2024-12-11T09:15:00',
    notes: '',
  },
  {
    id: 'BK-003',
    customer: {
      name: 'محمد علي',
      phone: '01155566677',
      email: 'mohamed@example.com',
    },
    service: 'صيانة جهاز',
    package: null,
    date: '2024-12-14',
    time: '11:00',
    duration: 45,
    price: 300,
    status: 'completed',
    createdAt: '2024-12-09T16:45:00',
    notes: '',
  },
  {
    id: 'BK-004',
    customer: {
      name: 'نور حسن',
      phone: '01234567890',
      email: 'nour@example.com',
    },
    service: 'درس خصوصي',
    package: 'باقة 4 جلسات',
    date: '2024-12-16',
    time: '16:00',
    duration: 90,
    price: 400,
    status: 'confirmed',
    createdAt: '2024-12-08T14:20:00',
    notes: '',
  },
  {
    id: 'BK-005',
    customer: {
      name: 'فاطمة علي',
      phone: '01011223344',
      email: 'fatma@example.com',
    },
    service: 'جلسة تصوير',
    package: null,
    date: '2024-12-13',
    time: '09:00',
    duration: 180,
    price: 2000,
    status: 'cancelled',
    createdAt: '2024-12-07T11:00:00',
    notes: 'ملغي بطلب العميل',
  },
]

const statusConfig = {
  pending: {
    label: 'قيد الانتظار',
    variant: 'warning' as const,
    icon: AlertCircle,
  },
  confirmed: {
    label: 'مؤكد',
    variant: 'success' as const,
    icon: CheckCircle,
  },
  completed: {
    label: 'مكتمل',
    variant: 'default' as const,
    icon: CheckCircle,
  },
  cancelled: {
    label: 'ملغي',
    variant: 'danger' as const,
    icon: XCircle,
  },
}

// Get current week dates
const getWeekDates = (date: Date) => {
  const week = []
  const start = new Date(date)
  start.setDate(start.getDate() - start.getDay())

  for (let i = 0; i < 7; i++) {
    const day = new Date(start)
    day.setDate(start.getDate() + i)
    week.push(day)
  }
  return week
}

export default function BookingsPage() {
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [filterStatus, setFilterStatus] = useState('')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedBooking, setSelectedBooking] = useState<typeof bookings[0] | null>(null)

  const weekDates = getWeekDates(currentDate)

  const filteredBookings = filterStatus
    ? bookings.filter((b) => b.status === filterStatus)
    : bookings

  const getBookingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return bookings.filter((b) => b.date === dateStr)
  }

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            الحجوزات
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            إدارة حجوزات الخدمات
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={view === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setView('list')}
          >
            قائمة
          </Button>
          <Button
            variant={view === 'calendar' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setView('calendar')}
          >
            تقويم
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">حجوزات اليوم</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
            </div>
            <Calendar className="h-8 w-8 text-primary-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">قيد الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600">2</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">مؤكدة</p>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إيرادات الأسبوع</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(4700)}
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary-100 p-2 dark:bg-primary-900/30">
              <span className="text-sm font-bold text-primary-600">$</span>
            </div>
          </div>
        </Card>
      </div>

      {view === 'list' ? (
        <>
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="ابحث برقم الحجز أو اسم العميل..."
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
                  <option value="pending">قيد الانتظار</option>
                  <option value="confirmed">مؤكد</option>
                  <option value="completed">مكتمل</option>
                  <option value="cancelled">ملغي</option>
                </select>

                <input
                  type="date"
                  className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
                />
              </div>
            </div>
          </Card>

          {/* Bookings List */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                      الحجز
                    </th>
                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                      العميل
                    </th>
                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                      الخدمة
                    </th>
                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                      التاريخ والوقت
                    </th>
                    <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                      السعر
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
                  {filteredBookings.map((booking) => {
                    const status = statusConfig[booking.status as keyof typeof statusConfig]
                    return (
                      <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {booking.id}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar fallback={booking.customer.name} size="sm" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {booking.customer.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {booking.customer.phone}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {booking.service}
                          </p>
                          {booking.package && (
                            <p className="text-sm text-gray-500">{booking.package}</p>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4" />
                            {formatDate(new Date(booking.date), 'dd MMM')}
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            {booking.time} ({booking.duration} دقيقة)
                          </div>
                        </td>
                        <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                          {formatCurrency(booking.price)}
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant={status.variant}>
                            <status.icon className="me-1 h-3 w-3" />
                            {status.label}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {booking.status === 'pending' && (
                              <>
                                <Button size="sm" variant="ghost" className="text-green-600">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-600">
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="h-4 w-4" />
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
        </>
      ) : (
        /* Calendar View */
        <Card className="p-6">
          {/* Calendar Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatDate(weekDates[0], 'MMM yyyy')}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                اليوم
              </Button>
              <Button variant="outline" size="sm" onClick={handleNextWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-2">
            {weekDates.map((date, index) => {
              const dayBookings = getBookingsForDate(date)
              const isToday = date.toDateString() === new Date().toDateString()

              return (
                <div
                  key={index}
                  className={`min-h-[200px] rounded-lg border p-2 ${
                    isToday
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="mb-2 text-center">
                    <p className="text-xs text-gray-500">
                      {['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'][date.getDay()]}
                    </p>
                    <p
                      className={`text-lg font-bold ${
                        isToday ? 'text-primary-600' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {date.getDate()}
                    </p>
                  </div>

                  <div className="space-y-1">
                    {dayBookings.map((booking) => {
                      const status = statusConfig[booking.status as keyof typeof statusConfig]
                      return (
                        <button
                          key={booking.id}
                          onClick={() => setSelectedBooking(booking)}
                          className={`w-full rounded p-1.5 text-start text-xs ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                          }`}
                        >
                          <p className="font-medium">{booking.time}</p>
                          <p className="truncate">{booking.service}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                تفاصيل الحجز
              </h3>
              <button onClick={() => setSelectedBooking(null)}>
                <XCircle className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar fallback={selectedBooking.customer.name} size="lg" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedBooking.customer.name}
                  </p>
                  <p className="text-sm text-gray-500">{selectedBooking.customer.phone}</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">الخدمة</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedBooking.service}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">التاريخ</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(new Date(selectedBooking.date), 'dd MMM yyyy')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">الوقت</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedBooking.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">المدة</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedBooking.duration} دقيقة
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">السعر</span>
                  <span className="font-bold text-primary-600">
                    {formatCurrency(selectedBooking.price)}
                  </span>
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                  <p className="text-sm text-gray-500">ملاحظات</p>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedBooking.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                {selectedBooking.status === 'pending' && (
                  <>
                    <Button className="flex-1">
                      <CheckCircle className="h-4 w-4" />
                      تأكيد
                    </Button>
                    <Button variant="outline" className="flex-1 text-red-600">
                      <XCircle className="h-4 w-4" />
                      رفض
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedBooking(null)}
                >
                  إغلاق
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
