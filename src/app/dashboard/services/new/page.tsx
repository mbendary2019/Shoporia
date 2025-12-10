'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, Button, Badge } from '@/components/ui'
import {
  ArrowRight,
  Plus,
  Trash2,
  Clock,
  DollarSign,
  Image as ImageIcon,
  Sparkles,
  Calendar,
  Tag,
  Save,
} from 'lucide-react'

const categories = [
  'صحة وجمال',
  'تعليم وتدريب',
  'استشارات',
  'صيانة وإصلاح',
  'تصميم وإبداع',
  'تكنولوجيا',
  'رياضة ولياقة',
  'خدمات منزلية',
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

export default function NewServicePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('basic')
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    duration: 60,
    price: '',
    discountPrice: '',
    images: [] as string[],
    tags: [] as string[],
    availability: {} as Record<string, { enabled: boolean; slots: { start: string; end: string }[] }>,
    packages: [] as { name: string; duration: number; price: number; description: string }[],
  })

  const [newTag, setNewTag] = useState('')

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({ ...formData, tags: [...formData.tags, newTag] })
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) })
  }

  const handleAddPackage = () => {
    setFormData({
      ...formData,
      packages: [
        ...formData.packages,
        { name: '', duration: 60, price: 0, description: '' },
      ],
    })
  }

  const handleRemovePackage = (index: number) => {
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index),
    })
  }

  const handleUpdatePackage = (index: number, field: string, value: string | number) => {
    const packages = [...formData.packages]
    packages[index] = { ...packages[index], [field]: value }
    setFormData({ ...formData, packages })
  }

  const handleToggleDay = (day: string) => {
    const availability = { ...formData.availability }
    if (availability[day]) {
      delete availability[day]
    } else {
      availability[day] = { enabled: true, slots: [{ start: '09:00', end: '17:00' }] }
    }
    setFormData({ ...formData, availability })
  }

  const handleAddSlot = (day: string) => {
    const availability = { ...formData.availability }
    if (availability[day]) {
      availability[day].slots.push({ start: '09:00', end: '17:00' })
    }
    setFormData({ ...formData, availability })
  }

  const handleRemoveSlot = (day: string, slotIndex: number) => {
    const availability = { ...formData.availability }
    if (availability[day]) {
      availability[day].slots = availability[day].slots.filter((_, i) => i !== slotIndex)
    }
    setFormData({ ...formData, availability })
  }

  const handleGenerateDescription = () => {
    // AI-generated description simulation
    if (formData.name) {
      setFormData({
        ...formData,
        description: `خدمة ${formData.name} المتميزة - نقدم لكم أفضل تجربة بأعلى معايير الجودة والاحترافية. فريقنا المتخصص جاهز لتلبية احتياجاتكم وتقديم خدمة استثنائية تفوق توقعاتكم.`,
      })
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Submit logic
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard/services')
    }, 1500)
  }

  const tabs = [
    { id: 'basic', label: 'الأساسيات' },
    { id: 'pricing', label: 'التسعير' },
    { id: 'availability', label: 'التوفر' },
    { id: 'packages', label: 'الباقات' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/services"
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              إضافة خدمة جديدة
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              أضف خدمة جديدة لمتجرك
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.push('/dashboard/services')}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>جاري الحفظ...</>
            ) : (
              <>
                <Save className="h-4 w-4" />
                حفظ الخدمة
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Card className="p-2">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {activeTab === 'basic' && (
            <Card className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                المعلومات الأساسية
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    اسم الخدمة *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثال: جلسة استشارية"
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      الوصف *
                    </label>
                    <button
                      onClick={handleGenerateDescription}
                      className="flex items-center gap-1 text-sm text-primary-500 hover:underline"
                    >
                      <Sparkles className="h-4 w-4" />
                      توليد بالذكاء الاصطناعي
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="صف الخدمة بالتفصيل..."
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    الفئة *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  >
                    <option value="">اختر الفئة</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Clock className="h-4 w-4" />
                    مدة الخدمة (بالدقائق) *
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                    min={15}
                    step={15}
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Tag className="h-4 w-4" />
                    العلامات
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)}>
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="أضف علامة"
                      className="h-10 flex-1 rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <Button variant="outline" onClick={handleAddTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'pricing' && (
            <Card className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                التسعير
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <DollarSign className="h-4 w-4" />
                    السعر الأساسي (ج.م) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0"
                    min={0}
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    سعر الخصم (اختياري)
                  </label>
                  <input
                    type="number"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                    placeholder="0"
                    min={0}
                    className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                  {formData.price && formData.discountPrice && (
                    <p className="mt-1 text-sm text-green-600">
                      خصم {Math.round((1 - Number(formData.discountPrice) / Number(formData.price)) * 100)}%
                    </p>
                  )}
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'availability' && (
            <Card className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                أوقات التوفر
              </h2>

              <div className="space-y-4">
                {daysOfWeek.map((day) => (
                  <div key={day.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            checked={!!formData.availability[day.id]}
                            onChange={() => handleToggleDay(day.id)}
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700" />
                        </label>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {day.label}
                        </span>
                      </div>
                      {formData.availability[day.id] && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAddSlot(day.id)}
                        >
                          <Plus className="h-4 w-4" />
                          إضافة فترة
                        </Button>
                      )}
                    </div>

                    {formData.availability[day.id] && (
                      <div className="mt-4 space-y-2">
                        {formData.availability[day.id].slots.map((slot, slotIndex) => (
                          <div key={slotIndex} className="flex items-center gap-3">
                            <input
                              type="time"
                              value={slot.start}
                              onChange={(e) => {
                                const availability = { ...formData.availability }
                                availability[day.id].slots[slotIndex].start = e.target.value
                                setFormData({ ...formData, availability })
                              }}
                              className="h-10 rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
                            />
                            <span className="text-gray-500">إلى</span>
                            <input
                              type="time"
                              value={slot.end}
                              onChange={(e) => {
                                const availability = { ...formData.availability }
                                availability[day.id].slots[slotIndex].end = e.target.value
                                setFormData({ ...formData, availability })
                              }}
                              className="h-10 rounded-lg border border-gray-300 px-3 text-sm dark:border-gray-600 dark:bg-gray-800"
                            />
                            {formData.availability[day.id].slots.length > 1 && (
                              <button
                                onClick={() => handleRemoveSlot(day.id, slotIndex)}
                                className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'packages' && (
            <Card className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  الباقات
                </h2>
                <Button onClick={handleAddPackage}>
                  <Plus className="h-4 w-4" />
                  إضافة باقة
                </Button>
              </div>

              {formData.packages.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    لا توجد باقات بعد
                  </p>
                  <Button className="mt-4" onClick={handleAddPackage}>
                    <Plus className="h-4 w-4" />
                    إضافة باقة
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.packages.map((pkg, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          باقة {index + 1}
                        </h3>
                        <button
                          onClick={() => handleRemovePackage(index)}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            اسم الباقة
                          </label>
                          <input
                            type="text"
                            value={pkg.name}
                            onChange={(e) => handleUpdatePackage(index, 'name', e.target.value)}
                            placeholder="مثال: باقة VIP"
                            className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            المدة (دقيقة)
                          </label>
                          <input
                            type="number"
                            value={pkg.duration}
                            onChange={(e) => handleUpdatePackage(index, 'duration', parseInt(e.target.value) || 0)}
                            min={15}
                            step={15}
                            className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            السعر (ج.م)
                          </label>
                          <input
                            type="number"
                            value={pkg.price}
                            onChange={(e) => handleUpdatePackage(index, 'price', parseInt(e.target.value) || 0)}
                            min={0}
                            className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            الوصف
                          </label>
                          <textarea
                            rows={2}
                            value={pkg.description}
                            onChange={(e) => handleUpdatePackage(index, 'description', e.target.value)}
                            placeholder="وصف الباقة..."
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Images */}
          <Card className="p-6">
            <h3 className="mb-4 font-medium text-gray-900 dark:text-white">
              صور الخدمة
            </h3>

            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center dark:border-gray-600">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                اسحب الصور هنا أو
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                اختر الصور
              </Button>
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-6">
            <h3 className="mb-4 font-medium text-gray-900 dark:text-white">
              معاينة
            </h3>

            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="mb-3 h-32 rounded-lg bg-gray-100 dark:bg-gray-700" />
              <h4 className="font-medium text-gray-900 dark:text-white">
                {formData.name || 'اسم الخدمة'}
              </h4>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {formData.description || 'وصف الخدمة...'}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {formData.duration} دقيقة
                </div>
                <span className="font-bold text-primary-500">
                  {formData.price ? `${formData.price} ج.م` : '---'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
