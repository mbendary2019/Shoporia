'use client'

import { useState } from 'react'
import { Card, Button, Badge, Modal, Input } from '@/components/ui'
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Shield,
  Eye,
  Package,
  MessageSquare,
  CreditCard,
  Store,
  Headphones,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Calendar,
  Key,
} from 'lucide-react'

// الأدوار المتاحة
const roles = [
  {
    id: 'super_admin',
    name: 'مدير النظام',
    nameEn: 'Super Admin',
    description: 'صلاحيات كاملة على النظام',
    color: 'bg-red-500',
    permissions: ['all'],
  },
  {
    id: 'content_moderator',
    name: 'مراقب محتوى',
    nameEn: 'Content Moderator',
    description: 'مراقبة المنتجات والتعليقات',
    color: 'bg-blue-500',
    permissions: ['view_products', 'edit_products', 'delete_products', 'view_reviews', 'delete_reviews'],
  },
  {
    id: 'accountant',
    name: 'محاسب',
    nameEn: 'Accountant',
    description: 'إدارة المدفوعات والتقارير المالية',
    color: 'bg-green-500',
    permissions: ['view_payments', 'export_reports', 'view_analytics'],
  },
  {
    id: 'support',
    name: 'دعم فني',
    nameEn: 'Support',
    description: 'الرد على استفسارات العملاء',
    color: 'bg-purple-500',
    permissions: ['view_messages', 'reply_messages', 'view_orders', 'view_users'],
  },
  {
    id: 'store_manager',
    name: 'مدير متاجر',
    nameEn: 'Store Manager',
    description: 'إدارة المتاجر والبائعين',
    color: 'bg-orange-500',
    permissions: ['view_stores', 'edit_stores', 'delete_stores', 'approve_stores'],
  },
  {
    id: 'quality_control',
    name: 'مراقب جودة',
    nameEn: 'Quality Control',
    description: 'فحص جودة المنتجات والخدمات',
    color: 'bg-teal-500',
    permissions: ['view_products', 'flag_products', 'view_reports', 'create_reports'],
  },
]

// الصلاحيات المتاحة
const allPermissions = [
  { id: 'view_products', name: 'عرض المنتجات', icon: Package },
  { id: 'edit_products', name: 'تعديل المنتجات', icon: Edit },
  { id: 'delete_products', name: 'حذف المنتجات', icon: Trash2 },
  { id: 'view_reviews', name: 'عرض التعليقات', icon: MessageSquare },
  { id: 'delete_reviews', name: 'حذف التعليقات', icon: Trash2 },
  { id: 'view_stores', name: 'عرض المتاجر', icon: Store },
  { id: 'edit_stores', name: 'تعديل المتاجر', icon: Edit },
  { id: 'delete_stores', name: 'حذف المتاجر', icon: Trash2 },
  { id: 'approve_stores', name: 'اعتماد المتاجر', icon: CheckCircle },
  { id: 'view_payments', name: 'عرض المدفوعات', icon: CreditCard },
  { id: 'export_reports', name: 'تصدير التقارير', icon: Eye },
  { id: 'view_analytics', name: 'عرض الإحصائيات', icon: Eye },
  { id: 'view_messages', name: 'عرض الرسائل', icon: MessageSquare },
  { id: 'reply_messages', name: 'الرد على الرسائل', icon: Headphones },
  { id: 'view_orders', name: 'عرض الطلبات', icon: Package },
  { id: 'view_users', name: 'عرض المستخدمين', icon: Users },
  { id: 'flag_products', name: 'تعليم منتجات', icon: Eye },
  { id: 'view_reports', name: 'عرض البلاغات', icon: Eye },
  { id: 'create_reports', name: 'إنشاء تقارير', icon: Plus },
]

