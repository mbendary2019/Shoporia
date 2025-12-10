'use client'

import { Header, Footer } from '@/components/layout'
import { ProductCard, Badge } from '@/components/ui'
import { Sparkles, Clock } from 'lucide-react'

const newArrivals = [
  {
    id: '1',
    name: 'سماعات آبل إيربودز برو 2 - الإصدار الجديد',
    price: 8999,
    compareAtPrice: 11999,
    image: '/images/products/airpods.jpg',
    rating: 4.8,
    reviewCount: 156,
    store: { name: 'تك ستور', slug: 'tech-store' },
    isPrime: true,
    inStock: true,
  },
  {
    id: '2',
    name: 'ساعة سامسونج جالاكسي واتش 6 Ultra',
    price: 7499,
    compareAtPrice: 9999,
    image: '/images/products/watch.jpg',
    rating: 4.7,
    reviewCount: 89,
    store: { name: 'موبايل شوب', slug: 'mobile-shop' },
    isPrime: true,
    inStock: true,
  },
  {
    id: '3',
    name: 'لابتوب ماك بوك إير M3',
    price: 49999,
    compareAtPrice: 59999,
    image: '/images/products/macbook.jpg',
    rating: 5.0,
    reviewCount: 45,
    store: { name: 'آبل ستور', slug: 'apple-store' },
    isPrime: true,
    inStock: true,
  },
  {
    id: '4',
    name: 'سماعات سوني WH-1000XM5 Limited Edition',
    price: 8999,
    compareAtPrice: 11999,
    image: '/images/products/sony-headphones.jpg',
    rating: 4.9,
    reviewCount: 234,
    store: { name: 'صوتيات', slug: 'audio-store' },
    isPrime: true,
    inStock: true,
  },
  {
    id: '5',
    name: 'حذاء نايك إير ماكس 2025',
    price: 3499,
    compareAtPrice: 4499,
    image: '/images/products/shoes.jpg',
    rating: 4.6,
    reviewCount: 67,
    store: { name: 'سبورت ستور', slug: 'sport-store' },
    isPrime: true,
    inStock: true,
  },
  {
    id: '6',
    name: 'حقيبة مايكل كورس الجديدة',
    price: 2499,
    compareAtPrice: 3499,
    image: '/images/products/bag.jpg',
    rating: 4.8,
    reviewCount: 123,
    store: { name: 'بوتيك الأناقة', slug: 'elegance-boutique' },
    isPrime: false,
    inStock: true,
  },
  {
    id: '7',
    name: 'روبوت تنظيف ذكي الجيل الجديد',
    price: 4999,
    compareAtPrice: 6999,
    image: '/images/products/vacuum.jpg',
    rating: 4.5,
    reviewCount: 78,
    store: { name: 'سمارت هوم', slug: 'smart-home' },
    isPrime: true,
    inStock: true,
  },
  {
    id: '8',
    name: 'قميص تومي هيلفيغر 2025',
    price: 899,
    compareAtPrice: 1299,
    image: '/images/products/shirt.jpg',
    rating: 4.4,
    reviewCount: 56,
    store: { name: 'فاشون هب', slug: 'fashion-hub' },
    isPrime: true,
    inStock: true,
  },
]

export default function NewArrivalsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-l from-purple-900 to-purple-700 py-12">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  جديدنا
                </h1>
                <p className="text-white/70">
                  أحدث المنتجات المضافة للمتجر
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* This Week */}
        <section className="py-12">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="h-8 w-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                وصل هذا الأسبوع
              </h2>
              <Badge className="bg-purple-100 text-purple-700">جديد</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {newArrivals.slice(0, 4).map((product) => (
                <div key={product.id} className="relative">
                  <Badge className="absolute -top-2 -end-2 z-10 bg-purple-600 text-white">
                    جديد
                  </Badge>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All New */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="h-8 w-8 text-amazon-orange" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                جميع المنتجات الجديدة
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
