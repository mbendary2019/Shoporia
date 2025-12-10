'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Badge, Input } from '@/components/ui'
import { formatCurrency } from '@/utils/format'
import {
  Store,
  Star,
  MapPin,
  Phone,
  Clock,
  Share2,
  Heart,
  Search,
  Grid3X3,
  List,
  SlidersHorizontal,
  Package,
  ShoppingCart,
  MessageCircle,
  CheckCircle,
  Calendar,
  Users,
  ShoppingBag,
} from 'lucide-react'

// Mock store data
const store = {
  id: 'store-1',
  name: 'متجر الأناقة',
  slug: 'elegance-store',
  description: 'متجر متخصص في الملابس الرجالية الفاخرة والأنيقة. نقدم أجود أنواع الأقمشة وأحدث صيحات الموضة بأسعار منافسة. نسعى دائماً لتقديم أفضل تجربة تسوق لعملائنا.',
  logo: '/images/stores/elegance-logo.jpg',
  banner: '/images/stores/elegance-banner.jpg',
  category: 'fashion',
  categoryAr: 'أزياء',
  rating: 4.8,
  reviewCount: 256,
  productCount: 156,
  followerCount: 1250,
  orderCount: 3500,
  phone: '01012345678',
  whatsapp: '01012345678',
  email: 'contact@elegance-store.com',
  address: 'مدينة نصر، القاهرة',
  isVerified: true,
  createdAt: '2023-06-15',
  workingHours: {
    saturday: { open: '10:00', close: '22:00', isOpen: true },
    sunday: { open: '10:00', close: '22:00', isOpen: true },
    monday: { open: '10:00', close: '22:00', isOpen: true },
    tuesday: { open: '10:00', close: '22:00', isOpen: true },
    wednesday: { open: '10:00', close: '22:00', isOpen: true },
    thursday: { open: '10:00', close: '22:00', isOpen: true },
    friday: { open: '14:00', close: '22:00', isOpen: true },
  },
}

const products = [
  {
    id: '1',
    name: 'قميص قطن رجالي كلاسيك',
    price: 450,
    compareAtPrice: 599,
    rating: 4.5,
    reviewCount: 128,
    soldCount: 256,
  },
  {
    id: '2',
    name: 'بنطلون قماش رجالي',
    price: 550,
    compareAtPrice: 700,
    rating: 4.3,
    reviewCount: 89,
    soldCount: 180,
  },
  {
    id: '3',
    name: 'جاكيت شتوي فاخر',
    price: 1200,
    compareAtPrice: 1500,
    rating: 4.7,
    reviewCount: 45,
    soldCount: 120,
  },
  {
    id: '4',
    name: 'حذاء جلد طبيعي',
    price: 850,
    rating: 4.6,
    reviewCount: 67,
    soldCount: 200,
  },
  {
    id: '5',
    name: 'كرافت حرير',
    price: 120,
    compareAtPrice: 150,
    rating: 4.5,
    reviewCount: 34,
    soldCount: 300,
  },
  {
    id: '6',
    name: 'حزام جلد طبيعي',
    price: 180,
    rating: 4.7,
    reviewCount: 56,
    soldCount: 250,
  },
]

const reviews = [
  {
    id: '1',
    customerName: 'أحمد محمد',
    rating: 5,
    comment: 'متجر ممتاز وخدمة عملاء رائعة. المنتجات بجودة عالية جداً.',
    date: '2024-12-05',
  },
  {
    id: '2',
    customerName: 'محمود علي',
    rating: 4,
    comment: 'تجربة شراء جيدة والتوصيل سريع. أنصح بالتعامل معهم.',
    date: '2024-12-01',
  },
]

