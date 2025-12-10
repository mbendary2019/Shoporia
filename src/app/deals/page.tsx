'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Header, Footer } from '@/components/layout'
import { DealCard, ProductCard, Badge, Card } from '@/components/ui'
import { Zap, Clock, Percent, ArrowLeft } from 'lucide-react'

const dealProducts = [
  {
    id: '1',
    name: 'سماعات آبل إيربودز برو 2',
    price: 8999,
    compareAtPrice: 11999,
    image: '/images/products/airpods.jpg',
    rating: 4.8,
    reviewCount: 2456,
    store: { name: 'تك ستور', slug: 'tech-store' },
  },
  {
    id: '2',
    name: 'ساعة سامسونج جالاكسي واتش 6',
    price: 6499,
    compareAtPrice: 8999,
    image: '/images/products/watch.jpg',
    rating: 4.6,
    reviewCount: 1823,
    store: { name: 'موبايل شوب', slug: 'mobile-shop' },
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
  },
  {
    id: '4',
    name: 'جهاز بلايستيشن 5',
    price: 18999,
    compareAtPrice: 22999,
    image: '/images/products/ps5.jpg',
    rating: 4.9,
    reviewCount: 3421,
    store: { name: 'جيمرز هب', slug: 'gamers-hub' },
  },
  {
    id: '5',
    name: 'مكنسة روبوت ذكية',
    price: 3499,
    compareAtPrice: 5999,
    image: '/images/products/vacuum.jpg',
    rating: 4.4,
    reviewCount: 1234,
    store: { name: 'سمارت هوم', slug: 'smart-home' },
  },
  {
    id: '6',
    name: 'سماعات سوني WH-1000XM5',
    price: 7999,
    compareAtPrice: 10999,
    image: '/images/products/sony-headphones.jpg',
    rating: 4.8,
    reviewCount: 2156,
    store: { name: 'صوتيات', slug: 'audio-store' },
  },
  {
    id: '7',
    name: 'حقيبة ظهر جلد طبيعي',
    price: 1299,
    compareAtPrice: 1899,
    image: '/images/products/bag.jpg',
    rating: 4.5,
    reviewCount: 567,
    store: { name: 'بوتيك الأناقة', slug: 'elegance-boutique' },
  },
  {
    id: '8',
    name: 'حذاء رياضي نايك',
    price: 2499,
    compareAtPrice: 3499,
    image: '/images/products/shoes.jpg',
    rating: 4.7,
    reviewCount: 1234,
    store: { name: 'سبورت ستور', slug: 'sport-store' },
  },
]

export default function DealsPage() {
  const [countdown, setCountdown] = useState({ hours: 23, minutes: 59, seconds: 59 })

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-to-l from-amazon-deal to-red-700 py-12">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white text-center md:text-start">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                    <Zap className="h-8 w-8" />
                  </div>
                  <Badge className="bg-amazon-yellow text-amazon-navy text-lg px-4 py-2">
                    خصومات تصل إلى 70%
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">عروض اليوم</h1>
                <p className="text-white/80 text-lg">
                  احصل على أفضل العروض قبل انتهاء الوقت!
                </p>
              </div>

              {/* Countdown */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="bg-white text-amazon-deal px-6 py-4 rounded-lg min-w-[80px]">
                    <span className="text-4xl font-bold">{countdown.hours.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-white/70 text-sm mt-1 block">ساعة</span>
                </div>
                <span className="text-4xl font-bold text-white">:</span>
                <div className="text-center">
                  <div className="bg-white text-amazon-deal px-6 py-4 rounded-lg min-w-[80px]">
                    <span className="text-4xl font-bold">{countdown.minutes.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-white/70 text-sm mt-1 block">دقيقة</span>
                </div>
                <span className="text-4xl font-bold text-white">:</span>
                <div className="text-center">
                  <div className="bg-white text-amazon-deal px-6 py-4 rounded-lg min-w-[80px]">
                    <span className="text-4xl font-bold">{countdown.seconds.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-white/70 text-sm mt-1 block">ثانية</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flash Deals */}
        <section className="py-12">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="h-8 w-8 text-amazon-deal" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                عروض خاطفة
              </h2>
              <Badge variant="danger">محدودة الكمية</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dealProducts.slice(0, 4).map((product) => (
                <DealCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* All Deals */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-8">
              <Percent className="h-8 w-8 text-amazon-orange" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                جميع العروض
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dealProducts.map((product) => (
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
