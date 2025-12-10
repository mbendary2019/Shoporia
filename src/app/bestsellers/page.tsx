'use client'

import { Header, Footer } from '@/components/layout'
import { ProductCard, Badge } from '@/components/ui'
import { TrendingUp, Award, Star } from 'lucide-react'

const bestsellers = [
  {
    id: '1',
    name: 'سماعات آبل إيربودز برو 2',
    price: 8999,
    compareAtPrice: 11999,
    image: '/images/products/airpods.jpg',
    rating: 4.8,
    reviewCount: 2456,
    store: { name: 'تك ستور', slug: 'tech-store' },
    isPrime: true,
    inStock: true,
  },
  {
    id: '2',
    name: 'جهاز بلايستيشن 5',
    price: 18999,
    compareAtPrice: 22999,
    image: '/images/products/ps5.jpg',
    rating: 4.9,
    reviewCount: 3421,
    store: { name: 'جيمرز هب', slug: 'gamers-hub' },
    isPrime: true,
    inStock: true,
  },
  {
    id: '3',
    name: 'لابتوب ماك بوك إير M2',
    price: 42999,
    compareAtPrice: 54999,
    image: '/images/products/macbook.jpg',
    rating: 4.9,
    reviewCount: 892,
    store: { name: 'آبل ستور', slug: 'apple-store' },
    isPrime: true,
    inStock: true,
  },
  {
    id: '4',
    name: 'ساعة سامسونج جالاكسي واتش 6',
    price: 6499,
    compareAtPrice: 8999,
    image: '/images/products/watch.jpg',
    rating: 4.6,
    reviewCount: 1823,
    store: { name: 'موبايل شوب', slug: 'mobile-shop' },
    isPrime: true,
    inStock: true,
  },
  {
    id: '5',
    name: 'سماعات سوني WH-1000XM5',
    price: 7999,
    compareAtPrice: 10999,
    image: '/images/products/sony-headphones.jpg',
    rating: 4.8,
    reviewCount: 2156,
    store: { name: 'صوتيات', slug: 'audio-store' },
    isPrime: true,
    inStock: true,
  },
  {
    id: '6',
    name: 'حذاء رياضي نايك',
    price: 2499,
    compareAtPrice: 3499,
    image: '/images/products/shoes.jpg',
    rating: 4.7,
    reviewCount: 1234,
    store: { name: 'سبورت ستور', slug: 'sport-store' },
    isPrime: true,
    inStock: true,
  },
  {
    id: '7',
    name: 'مكنسة روبوت ذكية',
    price: 3499,
    compareAtPrice: 5999,
    image: '/images/products/vacuum.jpg',
    rating: 4.4,
    reviewCount: 1234,
    store: { name: 'سمارت هوم', slug: 'smart-home' },
    isPrime: true,
    inStock: true,
  },
  {
    id: '8',
    name: 'حقيبة ظهر جلد طبيعي',
    price: 1299,
    compareAtPrice: 1899,
    image: '/images/products/bag.jpg',
    rating: 4.5,
    reviewCount: 567,
    store: { name: 'بوتيك الأناقة', slug: 'elegance-boutique' },
    isPrime: false,
    inStock: true,
  },
]

export default function BestsellersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-l from-amazon-navy to-amazon-navyLight py-12">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-full bg-amazon-orange flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  الأكثر مبيعاً
                </h1>
                <p className="text-white/70">
                  المنتجات الأكثر طلباً من عملائنا
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Top 3 */}
        <section className="py-12">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <Award className="h-8 w-8 text-amazon-star" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                أفضل 3 منتجات
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {bestsellers.slice(0, 3).map((product, index) => (
                <div key={product.id} className="relative">
                  <Badge
                    className={`absolute -top-3 -start-3 z-10 text-lg px-4 py-2 ${
                      index === 0
                        ? 'bg-amazon-star'
                        : index === 1
                        ? 'bg-gray-400'
                        : 'bg-amber-700'
                    } text-white`}
                  >
                    #{index + 1}
                  </Badge>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Bestsellers */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <Star className="h-8 w-8 text-amazon-orange" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                جميع المنتجات الأكثر مبيعاً
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bestsellers.map((product) => (
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
