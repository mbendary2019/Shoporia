'use client'

import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { Card, Badge } from '@/components/ui'
import {
  Laptop,
  Shirt,
  Sparkles,
  Home,
  Dumbbell,
  Baby,
  BookOpen,
  Utensils,
  Car,
  Gamepad2,
  Heart,
  Watch,
  Gift,
  Palette,
  Music,
  Camera,
} from 'lucide-react'

const categories = [
  {
    id: 'electronics',
    name: 'إلكترونيات',
    nameEn: 'Electronics',
    icon: Laptop,
    color: 'bg-blue-500',
    count: 1234,
    subcategories: ['هواتف', 'لابتوب', 'سماعات', 'ساعات ذكية', 'إكسسوارات'],
  },
  {
    id: 'fashion',
    name: 'أزياء',
    nameEn: 'Fashion',
    icon: Shirt,
    color: 'bg-pink-500',
    count: 2567,
    subcategories: ['ملابس رجالي', 'ملابس نسائي', 'أطفال', 'أحذية', 'حقائب'],
  },
  {
    id: 'beauty',
    name: 'جمال وعناية',
    nameEn: 'Beauty',
    icon: Sparkles,
    color: 'bg-purple-500',
    count: 890,
    subcategories: ['عطور', 'مكياج', 'عناية بالبشرة', 'عناية بالشعر'],
  },
  {
    id: 'home',
    name: 'المنزل',
    nameEn: 'Home',
    icon: Home,
    color: 'bg-green-500',
    count: 1456,
    subcategories: ['أثاث', 'ديكور', 'مطبخ', 'حمام', 'إضاءة'],
  },
  {
    id: 'sports',
    name: 'رياضة',
    nameEn: 'Sports',
    icon: Dumbbell,
    color: 'bg-orange-500',
    count: 567,
    subcategories: ['ملابس رياضية', 'أجهزة', 'مكملات', 'معدات'],
  },
  {
    id: 'kids',
    name: 'أطفال',
    nameEn: 'Kids',
    icon: Baby,
    color: 'bg-yellow-500',
    count: 789,
    subcategories: ['ملابس', 'ألعاب', 'مستلزمات', 'تعليم'],
  },
  {
    id: 'books',
    name: 'كتب',
    nameEn: 'Books',
    icon: BookOpen,
    color: 'bg-red-500',
    count: 345,
    subcategories: ['روايات', 'تطوير ذات', 'تعليمية', 'دينية'],
  },
  {
    id: 'food',
    name: 'طعام',
    nameEn: 'Food',
    icon: Utensils,
    color: 'bg-amber-500',
    count: 234,
    subcategories: ['حلويات', 'مشروبات', 'صحي', 'مستورد'],
  },
  {
    id: 'automotive',
    name: 'سيارات',
    nameEn: 'Automotive',
    icon: Car,
    color: 'bg-slate-500',
    count: 456,
    subcategories: ['إكسسوارات', 'قطع غيار', 'زيوت', 'إطارات'],
  },
  {
    id: 'gaming',
    name: 'ألعاب',
    nameEn: 'Gaming',
    icon: Gamepad2,
    color: 'bg-indigo-500',
    count: 678,
    subcategories: ['بلايستيشن', 'إكس بوكس', 'PC', 'إكسسوارات'],
  },
  {
    id: 'health',
    name: 'صحة',
    nameEn: 'Health',
    icon: Heart,
    color: 'bg-rose-500',
    count: 321,
    subcategories: ['فيتامينات', 'أجهزة طبية', 'عناية شخصية'],
  },
  {
    id: 'watches',
    name: 'ساعات',
    nameEn: 'Watches',
    icon: Watch,
    color: 'bg-teal-500',
    count: 234,
    subcategories: ['كلاسيك', 'ذكية', 'رياضية', 'فاخرة'],
  },
  {
    id: 'gifts',
    name: 'هدايا',
    nameEn: 'Gifts',
    icon: Gift,
    color: 'bg-fuchsia-500',
    count: 567,
    subcategories: ['مناسبات', 'شخصية', 'شركات', 'أطفال'],
  },
  {
    id: 'art',
    name: 'فن وحرف',
    nameEn: 'Art',
    icon: Palette,
    color: 'bg-cyan-500',
    count: 189,
    subcategories: ['لوحات', 'أدوات', 'هاند ميد', 'تطريز'],
  },
  {
    id: 'music',
    name: 'موسيقى',
    nameEn: 'Music',
    icon: Music,
    color: 'bg-violet-500',
    count: 145,
    subcategories: ['آلات', 'إكسسوارات', 'ستوديو'],
  },
  {
    id: 'photography',
    name: 'تصوير',
    nameEn: 'Photography',
    icon: Camera,
    color: 'bg-gray-600',
    count: 234,
    subcategories: ['كاميرات', 'عدسات', 'إضاءة', 'ستاندات'],
  },
]

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container-custom">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              تصفح الفئات
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              اكتشف آلاف المنتجات في مختلف الفئات
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/search?category=${category.id}`}>
                <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                  <div className="p-6">
                    {/* Icon */}
                    <div
                      className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${category.color} text-white transition-transform group-hover:scale-110`}
                    >
                      <category.icon className="h-7 w-7" />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.name}
                    </h2>
                    <p className="text-sm text-gray-500">{category.nameEn}</p>

                    {/* Count */}
                    <Badge variant="secondary" className="mt-3">
                      {category.count.toLocaleString('ar-EG')} منتج
                    </Badge>

                    {/* Subcategories */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {category.subcategories.slice(0, 3).map((sub, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          +{category.subcategories.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Popular Searches */}
          <div className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              عمليات البحث الشائعة
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                'ايفون 15',
                'ساعة ابل',
                'سماعات ايربودز',
                'لابتوب',
                'ملابس رجالي',
                'عطور نسائي',
                'أحذية رياضية',
                'حقيبة ظهر',
                'كاميرا كانون',
                'بلايستيشن 5',
              ].map((term, index) => (
                <Link
                  key={index}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
