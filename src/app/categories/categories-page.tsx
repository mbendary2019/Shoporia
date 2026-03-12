'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
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

export default function CategoriesPage() {
  const t = useTranslations('categories')
  const tc = useTranslations('common')

  const categories = [
    {
      id: 'electronics',
      name: t('electronics'),
      nameEn: 'Electronics',
      icon: Laptop,
      color: 'bg-blue-500',
      count: 1234,
      subcategories: [t('subcategories.phones'), t('subcategories.laptops'), t('subcategories.headphones'), t('subcategories.smartwatches'), t('subcategories.accessories')],
    },
    {
      id: 'fashion',
      name: t('fashion'),
      nameEn: 'Fashion',
      icon: Shirt,
      color: 'bg-pink-500',
      count: 2567,
      subcategories: [t('subcategories.menClothing'), t('subcategories.womenClothing'), t('subcategories.childrenClothing'), t('subcategories.shoes'), t('subcategories.bags')],
    },
    {
      id: 'beauty',
      name: t('beauty'),
      nameEn: 'Beauty',
      icon: Sparkles,
      color: 'bg-purple-500',
      count: 890,
      subcategories: [t('subcategories.perfumes'), t('subcategories.makeup'), t('subcategories.skincare'), t('subcategories.haircare')],
    },
    {
      id: 'home',
      name: t('home'),
      nameEn: 'Home',
      icon: Home,
      color: 'bg-green-500',
      count: 1456,
      subcategories: [t('subcategories.furniture'), t('subcategories.decor'), t('subcategories.kitchen'), t('subcategories.bathroom'), t('subcategories.lighting')],
    },
    {
      id: 'sports',
      name: t('sports'),
      nameEn: 'Sports',
      icon: Dumbbell,
      color: 'bg-orange-500',
      count: 567,
      subcategories: [t('subcategories.sportswear'), t('subcategories.equipment'), t('subcategories.supplements'), t('subcategories.sportsGear')],
    },
    {
      id: 'kids',
      name: t('kids'),
      nameEn: 'Kids',
      icon: Baby,
      color: 'bg-yellow-500',
      count: 789,
      subcategories: [t('subcategories.clothing'), t('subcategories.toys'), t('subcategories.essentials'), t('subcategories.education')],
    },
    {
      id: 'books',
      name: t('books'),
      nameEn: 'Books',
      icon: BookOpen,
      color: 'bg-red-500',
      count: 345,
      subcategories: [t('subcategories.novels'), t('subcategories.selfDevelopment'), t('subcategories.educational'), t('subcategories.religious')],
    },
    {
      id: 'food',
      name: t('food'),
      nameEn: 'Food',
      icon: Utensils,
      color: 'bg-amber-500',
      count: 234,
      subcategories: [t('subcategories.sweets'), t('subcategories.drinks'), t('subcategories.healthy'), t('subcategories.imported')],
    },
    {
      id: 'automotive',
      name: t('automotive'),
      nameEn: 'Automotive',
      icon: Car,
      color: 'bg-slate-500',
      count: 456,
      subcategories: [t('subcategories.carAccessories'), t('subcategories.spareParts'), t('subcategories.oils'), t('subcategories.tires')],
    },
    {
      id: 'gaming',
      name: t('gaming'),
      nameEn: 'Gaming',
      icon: Gamepad2,
      color: 'bg-indigo-500',
      count: 678,
      subcategories: [t('subcategories.playstation'), t('subcategories.xbox'), t('subcategories.pc'), t('subcategories.accessories')],
    },
    {
      id: 'health',
      name: t('health'),
      nameEn: 'Health',
      icon: Heart,
      color: 'bg-rose-500',
      count: 321,
      subcategories: [t('subcategories.vitamins'), t('subcategories.medicalDevices'), t('subcategories.personalCare')],
    },
    {
      id: 'watches',
      name: t('watches'),
      nameEn: 'Watches',
      icon: Watch,
      color: 'bg-teal-500',
      count: 234,
      subcategories: [t('subcategories.classic'), t('subcategories.smart'), t('subcategories.sport'), t('subcategories.luxury')],
    },
    {
      id: 'gifts',
      name: t('gifts'),
      nameEn: 'Gifts',
      icon: Gift,
      color: 'bg-fuchsia-500',
      count: 567,
      subcategories: [t('subcategories.occasions'), t('subcategories.personal'), t('subcategories.corporate'), t('subcategories.childrenClothing')],
    },
    {
      id: 'art',
      name: t('art'),
      nameEn: 'Art',
      icon: Palette,
      color: 'bg-cyan-500',
      count: 189,
      subcategories: [t('subcategories.paintings'), t('subcategories.tools'), t('subcategories.handmade'), t('subcategories.embroidery')],
    },
    {
      id: 'music',
      name: t('music'),
      nameEn: 'Music',
      icon: Music,
      color: 'bg-violet-500',
      count: 145,
      subcategories: [t('subcategories.instruments'), t('subcategories.accessories'), t('subcategories.studio')],
    },
    {
      id: 'photography',
      name: t('photography'),
      nameEn: 'Photography',
      icon: Camera,
      color: 'bg-gray-600',
      count: 234,
      subcategories: [t('subcategories.cameras'), t('subcategories.lenses'), t('subcategories.lighting'), t('subcategories.stands')],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container-custom">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('title')}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t('subtitle')}
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
                      {category.count.toLocaleString('ar-EG')} {tc('product')}
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
              {t('popularSearches')}
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
