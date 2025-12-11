'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Header, Footer } from '@/components/layout'
import { Button, Card, ProductCard, DealCard, Badge } from '@/components/ui'
import {
  ShoppingBag,
  Store,
  Sparkles,
  TrendingUp,
  Shield,
  Truck,
  HeadphonesIcon,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Zap,
  Gift,
  Percent,
  ArrowLeft,
  Smartphone,
  Laptop,
  Shirt,
  Home,
  Dumbbell,
  Palette,
} from 'lucide-react'
import { STORE_CATEGORIES } from '@/utils/constants'
import { cn } from '@/utils/cn'
import { useCartStore } from '@/store'

// Hero Slides
const heroSlides = [
  {
    id: 1,
    title: 'تخفيضات نهاية العام',
    subtitle: 'خصومات تصل إلى 70% على جميع الأقسام',
    bg: 'from-amazon-navy via-amazon-navyLight to-amazon-navy',
    cta: 'تسوق الآن',
    href: '/deals',
  },
  {
    id: 2,
    title: 'إلكترونيات بأفضل الأسعار',
    subtitle: 'أحدث الهواتف والأجهزة بضمان سنة',
    bg: 'from-blue-900 via-blue-800 to-blue-900',
    cta: 'اكتشف العروض',
    href: '/category/electronics',
  },
  {
    id: 3,
    title: 'موضة 2025',
    subtitle: 'أحدث صيحات الموضة والأزياء',
    bg: 'from-purple-900 via-purple-800 to-purple-900',
    cta: 'تصفح الموضة',
    href: '/category/fashion',
  },
]

// Category Icons
const categoryIcons: Record<string, React.ElementType> = {
  electronics: Smartphone,
  fashion: Shirt,
  home: Home,
  sports: Dumbbell,
  beauty: Palette,
  computers: Laptop,
}

// Category Images for Shop by Category section
const categoryImages = [
  { id: 'electronics', nameAr: 'إلكترونيات', image: '/images/categories/electronics.jpg' },
  { id: 'fashion', nameAr: 'أزياء وملابس', image: '/images/categories/fashion.jpg' },
  { id: 'home', nameAr: 'المنزل والحديقة', image: '/images/categories/home.jpg' },
  { id: 'beauty', nameAr: 'الجمال والعناية', image: '/images/categories/beauty.jpg' },
  { id: 'sports', nameAr: 'رياضة', image: '/images/categories/sports.jpg' },
  { id: 'kids', nameAr: 'أطفال', image: '/images/categories/kids.jpg' },
  { id: 'food', nameAr: 'طعام ومشروبات', image: '/images/products/cookware.jpg' },
  { id: 'health', nameAr: 'صحة وأدوية', image: '/images/products/cream.jpg' },
]

// Mock Products Data
const featuredProducts = [
  {
    id: '1',
    name: 'سماعات آبل إيربودز برو 2 - إلغاء ضوضاء نشط',
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
    name: 'ساعة ذكية سامسونج جالاكسي واتش 6',
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
    id: '3',
    name: 'حقيبة ظهر جلد طبيعي - تصميم إيطالي',
    price: 1299,
    compareAtPrice: 1899,
    image: '/images/products/bag.jpg',
    rating: 4.5,
    reviewCount: 567,
    store: { name: 'بوتيك الأناقة', slug: 'elegance-boutique' },
    isPrime: false,
    inStock: true,
  },
  {
    id: '4',
    name: 'جهاز بلايستيشن 5 - نسخة ديجيتال',
    price: 18999,
    compareAtPrice: 22999,
    image: '/images/products/ps5.jpg',
    rating: 4.9,
    reviewCount: 3421,
    store: { name: 'جيمرز هب', slug: 'gamers-hub' },
    isPrime: true,
    inStock: true,
    stockCount: 5,
  },
]

const dealProducts = [
  {
    id: '5',
    name: 'لابتوب ماك بوك إير M2',
    price: 42999,
    compareAtPrice: 54999,
    image: '/images/products/macbook.jpg',
    rating: 4.9,
    reviewCount: 892,
    store: { name: 'آبل ستور', slug: 'apple-store' },
  },
  {
    id: '6',
    name: 'مكنسة روبوت ذكية',
    price: 3499,
    compareAtPrice: 5999,
    image: '/images/products/vacuum.jpg',
    rating: 4.4,
    reviewCount: 1234,
    store: { name: 'سمارت هوم', slug: 'smart-home' },
  },
  {
    id: '7',
    name: 'سماعات سوني WH-1000XM5',
    price: 7999,
    compareAtPrice: 10999,
    image: '/images/products/sony-headphones.jpg',
    rating: 4.8,
    reviewCount: 2156,
    store: { name: 'صوتيات', slug: 'audio-store' },
  },
]

