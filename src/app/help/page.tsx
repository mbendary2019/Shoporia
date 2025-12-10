'use client'

import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { Card, Input, Button } from '@/components/ui'
import {
  HelpCircle,
  Search,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  User,
  Store,
  MessageCircle,
  Phone,
  Mail,
  ChevronLeft,
} from 'lucide-react'

const categories = [
  {
    icon: Package,
    title: 'الطلبات',
    description: 'تتبع، إلغاء، تعديل الطلبات',
    href: '/help/orders',
  },
  {
    icon: Truck,
    title: 'الشحن والتوصيل',
    description: 'مواعيد ورسوم التوصيل',
    href: '/help/shipping',
  },
  {
    icon: CreditCard,
    title: 'الدفع',
    description: 'طرق الدفع والفواتير',
    href: '/help/payment',
  },
  {
    icon: RotateCcw,
    title: 'الإرجاع والاستبدال',
    description: 'سياسة الإرجاع والاسترداد',
    href: '/returns',
  },
  {
    icon: User,
    title: 'حسابي',
    description: 'إدارة الحساب والإعدادات',
    href: '/help/account',
  },
  {
    icon: Store,
    title: 'البائعين',
    description: 'كيفية البيع على Shoporia',
    href: '/seller/register',
  },
]

const popularQuestions = [
  {
    question: 'كيف أتتبع طلبي؟',
    answer: 'يمكنك تتبع طلبك من صفحة "طلباتي" أو من خلال رابط التتبع المرسل لبريدك الإلكتروني.',
  },
  {
    question: 'ما هي سياسة الإرجاع؟',
    answer: 'يمكنك إرجاع المنتج خلال 14 يوم من الاستلام بحالته الأصلية مع الفاتورة.',
  },
  {
    question: 'كيف ألغي طلبي؟',
    answer: 'يمكنك إلغاء الطلب من صفحة "طلباتي" قبل شحنه. بعد الشحن يمكنك رفض الاستلام.',
  },
  {
    question: 'ما هي طرق الدفع المتاحة؟',
    answer: 'نوفر الدفع عند الاستلام، فودافون كاش، انستاباي، والبطاقات الائتمانية.',
  },
  {
    question: 'كم تستغرق عملية التوصيل؟',
    answer: 'التوصيل يستغرق من 2-5 أيام عمل حسب موقعك. خدمة Prime توفر توصيل في اليوم التالي.',
  },
]

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-navy py-12">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-amazon-orange flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              مركز المساعدة
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              كيف يمكننا مساعدتك اليوم؟
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Input
                placeholder="ابحث عن سؤالك..."
                className="ps-12 py-4 text-lg"
              />
              <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              تصفح حسب الموضوع
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Link key={category.title} href={category.href}>
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-amazon-orange/10 flex items-center justify-center shrink-0">
                        <category.icon className="h-6 w-6 text-amazon-orange" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {category.description}
                        </p>
                      </div>
                      <ChevronLeft className="h-5 w-5 text-gray-400" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Questions */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              الأسئلة الشائعة
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {popularQuestions.map((faq) => (
                <Card key={faq.question} className="p-4">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </span>
                      <ChevronLeft className="h-5 w-5 text-gray-400 transition-transform group-open:-rotate-90" />
                    </summary>
                    <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
                      {faq.answer}
                    </p>
                  </details>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              تواصل معنا
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="p-6 text-center">
                <MessageCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  واتساب
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  متاح 24/7
                </p>
                <Button className="bg-green-600 hover:bg-green-700 w-full">
                  ابدأ المحادثة
                </Button>
              </Card>

              <Card className="p-6 text-center">
                <Phone className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  اتصل بنا
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  19999
                </p>
                <Button variant="outline" className="w-full">
                  اتصل الآن
                </Button>
              </Card>

              <Card className="p-6 text-center">
                <Mail className="h-10 w-10 text-amazon-orange mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  البريد الإلكتروني
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  الرد خلال 24 ساعة
                </p>
                <Button variant="outline" className="w-full">
                  أرسل رسالة
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
