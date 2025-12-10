'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useAuthStore, useCartStore } from '@/store'
import { Button, Avatar } from '@/components/ui'
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  Store,
  LogOut,
  Settings,
  Package,
  Heart,
  MapPin,
  ChevronDown,
  Sparkles,
  Percent,
  Gift,
  Headphones,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { STORE_CATEGORIES } from '@/utils/constants'

const quickLinks = [
  { name: 'عروض اليوم', href: '/deals', icon: Percent },
  { name: 'جديدنا', href: '/new-arrivals', icon: Sparkles },
  { name: 'الأكثر مبيعاً', href: '/bestsellers', icon: Gift },
  { name: 'خدمة العملاء', href: '/support', icon: Headphones },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const searchRef = useRef<HTMLDivElement>(null)
  const categoryRef = useRef<HTMLDivElement>(null)
  const { user, isAuthenticated, logout } = useAuthStore()
  const itemCount = useCartStore((state) => state.getItemCount())

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Mock search suggestions
  const searchSuggestions = searchQuery
    ? [
        `${searchQuery} للرجال`,
        `${searchQuery} للنساء`,
        `${searchQuery} أطفال`,
        `${searchQuery} تخفيضات`,
      ]
    : []

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main Navigation Bar - Amazon Navy */}
      <div className="bg-amazon-navy">
        <div className="container-custom">
          <div className="flex h-16 items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amazon-orange text-white transition-transform group-hover:scale-105">
                <Store className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">
                Shoporia
              </span>
            </Link>

            {/* Delivery Location */}
            <button className="hidden lg:flex items-center gap-1 text-white p-2 rounded hover:outline hover:outline-1 hover:outline-white">
              <MapPin className="h-5 w-5 text-white/70" />
              <div className="text-start">
                <span className="block text-xs text-white/70">التوصيل إلى</span>
                <span className="block text-sm font-bold">القاهرة</span>
              </div>
            </button>

            {/* Search Bar - Amazon Style */}
            <div ref={searchRef} className="flex-1 max-w-3xl relative">
              <div className={cn(
                'flex rounded-lg overflow-hidden transition-all',
                isSearchFocused ? 'ring-2 ring-amazon-orange' : ''
              )}>
                {/* Category Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="h-11 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm flex items-center gap-1 border-e border-gray-300"
                  >
                    <span className="hidden sm:inline max-w-[100px] truncate">
                      {selectedCategory === 'all' ? 'الكل' :
                        STORE_CATEGORIES.find(c => c.id === selectedCategory)?.nameAr || 'الكل'}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {isCategoryOpen && (
                    <div className="absolute top-full start-0 mt-1 w-56 bg-white rounded-lg shadow-xl border z-50 py-2 max-h-80 overflow-y-auto">
                      <button
                        onClick={() => { setSelectedCategory('all'); setIsCategoryOpen(false) }}
                        className={cn(
                          'w-full px-4 py-2 text-start text-sm hover:bg-amazon-orange/10',
                          selectedCategory === 'all' && 'bg-amazon-orange/20 font-medium'
                        )}
                      >
                        جميع الأقسام
                      </button>
                      {STORE_CATEGORIES.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => { setSelectedCategory(category.id); setIsCategoryOpen(false) }}
                          className={cn(
                            'w-full px-4 py-2 text-start text-sm hover:bg-amazon-orange/10',
                            selectedCategory === category.id && 'bg-amazon-orange/20 font-medium'
                          )}
                        >
                          {category.nameAr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Input */}
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="ابحث في Shoporia..."
                  className="flex-1 h-11 px-4 text-sm focus:outline-none"
                />

                {/* Search Button */}
                <button className="h-11 px-5 bg-amazon-yellow hover:bg-amazon-yellowHover transition-colors">
                  <Search className="h-5 w-5 text-amazon-navy" />
                </button>
              </div>

              {/* Search Suggestions Dropdown */}
              {isSearchFocused && searchQuery && (
                <div className="absolute top-full start-0 end-0 mt-1 bg-white rounded-lg shadow-xl border z-50">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-3 text-start text-sm hover:bg-gray-100 flex items-center gap-3 border-b last:border-0"
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language/Region */}
            <button className="hidden md:flex items-center gap-1 text-white p-2 rounded hover:outline hover:outline-1 hover:outline-white">
              <span className="text-lg">🇪🇬</span>
              <span className="text-sm font-bold">AR</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {/* Account */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 text-white p-2 rounded hover:outline hover:outline-1 hover:outline-white"
                >
                  <div className="text-start">
                    <span className="block text-xs text-white/70">مرحباً، {user?.displayName?.split(' ')[0]}</span>
                    <span className="block text-sm font-bold flex items-center gap-1">
                      الحساب والقوائم
                      <ChevronDown className="h-3 w-3" />
                    </span>
                  </div>
                </button>

                {/* Account Dropdown */}
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    <div className="absolute end-0 top-full z-50 mt-2 w-72 rounded-lg border bg-white shadow-xl">
                      {/* User Info */}
                      <div className="p-4 border-b text-center">
                        <Avatar src={user?.photoURL} fallback={user?.displayName} size="lg" />
                        <p className="mt-2 font-bold text-gray-900">{user?.displayName}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>

                      {/* Quick Links */}
                      <div className="p-2">
                        {user?.role === 'seller' && (
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-amazon-orange/10 text-amazon-link"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Store className="h-5 w-5" />
                            لوحة تحكم البائع
                          </Link>
                        )}
                        <Link
                          href="/account/orders"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-amazon-orange/10"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Package className="h-5 w-5 text-gray-600" />
                          طلباتي
                        </Link>
                        <Link
                          href="/account/wishlist"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-amazon-orange/10"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Heart className="h-5 w-5 text-gray-600" />
                          قائمة الأمنيات
                        </Link>
                        <Link
                          href="/account"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-amazon-orange/10"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="h-5 w-5 text-gray-600" />
                          إعدادات الحساب
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t p-2">
                        <button
                          onClick={() => { logout(); setIsProfileOpen(false) }}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-5 w-5" />
                          تسجيل الخروج
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center text-white p-2 rounded hover:outline hover:outline-1 hover:outline-white"
              >
                <div className="text-start">
                  <span className="block text-xs text-white/70">مرحباً، سجل دخولك</span>
                  <span className="block text-sm font-bold flex items-center gap-1">
                    الحساب والقوائم
                    <ChevronDown className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            )}

            {/* Orders */}
            <Link
              href="/account/orders"
              className="hidden lg:flex items-center text-white p-2 rounded hover:outline hover:outline-1 hover:outline-white"
            >
              <div className="text-start">
                <span className="block text-xs text-white/70">المرتجعات</span>
                <span className="block text-sm font-bold">والطلبات</span>
              </div>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center text-white p-2 rounded hover:outline hover:outline-1 hover:outline-white relative"
            >
              <div className="relative">
                <ShoppingCart className="h-8 w-8" />
                <span className="absolute -top-1 start-4 flex h-5 min-w-5 items-center justify-center rounded-full bg-amazon-orange text-xs font-bold text-white px-1">
                  {itemCount}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-bold mt-3">السلة</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Bar */}
      <div className="bg-amazon-navyLight">
        <div className="container-custom">
          <div className="flex items-center gap-1 h-10 overflow-x-auto scrollbar-hide">
            {/* All Categories Button */}
            <div ref={categoryRef} className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-2 text-white text-sm font-medium px-3 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white whitespace-nowrap"
              >
                <Menu className="h-4 w-4" />
                <span>جميع الأقسام</span>
              </button>

              {/* Mega Menu */}
              {isCategoryOpen && (
                <>
                  <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setIsCategoryOpen(false)} />
                  <div className="absolute top-full start-0 mt-1 w-72 bg-white rounded-lg shadow-xl z-50 py-2 max-h-[70vh] overflow-y-auto">
                    <div className="px-4 py-2 border-b">
                      <h3 className="font-bold text-gray-900">تسوق حسب القسم</h3>
                    </div>
                    {STORE_CATEGORIES.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.id}`}
                        className="flex items-center justify-between px-4 py-3 hover:bg-amazon-orange/10 group"
                        onClick={() => setIsCategoryOpen(false)}
                      >
                        <span className="text-sm text-gray-700 group-hover:text-amazon-orange">
                          {category.nameAr}
                        </span>
                        <ChevronDown className="h-4 w-4 -rotate-90 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Quick Links */}
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-1.5 text-white text-sm px-3 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white whitespace-nowrap"
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Seller Link */}
            <Link
              href="/seller/register"
              className="flex items-center gap-1.5 text-white text-sm px-3 py-1.5 rounded hover:outline hover:outline-1 hover:outline-white whitespace-nowrap ms-auto"
            >
              <Store className="h-4 w-4" />
              <span>بيع على Shoporia</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden bg-amazon-navy px-4 pb-3">
        <div className="flex rounded-lg overflow-hidden">
          <input
            type="search"
            placeholder="ابحث في Shoporia..."
            className="flex-1 h-10 px-4 text-sm focus:outline-none"
          />
          <button className="h-10 px-4 bg-amazon-yellow">
            <Search className="h-5 w-5 text-amazon-navy" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden transition-all duration-300',
          isMenuOpen ? 'visible' : 'invisible'
        )}
      >
        {/* Overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-black transition-opacity',
            isMenuOpen ? 'opacity-50' : 'opacity-0'
          )}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={cn(
            'absolute top-0 start-0 h-full w-80 max-w-[85vw] bg-white shadow-xl transition-transform duration-300 overflow-y-auto',
            isMenuOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
          )}
        >
          {/* User Header */}
          <div className="bg-amazon-navy text-white p-4 flex items-center gap-3">
            <Avatar src={user?.photoURL} fallback={user?.displayName || 'ض'} size="md" />
            <div>
              {isAuthenticated ? (
                <>
                  <p className="font-bold">{user?.displayName}</p>
                  <Link href="/account" className="text-sm text-white/70" onClick={() => setIsMenuOpen(false)}>
                    عرض الحساب
                  </Link>
                </>
              ) : (
                <Link href="/login" className="font-bold" onClick={() => setIsMenuOpen(false)}>
                  تسجيل الدخول
                </Link>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="border-b py-4">
            <h3 className="px-4 font-bold text-gray-900 mb-2">تسوق حسب القسم</h3>
            {STORE_CATEGORIES.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="block px-4 py-3 text-sm hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.nameAr}
              </Link>
            ))}
            <Link
              href="/categories"
              className="block px-4 py-3 text-sm text-amazon-link font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              عرض جميع الأقسام
            </Link>
          </div>

          {/* Quick Links */}
          <div className="border-b py-4">
            <h3 className="px-4 font-bold text-gray-900 mb-2">برامج وميزات</h3>
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <link.icon className="h-5 w-5 text-gray-600" />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Settings & Help */}
          <div className="py-4">
            <h3 className="px-4 font-bold text-gray-900 mb-2">الإعدادات والمساعدة</h3>
            <Link
              href="/account"
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5 text-gray-600" />
              حسابك
            </Link>
            <Link
              href="/support"
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <Headphones className="h-5 w-5 text-gray-600" />
              خدمة العملاء
            </Link>
            {isAuthenticated && (
              <button
                onClick={() => { logout(); setIsMenuOpen(false) }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 text-red-600"
              >
                <LogOut className="h-5 w-5" />
                تسجيل الخروج
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
