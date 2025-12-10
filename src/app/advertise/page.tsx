'use client'

import { Header, Footer } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import {
  Megaphone,
  Target,
  BarChart3,
  Users,
  Sparkles,
  TrendingUp,
  Eye,
  MousePointer,
} from 'lucide-react'

const adTypes = [
  {
    icon: Sparkles,
    name: 'المنتجات المميزة',
    description: 'اعرض منتجاتك في أعلى نتائج البحث',
    price: 'من 50 ج.م/يوم',
  },
  {
    icon: Eye,
    name: 'بانر الصفحة الرئيسية',
    description: 'ظهور في البانر الرئيسي للموقع',
    price: 'من 500 ج.م/يوم',
  },
  {
    icon: Target,
    name: 'إعلانات الفئات',
    description: 'اعرض إعلانك في صفحات الفئات',
    price: 'من 100 ج.م/يوم',
  },
  {
    icon: MousePointer,
    name: 'الدفع لكل نقرة',
    description: 'ادفع فقط عند نقر العملاء',
    price: 'من 0.50 ج.م/نقرة',
  },
]

const stats = [
  { value: '1M+', label: 'مستخدم نشط شهرياً' },
  { value: '5M+', label: 'زيارة يومية' },
  { value: '85%', label: 'معدل التحويل' },
  { value: '10x', label: 'العائد على الاستثمار' },
]

export default function AdvertisePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-l from-blue-900 to-blue-700 py-16">
          <div className="container-custom">
            <div className="text-center text-white">
              <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                <Megaphone className="h-10 w-10" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                أعلن على Shoporia
              </h1>
              <p className="text-white/70 max-w-2xl mx-auto text-lg mb-8">
                وصّل منتجاتك لملايين العملاء المستهدفين وزد مبيعاتك
              </p>
              <Button className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-3">
                ابدأ الإعلان الآن
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ad Types */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              أنواع الإعلانات
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {adTypes.map((type) => (
                <Card key={type.name} className="p-6">
                  <type.icon className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {type.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {type.description}
                  </p>
                  <Badge className="bg-blue-100 text-blue-700">{type.price}</Badge>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Advertise */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              لماذا تعلن معنا؟
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  جمهور مستهدف
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  وصول لملايين العملاء المهتمين بالشراء
                </p>
              </Card>
              <Card className="p-6 text-center">
                <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  تحليلات دقيقة
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  تتبع أداء إعلاناتك لحظة بلحظة
                </p>
              </Card>
              <Card className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  نتائج ملموسة
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  زيادة المبيعات والوعي بعلامتك التجارية
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-blue-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-bold mb-4">ابدأ حملتك الإعلانية اليوم</h2>
            <p className="text-white/80 mb-6">
              تواصل مع فريقنا لتصميم حملة مناسبة لميزانيتك وأهدافك
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-white text-blue-700 hover:bg-gray-100">
                تواصل معنا
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                حمّل دليل المعلن
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
