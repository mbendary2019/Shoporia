'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Input, Textarea, Modal } from '@/components/ui'
import { useAuthStore } from '@/store/auth-store'
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
  Send,
  CheckCircle,
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
  const { user, isAuthenticated } = useAuthStore()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Pre-fill user data when modal opens
  useEffect(() => {
    if (isContactModalOpen && isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }))
    }
  }, [isContactModalOpen, isAuthenticated, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset after showing success
    setTimeout(() => {
      setIsContactModalOpen(false)
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 2000)
  }

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
                <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-600 hover:bg-green-700 w-full">
                    ابدأ المحادثة
                  </Button>
                </a>
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
                <a href="tel:19999">
                  <Button variant="outline" className="w-full">
                    اتصل الآن
                  </Button>
                </a>
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
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsContactModalOpen(true)}
                >
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

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="تواصل معنا"
        description="أرسل لنا رسالتك وسنرد عليك في أقرب وقت"
        size="lg"
      >
        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              تم إرسال رسالتك بنجاح!
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              سنتواصل معك في أقرب وقت ممكن
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Info Notice */}
            {isAuthenticated && user && (
              <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
                تم ملء بياناتك تلقائياً من حسابك
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="الاسم"
                placeholder="أدخل اسمك"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isAuthenticated && !!user?.name}
              />
              <Input
                label="البريد الإلكتروني"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isAuthenticated && !!user?.email}
              />
            </div>

            <Input
              label="الموضوع"
              placeholder="موضوع الرسالة"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />

            <Textarea
              label="الرسالة"
              placeholder="اكتب رسالتك هنا..."
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setIsContactModalOpen(false)}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-amazon-orange hover:bg-amazon-orangeHover"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    جاري الإرسال...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    إرسال الرسالة
                  </span>
                )}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}
