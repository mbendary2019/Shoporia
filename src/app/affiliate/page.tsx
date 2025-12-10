'use client'

import { Header, Footer } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import {
  Link2,
  DollarSign,
  Users,
  TrendingUp,
  Gift,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react'

const benefits = [
  {
    icon: DollarSign,
    title: 'عمولات مجزية',
    description: 'احصل على عمولة تصل إلى 10% على كل عملية بيع',
  },
  {
    icon: TrendingUp,
    title: 'تتبع لحظي',
    description: 'لوحة تحكم متكاملة لمتابعة أدائك ومبيعاتك',
  },
  {
    icon: Gift,
    title: 'مكافآت إضافية',
    description: 'مكافآت شهرية للمسوقين المتميزين',
  },
  {
    icon: Users,
    title: 'دعم مستمر',
    description: 'فريق دعم مخصص لمساعدتك على النجاح',
  },
]

const howItWorks = [
  { step: 1, title: 'سجّل مجاناً', description: 'أنشئ حسابك كمسوق بالعمولة' },
  { step: 2, title: 'احصل على رابطك', description: 'روابط فريدة لكل منتج' },
  { step: 3, title: 'شارك وكسب', description: 'شارك الروابط واكسب على كل بيع' },
  { step: 4, title: 'استلم أرباحك', description: 'سحب شهري لأرباحك' },
]

const commissionRates = [
  { category: 'الإلكترونيات', rate: '5%' },
  { category: 'الأزياء', rate: '10%' },
  { category: 'المنزل والحديقة', rate: '8%' },
  { category: 'الجمال والعناية', rate: '12%' },
  { category: 'الكتب والوسائط', rate: '6%' },
  { category: 'الألعاب', rate: '7%' },
]

export default function AffiliatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-l from-green-900 to-green-700 py-16">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <Badge className="bg-white/20 text-white mb-4">برنامج الأفلييت</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  اربح المال مع Shoporia
                </h1>
                <p className="text-white/70 text-lg mb-6">
                  انضم لآلاف المسوقين الناجحين واكسب عمولات على كل عملية بيع تتم من خلالك
                </p>
                <Button className="bg-white text-green-700 hover:bg-gray-100 text-lg px-8 py-3">
                  ابدأ الآن مجاناً
                  <ArrowLeft className="h-5 w-5 mr-2" />
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="h-64 w-64 rounded-full bg-white/10 flex items-center justify-center">
                  <Link2 className="h-32 w-32 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              لماذا تنضم لبرنامجنا؟
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="p-6 text-center">
                  <benefit.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
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

        {/* How it works */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              كيف يعمل البرنامج؟
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {howItWorks.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="h-14 w-14 rounded-full bg-green-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commission Rates */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              نسب العمولات
            </h2>
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {commissionRates.map((rate) => (
                <Card key={rate.category} className="p-4 flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{rate.category}</span>
                  <Badge className="bg-green-100 text-green-700 text-lg">{rate.rate}</Badge>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-green-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-bold mb-4">مستعد للبدء؟</h2>
            <p className="text-white/80 mb-6">انضم الآن مجاناً وابدأ في كسب العمولات</p>
            <Button className="bg-white text-green-700 hover:bg-gray-100">
              سجّل الآن
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
