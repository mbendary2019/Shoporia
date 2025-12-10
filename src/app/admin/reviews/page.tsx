'use client'

import { useState } from 'react'
import { Card, Button, Badge, Avatar } from '@/components/ui'
import { formatDate } from '@/utils/format'
import {
  Search,
  Star,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  Flag,
  MessageSquare,
  ThumbsUp,
  Image as ImageIcon,
} from 'lucide-react'

// Mock reviews data
const reviews = [
  {
    id: '1',
    customer: { name: 'أحمد محمد', avatar: null },
    product: 'ساعة ذكية متطورة',
    store: 'متجر التقنية',
    rating: 5,
    title: 'منتج رائع',
    comment: 'المنتج ممتاز جداً والشحن كان سريع. أنصح به بشدة!',
    images: ['img1.jpg', 'img2.jpg'],
    isVerified: true,
    helpfulCount: 23,
    isReported: false,
    reply: null,
    createdAt: '2024-12-10T10:30:00',
    status: 'approved',
  },
  {
    id: '2',
    customer: { name: 'سارة أحمد', avatar: null },
    product: 'حقيبة يد جلد طبيعي',
    store: 'بوتيك الجمال',
    rating: 4,
    title: 'جيد جداً',
    comment: 'الحقيبة جميلة والجلد عالي الجودة. فقط اللون أغمق قليلاً من الصورة.',
    images: [],
    isVerified: true,
    helpfulCount: 12,
    isReported: false,
    reply: 'شكراً لك! سنحرص على تحسين دقة الألوان في الصور.',
    createdAt: '2024-12-09T14:20:00',
    status: 'approved',
  },
  {
    id: '3',
    customer: { name: 'محمد علي', avatar: null },
    product: 'سماعات بلوتوث',
    store: 'متجر التقنية',
    rating: 2,
    title: 'غير راضي',
    comment: 'المنتج لم يكن بالجودة المتوقعة. الصوت ضعيف.',
    images: ['img3.jpg'],
    isVerified: false,
    helpfulCount: 5,
    isReported: true,
    reply: null,
    createdAt: '2024-12-08T09:15:00',
    status: 'pending',
  },
  {
    id: '4',
    customer: { name: 'نور حسن', avatar: null },
    product: 'قميص قطن فاخر',
    store: 'متجر الأناقة',
    rating: 5,
    title: 'ممتاز!',
    comment: 'القماش ممتاز والمقاس مضبوط تماماً. سأشتري المزيد!',
    images: [],
    isVerified: true,
    helpfulCount: 18,
    isReported: false,
    reply: null,
    createdAt: '2024-12-07T16:45:00',
    status: 'approved',
  },
  {
    id: '5',
    customer: { name: 'فاطمة علي', avatar: null },
    product: 'عطر فاخر',
    store: 'دار العطور',
    rating: 1,
    title: 'مزيف!',
    comment: 'العطر مزيف وليس أصلي. أريد استرداد أموالي!',
    images: ['img4.jpg', 'img5.jpg'],
    isVerified: false,
    helpfulCount: 2,
    isReported: true,
    reply: null,
    createdAt: '2024-12-06T11:00:00',
    status: 'pending',
  },
]

const statusConfig = {
  approved: { label: 'موافق عليه', variant: 'success' as const },
  pending: { label: 'قيد المراجعة', variant: 'warning' as const },
  rejected: { label: 'مرفوض', variant: 'danger' as const },
}

export default function AdminReviewsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterRating, setFilterRating] = useState('')

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.product.includes(searchQuery) ||
      review.customer.name.includes(searchQuery) ||
      review.comment.includes(searchQuery)
    const matchesStatus = !filterStatus || review.status === filterStatus
    const matchesRating = !filterRating || review.rating === parseInt(filterRating)
    return matchesSearch && matchesStatus && matchesRating
  })

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            إدارة التقييمات
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            مراجعة وإدارة تقييمات العملاء
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إجمالي التقييمات</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{reviews.length}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-primary-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">متوسط التقييم</p>
              <p className="text-2xl font-bold text-yellow-600">{averageRating}</p>
            </div>
            <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">قيد المراجعة</p>
              <p className="text-2xl font-bold text-yellow-600">
                {reviews.filter((r) => r.status === 'pending').length}
              </p>
            </div>
            <Eye className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">البلاغات</p>
              <p className="text-2xl font-bold text-red-600">
                {reviews.filter((r) => r.isReported).length}
              </p>
            </div>
            <Flag className="h-8 w-8 text-red-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">5 نجوم</p>
              <p className="text-2xl font-bold text-green-600">
                {reviews.filter((r) => r.rating === 5).length}
              </p>
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
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
              placeholder="ابحث في التقييمات..."
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
              <option value="approved">موافق عليه</option>
              <option value="pending">قيد المراجعة</option>
              <option value="rejected">مرفوض</option>
            </select>

            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="">كل التقييمات</option>
              <option value="5">5 نجوم</option>
              <option value="4">4 نجوم</option>
              <option value="3">3 نجوم</option>
              <option value="2">2 نجوم</option>
              <option value="1">1 نجمة</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => {
          const status = statusConfig[review.status as keyof typeof statusConfig]
          return (
            <Card key={review.id} className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <Avatar fallback={review.customer.name} size="md" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {review.customer.name}
                        </p>
                        {review.isVerified && (
                          <Badge variant="success" className="text-xs">
                            <CheckCircle className="me-1 h-3 w-3" />
                            مشتري موثق
                          </Badge>
                        )}
                        {review.isReported && (
                          <Badge variant="danger" className="text-xs">
                            <Flag className="me-1 h-3 w-3" />
                            مُبلغ عنه
                          </Badge>
                        )}
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i <= review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(new Date(review.createdAt), 'dd MMM yyyy')}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        {review.product} • {review.store}
                      </p>

                      {review.title && (
                        <h4 className="mt-3 font-medium text-gray-900 dark:text-white">
                          {review.title}
                        </h4>
                      )}
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        {review.comment}
                      </p>

                      {review.images.length > 0 && (
                        <div className="mt-3 flex gap-2">
                          {review.images.map((img, index) => (
                            <div
                              key={index}
                              className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700"
                            >
                              <ImageIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          ))}
                        </div>
                      )}

                      {review.reply && (
                        <div className="mt-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            رد المتجر:
                          </p>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {review.reply}
                          </p>
                        </div>
                      )}

                      <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {review.helpfulCount} وجدوا هذا مفيداً
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 lg:flex-col">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {review.status === 'pending' && (
                    <>
                      <Button size="sm" variant="ghost" className="text-green-600">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="ghost" className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