const stats = [
  { value: '10,000+', label: 'متجر نشط', icon: Store },
  { value: '500,000+', label: 'منتج', icon: ShoppingBag },
  { value: '1,000,000+', label: 'عميل سعيد', icon: Star },
  { value: '27', label: 'محافظة', icon: Truck },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [countdown, setCountdown] = useState({ hours: 5, minutes: 23, seconds: 45 })
  const { addItem } = useCartStore()

  // Handler to add product to cart
  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    // Convert mock product to Product type for cart store
    const cartProduct = {
      id: product.id,
      storeId: product.store.slug,
      name: product.name,
      slug: product.id,
      description: product.name,
      category: 'general',
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      currency: 'EGP',
      quantity: 100,
      trackInventory: false,
      images: [{ id: '1', url: product.image, order: 0 }],
      hasVariants: false,
      status: 'active' as const,
      isFeatured: true,
      isDigital: false,
      viewCount: 0,
      soldCount: 0,
      rating: product.rating,
      reviewCount: product.reviewCount,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    addItem(cartProduct)
  }

  // Auto-slide hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Countdown timer
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

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section with Carousel */}
        <section className="relative">
          {/* Hero Slider */}
          <div className="relative h-[300px] md:h-[400px] overflow-hidden">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={cn(
                  'absolute inset-0 transition-all duration-700 ease-in-out',
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : index < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                )}
              >
                <div className={cn('h-full bg-gradient-to-l', slide.bg)}>
                  <div className="container-custom h-full flex items-center">
                    <div className="max-w-xl text-white">
                      <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                      <p className="text-lg md:text-xl text-white/80 mb-6">{slide.subtitle}</p>
                      <Link href={slide.href}>
                        <Button size="lg" className="bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-navy font-bold">
                          {slide.cta}
                          <ArrowLeft className="h-5 w-5 me-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute start-4 top-1/2 -translate-y-1/2 h-16 w-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center rounded transition-all"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute end-4 top-1/2 -translate-y-1/2 h-16 w-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center rounded transition-all"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 start-1/2 -translate-x-1/2 flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    index === currentSlide ? 'w-8 bg-amazon-orange' : 'w-2 bg-white/50'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Gradient Fade at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 dark:from-gray-900 to-transparent pointer-events-none" />
        </section>

        {/* Category Cards Grid - Overlapping Hero */}
        <section className="relative -mt-20 z-10 pb-8">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {STORE_CATEGORIES.slice(0, 6).map((category) => {
                const Icon = categoryIcons[category.id] || ShoppingBag
                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="group"
                  >
                    <Card className="p-4 text-center transition-all hover:shadow-xl hover:-translate-y-1 bg-white">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amazon-orange/10 text-amazon-orange transition-all group-hover:bg-amazon-orange group-hover:text-white">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="mt-3 font-medium text-gray-900 text-sm">
                        {category.nameAr}
                      </h3>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Flash Deals Section */}
        <section className="py-8 bg-gradient-to-l from-amazon-deal/10 to-red-50 dark:from-amazon-deal/20 dark:to-gray-800">
          <div className="container-custom">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amazon-deal text-white animate-pulse">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    عروض خاطفة
                    <Badge variant="danger" className="bg-amazon-deal animate-bounce">
                      محدودة
                    </Badge>
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    احصل عليها قبل انتهاء الوقت!
                  </p>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">ينتهي في:</span>
                <div className="flex items-center gap-2">
                  <div className="bg-amazon-navy text-white px-3 py-2 rounded-lg text-center min-w-[50px]">
                    <span className="text-xl font-bold">{countdown.hours.toString().padStart(2, '0')}</span>
                    <span className="block text-[10px] text-white/70">ساعة</span>
                  </div>
                  <span className="text-2xl font-bold text-amazon-deal">:</span>
                  <div className="bg-amazon-navy text-white px-3 py-2 rounded-lg text-center min-w-[50px]">
                    <span className="text-xl font-bold">{countdown.minutes.toString().padStart(2, '0')}</span>
                    <span className="block text-[10px] text-white/70">دقيقة</span>
                  </div>
                  <span className="text-2xl font-bold text-amazon-deal">:</span>
                  <div className="bg-amazon-navy text-white px-3 py-2 rounded-lg text-center min-w-[50px]">
                    <span className="text-xl font-bold">{countdown.seconds.toString().padStart(2, '0')}</span>
                    <span className="block text-[10px] text-white/70">ثانية</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dealProducts.map((product) => (
                <DealCard key={product.id} product={product} />
              ))}
              {/* View All Card */}
              <Link
                href="/deals"
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-amazon-deal/30 bg-white p-6 text-center transition-all hover:border-amazon-deal hover:bg-amazon-deal/5"
              >
                <div className="h-16 w-16 rounded-full bg-amazon-deal/10 flex items-center justify-center mb-4">
                  <Percent className="h-8 w-8 text-amazon-deal" />
                </div>
                <span className="text-lg font-bold text-amazon-deal">عرض كل العروض</span>
                <span className="text-sm text-gray-500 mt-1">أكثر من 1000 عرض</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                منتجات مميزة
              </h2>
              <Link
                href="/marketplace"
                className="flex items-center gap-1 text-amazon-link hover:text-amazon-linkHover hover:underline font-medium"
              >
                عرض الكل
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Shop by Category - Large Cards */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              تسوق حسب القسم
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categoryImages.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 aspect-square"
                >
                  <Image
                    src={cat.image}
                    alt={cat.nameAr}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                  <div className="absolute bottom-0 start-0 end-0 p-4 z-20">
                    <h3 className="text-lg font-bold text-white">{cat.nameAr}</h3>
                    <span className="text-sm text-amazon-yellow group-hover:underline">
                      تسوق الآن
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Banner */}
        <section className="py-8 bg-amazon-navy">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-4 text-white">
                <Truck className="h-10 w-10 text-amazon-orange shrink-0" />
                <div>
                  <h3 className="font-bold">توصيل سريع</h3>
                  <p className="text-sm text-white/70">لجميع المحافظات</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <Shield className="h-10 w-10 text-amazon-orange shrink-0" />
                <div>
                  <h3 className="font-bold">دفع آمن</h3>
                  <p className="text-sm text-white/70">100% مؤمن</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <Gift className="h-10 w-10 text-amazon-orange shrink-0" />
                <div>
                  <h3 className="font-bold">إرجاع مجاني</h3>
                  <p className="text-sm text-white/70">خلال 14 يوم</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <HeadphonesIcon className="h-10 w-10 text-amazon-orange shrink-0" />
                <div>
                  <h3 className="font-bold">دعم 24/7</h3>
                  <p className="text-sm text-white/70">متاح دائماً</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seller CTA Section */}
        <section className="py-16">
          <div className="container-custom">
            <Card className="overflow-hidden bg-gradient-to-l from-amazon-navy to-amazon-navyLight p-0">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 md:p-12 text-white">
                  <Badge className="bg-amazon-orange text-white mb-4">
                    للبائعين
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4">
                    ابدأ البيع على Shoporia اليوم
                  </h2>
                  <p className="text-white/80 mb-6">
                    انضم لآلاف البائعين الناجحين وابدأ في بيع منتجاتك لملايين العملاء
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                        <Star className="h-3 w-3 text-white" />
                      </div>
                      <span>بدون رسوم اشتراك شهرية</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                        <Star className="h-3 w-3 text-white" />
                      </div>
                      <span>أدوات ذكاء اصطناعي مجانية</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                        <Star className="h-3 w-3 text-white" />
                      </div>
                      <span>دعم فني متخصص</span>
                    </li>
                  </ul>
                  <Link href="/seller/register">
                    <Button size="lg" className="bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-navy font-bold">
                      سجل كبائع مجاناً
                      <ArrowLeft className="h-5 w-5 me-2" />
                    </Button>
                  </Link>
                </div>
                <div className="hidden md:flex items-center justify-center bg-amazon-orange/20 p-8">
                  <Store className="h-48 w-48 text-amazon-orange/50" />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 border-y border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-8 w-8 mx-auto text-amazon-orange mb-2" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white mb-8">
              ماذا يقول عملاؤنا؟
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'أحمد محمد', role: 'صاحب متجر أزياء', rating: 5 },
                { name: 'سارة أحمد', role: 'مشترية دائمة', rating: 5 },
                { name: 'محمد علي', role: 'صاحب متجر إلكترونيات', rating: 5 },
              ].map((testimonial, i) => (
                <Card key={i} className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star
                        key={star}
                        className={cn(
                          'h-5 w-5',
                          star < testimonial.rating
                            ? 'fill-amazon-star text-amazon-star'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    &quot;منصة رائعة وسهلة الاستخدام. أنشأت متجري في أقل من 5
                    دقائق وبدأت البيع فوراً. الدعم الفني ممتاز ومتجاوب.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-amazon-orange/20 flex items-center justify-center text-amazon-orange font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
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
