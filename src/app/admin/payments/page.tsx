'use client'

import { useState } from 'react'
import { Card, Button, Badge } from '@/components/ui'
import {
  CreditCard,
  Wallet,
  Building,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Filter,
} from 'lucide-react'

const transactions = [
  {
    id: 'TRX-001',
    type: 'payout',
    store: 'متجر التقنية',
    amount: 15000,
    fee: 450,
    net: 14550,
    method: 'bank',
    status: 'completed',
    date: '2024-01-15 14:30',
  },
  {
    id: 'TRX-002',
    type: 'payout',
    store: 'أزياء المحلة',
    amount: 8500,
    fee: 255,
    net: 8245,
    method: 'wallet',
    status: 'pending',
    date: '2024-01-15 12:15',
  },
  {
    id: 'TRX-003',
    type: 'refund',
    store: 'بيت الجمال',
    amount: 350,
    fee: 0,
    net: -350,
    method: 'card',
    status: 'completed',
    date: '2024-01-14 18:45',
  },
  {
    id: 'TRX-004',
    type: 'payout',
    store: 'مطبخ الشيف',
    amount: 4200,
    fee: 126,
    net: 4074,
    method: 'instapay',
    status: 'failed',
    date: '2024-01-14 10:20',
  },
  {
    id: 'TRX-005',
    type: 'payout',
    store: 'رياضة بلس',
    amount: 12000,
    fee: 360,
    net: 11640,
    method: 'bank',
    status: 'processing',
    date: '2024-01-13 16:00',
  },
]

const statusConfig = {
  pending: { label: 'قيد الانتظار', color: 'warning', icon: Clock },
  processing: { label: 'قيد المعالجة', color: 'info', icon: Clock },
  completed: { label: 'مكتمل', color: 'success', icon: CheckCircle },
  failed: { label: 'فشل', color: 'danger', icon: XCircle },
}

const methodConfig = {
  bank: { label: 'تحويل بنكي', icon: Building },
  wallet: { label: 'محفظة إلكترونية', icon: Wallet },
  card: { label: 'بطاقة ائتمان', icon: CreditCard },
  instapay: { label: 'انستاباي', icon: Wallet },
}

export default function PaymentsPage() {
  const [filter, setFilter] = useState('all')

  const stats = [
    { label: 'إجمالي المدفوعات', value: '245,000', unit: 'ج.م', color: 'text-green-600' },
    { label: 'قيد الانتظار', value: '35,500', unit: 'ج.م', color: 'text-yellow-600' },
    { label: 'المرتجعات', value: '2,350', unit: 'ج.م', color: 'text-red-600' },
    { label: 'العمولات', value: '7,350', unit: 'ج.م', color: 'text-blue-600' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            المدفوعات
          </h1>
          <p className="text-gray-500">إدارة المدفوعات والتحويلات</p>
        </div>
        <Button>
          <Download className="h-4 w-4" />
          تصدير التقرير
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
              <span className="text-sm font-normal text-gray-500 ms-1">{stat.unit}</span>
            </p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">تصفية:</span>
          </div>
          {[
            { value: 'all', label: 'الكل' },
            { value: 'pending', label: 'قيد الانتظار' },
            { value: 'processing', label: 'قيد المعالجة' },
            { value: 'completed', label: 'مكتمل' },
            { value: 'failed', label: 'فشل' },
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
      </Card>

      {/* Transactions Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">رقم العملية</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">المتجر</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">المبلغ</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">العمولة</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">الصافي</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">الطريقة</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">الحالة</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions
                .filter((t) => filter === 'all' || t.status === filter)
                .map((transaction) => {
                  const MethodIcon = methodConfig[transaction.method as keyof typeof methodConfig].icon
                  return (
                    <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {transaction.store}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={transaction.type === 'refund' ? 'text-red-600' : 'text-gray-900 dark:text-white'}>
                          {transaction.type === 'refund' ? '-' : ''}{transaction.amount.toLocaleString()} ج.م
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {transaction.fee.toLocaleString()} ج.م
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        <span className={transaction.net < 0 ? 'text-red-600' : 'text-green-600'}>
                          {transaction.net.toLocaleString()} ج.م
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <MethodIcon className="h-4 w-4" />
                          {methodConfig[transaction.method as keyof typeof methodConfig].label}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusConfig[transaction.status as keyof typeof statusConfig].color as 'warning' | 'info' | 'success' | 'danger'}>
                          {statusConfig[transaction.status as keyof typeof statusConfig].label}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {transaction.date}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
