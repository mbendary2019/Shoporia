'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Avatar, Button } from '@/components/ui'
import { cn } from '@/utils/cn'
import {
  Shield,
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Tag,
  MessageSquare,
  Flag,
  CreditCard,
  FileText,
  Megaphone,
  Loader2,
  UserCog,
} from 'lucide-react'

const navigation = [
  { name: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard },
  { name: 'المتاجر', href: '/admin/stores', icon: Store },
  { name: 'المنتجات', href: '/admin/products', icon: Package },
  { name: 'الطلبات', href: '/admin/orders', icon: ShoppingCart },
  { name: 'المستخدمين', href: '/admin/users', icon: Users },
  { name: 'فريق العمل', href: '/admin/team', icon: UserCog },
  { name: 'الكوبونات', href: '/admin/coupons', icon: Tag },
  { name: 'التقييمات', href: '/admin/reviews', icon: MessageSquare },
  { name: 'البلاغات', href: '/admin/reports', icon: Flag },
  { name: 'المدفوعات', href: '/admin/payments', icon: CreditCard },
  { name: 'التقارير', href: '/admin/analytics', icon: BarChart3 },
  { name: 'الإعلانات', href: '/admin/banners', icon: Megaphone },
  { name: 'السجلات', href: '/admin/logs', icon: FileText },
  { name: 'الإعدادات', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check admin authentication
  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      setIsLoading(false)
      setIsAuthenticated(true)
      return
    }

    const checkAuth = () => {
      const adminAuth = localStorage.getItem('adminAuth')
      if (adminAuth) {
        try {
          const auth = JSON.parse(adminAuth)
          if (auth.isAdmin) {
            setIsAuthenticated(true)
          } else {
            router.push('/admin/login')
          }
        } catch {
          router.push('/admin/login')
        }
      } else {
        router.push('/admin/login')
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-red-500" />
          <p className="mt-2 text-gray-500">جاري التحقق...</p>
        </div>
      </div>
    )
  }

  // For login page, just render children without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // If not authenticated, don't render (redirect handled in useEffect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 start-0 z-50 w-64 transform bg-gray-900 transition-transform duration-200 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500 text-white">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  Shoporia
                </span>
                <span className="ms-2 rounded bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
                  Admin
                </span>
              </div>
            </Link>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-red-500/20 text-red-400'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="border-t border-gray-700 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/20"
            >
              <LogOut className="h-5 w-5" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800 lg:px-6">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-500" />
          </button>

          {/* Title */}
          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              لوحة تحكم الإدارة
            </h1>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute end-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                5
              </span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <Avatar
                fallback="Admin"
                size="sm"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  مدير النظام
                </p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
