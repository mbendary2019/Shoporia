'use client'

import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import {
  RotateCcw,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Truck,
  CreditCard,
} from 'lucide-react'

const steps = [
  {
    step: 1,
    icon: Package,
    title: 'قدم طلب الإرجاع',
    description: 'من صفحة طلباتي',
  },
  {
    step: 2,
    icon: Truck,
    title: 'شحن المنتج',
    description: 'مندوبنا سيستلم المنتج',
  },
  {
    step: 3,
    icon: CheckCircle,
    title: 'فحص المنتج',
    description: 'التحقق من الحالة',
  },
  {
    step: 4,
    icon: CreditCard,
    title: 'استرداد المبلغ',
    description: 'خلال 7-14 يوم عمل',
  },
]

const eligibleItems = [
  'المنتجات في حالتها الأصلية مع جميع الملحقات',
  'المنتجات بعبوتها الأصلية غير المفتوحة',
  'المنتجات مع الفاتورة الأصلية',
  'المنتجات خلال 14 يوم من الاستلام',
]

const nonEligibleItems = [
  'المنتجات المستخدمة أو التالفة',
  'الملابس الداخلية ومستحضرات التجميل المفتوحة',
  'المنتجات الرقمية والبرامج',
  'المنتجات المصنوعة حسب الطلب',
  'المنتجات الغذائية وسريعة التلف',
]

export default function ReturnsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-navy py-12">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-amazon-orange flex items-center justify-center mx-auto mb-6">
              <RotateCcw className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              المرتجعات والاستبدال
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              نوفر لك سياسة إرجاع مرنة لضمان رضاك التام
            </p>
          </div>
        </section>

        {/* Return Policy Highlight */}
        <section className="py-6 bg-green-50 dark:bg-green-900/20">
          <div className="container-custom">
            <div className="flex items-center justify-center gap-4 text-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div>
                <span className="text-2xl font-bold text-green-600">14 يوم</span>
                <span className="text-gray-700 dark:text-gray-300 mr-2">
                  فترة الإرجاع المجانية
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              خطوات الإرجاع
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step) => (
                <Card key={step.step} className="p-6 text-center">
                  <div className="h-14 w-14 rounded-full bg-amazon-orange/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-7 w-7 text-amazon-orange" />
                  </div>
                  <Badge className="mb-2 bg-amazon-orange text-white">
                    الخطوة {step.step}
                  </Badge>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Eligible */}
              <Card className="p-6 border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    المنتجات القابلة للإرجاع
                  </h3>
                </div>
                <ul className="space-y-3">
                  {eligibleItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Not Eligible */}
              <Card className="p-6 border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="h-6 w-6 text-red-600" />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    المنتجات غير القابلة للإرجاع
                  </h3>
                </div>
                <ul className="space-y-3">
                  {nonEligibleItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Refund Info */}
        <section className="py-12">
          <div className="container-custom">
            <Card className="max-w-2xl mx-auto p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-amazon-orange shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    معلومات استرداد المبلغ
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• البطاقات الائتمانية: 7-14 يوم عمل</li>
                    <li>• المحافظ الإلكترونية: 3-5 أيام عمل</li>
                    <li>• رصيد Shoporia: فوري</li>
                    <li>• الدفع عند الاستلام: تحويل بنكي خلال 7 أيام</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-custom text-center">
            <Link href="/account/orders">
              <Button className="bg-amazon-orange hover:bg-amazon-orangeHover">
                <RotateCcw className="h-5 w-5 ml-2" />
                ابدأ طلب إرجاع
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