export default function StorePage() {
  const params = useParams()
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState<'products' | 'about' | 'reviews'>('products')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const isOpen = () => {
    const now = new Date()
    const day = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof typeof store.workingHours
    const hours = store.workingHours[day]

    if (!hours?.isOpen) return false

    const currentTime = now.getHours() * 100 + now.getMinutes()
    const openTime = parseInt(hours.open.replace(':', ''))
    const closeTime = parseInt(hours.close.replace(':', ''))

    return currentTime >= openTime && currentTime <= closeTime
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Store Banner */}
        <div className="relative h-48 bg-gradient-to-r from-primary-500 to-secondary-500 md:h-64">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Store Info */}
        <div className="container-custom">
          <div className="relative -mt-16 mb-8">
            <Card className="p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                {/* Logo */}
                <div className="relative -mt-20 md:-mt-24">
                  <div className="flex h-32 w-32 items-center justify-center rounded-xl border-4 border-white bg-white shadow-lg dark:border-gray-800 dark:bg-gray-800 md:h-40 md:w-40">
                    <Store className="h-16 w-16 text-primary-500 md:h-20 md:w-20" />
                  </div>
                  {store.isVerified && (
                    <div className="absolute -bottom-2 -end-2 rounded-full bg-white p-1 shadow dark:bg-gray-800">
                      <CheckCircle className="h-6 w-6 text-blue-500" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                          {store.name}
                        </h1>
                        {store.isVerified && (
                          <Badge variant="info">موثق</Badge>
                        )}
                      </div>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        {store.categoryAr}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant={isFollowing ? 'outline' : 'default'}
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        <Heart className={`h-4 w-4 ${isFollowing ? 'fill-current text-red-500' : ''}`} />
                        {isFollowing ? 'متابَع' : 'متابعة'}
                      </Button>
                      <Button variant="outline">
                        <MessageCircle className="h-4 w-4" />
                        تواصل
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">{store.rating}</span>
                      <span className="text-gray-500">({store.reviewCount} تقييم)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Package className="h-5 w-5" />
                      <span>{store.productCount} منتج</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Users className="h-5 w-5" />
                      <span>{store.followerCount} متابع</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <ShoppingBag className="h-5 w-5" />
                      <span>{store.orderCount}+ طلب</span>
                    </div>
                  </div>

                  {/* Contact & Location */}
                  <div className="mt-6 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      {store.address}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4" />
                      {store.phone}
                    </div>
                    <div className={`flex items-center gap-2 ${isOpen() ? 'text-green-600' : 'text-red-500'}`}>
                      <Clock className="h-4 w-4" />
                      {isOpen() ? 'مفتوح الآن' : 'مغلق'}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      منذ {new Date(store.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long' })}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'products'
                  ? 'border-b-2 border-primary-500 text-primary-500'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400'
              }`}
            >
              المنتجات ({store.productCount})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'about'
                  ? 'border-b-2 border-primary-500 text-primary-500'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400'
              }`}
            >
              عن المتجر
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-primary-500 text-primary-500'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400'
              }`}
            >
              التقييمات ({store.reviewCount})
            </button>
          </div>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="pb-12">
              {/* Filters */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="search"
                    placeholder="ابحث في منتجات المتجر..."
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white pe-4 ps-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <select className="h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800">
                    <option>الأحدث</option>
                    <option>الأكثر مبيعاً</option>
                    <option>السعر: الأقل للأعلى</option>
                    <option>السعر: الأعلى للأقل</option>
                    <option>التقييم</option>
                  </select>

                  <div className="flex rounded-lg border border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex h-11 w-11 items-center justify-center ${
                        viewMode === 'grid'
                          ? 'bg-primary-50 text-primary-500 dark:bg-primary-900/20'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <Grid3X3 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex h-11 w-11 items-center justify-center border-s border-gray-300 dark:border-gray-600 ${
                        viewMode === 'list'
                          ? 'bg-primary-50 text-primary-500 dark:bg-primary-900/20'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className={`grid gap-4 ${
                viewMode === 'grid'
                  ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className={`group overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}
                  >
                    <div className={`relative bg-gray-100 dark:bg-gray-800 ${
                      viewMode === 'grid' ? 'aspect-square' : 'h-40 w-40 shrink-0'
                    }`}>
                      <div className="flex h-full items-center justify-center">
                        <Package className="h-12 w-12 text-gray-300" />
                      </div>

                      {product.compareAtPrice && (
                        <Badge className="absolute start-3 top-3" variant="danger">
                          {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% خصم
                        </Badge>
                      )}

                      <div className="absolute end-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
                        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 dark:bg-gray-800">
                          <Heart className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 p-4">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-medium text-gray-900 hover:text-primary-500 dark:text-white line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="mt-2 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-gray-500">({product.reviewCount})</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-sm text-gray-500">{product.soldCount} مبيعات</span>
                      </div>

                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-lg font-bold text-primary-500">
                          {formatCurrency(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(product.compareAtPrice)}
                          </span>
                        )}
                      </div>

                      {viewMode === 'list' && (
                        <Button className="mt-4" size="sm">
                          <ShoppingCart className="h-4 w-4" />
                          أضف للسلة
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-8 text-center">
                <Button variant="outline">عرض المزيد</Button>
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="pb-12">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    عن المتجر
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {store.description}
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    أوقات العمل
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(store.workingHours).map(([day, hours]) => {
                      const dayNames: Record<string, string> = {
                        saturday: 'السبت',
                        sunday: 'الأحد',
                        monday: 'الإثنين',
                        tuesday: 'الثلاثاء',
                        wednesday: 'الأربعاء',
                        thursday: 'الخميس',
                        friday: 'الجمعة',
                      }
                      return (
                        <div key={day} className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            {dayNames[day]}
                          </span>
                          <span className={hours.isOpen ? 'text-gray-900 dark:text-white' : 'text-red-500'}>
                            {hours.isOpen ? `${hours.open} - ${hours.close}` : 'مغلق'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    معلومات التواصل
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                        <Phone className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">الهاتف</p>
                        <p className="text-gray-900 dark:text-white">{store.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">واتساب</p>
                        <p className="text-gray-900 dark:text-white">{store.whatsapp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                        <MapPin className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">العنوان</p>
                        <p className="text-gray-900 dark:text-white">{store.address}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    إحصائيات المتجر
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800">
                      <p className="text-2xl font-bold text-primary-500">{store.productCount}</p>
                      <p className="text-sm text-gray-500">منتج</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800">
                      <p className="text-2xl font-bold text-primary-500">{store.orderCount}+</p>
                      <p className="text-sm text-gray-500">طلب مكتمل</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800">
                      <p className="text-2xl font-bold text-primary-500">{store.followerCount}</p>
                      <p className="text-sm text-gray-500">متابع</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800">
                      <p className="text-2xl font-bold text-primary-500">{store.rating}</p>
                      <p className="text-sm text-gray-500">تقييم</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="pb-12 space-y-6">
              {/* Reviews Summary */}
              <Card className="p-6">
                <div className="flex flex-col items-center gap-6 md:flex-row">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 dark:text-white">
                      {store.rating}
                    </div>
                    <div className="mt-2 flex justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.floor(store.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {store.reviewCount} تقييم
                    </p>
                  </div>

                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="w-3 text-sm text-gray-600">{rating}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-full rounded-full bg-yellow-400"
                            style={{ width: `${rating === 5 ? 65 : rating === 4 ? 20 : rating === 3 ? 10 : 5}%` }}
                          />
                        </div>
                        <span className="w-8 text-sm text-gray-500">
                          {rating === 5 ? '65%' : rating === 4 ? '20%' : rating === 3 ? '10%' : '5%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Reviews List */}
              {reviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-medium text-primary-500 dark:bg-primary-900/30">
                        {review.customerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {review.customerName}
                        </p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>

                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {review.comment}
                  </p>
                </Card>
              ))}

              <Button variant="outline" className="w-full">
                عرض المزيد من التقييمات
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
