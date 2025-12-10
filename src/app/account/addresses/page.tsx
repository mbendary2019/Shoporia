'use client'

import { useState } from 'react'
import { Card, Button, Badge } from '@/components/ui'
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Home,
  Briefcase,
  X,
  Check,
} from 'lucide-react'

// Mock addresses data
const initialAddresses = [
  {
    id: '1',
    label: 'المنزل',
    type: 'home',
    name: 'أحمد محمد',
    phone: '01012345678',
    street: 'شارع التحرير، عمارة 15، شقة 7',
    city: 'القاهرة',
    governorate: 'القاهرة',
    postalCode: '11511',
    isDefault: true,
  },
  {
    id: '2',
    label: 'العمل',
    type: 'work',
    name: 'أحمد محمد',
    phone: '01012345678',
    street: 'شارع النيل، برج السلام، الدور 5',
    city: 'الجيزة',
    governorate: 'الجيزة',
    postalCode: '12511',
    isDefault: false,
  },
]

export default function AccountAddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    label: '',
    type: 'home',
    name: '',
    phone: '',
    street: '',
    city: '',
    governorate: '',
    postalCode: '',
  })

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    )
  }

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
  }

  const handleEdit = (address: typeof initialAddresses[0]) => {
    setEditingId(address.id)
    setFormData({
      label: address.label,
      type: address.type,
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      governorate: address.governorate,
      postalCode: address.postalCode,
    })
  }

  const handleSave = () => {
    if (editingId) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingId
            ? { ...addr, ...formData }
            : addr
        )
      )
      setEditingId(null)
    } else {
      const newAddress = {
        id: Date.now().toString(),
        ...formData,
        isDefault: addresses.length === 0,
      }
      setAddresses([...addresses, newAddress])
      setIsAdding(false)
    }
    setFormData({
      label: '',
      type: 'home',
      name: '',
      phone: '',
      street: '',
      city: '',
      governorate: '',
      postalCode: '',
    })
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({
      label: '',
      type: 'home',
      name: '',
      phone: '',
      street: '',
      city: '',
      governorate: '',
      postalCode: '',
    })
  }

  const AddressForm = () => (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
        {editingId ? 'تعديل العنوان' : 'إضافة عنوان جديد'}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            تسمية العنوان
          </label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            placeholder="مثال: المنزل، العمل"
            className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            نوع العنوان
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
          >
            <option value="home">منزل</option>
            <option value="work">عمل</option>
            <option value="other">آخر</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            الاسم الكامل
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            العنوان بالتفصيل
          </label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            placeholder="الشارع، رقم المبنى، الشقة"
            className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            المدينة
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            المحافظة
          </label>
          <select
            value={formData.governorate}
            onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
            className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
          >
            <option value="">اختر المحافظة</option>
            <option value="القاهرة">القاهرة</option>
            <option value="الجيزة">الجيزة</option>
            <option value="الإسكندرية">الإسكندرية</option>
            <option value="الدقهلية">الدقهلية</option>
            <option value="الشرقية">الشرقية</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            الرمز البريدي
          </label>
          <input
            type="text"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button onClick={handleSave}>
          <Check className="h-4 w-4" />
          حفظ
        </Button>
        <Button variant="outline" onClick={handleCancel}>
          <X className="h-4 w-4" />
          إلغاء
        </Button>
      </div>
    </Card>
  )

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            العناوين
          </h1>

          {!isAdding && !editingId && (
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4" />
              إضافة عنوان
            </Button>
          )}
        </div>
      </Card>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && <AddressForm />}

      {/* Addresses List */}
      {addresses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    {address.type === 'home' ? (
                      <Home className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Briefcase className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {address.label}
                      </p>
                      {address.isDefault && (
                        <Badge variant="success">الافتراضي</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(address)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p>{address.name}</p>
                <p>{address.phone}</p>
                <p>{address.street}</p>
                <p>
                  {address.city}، {address.governorate} {address.postalCode}
                </p>
              </div>

              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="mt-4 text-sm text-primary-500 hover:underline"
                >
                  تعيين كافتراضي
                </button>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            لا توجد عناوين محفوظة
          </p>
          <Button className="mt-4" onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4" />
            إضافة عنوان
          </Button>
        </Card>
      )}
    </div>
  )
}
