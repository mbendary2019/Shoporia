'use client'

import { useState } from 'react'
import { Card, Button, Avatar } from '@/components/ui'
import { useAuthStore } from '@/store'
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit2,
  Camera,
  Save,
  X,
} from 'lucide-react'

export default function AccountPage() {
  const { user } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    phone: '01012345678',
    birthDate: '1990-01-15',
    gender: 'male',
  })

  const handleSave = () => {
    // Save profile logic
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            المعلومات الشخصية
          </h1>
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4" />
              تعديل
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4" />
                حفظ
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
                إلغاء
              </Button>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* Profile Picture */}
          <div className="relative">
            <Avatar
              src={user?.photoURL}
              fallback={user?.displayName || 'User'}
              size="xl"
            />
            {isEditing && (
              <button className="absolute bottom-0 end-0 rounded-full bg-primary-500 p-2 text-white shadow-lg hover:bg-primary-600">
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      تاريخ الميلاد
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) =>
                        setFormData({ ...formData, birthDate: e.target.value })
                      }
                      className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      الجنس
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                    >
                      <option value="male">ذكر</option>
                      <option value="female">أنثى</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">الاسم</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user?.displayName || 'غير محدد'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user?.email || 'غير محدد'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    <Phone className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">رقم الهاتف</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formData.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    <Calendar className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">تاريخ الميلاد</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(formData.birthDate).toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Account Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-6 text-center">
          <p className="text-3xl font-bold text-primary-600">12</p>
          <p className="mt-1 text-sm text-gray-500">طلب مكتمل</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-3xl font-bold text-primary-600">5</p>
          <p className="mt-1 text-sm text-gray-500">في المفضلة</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-3xl font-bold text-primary-600">3</p>
          <p className="mt-1 text-sm text-gray-500">عناوين محفوظة</p>
        </Card>
      </div>

      {/* Security */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          الأمان
        </h2>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                كلمة المرور
              </p>
              <p className="text-sm text-gray-500">
                آخر تغيير منذ 30 يوم
              </p>
            </div>
            <Button variant="outline" size="sm">
              تغيير كلمة المرور
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                التحقق بخطوتين
              </p>
              <p className="text-sm text-gray-500">
                إضافة طبقة أمان إضافية
              </p>
            </div>
            <Button variant="outline" size="sm">
              تفعيل
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
