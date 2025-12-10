'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { Card, Badge } from '@/components/ui'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'

const posts = [
  {
    id: 1,
    title: 'كيف تختار الهاتف المناسب لك في 2025',
    excerpt: 'دليل شامل لمساعدتك في اختيار الهاتف الذكي المثالي بناءً على احتياجاتك وميزانيتك.',
    image: '/images/products/phone.jpg',
    category: 'تقنية',
    author: 'أحمد محمد',
    date: '10 ديسمبر 2024',
    readTime: '5 دقائق',
  },
  {
    id: 2,
    title: 'نصائح للتسوق الآمن عبر الإنترنت',
    excerpt: 'تعرف على أفضل الممارسات لحماية نفسك أثناء التسوق الإلكتروني.',
    image: '/images/products/laptop.jpg',
    category: 'نصائح',
    author: 'سارة أحمد',
    date: '8 ديسمبر 2024',
    readTime: '4 دقائق',
  },
  {
    id: 3,
    title: 'أفضل العروض في موسم الأعياد',
    excerpt: 'اكتشف أفضل العروض والخصومات المتاحة خلال موسم الأعياد.',
    image: '/images/products/watch.jpg',
    category: 'عروض',
    author: 'محمد علي',
    date: '5 ديسمبر 2024',
    readTime: '3 دقائق',
  },
  {
    id: 4,
    title: 'دليل البائع الناجح على Shoporia',
    excerpt: 'نصائح وإرشادات لزيادة مبيعاتك وبناء متجر ناجح على منصتنا.',
    image: '/images/products/bag.jpg',
    category: 'للبائعين',
    author: 'ليلى حسن',
    date: '3 ديسمبر 2024',
    readTime: '6 دقائق',
  },
]

const categories = ['الكل', 'تقنية', 'نصائح', 'عروض', 'للبائعين', 'أخبار']

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-navy py-12">
          <div className="container-custom text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              مدونة Shoporia
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              نصائح، أخبار، ومقالات مفيدة حول التسوق والتجارة الإلكترونية
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <div className="container-custom">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === 'الكل'
                      ? 'bg-amazon-orange text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 end-4 bg-amazon-orange text-white">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-amazon-orange hover:underline mt-4"
                    >
                      اقرأ المزيد
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
