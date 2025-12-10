'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components/ui'
import { Phone, ArrowLeft, Shield } from 'lucide-react'

export default function PhoneLoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) {
      setError('يرجى إدخال رقم الهاتف')
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      // Phone auth requires reCAPTCHA setup
      // For now, show a message that this feature is coming soon
      setError('تسجيل الدخول برقم الهاتف قريباً. يرجى استخدام البريد الإلكتروني أو Google.')
    } catch {
      setError('حدث خطأ. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp.trim()) {
      setError('يرجى إدخال رمز التحقق')
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      // Verify OTP logic here
    } catch {
      setError('رمز التحقق غير صحيح')
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
          العودة لتسجيل الدخول
        </Link>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {step === 'phone' ? 'الدخول برقم الهاتف' : 'أدخل رمز التحقق'}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {step === 'phone'
            ? 'سنرسل لك رمز تحقق عبر رسالة نصية'
            : `تم إرسال رمز التحقق إلى ${phone}`}
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
            label="رقم الهاتف"
            type="tel"
            placeholder="01xxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="h-5 w-5" />}
            dir="ltr"
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            إرسال رمز التحقق
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
          <Input
            label="رمز التحقق"
            type="text"
            placeholder="xxxxxx"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            leftIcon={<Shield className="h-5 w-5" />}
            maxLength={6}
            dir="ltr"
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            تأكيد
          </Button>

          <button
            type="button"
            onClick={() => setStep('phone')}
            className="w-full text-sm text-primary-500 hover:text-primary-600"
          >
            تغيير رقم الهاتف
          </button>
        </form>
      )}

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          ليس لديك حساب؟{' '}
          <Link href="/register" className="text-primary-500 hover:text-primary-600">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </>
  )
}
