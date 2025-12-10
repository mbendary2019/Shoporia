import Link from 'next/link'
import { Store } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-white">
              <Store className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Shoporia
            </span>
          </Link>

          {/* Form Content */}
          <div className="mt-8">{children}</div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
          <div className="flex h-full flex-col items-center justify-center p-12 text-white">
            <h2 className="text-4xl font-bold">مرحباً بك في Shoporia</h2>
            <p className="mt-4 max-w-md text-center text-lg text-white/90">
              منصة التجارة الإلكترونية الذكية التي تمكّنك من بناء متجرك وإدارة
              أعمالك بسهولة
            </p>
            <div className="mt-12 grid grid-cols-2 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold">10,000+</div>
                <div className="mt-1 text-white/80">متجر نشط</div>
              </div>
              <div>
                <div className="text-4xl font-bold">1M+</div>
                <div className="mt-1 text-white/80">عميل سعيد</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
