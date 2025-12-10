'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@/components/ui'
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations'
import { resetPassword } from '@/services/auth'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      setIsLoading(true)
      setError(null)
      await resetPassword(data.email)
      setIsSuccess(true)
    } catch {
      setError('حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
          تم إرسال الرابط
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق
          من صندوق الوارد.
        </p>
        <Link href="/login">
          <Button className="mt-6">العودة لتسجيل الدخول</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <Link
        href="/login"
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400"
      >
        <ArrowRight className="h-4 w-4" />
        العودة لتسجيل الدخول
      </Link>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          نسيت كلمة المرور؟
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور
        </p>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Input
          label="البريد الإلكتروني"
          type="email"
          placeholder="example@email.com"
          leftIcon={<Mail className="h-5 w-5" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          إرسال رابط إعادة التعيين
        </Button>
      </form>
    </>
  )
}
