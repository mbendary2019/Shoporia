'use client'

import { useState } from 'react'
import { Card, Button, Badge, Avatar } from '@/components/ui'
import { formatDate } from '@/utils/format'
import {
  Search,
  Eye,
  Ban,
  Trash2,
  Shield,
  Store,
  ShoppingCart,
  Mail,
  Phone,
  CheckCircle,
} from 'lucide-react'

// Mock users data
const users = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '01012345678',
    role: 'seller',
    status: 'active',
    verified: true,
    stores: 2,
    orders: 45,
    createdAt: '2024-01-15',
    lastLogin: '2024-12-10',
  },
  {
    id: '2',
    name: 'سارة أحمد',
    email: 'sara@example.com',
    phone: '01098765432',
    role: 'customer',
    status: 'active',
    verified: true,
    stores: 0,
    orders: 12,
    createdAt: '2024-03-20',
    lastLogin: '2024-12-09',
  },
  {
    id: '3',
    name: 'محمد علي',
    email: 'mohamed@example.com',
    phone: '01155566677',
    role: 'seller',
    status: 'suspended',
    verified: false,
    stores: 1,
    orders: 89,
    createdAt: '2024-02-10',
    lastLogin: '2024-11-15',
  },
  {
    id: '4',
    name: 'نور حسن',
    email: 'nour@example.com',
    phone: '01234567890',
    role: 'customer',
    status: 'active',
    verified: true,
    stores: 0,
    orders: 34,
    createdAt: '2024-06-05',
    lastLogin: '2024-12-10',
  },
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@shoporia.com',
    phone: '01000000000',
    role: 'admin',
    status: 'active',
    verified: true,
    stores: 0,
    orders: 0,
    createdAt: '2024-01-01',
    lastLogin: '2024-12-10',
  },
]

const roleConfig = {
  admin: { label: 'مدير', variant: 'danger' as const, icon: Shield },
  seller: { label: 'بائع', variant: 'info' as const, icon: Store },
  customer: { label: 'عميل', variant: 'default' as const, icon: ShoppingCart },
}

const statusConfig = {
  active: { label: 'نشط', variant: 'success' as const },
  suspended: { label: 'موقوف', variant: 'danger' as const },
  pending: { label: 'معلق', variant: 'warning' as const },
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.includes(searchQuery) ||
      user.email.includes(searchQuery) ||
      user.phone.includes(searchQuery)
    const matchesRole = !filterRole || user.role === filterRole
    const matchesStatus = !filterStatus || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            إدارة المستخدمين
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            إدارة جميع مستخدمي المنصة
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="danger">{users.filter(u => u.role === 'admin').length} مدير</Badge>
          <Badge variant="info">{users.filter(u => u.role === 'seller').length} بائع</Badge>
          <Badge variant="default">{users.filter(u => u.role === 'customer').length} عميل</Badge>
        </div>
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
              placeholder="ابحث بالاسم أو البريد أو الهاتف..."
              className="h-10 w-full rounded-lg border border-gray-300 bg-white pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="">كل الأنواع</option>
              <option value="admin">مدير</option>
              <option value="seller">بائع</option>
              <option value="customer">عميل</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
            >
              <option value="">كل الحالات</option>
              <option value="active">نشط</option>
              <option value="suspended">موقوف</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  المستخدم
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  التواصل
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  النوع
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  الإحصائيات
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  الحالة
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  آخر دخول
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => {
                const role = roleConfig[user.role as keyof typeof roleConfig]
                const status = statusConfig[user.status as keyof typeof statusConfig]
                return (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar fallback={user.name} size="sm" />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </p>
                            {user.verified && (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            منذ {formatDate(new Date(user.createdAt), 'MMM yyyy')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Phone className="h-4 w-4" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={role.variant}>
                        <role.icon className="me-1 h-3 w-3" />
                        {role.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {user.role === 'seller' && (
                          <div className="flex items-center gap-2">
                            <Store className="h-4 w-4" />
                            {user.stores} متجر
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          {user.orders} طلب
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {formatDate(new Date(user.lastLogin), 'dd MMM yyyy')}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user.role !== 'admin' && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-orange-600"
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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
            عرض 1 - {filteredUsers.length} من {users.length} مستخدم
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
