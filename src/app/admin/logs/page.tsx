'use client'

import { useState } from 'react'
import { Card, Button, Badge, Input } from '@/components/ui'
import {
  FileText,
  Search,
  Filter,
  Download,
  User,
  Settings,
  ShoppingCart,
  Trash2,
  Edit,
  Plus,
  LogIn,
  LogOut,
  AlertTriangle,
  Info,
  CheckCircle,
} from 'lucide-react'

const logs = [
  {
    id: 1,
    action: 'login',
    user: 'admin@shoporia.app',
    role: 'Super Admin',
    description: 'تسجيل دخول ناجح',
    ip: '192.168.1.100',
    level: 'info',
    timestamp: '2024-01-15 14:30:25',
  },
  {
    id: 2,
    action: 'delete',
    user: 'moderator@shoporia.app',
    role: 'مراقب محتوى',
    description: 'حذف تعليق مخالف على منتج #1234',
    ip: '192.168.1.105',
    level: 'warning',
    timestamp: '2024-01-15 14:25:10',
  },
  {
    id: 3,
    action: 'edit',
    user: 'admin@shoporia.app',
    role: 'Super Admin',
    description: 'تعديل إعدادات المتجر #567',
    ip: '192.168.1.100',
    level: 'info',
    timestamp: '2024-01-15 14:20:05',
  },
  {
    id: 4,
    action: 'create',
    user: 'accountant@shoporia.app',
    role: 'محاسب',
    description: 'إنشاء تقرير مالي شهري',
    ip: '192.168.1.110',
    level: 'info',
    timestamp: '2024-01-15 14:15:00',
  },
  {
    id: 5,
    action: 'delete',
    user: 'admin@shoporia.app',
    role: 'Super Admin',
    description: 'حذف متجر مخالف "متجر الصفقات"',
    ip: '192.168.1.100',
    level: 'warning',
    timestamp: '2024-01-15 14:10:30',
  },
  {
    id: 6,
    action: 'login_failed',
    user: 'unknown',
    role: '-',
    description: 'محاولة دخول فاشلة - كلمة مرور خاطئة',
    ip: '192.168.1.200',
    level: 'error',
    timestamp: '2024-01-15 14:05:15',
  },
  {
    id: 7,
    action: 'logout',
    user: 'support@shoporia.app',
    role: 'دعم فني',
    description: 'تسجيل خروج',
    ip: '192.168.1.115',
    level: 'info',
    timestamp: '2024-01-15 14:00:00',
  },
  {
    id: 8,
    action: 'settings',
    user: 'admin@shoporia.app',
    role: 'Super Admin',
    description: 'تحديث إعدادات الدفع',
    ip: '192.168.1.100',
    level: 'warning',
    timestamp: '2024-01-15 13:55:45',
  },
]

const actionConfig = {
  login: { icon: LogIn, color: 'text-green-600' },
  logout: { icon: LogOut, color: 'text-gray-600' },
  login_failed: { icon: AlertTriangle, color: 'text-red-600' },
  create: { icon: Plus, color: 'text-blue-600' },
  edit: { icon: Edit, color: 'text-orange-600' },
  delete: { icon: Trash2, color: 'text-red-600' },
  settings: { icon: Settings, color: 'text-purple-600' },
}

const levelConfig = {
  info: { label: 'معلومات', color: 'info', icon: Info },
  warning: { label: 'تحذير', color: 'warning', icon: AlertTriangle },
  error: { label: 'خطأ', color: 'danger', icon: AlertTriangle },
  success: { label: 'نجاح', color: 'success', icon: CheckCircle },
}

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.description.includes(searchQuery) ||
      log.user.includes(searchQuery) ||
      log.role.includes(searchQuery)
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter
    return matchesSearch && matchesLevel
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            سجلات النظام
          </h1>
          <p className="text-gray-500">تتبع جميع الأنشطة والعمليات</p>
        </div>
        <Button>
          <Download className="h-4 w-4" />
          تصدير السجلات
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="بحث في السجلات..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amazon-orange focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'الكل' },
              { value: 'info', label: 'معلومات' },
              { value: 'warning', label: 'تحذيرات' },
              { value: 'error', label: 'أخطاء' },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant={levelFilter === filter.value ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setLevelFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Logs List */}
      <Card className="overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredLogs.map((log) => {
            const ActionIcon = actionConfig[log.action as keyof typeof actionConfig]?.icon || FileText
            const actionColor = actionConfig[log.action as keyof typeof actionConfig]?.color || 'text-gray-600'

            return (
              <div key={log.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${actionColor}`}>
                    <ActionIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {log.description}
                      </p>
                      <Badge variant={levelConfig[log.level as keyof typeof levelConfig].color as 'info' | 'warning' | 'danger' | 'success'}>
                        {levelConfig[log.level as keyof typeof levelConfig].label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {log.user}
                      </span>
                      <span>{log.role}</span>
                      <span>IP: {log.ip}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    {log.timestamp}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          عرض {filteredLogs.length} من {logs.length} سجل
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            السابق
          </Button>
          <Button variant="outline" size="sm">
            التالي
          </Button>
        </div>
      </div>
    </div>
  )
}
