'use client'

import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Input, Textarea } from '@/components/ui'
import {
  Headphones,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  HelpCircle,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  Shield,
} from 'lucide-react'

const faqs = [
  {
    icon: Package,
    question: 'كيف أتتبع طلبي؟',
    answer: 'يمكنك تتبع طلبك من خلال صفحة "طلباتي" في حسابك، أو من خلال رابط التتبع المرسل لك عبر البريد الإلكتروني.',
  },
  {
    icon: CreditCard,
    question: 'ما هي طرق الدفع المتاحة؟',
    answer: 'نوفر الدفع عند الاستلام، فودافون كاش، انستاباي، والبطاقات الائتمانية.',
  },
  {
    icon: Truck,
    question: 'كم تستغرق عملية التوصيل؟',
    answer: 'التوصيل يستغرق من 2-5 أيام عمل حسب موقعك. خدمة Prime توفر توصيل في اليوم التالي.',
  },
  {
    icon: RotateCcw,
    question: 'ما هي سياسة الإرجاع؟',
    answer: 'يمكنك إرجاع المنتج خلال 14 يوم من الاستلام بحالته الأصلية مع الفاتورة.',
  },
  {
    icon: Shield,
    question: 'هل المنتجات أصلية؟',
    answer: 'نعم، جميع منتجاتنا أصلية 100% ومضمونة من البائعين المعتمدين.',
  },
  {
    icon: HelpCircle,
    question: 'كيف أصبح بائعاً؟',
    answer: 'يمكنك التسجيل كبائع من خلال صفحة "بيع على Shoporia" وإنشاء متجرك مجاناً.',
  },
]

export default function SupportPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-navy py-12">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-amazon-orange flex items-center justify-center mx-auto mb-6">
              <Headphones className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              خدمة العملاء
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              نحن هنا لمساعدتك! تواصل معنا بأي طريقة تناسبك
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  واتساب
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  تواصل معنا مباشرة عبر واتساب
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  ابدأ المحادثة
                </Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  اتصل بنا
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  19999 - متاح 24/7
                </p>
                <Button variant="outline">
                  اتصل الآن
                </Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-full bg-amazon-orange/20 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-amazon-orange" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  البريد الإلكتروني
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  support@shoporia.app
                </p>
                <Button variant="outline">
                  أرسل رسالة
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              الأسئلة الشائعة
            </h2>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-amazon-orange/10 flex items-center justify-center shrink-0">
                      <faq.icon className="h-6 w-6 text-amazon-orange" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-12">
          <div className="container-custom">
            <Card className="max-w-2xl mx-auto p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
                أرسل لنا رسالة
              </h2>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="الاسم" placeholder="أدخل اسمك" />
                  <Input label="البريد الإلكتروني" type="email" placeholder="example@email.com" />
                </div>
                <Input label="الموضوع" placeholder="موضوع الرسالة" />
                <Textarea
                  label="الرسالة"
                  placeholder="اكتب رسالتك هنا..."
                  rows={5}
                />
                <Button className="w-full bg-amazon-orange hover:bg-amazon-orangeHover">
                  إرسال الرسالة
                </Button>
              </form>
            </Card>
          </div>
        </section>

        {/* Info */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <MapPin className="h-6 w-6 text-amazon-orange" />
                <span className="text-gray-600 dark:text-gray-400">
                  القاهرة، مصر
                </span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="h-6 w-6 text-amazon-orange" />
                <span className="text-gray-600 dark:text-gray-400">
                  متاحون 24/7
                </span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone className="h-6 w-6 text-amazon-orange" />
                <span className="text-gray-600 dark:text-gray-400">
                  19999
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
