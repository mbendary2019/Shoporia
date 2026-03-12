'use client'

import { Header, Footer } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import {
  Calculator,
  CreditCard,
  Clock,
  CheckCircle,
  Percent,
  Shield,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

const plans = [
  {
    months: 3,
    interest: 0,
    minAmount: 500,
    badge: 'الأكثر شيوعاً',
  },
  {
    months: 6,
    interest: 0,
    minAmount: 1000,
    badge: null,
  },
  {
    months: 12,
    interest: 5,
    minAmount: 2000,
    badge: null,
  },
  {
    months: 24,
    interest: 10,
    minAmount: 5000,
    badge: 'للمشتريات الكبيرة',
  },
]

const partners = [
  'بنك الكويت الوطني',
  'بيت التمويل الكويتي',
  'بنك بوبيان',
  'بنك الخليج',
  'بنك برقان',
  'البنك الأهلي المتحد',
  'البنك التجاري الكويتي',
  'بنك وربة',
]

export default function InstallmentsPage() {
  const t = useTranslations('pages.installments')

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-l from-purple-900 to-purple-700 py-16">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Calculator className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="py-12 -mt-8">
          <div className="container-custom">
            <div className="grid md:grid-cols-4 gap-4">
              {plans.map((plan) => (
                <Card key={plan.months} className="p-6 text-center relative">
                  {plan.badge && (
                    <Badge className="absolute -top-3 start-1/2 -translate-x-1/2 bg-amazon-orange text-white whitespace-nowrap">
                      {plan.badge}
                    </Badge>
                  )}
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {plan.months}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 mb-4">{t('month')}</div>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {plan.interest === 0 ? (
                      <Badge className="bg-green-100 text-green-700">{t('noInterest')}</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-700">{plan.interest}% {t('interest')}</Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t('minimumAmount')}: {plan.minAmount} د.ك
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              {t('howItWorks')}
            </h2>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: CreditCard, title: 'اختر منتجك', desc: 'تصفح وأضف للسلة' },
                { icon: Calculator, title: 'اختر خطة التقسيط', desc: 'حسب عدد الأشهر' },
                { icon: CheckCircle, title: 'الموافقة الفورية', desc: 'خلال دقائق' },
                { icon: Clock, title: 'ادفع بالتقسيط', desc: 'أقساط شهرية مريحة' },
              ].map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                    <step.icon className="h-7 w-7 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-12">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {t('partners')}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {partners.map((partner) => (
                <div
                  key={partner}
                  className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-700 dark:text-gray-300"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="p-6 text-center">
                <Percent className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {t('noDownPayment')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('inMostPlans')}
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Shield className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {t('instantApproval')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('noComplexPapers')}
                </p>
              </Card>
              <Card className="p-6 text-center">
                <CheckCircle className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {t('transparentFees')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t('noHiddenFees')}
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
