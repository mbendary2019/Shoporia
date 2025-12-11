'use client'

import { useState } from 'react'
import { Card, Button, Badge } from '@/components/ui'
import {
  Flag,
  AlertTriangle,
  MessageSquare,
  Store,
  Package,
  User,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react'

const reports = [
  {
    id: 1,
    type: 'product',
    title: 'منتج مخالف - آيفون مقلد',
    reporter: 'أحمد محمد',
    target: 'متجر الموبايلات',
    reason: 'منتج مقلد/مزيف',
    status: 'pending',
    date: '2024-01-15',
  },
  {
    id: 2,
    type: 'review',
    title: 'تعليق مسيء',
    reporter: 'سارة أحمد',
    target: 'تعليق على منتج سماعات',
    reason: 'لغة غير لائقة',
    status: 'resolved',
    date: '2024-01-14',
  },
  {
    id: 3,
    type: 'store',
    title: 'متجر احتيالي',
    reporter: 'محمد علي',
    target: 'متجر الصفقات',
    reason: 'احتيال على العملاء',
    status: 'investigating',
    date: '2024-01-13',
  },
  {
    id: 4,
    type: 'user',
    title: 'حساب وهمي',
    reporter: 'النظام التلقائي',
    target: 'user_fake_123',
    reason: 'نشاط مشبوه',
    status: 'pending',
    date: '2024-01-12',
  },
  {
    id: 5,
    type: 'product',
    title: 'صور غير لائقة',
    reporter: 'ليلى حسن',
    target: 'منتج ملابس',
    reason: 'محتوى غير مناسب',
    status: 'rejected',
    date: '2024-01-11',
  },
]

const statusConfig = {
  pending: { label: 'قيد الانتظار', color: 'warning', icon: Clock },
  investigating: { label: 'قيد التحقيق', color: 'info', icon: Eye },
  resolved: { label: 'تم الحل', color: 'success', icon: CheckCircle },
  rejected: { label: 'مرفوض', color: 'danger', icon: XCircle },
}

const typeConfig = {
  product: { label: 'منتج', icon: Package, color: 'text-blue-500' },
  review: { label: 'تعليق', icon: MessageSquare, color: 'text-purple-500' },
  store: { label: 'متجر', icon: Store, color: 'text-orange-500' },
  user: { label: 'مستخدم', icon: User, color: 'text-green-500' },
}

export default function ReportsPage() {
  const [filter, setFilter] = useState('all')

  const filteredReports = filter === 'all'
    ? reports
    : reports.filter(r => r.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            البلاغات
          </h1>
          <p className="text-gray-500">إدارة البلاغات والشكاوى</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="warning">{reports.filter(r => r.status === 'pending').length} قيد الانتظار</Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'all', label: 'الكل' },
          { value: 'pending', label: 'قيد الانتظار' },
          { value: 'investigating', label: 'قيد التحقيق' },
          { value: 'resolved', label: 'تم الحل' },
          { value: 'rejected', label: 'مرفوض' },
        ].map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => {
          const TypeIcon = typeConfig[report.type as keyof typeof typeConfig].icon
          const StatusIcon = statusConfig[report.status as keyof typeof statusConfig].icon

          return (
            <Card key={report.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${typeConfig[report.type as keyof typeof typeConfig].color}`}>
                    <TypeIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {report.title}
                      </h3>
                      <Badge variant={statusConfig[report.status as keyof typeof statusConfig].color as 'warning' | 'info' | 'success' | 'danger'}>
                        {statusConfig[report.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium">السبب:</span> {report.reason}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>المُبلِّغ: {report.reporter}</span>
                      <span>الهدف: {report.target}</span>
                      <span>{report.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                    عرض
                  </Button>
                  {report.status === 'pending' && (
                    <>
                      <Button variant="outline" size="sm" className="text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        قبول
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <XCircle className="h-4 w-4" />
                        رفض
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
