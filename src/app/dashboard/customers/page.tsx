'use client'

import { useState } from 'react'
import { Card, Button, Badge, Avatar, Modal } from '@/components/ui'
import { formatDate, formatCurrency } from '@/utils/format'
import {
  Search,
  Users,
  UserPlus,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Package,
  MessageSquare,
  MoreVertical,
  Filter,
  Download,
} from 'lucide-react'

// Mock customers data
const customers = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '01012345678',
    avatar: null,
    totalOrders: 15,
    totalSpent: 8500,
    lastOrder: '2024-12-10',
    joinDate: '2024-01-15',
    status: 'active',
    tags: ['VIP', 'منتظم'],
    city: 'القاهرة',
  },
  {
    id: '2',
    name: 'سارة أحمد',
    email: 'sara@example.com',
    phone: '01123456789',
    avatar: null,
    totalOrders: 8,
    totalSpent: 4200,
    lastOrder: '2024-12-08',
    joinDate: '2024-03-20',
    status: 'active',
    tags: ['جديد'],
    city: 'الإسكندرية',
  },
  {
    id: '3',
    name: 'محمد علي',
    email: 'mohamed@example.com',
    phone: '01234567890',
    avatar: null,
    totalOrders: 3,
    totalSpent: 1500,
    lastOrder: '2024-11-25',
    joinDate: '2024-06-10',
    status: 'inactive',
    tags: [],
    city: 'الجيزة',
  },
  {
    id: '4',
    name: 'فاطمة حسن',
    email: 'fatma@example.com',
    phone: '01098765432',
    avatar: null,
    totalOrders: 22,
    totalSpent: 15000,
    lastOrder: '2024-12-09',
    joinDate: '2023-11-01',
    status: 'active',
    tags: ['VIP', 'مميز'],
    city: 'القاهرة',
  },
  {
    id: '5',
    name: 'عمر خالد',
    email: 'omar@example.com',
    phone: '01187654321',
    avatar: null,
    totalOrders: 5,
    totalSpent: 2800,
    lastOrder: '2024-12-05',
    joinDate: '2024-08-15',
    status: 'active',
    tags: ['منتظم'],
    city: 'المنصورة',
  },
]

const statusConfig = {
  active: { label: 'نشط', variant: 'success' as const },
  inactive: { label: 'غير نشط', variant: 'secondary' as const },
}

export default function DashboardCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof customers)[0] | null>(null)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    const matchesStatus = !filterStatus || customer.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: customers.length,
    newThisMonth: 12,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue: Math.round(
      customers.reduce((sum, c) => sum + c.totalSpent, 0) /
        customers.reduce((sum, c) => sum + c.totalOrders, 0)
    ),
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            العملاء
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            إدارة ومتابعة عملاء متجرك
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4" />
          تصدير البيانات
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إجمالي العملاء</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <Users className="h-8 w-8 text-primary-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">عملاء جدد هذا الشهر</p>
              <p className="text-2xl font-bold text-green-600">
                +{stats.newThisMonth}
              </p>
            </div>
            <UserPlus className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">إجمالي الإيرادات</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">متوسط قيمة الطلب</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(stats.avgOrderValue)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
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
              placeholder="ابحث بالاسم، البريد، أو الهاتف..."
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
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              فلاتر متقدمة
            </Button>
          </div>
        </div>
      </Card>

      {/* Customers Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  العميل
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  معلومات الاتصال
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  الطلبات
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  إجمالي الإنفاق
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  آخر طلب
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  الحالة
                </th>
                <th className="px-4 py-3 text-start text-sm font-medium text-gray-500">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCustomers.map((customer) => {
                const status = statusConfig[customer.status as keyof typeof statusConfig]
                return (
                  <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar fallback={customer.name} size="md" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {customer.name}
                          </p>
                          <div className="flex gap-1 mt-1">
                            {customer.tags.map((tag, index) => (
                              <span
                                key={index}
                                className={`rounded-full px-2 py-0.5 text-xs ${
                                  tag === 'VIP'
                                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1 text-sm">
                        <p className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </p>
                        <p className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </p>
                        <p className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <MapPin className="h-3 w-3" />
                          {customer.city}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <ShoppingBag className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {customer.totalOrders}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(customer.totalSpent)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(new Date(customer.lastOrder), 'dd/MM/yyyy')}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
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

      {/* Customer Detail Modal */}
      <Modal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        title="تفاصيل العميل"
        size="lg"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            {/* Customer Header */}
            <div className="flex items-center gap-4">
              <Avatar fallback={selectedCustomer.name} size="lg" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedCustomer.name}
                </h3>
                <div className="flex gap-2 mt-1">
                  {selectedCustomer.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant={tag === 'VIP' ? 'warning' : 'secondary'}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">البريد الإلكتروني</span>
                </div>
                <p className="mt-1 font-medium text-gray-900 dark:text-white">
                  {selectedCustomer.email}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">الهاتف</span>
                </div>
                <p className="mt-1 font-medium text-gray-900 dark:text-white">
                  {selectedCustomer.phone}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">المدينة</span>
                </div>
                <p className="mt-1 font-medium text-gray-900 dark:text-white">
                  {selectedCustomer.city}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">تاريخ الانضمام</span>
                </div>
                <p className="mt-1 font-medium text-gray-900 dark:text-white">
                  {formatDate(new Date(selectedCustomer.joinDate), 'dd MMMM yyyy')}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <ShoppingBag className="mx-auto h-6 w-6 text-primary-500" />
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedCustomer.totalOrders}
                </p>
                <p className="text-sm text-gray-500">طلب</p>
              </div>
              <div className="text-center rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <DollarSign className="mx-auto h-6 w-6 text-green-500" />
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(selectedCustomer.totalSpent)}
                </p>
                <p className="text-sm text-gray-500">إجمالي الإنفاق</p>
              </div>
              <div className="text-center rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <Star className="mx-auto h-6 w-6 text-yellow-500" />
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(
                    Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders)
                  )}
                </p>
                <p className="text-sm text-gray-500">متوسط الطلب</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h4 className="mb-3 font-medium text-gray-900 dark:text-white">
                آخر الطلبات
              </h4>
              <div className="space-y-2">
                {[1, 2, 3].map((order) => (
                  <div
                    key={order}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          طلب #{`ORD-2024-00${order}`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(new Date(), 'dd/MM/yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(500 * order)}
                      </p>
                      <Badge variant="success" className="text-xs">
                        مكتمل
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1">
                <MessageSquare className="h-4 w-4" />
                إرسال رسالة
              </Button>
              <Button variant="outline" className="flex-1">
                <Mail className="h-4 w-4" />
                إرسال بريد
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
