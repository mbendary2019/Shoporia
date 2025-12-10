'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Header, Footer } from '@/components/layout'
import { Card, Avatar } from '@/components/ui'
import { useAuthStore } from '@/store'
import { cn } from '@/utils/cn'
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Bell,
  Settings,
  CreditCard,
  LogOut,
} from 'lucide-react'

const navigation = [
  { name: 'حسابي', href: '/account', icon: User },
  { name: 'طلباتي', href: '/account/orders', icon: ShoppingBag },
  { name: 'المفضلة', href: '/account/wishlist', icon: Heart },
  { name: 'العناوين', href: '/account/addresses', icon: MapPin },
  { name: 'الإشعارات', href: '/account/notifications', icon: Bell },
  { name: 'طرق الدفع', href: '/account/payment-methods', icon: CreditCard },
  { name: 'الإعدادات', href: '/account/settings', icon: Settings },
]

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-8 dark:bg-gray-900">
        <div className="container-custom">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Sidebar */}
            <Card className="h-fit w-full p-6 lg:w-64">
              {/* Profile */}
              <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-6 dark:border-gray-700">
                <Avatar
                  src={user?.photoURL}
                  fallback={user?.displayName || 'User'}
                  size="lg"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.displayName || 'المستخدم'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav>
                <ul className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                  <li>
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="h-5 w-5" />
                      تسجيل الخروج
                    </button>
                  </li>
                </ul>
              </nav>
            </Card>

            {/* Content */}
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
