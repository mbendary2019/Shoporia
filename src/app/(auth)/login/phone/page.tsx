'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button, Input } from '@/components/ui'
import { Phone, ArrowLeft, Shield } from 'lucide-react'

export default function PhoneLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const t = useTranslations('auth')

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) {
      setError(t('verifyPhone'))
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      // Phone auth requires reCAPTCHA setup
      // For now, show a message that this feature is coming soon
      setError(t('loginWithPhone'))
    } catch {
      setError(t('verifyPhone'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp.trim()) {
      setError(t('enterOtp'))
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      // Verify OTP logic here
    } catch {
      setError(t('enterOtp'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToLogin')}
        </Link>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {step === 'phone' ? t('loginWithPhone') : t('enterOtp')}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {step === 'phone'
            ? t('verifyPhone')
            : `${t('resendOtp')} ${phone}`}
        </p>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {step === 'phone' ? (
        <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
          <Input
            label={t('phone')}
            type="tel"
            placeholder="01xxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="h-5 w-5" />}
            dir="ltr"
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            {t('resendOtp')}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
          <Input
            label={t('enterOtp')}
            type="text"
            placeholder="xxxxxx"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            leftIcon={<Shield className="h-5 w-5" />}
            maxLength={6}
            dir="ltr"
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            {t('verifyPhone')}
          </Button>

          <button
            type="button"
            onClick={() => setStep('phone')}
            className="w-full text-sm text-primary-500 hover:text-primary-600"
          >
            {t('phone')}
          </button>
        </form>
      )}

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          {t('noAccount')}{' '}
          <Link href="/register" className="text-primary-500 hover:text-primary-600">
            {t('createAccount')}
          </Link>
        </p>
      </div>
    </>
  )
}
