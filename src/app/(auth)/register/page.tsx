'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@/components/ui'
import { registerSchema, type RegisterInput } from '@/lib/validations'
import { signUpWithEmail, signInWithGoogle } from '@/services/auth'
import { useAuthStore } from '@/store'
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptTerms: false,
    },
  })

  const onSubmit = async (data: RegisterInput) => {
    try {
      setIsLoading(true)
      setError(null)
      const user = await signUpWithEmail(
        data.email,
        data.password,
        data.displayName,
        data.phone
      )
      setUser(user)
      router.push('/')
    } catch (err: unknown) {
      const error = err as { code?: string }
      if (error.code === 'auth/email-already-in-use') {
        setError('البريد الإلكتروني مستخدم بالفعل')
      } else if (error.code === 'auth/weak-password') {
        setError('كلمة المرور ضعيفة جداً')
      } else {
        setError('حدث خطأ أثناء إنشاء الحساب')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const user = await signInWithGoogle()
      setUser(user)
      router.push('/')
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string }
      console.error('Google Sign-Up Error:', error)
      if (error.code === 'auth/popup-closed-by-user') {
        setError('تم إغلاق نافذة التسجيل')
      } else if (error.code === 'auth/popup-blocked') {
        setError('تم حظر النافذة المنبثقة. يرجى السماح بالنوافذ المنبثقة')
      } else if (error.code === 'auth/operation-not-allowed') {
        setError('التسجيل عبر Google غير مفعّل. يرجى تفعيله في Firebase Console')
      } else if (error.code === 'auth/unauthorized-domain') {
        setError('هذا الموقع غير مصرح له. يرجى إضافته في Firebase Console')
      } else {
        setError('حدث خطأ أثناء التسجيل بحساب Google. يرجى التأكد من تفعيل Google Sign-In في Firebase')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          إنشاء حساب جديد
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          لديك حساب بالفعل؟{' '}
          <Link
            href="/login"
            className="font-medium text-primary-500 hover:text-primary-600"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Input
          label="الاسم الكامل"
          type="text"
          placeholder="أحمد محمد"
          leftIcon={<User className="h-5 w-5" />}
          error={errors.displayName?.message}
          {...register('displayName')}
        />

        <Input
          label="البريد الإلكتروني"
          type="email"
          placeholder="example@email.com"
          leftIcon={<Mail className="h-5 w-5" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="رقم الهاتف (اختياري)"
          type="tel"
          placeholder="01xxxxxxxxx"
          leftIcon={<Phone className="h-5 w-5" />}
          error={errors.phone?.message}
          {...register('phone')}
        />

        <Input
          label="كلمة المرور"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<Lock className="h-5 w-5" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          }
          error={errors.password?.message}
          {...register('password')}
        />

        <Input
          label="تأكيد كلمة المرور"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<Lock className="h-5 w-5" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-400 hover:text-gray-500"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          }
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="acceptTerms"
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            {...register('acceptTerms')}
          />
          <label
            htmlFor="acceptTerms"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            أوافق على{' '}
            <Link
              href="/terms"
              className="text-primary-500 hover:text-primary-600"
            >
              الشروط والأحكام
            </Link>{' '}
            و{' '}
            <Link
              href="/privacy"
              className="text-primary-500 hover:text-primary-600"
            >
              سياسة الخصوصية
            </Link>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
        )}

        <Button type="submit" className="w-full" isLoading={isLoading}>
          إنشاء حساب
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              أو
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            التسجيل بحساب Google
          </Button>
        </div>
      </div>
    </>
  )
}
