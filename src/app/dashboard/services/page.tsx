'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, Button, Badge, Modal } from '@/components/ui'
import { formatCurrency } from '@/utils/format'
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Star,
  MoreVertical,
  Sparkles,
  Users,
  DollarSign,
} from 'lucide-react'

// Mock services data
const services = [
  {
    id: '1',
    name: 'قص وتصفيف شعر رجالي',
    description: 'قص شعر احترافي مع تصفيف عصري يناسب شكل الوجه',
    price: 150,
    priceType: 'fixed',
    duration: 45,
    category: 'حلاقة رجالي',
    status: 'active',
    rating: 4.8,
    reviewCount: 125,
    bookingCount: 450,
  },
  {
    id: '2',
    name: 'صبغة شعر كاملة',
    description: 'صبغة احترافية بألوان متنوعة مع العناية بالشعر',
    price: 350,
    priceType: 'starting_from',
    duration: 120,
    category: 'تلوين الشعر',
    status: 'active',
    rating: 4.6,
    reviewCount: 89,
    bookingCount: 230,
  },
  {
    id: '3',
    name: 'تنظيف بشرة عميق',
    description: 'تنظيف احترافي للبشرة مع ماسك مغذي',
    price: 250,
    priceType: 'fixed',
    duration: 60,
    category: 'العناية بالبشرة',
    status: 'active',
    rating: 4.9,
    reviewCount: 156,
    bookingCount: 380,
  },
  {
    id: '4',
    name: 'مساج استرخائي',
    description: 'مساج للجسم كامل للاسترخاء وتخفيف التوتر',
    price: 400,
    priceType: 'hourly',
    duration: 60,
    category: 'مساج',
    status: 'inactive',
    rating: 4.7,
    reviewCount: 78,
    bookingCount: 150,
  },
  {
    id: '5',
    name: 'مانيكير وباديكير',
    description: 'عناية كاملة بالأظافر مع طلاء اختياري',
    price: 200,
    priceType: 'fixed',
    duration: 90,
    category: 'العناية بالأظافر',
    status: 'active',
    rating: 4.5,
    reviewCount: 234,
    bookingCount: 520,
  },
]

const upcomingBookings = [
  {
    id: '1',
    serviceName: 'قص وتصفيف شعر رجالي',
    customerName: 'أحمد محمد',
    date: '2024-12-11',
    time: '10:00',
    status: 'confirmed',
  },
  {
    id: '2',
    serviceName: 'تنظيف بشرة عميق',
    customerName: 'سارة أحمد',
    date: '2024-12-11',
    time: '11:30',
    status: 'confirmed',
  },
  {
    id: '3',
    serviceName: 'صبغة شعر كاملة',
    customerName: 'نور حسن',
    date: '2024-12-11',
    time: '14:00',
    status: 'pending',
  },
]

const statusConfig = {
  active: { label: 'نشط', variant: 'success' as const },
  inactive: { label: 'غير نشط', variant: 'secondary' as const },
}

const priceTypeLabels = {
  fixed: 'سعر ثابت',
  hourly: 'بالساعة',
  starting_from: 'يبدأ من',
}

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

  const stats = {
    totalServices: services.length,
    activeServices: services.filter((s) => s.status === 'active').length,
    totalBookings: services.reduce((sum, s) => sum + s.bookingCount, 0),
    avgRating: (services.reduce((sum, s) => sum + s.rating, 0) / services.length).toFixed(1),
  }

  const handleDelete = (service: typeof services[0]) => {
    setSelectedService(service)
    setShowDeleteModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            الخدمات
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            إدارة خدمات متجرك وحجوزات العملاء
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4" />
            إدارة الحجوزات
          </Button>
          <Link href="/dashboard/services/new">
            <Button>
              <Plus className="h-4 w-4" />
              إضافة خدمة
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <Sparkles className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalServices}
              </p>
              <p className="text-sm text-gray-500">إجمالي الخدمات</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalBookings}
              </p>
              <p className="text-sm text-gray-500">إجمالي الحجوزات</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.avgRating}
              </p>
              <p className="text-sm text-gray-500">متوسط التقييم</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.activeServices}
              </p>
              <p className="text-sm text-gray-500">خدمات نشطة</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Services List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="ابحث في الخدمات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-white pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                />
              </div>

              <div className="flex gap-3">
                <select className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800">
                  <option value="">كل الحالات</option>
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Services Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {service.name}
                        </h3>
                        <Badge variant={statusConfig[service.status as keyof typeof statusConfig].variant}>
                          {statusConfig[service.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                    <button className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-primary-500">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold">
                        {formatCurrency(service.price)}
                      </span>
                      <span className="text-gray-500 text-xs">
                        ({priceTypeLabels[service.priceType as keyof typeof priceTypeLabels]})
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration} دقيقة</span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{service.rating}</span>
                      <span className="text-xs">({service.reviewCount})</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                    <span className="text-sm text-gray-500">
                      {service.bookingCount} حجز
                    </span>
                    <div className="flex gap-1">
                      <button className="rounded p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Eye className="h-4 w-4 text-gray-500" />
                      </button>
                      <Link href={`/dashboard/services/${service.id}/edit`}>
                        <button className="rounded p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Edit className="h-4 w-4 text-gray-500" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(service)}
                        className="rounded p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Bookings Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                الحجوزات القادمة
              </h2>
              <Link
                href="/dashboard/bookings"
                className="text-sm text-primary-500 hover:underline"
              >
                عرض الكل
              </Link>
            </div>

            <div className="mt-4 space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                    <Calendar className="h-5 w-5 text-primary-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium text-gray-900 dark:text-white">
                      {booking.serviceName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.customerName}
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {booking.time}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(booking.date).toLocaleDateString('ar-EG', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {upcomingBookings.length === 0 && (
                <p className="text-center text-sm text-gray-500 py-4">
                  لا توجد حجوزات قادمة
                </p>
              )}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              إحصائيات اليوم
            </h2>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">حجوزات اليوم</span>
                <span className="font-semibold text-gray-900 dark:text-white">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">مكتملة</span>
                <span className="font-semibold text-green-600">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">قيد الانتظار</span>
                <span className="font-semibold text-yellow-600">3</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">إيرادات اليوم</span>
                <span className="font-bold text-primary-500">{formatCurrency(2150)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="حذف الخدمة"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            هل أنت متأكد من حذف خدمة &quot;{selectedService?.name}&quot;؟
            <br />
            سيتم إلغاء جميع الحجوزات المرتبطة بهذه الخدمة.
          </p>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              إلغاء
            </Button>
            <Button
              variant="default"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                // TODO: Delete service
                setShowDeleteModal(false)
              }}
            >
              <Trash2 className="h-4 w-4" />
              حذف
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
