'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, Button, Badge, Modal, Input } from '@/components/ui'
import {
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Link as LinkIcon,
  Image as ImageIcon,
} from 'lucide-react'

const banners = [
  {
    id: 1,
    title: 'عروض الشتاء',
    image: '/images/banners/winter.jpg',
    link: '/deals',
    position: 'hero',
    isActive: true,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    clicks: 1234,
    views: 45678,
  },
  {
    id: 2,
    title: 'تخفيضات الإلكترونيات',
    image: '/images/banners/electronics.jpg',
    link: '/category/electronics',
    position: 'sidebar',
    isActive: true,
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    clicks: 567,
    views: 12345,
  },
  {
    id: 3,
    title: 'أزياء جديدة',
    image: '/images/banners/fashion.jpg',
    link: '/category/fashion',
    position: 'footer',
    isActive: false,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    clicks: 234,
    views: 5678,
  },
]

const positions = {
  hero: 'البانر الرئيسي',
  sidebar: 'الشريط الجانبي',
  footer: 'أسفل الصفحة',
  popup: 'نافذة منبثقة',
}

export default function BannersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            الإعلانات والبانرات
          </h1>
          <p className="text-gray-500">إدارة إعلانات الموقع</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4" />
          إضافة بانر
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">إجمالي البانرات</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{banners.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 text-green-600">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">إجمالي المشاهدات</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {banners.reduce((acc, b) => acc + b.views, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
              <LinkIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">إجمالي النقرات</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {banners.reduce((acc, b) => acc + b.clicks, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Banners Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {banners.map((banner) => (
          <Card key={banner.id} className="overflow-hidden">
            {/* Banner Image */}
            <div className="relative h-40 bg-gray-100 dark:bg-gray-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-gray-300" />
              </div>
              {/* Status Badge */}
              <div className="absolute top-2 end-2">
                <Badge variant={banner.isActive ? 'success' : 'secondary'}>
                  {banner.isActive ? 'نشط' : 'غير نشط'}
                </Badge>
              </div>
            </div>

            {/* Banner Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {banner.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                الموقع: {positions[banner.position as keyof typeof positions]}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {banner.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  {banner.clicks.toLocaleString()}
                </span>
              </div>

              {/* Dates */}
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                {banner.startDate} - {banner.endDate}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4" />
                  تعديل
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={banner.isActive ? 'text-orange-600' : 'text-green-600'}
                >
                  {banner.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Banner Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="إضافة بانر جديد"
        size="lg"
      >
        <form className="space-y-4">
          <Input label="عنوان البانر" placeholder="مثال: عروض الشتاء" />
          <Input label="رابط البانر" placeholder="/deals" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="تاريخ البداية" type="date" />
            <Input label="تاريخ النهاية" type="date" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              صورة البانر
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <ImageIcon className="h-10 w-10 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">اسحب الصورة هنا أو انقر للاختيار</p>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
              إلغاء
            </Button>
            <Button type="submit" className="flex-1 bg-amazon-orange hover:bg-amazon-orangeHover">
              إضافة البانر
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
