'use client'

import { Header, Footer } from '@/components/layout'
import { Card, Button } from '@/components/ui'
import {
  CreditCard,
  Gift,
  Shield,
  Percent,
  Clock,
  CheckCircle,
  Star,
} from 'lucide-react'

const benefits = [
  {
    icon: Percent,
    title: 'كاش باك 5%',
    description: 'احصل على كاش باك 5% على جميع مشترياتك من Shoporia',
  },
  {
    icon: Gift,
    title: 'نقاط مكافآت',
    description: 'اكسب نقاط على كل عملية شراء واستبدلها بخصومات',
  },
  {
    icon: Clock,
    title: 'تقسيط بدون فوائد',
    description: 'قسط مشترياتك على 12 شهر بدون فوائد',
  },
  {
    icon: Shield,
    title: 'حماية المشتريات',
    description: 'تأمين شامل على جميع مشترياتك لمدة 90 يوم',
  },
]

const features = [
  'رسوم سنوية صفر في السنة الأولى',
  'حد ائتماني يصل إلى 100,000 جنيه',
  'قبول عالمي في أكثر من 200 دولة',
  'إشعارات فورية لكل معاملة',
  'تحكم كامل من التطبيق',
  'خدمة عملاء 24/7',
]

export default function CreditCardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-l from-amazon-navy to-blue-900 py-16">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  بطاقة Shoporia الائتمانية
                </h1>
                <p className="text-white/70 text-lg mb-6">
                  استمتع بمزايا حصرية وكاش باك على كل مشترياتك
                </p>
                <Button className="bg-amazon-orange hover:bg-amazon-orangeHover text-lg px-8 py-3">
                  قدم الآن
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="relative w-80 h-48 bg-gradient-to-br from-amazon-orange to-orange-600 rounded-2xl shadow-2xl p-6">
                  <div className="absolute top-4 end-4">
                    <CreditCard className="h-8 w-8 text-white/80" />
                  </div>
                  <div className="absolute bottom-6 start-6">
                    <div className="text-white/80 text-sm mb-1">SHOPORIA</div>
                    <div className="text-white font-mono text-lg tracking-widest">
                      •••• •••• •••• 1234
                    </div>
                  </div>
                  <div className="absolute bottom-6 end-6 text-white text-sm">
                    VISA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              مزايا البطاقة
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="p-6 text-center">
                  <benefit.icon className="h-12 w-12 text-amazon-orange mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {benefit.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                مميزات إضافية
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12">
          <div className="container-custom text-center">
            <Card className="max-w-xl mx-auto p-8 bg-gradient-to-l from-amazon-orange to-orange-500 text-white">
              <Star className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">احصل على بطاقتك الآن</h2>
              <p className="text-white/80 mb-6">
                تقديم سهل وسريع - الموافقة خلال دقائق
              </p>
              <Button className="bg-white text-amazon-orange hover:bg-gray-100">
                ابدأ التقديم
              </Button>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
