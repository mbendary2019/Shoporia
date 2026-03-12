'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Button, Input } from '@/components/ui'
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations'
import { resetPassword } from '@/services/auth'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const t = useTranslations('auth')
  const tErrors = useTranslations('errors')

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
      setError(tErrors('resetPasswordError'))
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
          {t('resetLinkSent')}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t('resetLinkSentDescription')}
        </p>
        <Link href="/login">
          <Button className="mt-6">{t('backToLogin')}</Button>
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
        {t('backToLogin')}
      </Link>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('forgotPasswordTitle')}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {t('forgotPasswordDescription')}
        </p>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <Input
          label={t('email')}
          type="email"
          placeholder="example@email.com"
          leftIcon={<Mail className="h-5 w-5" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          {t('sendResetLink')}
        </Button>
      </form>
    </>
  )
}
