'use client'

import { useState } from 'react'
import { Card, Button, Avatar } from '@/components/ui'
import {
  Store,
  Globe,
  CreditCard,
  Truck,
  Bell,
  Shield,
  Palette,
  Camera,
  Save,
  Mail,
  Phone,
  MapPin,
  Clock,
  Link as LinkIcon,
  Instagram,
  Facebook,
  Twitter,
} from 'lucide-react'

const tabs = [
  { id: 'store', name: 'المتجر', icon: Store },
  { id: 'payments', name: 'الدفع', icon: CreditCard },
  { id: 'shipping', name: 'الشحن', icon: Truck },
  { id: 'notifications', name: 'الإشعارات', icon: Bell },
  { id: 'social', name: 'التواصل الاجتماعي', icon: Globe },
  { id: 'appearance', name: 'المظهر', icon: Palette },
]

const daysOfWeek = [
  { id: 'sunday', label: 'الأحد' },
  { id: 'monday', label: 'الاثنين' },
  { id: 'tuesday', label: 'الثلاثاء' },
  { id: 'wednesday', label: 'الأربعاء' },
  { id: 'thursday', label: 'الخميس' },
  { id: 'friday', label: 'الجمعة' },
  { id: 'saturday', label: 'السبت' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('store')
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            إعدادات المتجر
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            تخصيص إعدادات متجرك
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="h-4 w-4" />
          {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Tabs */}
        <Card className="w-full p-4 lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </Card>

        {/* Content */}
        <Card className="flex-1 p-6">
          {activeTab === 'store' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                معلومات المتجر
              </h2>

              {/* Store Logo */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar fallback="متجر الأناقة" size="xl" />
                  <button className="absolute bottom-0 end-0 rounded-full bg-primary-500 p-2 text-white shadow-lg hover:bg-primary-600">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">شعار المتجر</p>
                  <p className="text-sm text-gray-500">JPG, PNG أو GIF (حد أقصى 2MB)</p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    اسم المتجر *
                  </label>
                  <input
                    type="text"
                    defaultValue="متجر الأناقة"
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    رابط المتجر
                  </label>
                  <div className="mt-1 flex">
                    <span className="inline-flex items-center rounded-s-lg border border-e-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 dark:border-gray-600 dark:bg-gray-700">
                      shoporia.com/
                    </span>
                    <input
                      type="text"
                      defaultValue="elegance-store"
                      className="h-10 flex-1 rounded-e-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    وصف المتجر
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="متجر متخصص في بيع أحدث صيحات الموضة والأزياء الراقية"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Mail className="h-4 w-4" />
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    defaultValue="store@example.com"
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Phone className="h-4 w-4" />
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    defaultValue="01012345678"
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <MapPin className="h-4 w-4" />
                    العنوان
                  </label>
                  <input
                    type="text"
                    defaultValue="القاهرة، مصر"
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
              </div>

              {/* Working Hours */}
              <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                <h3 className="mb-4 flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                  <Clock className="h-5 w-5" />
                  ساعات العمل
                </h3>

                <div className="space-y-3">
                  {daysOfWeek.map((day) => (
                    <div key={day.id} className="flex items-center gap-4">
                      <div className="w-24">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {day.label}
                          </span>
                        </label>
                      </div>
                      <input
                        type="time"
                        defaultValue="09:00"
                        className="h-10 rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="time"
                        defaultValue="21:00"
                        className="h-10 rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                طرق الدفع
              </h2>

              <div className="space-y-4">
                {[
                  { id: 'cash', name: 'الدفع عند الاستلام', enabled: true },
                  { id: 'vodafone', name: 'فودافون كاش', enabled: true, number: '01012345678' },
                  { id: 'instapay', name: 'انستاباي', enabled: false, number: '' },
                  { id: 'card', name: 'بطاقة ائتمان', enabled: false },
                ].map((method) => (
                  <div
                    key={method.id}
                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            defaultChecked={method.enabled}
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700" />
                        </label>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {method.name}
                        </span>
                      </div>
                    </div>
                    {method.number !== undefined && method.enabled && (
                      <div className="mt-3">
                        <input
                          type="text"
                          defaultValue={method.number}
                          placeholder="رقم المحفظة"
                          className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                <h3 className="mb-4 font-medium text-gray-900 dark:text-white">
                  معلومات التحويل البنكي
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      اسم البنك
                    </label>
                    <input
                      type="text"
                      placeholder="البنك الأهلي المصري"
                      className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      رقم الحساب
                    </label>
                    <input
                      type="text"
                      placeholder="1234567890"
                      className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                إعدادات الشحن
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    تكلفة الشحن الافتراضية (ج.م)
                  </label>
                  <input
                    type="number"
                    defaultValue="50"
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    الحد الأدنى للشحن المجاني (ج.م)
                  </label>
                  <input
                    type="number"
                    defaultValue="500"
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    مدة التوصيل المتوقعة
                  </label>
                  <input
                    type="text"
                    defaultValue="3-5 أيام عمل"
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
                <h3 className="mb-4 font-medium text-gray-900 dark:text-white">
                  أسعار الشحن حسب المحافظة
                </h3>
                <div className="space-y-3">
                  {['القاهرة', 'الجيزة', 'الإسكندرية', 'باقي المحافظات'].map((gov) => (
                    <div key={gov} className="flex items-center gap-4">
                      <span className="w-40 text-sm text-gray-700 dark:text-gray-300">{gov}</span>
                      <input
                        type="number"
                        defaultValue={gov === 'باقي المحافظات' ? 75 : 50}
                        className="h-10 w-32 rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                      />
                      <span className="text-sm text-gray-500">ج.م</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                إعدادات الإشعارات
              </h2>

              <div className="space-y-4">
                {[
                  { id: 'new_order', name: 'طلب جديد', description: 'إشعار عند استلام طلب جديد' },
                  { id: 'order_status', name: 'تحديث حالة الطلب', description: 'إشعار عند تغيير حالة الطلب' },
                  { id: 'new_review', name: 'تقييم جديد', description: 'إشعار عند استلام تقييم جديد' },
                  { id: 'low_stock', name: 'نفاد المخزون', description: 'إشعار عند انخفاض المخزون' },
                  { id: 'new_message', name: 'رسالة جديدة', description: 'إشعار عند استلام رسالة' },
                ].map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {notification.name}
                      </p>
                      <p className="text-sm text-gray-500">{notification.description}</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" defaultChecked className="peer sr-only" />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                روابط التواصل الاجتماعي
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Instagram className="h-4 w-4" />
                    انستجرام
                  </label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/yourstore"
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Facebook className="h-4 w-4" />
                    فيسبوك
                  </label>
                  <input
                    type="url"
                    placeholder="https://facebook.com/yourstore"
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Twitter className="h-4 w-4" />
                    تويتر
                  </label>
                  <input
                    type="url"
                    placeholder="https://twitter.com/yourstore"
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <LinkIcon className="h-4 w-4" />
                    واتساب
                  </label>
                  <input
                    type="tel"
                    placeholder="01012345678"
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                مظهر المتجر
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  اللون الأساسي
                </label>
                <div className="mt-2 flex gap-3">
                  {['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'].map((color) => (
                    <button
                      key={color}
                      className="h-10 w-10 rounded-lg border-2 border-transparent hover:border-gray-400"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <input
                    type="color"
                    defaultValue="#3B82F6"
                    className="h-10 w-10 cursor-pointer rounded-lg border-0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  صورة الغلاف
                </label>
                <div className="mt-2 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center dark:border-gray-600">
                  <div className="h-32 w-full rounded-lg bg-gray-100 dark:bg-gray-700" />
                  <Button variant="outline" size="sm" className="mt-4">
                    <Camera className="h-4 w-4" />
                    تغيير الصورة
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  قالب المتجر
                </label>
                <div className="mt-2 grid gap-4 sm:grid-cols-3">
                  {['كلاسيكي', 'عصري', 'بسيط'].map((template) => (
                    <button
                      key={template}
                      className="rounded-lg border-2 border-gray-200 p-4 text-center hover:border-primary-500 dark:border-gray-700"
                    >
                      <div className="h-24 rounded-lg bg-gray-100 dark:bg-gray-700" />
                      <p className="mt-2 font-medium text-gray-900 dark:text-white">
                        {template}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
