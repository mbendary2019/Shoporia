'use client'

import { Header, Footer } from '@/components/layout'
import { Card, Button } from '@/components/ui'
import {
  Wallet,
  Smartphone,
  Shield,
  Zap,
  QrCode,
  CreditCard,
  ArrowLeftRight,
  CheckCircle,
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'دفع فوري',
    description: 'أتمم عمليات الدفع في ثوانٍ معدودة',
  },
  {
    icon: Shield,
    title: 'أمان تام',
    description: 'تشفير متقدم لحماية بياناتك المالية',
  },
  {
    icon: QrCode,
    title: 'مسح QR',
    description: 'ادفع بمسح رمز QR في المتاجر',
  },
  {
    icon: ArrowLeftRight,
    title: 'تحويلات فورية',
    description: 'حوّل الأموال لأصدقائك مجاناً',
  },
]

const paymentMethods = [
  'فودافون كاش',
  'اورنج كاش',
  'اتصالات كاش',
  'انستاباي',
  'فوري',
  'البطاقات البنكية',
]

export default function PayPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-l from-green-900 to-green-700 py-16">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
                    <Wallet className="h-8 w-8" />
                  </div>
                  <span className="text-2xl font-bold">Shoporia Pay</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  محفظتك الرقمية الذكية
                </h1>
                <p className="text-white/70 text-lg mb-6">
                  ادفع واستلم الأموال بسهولة وأمان من أي مكان
                </p>
                <div className="flex gap-4">
                  <Button className="bg-white text-green-700 hover:bg-gray-100">
                    <Smartphone className="h-5 w-5 ml-2" />
                    حمّل التطبيق
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-b from-green-600 to-green-800 rounded-[2.5rem] flex flex-col items-center justify-center p-6">
                      <Wallet className="h-16 w-16 text-white mb-4" />
                      <div className="text-white text-center">
                        <div className="text-sm text-white/70">رصيدك</div>
                        <div className="text-3xl font-bold">5,250 ج.م</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid md:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              طرق الشحن المتاحة
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-full"
                >
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">{method}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              كيف تبدأ
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { step: '1', title: 'حمّل التطبيق', desc: 'متوفر على iOS و Android' },
                { step: '2', title: 'أنشئ حسابك', desc: 'التسجيل يستغرق دقيقة واحدة' },
                { step: '3', title: 'ابدأ الدفع', desc: 'استمتع بتجربة دفع سلسة' },
              ].map((item) => (
                <Card key={item.step} className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-green-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