// أعضاء الفريق
const teamMembers = [
  {
    id: 1,
    name: 'أحمد محمد',
    email: 'admin@shoporia.app',
    phone: '01012345678',
    role: 'super_admin',
    status: 'active',
    lastLogin: '2024-01-15 14:30',
    joinDate: '2023-06-01',
  },
  {
    id: 2,
    name: 'سارة أحمد',
    email: 'moderator@shoporia.app',
    phone: '01098765432',
    role: 'content_moderator',
    status: 'active',
    lastLogin: '2024-01-15 12:15',
    joinDate: '2023-08-15',
  },
  {
    id: 3,
    name: 'محمد علي',
    email: 'accountant@shoporia.app',
    phone: '01123456789',
    role: 'accountant',
    status: 'active',
    lastLogin: '2024-01-14 18:00',
    joinDate: '2023-09-01',
  },
  {
    id: 4,
    name: 'ليلى حسن',
    email: 'support@shoporia.app',
    phone: '01234567890',
    role: 'support',
    status: 'active',
    lastLogin: '2024-01-15 10:45',
    joinDate: '2023-10-20',
  },
  {
    id: 5,
    name: 'عمر خالد',
    email: 'stores@shoporia.app',
    phone: '01567890123',
    role: 'store_manager',
    status: 'inactive',
    lastLogin: '2024-01-10 09:00',
    joinDate: '2023-11-05',
  },
]

export default function TeamPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<typeof roles[0] | null>(null)
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
  })

  const getRoleById = (roleId: string) => roles.find(r => r.id === roleId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            إدارة فريق العمل
          </h1>
          <p className="text-gray-500">إدارة أعضاء الفريق والصلاحيات</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4" />
          إضافة عضو جديد
        </Button>
      </div>

      {/* Roles Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card
            key={role.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              setSelectedRole(role)
              setIsPermissionsModalOpen(true)
            }}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${role.color} text-white`}>
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {role.name}
                </h3>
                <p className="text-xs text-gray-500">{role.nameEn}</p>
                <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                <div className="mt-2">
                  <span className="text-xs text-gray-400">
                    {role.permissions.includes('all')
                      ? 'جميع الصلاحيات'
                      : `${role.permissions.length} صلاحية`}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Team Members */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            أعضاء الفريق ({teamMembers.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">العضو</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">الدور</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">الحالة</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">آخر دخول</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">تاريخ الانضمام</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {teamMembers.map((member) => {
                const role = getRoleById(member.role)
                return (
                  <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Mail className="h-3 w-3" />
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${role?.color}`} />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {role?.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={member.status === 'active' ? 'success' : 'secondary'}>
                        {member.status === 'active' ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {member.lastLogin}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {member.joinDate}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Key className="h-4 w-4" />
                        </Button>
                        {member.role !== 'super_admin' && (
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Member Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="إضافة عضو جديد"
        size="lg"
      >
        <form className="space-y-4">
          <Input
            label="الاسم الكامل"
            placeholder="مثال: أحمد محمد"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="example@shoporia.app"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            />
            <Input
              label="رقم الهاتف"
              placeholder="01XXXXXXXXX"
              value={newMember.phone}
              onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الدور
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-amazon-orange dark:bg-gray-800 dark:border-gray-700"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            >
              <option value="">اختر الدور</option>
              {roles.filter(r => r.id !== 'super_admin').map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name} - {role.nameEn}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="كلمة المرور المؤقتة"
            type="password"
            placeholder="••••••••"
            value={newMember.password}
            onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
          />
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsAddModalOpen(false)}
            >
              إلغاء
            </Button>
            <Button type="submit" className="flex-1 bg-amazon-orange hover:bg-amazon-orangeHover">
              إضافة العضو
            </Button>
          </div>
        </form>
      </Modal>

      {/* Permissions Modal */}
      <Modal
        isOpen={isPermissionsModalOpen}
        onClose={() => setIsPermissionsModalOpen(false)}
        title={`صلاحيات ${selectedRole?.name || ''}`}
        size="lg"
      >
        {selectedRole && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`p-3 rounded-lg ${selectedRole.color} text-white`}>
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {selectedRole.name}
                </h3>
                <p className="text-sm text-gray-500">{selectedRole.description}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                الصلاحيات:
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {allPermissions.map((permission) => {
                  const hasPermission =
                    selectedRole.permissions.includes('all') ||
                    selectedRole.permissions.includes(permission.id)
                  return (
                    <div
                      key={permission.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        hasPermission
                          ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                          : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 opacity-50'
                      }`}
                    >
                      {hasPermission ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-900 dark:text-white">
                        {permission.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setIsPermissionsModalOpen(false)}
              >
                إغلاق
              </Button>
              <Button type="button" className="flex-1 bg-amazon-orange hover:bg-amazon-orangeHover">
                <Edit className="h-4 w-4" />
                تعديل الصلاحيات
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
