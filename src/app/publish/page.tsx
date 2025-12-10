'use client'

import { Header, Footer } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import {
  BookOpen,
  Upload,
  DollarSign,
  Globe,
  Shield,
  Headphones,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react'

const benefits = [
  {
    icon: Globe,
    title: 'وصول عالمي',
    description: 'بيع كتابك لملايين القراء في العالم العربي',
  },
  {
    icon: DollarSign,
    title: 'عوائد مجزية',
    description: 'احصل على 70% من سعر البيع',
  },
  {
    icon: Shield,
    title: 'حماية حقوقك',
    description: 'حماية كاملة لحقوق الملكية الفكرية',
  },
  {
    icon: Headphones,
    title: 'دعم مستمر',
    description: 'فريق متخصص لمساعدتك في النشر',
  },
]

const steps = [
  {
    step: 1,
    title: 'سجّل حساب ناشر',
    description: 'أنشئ حسابك ككاتب/ناشر مجاناً',
  },
  {
    step: 2,
    title: 'ارفع كتابك',
    description: 'ارفع ملف الكتاب والغلاف',
  },
  {
    step: 3,
    title: 'حدد السعر',
    description: 'اختر سعر البيع المناسب',
  },
  {
    step: 4,
    title: 'ابدأ البيع',
    description: 'كتابك متاح للجميع',
  },
]

const formats = [
  { name: 'كتب إلكترونية (PDF, EPUB)', available: true },
  { name: 'كتب مسموعة', available: true },
  { name: 'الطباعة عند الطلب', available: true },
  { name: 'المجلات والدوريات', available: false },
]

export default function PublishPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-l from-purple-900 to-purple-700 py-16">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <Badge className="bg-white/20 text-white mb-4">للكتّاب والناشرين</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  انشر كتابك على Shoporia
                </h1>
                <p className="text-white/70 text-lg mb-6">
                  منصة النشر الذاتي الأولى في العالم العربي. انشر كتابك واصل لملايين القراء
                </p>
                <Button className="bg-white text-purple-700 hover:bg-gray-100 text-lg px-8 py-3">
                  ابدأ النشر مجاناً
                  <ArrowLeft className="h-5 w-5 mr-2" />
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="h-64 w-64 rounded-full bg-white/10 flex items-center justify-center">
                  <BookOpen className="h-32 w-32 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              لماذا تنشر معنا؟
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="p-6 text-center">
                  <benefit.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
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
              كيف تنشر كتابك؟
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="h-14 w-14 rounded-full bg-purple-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
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

        {/* Formats */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              أنواع المحتوى المدعومة
            </h2>
            <div className="max-w-md mx-auto space-y-4">
              {formats.map((format) => (
                <Card key={format.name} className="p-4 flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{format.name}</span>
                  {format.available ? (
                    <Badge className="bg-green-100 text-green-700">متاح</Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-500">قريباً</Badge>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Earnings */}
        <section className="py-12 bg-purple-50 dark:bg-purple-900/20">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              أرباحك معنا
            </h2>
            <div className="text-6xl font-bold text-purple-600 mb-2">70%</div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              من سعر البيع تذهب مباشرة لك
            </p>
            <ul className="inline-block text-start space-y-2">
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-500" />
                بدون رسوم مقدمة
              </li>
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-500" />
                سحب شهري للأرباح
              </li>
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-500" />
                تقارير مفصلة للمبيعات
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-purple-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-bold mb-4">انشر كتابك اليوم</h2>
            <p className="text-white/80 mb-6">
              انضم لآلاف الكتّاب الذين يشاركون إبداعاتهم على منصتنا
            </p>
            <Button className="bg-white text-purple-700 hover:bg-gray-100">
              <Upload className="h-5 w-5 ml-2" />
              ابدأ النشر
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
