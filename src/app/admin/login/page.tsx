'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase/config'
import { useAuthStore } from '@/store'
import { Card, Button, Input } from '@/components/ui'
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react'
import type { User } from '@/types'

export default function AdminLoginPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      // Check if user has admin role in Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))

      if (userDoc.exists() && userDoc.data().role === 'admin') {
        const userData = userDoc.data()
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: userData.displayName || firebaseUser.displayName || '',
          photoURL: userData.photoURL || firebaseUser.photoURL || undefined,
          role: userData.role,
          isVerified: userData.isVerified ?? false,
          createdAt: userData.createdAt?.toDate?.() || new Date(),
          updatedAt: userData.updatedAt?.toDate?.() || new Date(),
          phone: userData.phone,
          storeId: userData.storeId,
          addresses: userData.addresses,
          wishlist: userData.wishlist,
        }
        setUser(user)
        router.push('/admin')
      } else {
        // Not an admin - sign out and show error
        await signOut(auth)
        setError('ليس لديك صلاحيات الوصول للوحة الإدارة')
      }
    } catch (err: unknown) {
      const firebaseError = err as { code?: string }
      if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password' || firebaseError.code === 'auth/invalid-credential') {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      } else if (firebaseError.code === 'auth/too-many-requests') {
        setError('تم تجاوز عدد المحاولات المسموح. حاول لاحقاً')
      } else {
        setError('حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى')
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-red-500 text-white mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Shoporia
            <span className="ms-2 rounded bg-red-500 px-2 py-1 text-sm">
              Admin
            </span>
          </h1>
          <p className="mt-2 text-gray-400">لوحة تحكم الإدارة</p>
        </div>

        {/* Login Card */}
        <Card className="p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">
            تسجيل الدخول
          </h2>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="admin@shoporia.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                label="كلمة المرور"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  جاري التحقق...
                </span>
              ) : (
                'دخول'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              العودة للموقع الرئيسي
            </Link>
          </div>
        </Card>

        {/* Demo credentials only in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 rounded-lg bg-gray-800/50 p-4 text-center">
            <p className="text-sm text-gray-400 mb-2">بيانات الدخول التجريبية (تطوير فقط):</p>
            <p className="text-sm text-gray-300">
              <span className="text-gray-500">الإيميل:</span> admin@shoporia.app
            </p>
            <p className="text-sm text-gray-300">
              <span className="text-gray-500">كلمة المرور:</span> Admin@123
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
