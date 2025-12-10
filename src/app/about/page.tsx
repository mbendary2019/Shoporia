'use client'

import { Header, Footer } from '@/components/layout'
import { Card } from '@/components/ui'
import {
  Store,
  Users,
  Globe,
  Award,
  Truck,
  Shield,
  Heart,
  Target,
} from 'lucide-react'

const stats = [
  { label: 'عميل سعيد', value: '1M+', icon: Users },
  { label: 'بائع معتمد', value: '10K+', icon: Store },
  { label: 'منتج متاح', value: '5M+', icon: Globe },
  { label: 'طلب يومي', value: '50K+', icon: Truck },
]

const values = [
  {
    icon: Heart,
    title: 'العميل أولاً',
    description: 'نضع رضا العميل في قلب كل قرار نتخذه. تجربتك معنا هي أولويتنا.',
  },
  {
    icon: Shield,
    title: 'الثقة والأمان',
    description: 'نحمي بياناتك ونضمن لك تجربة تسوق آمنة 100%.',
  },
  {
    icon: Award,
    title: 'الجودة العالية',
    description: 'نختار البائعين بعناية ونضمن جودة المنتجات المعروضة.',
  },
  {
    icon: Target,
    title: 'الابتكار المستمر',
    description: 'نسعى دائماً لتقديم أفضل تجربة تسوق رقمية في المنطقة.',
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-navy py-16">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-amazon-orange flex items-center justify-center mx-auto mb-6">
              <Store className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              من نحن
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Shoporia هي منصة التجارة الإلكترونية الرائدة في مصر والشرق الأوسط،
              نربط بين ملايين العملاء وآلاف البائعين المعتمدين.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 -mt-8">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="p-6 text-center">
                  <stat.icon className="h-10 w-10 text-amazon-orange mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                قصتنا
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                بدأت Shoporia في عام 2024 برؤية واضحة: جعل التسوق الإلكتروني
                متاحاً وسهلاً وموثوقاً للجميع في مصر والعالم العربي.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                اليوم، نفخر بخدمة ملايين العملاء وتمكين آلاف رواد الأعمال والبائعين
                من الوصول لعملائهم بسهولة وفعالية.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                نؤمن بأن التجارة الإلكترونية يجب أن تكون تجربة ممتعة وآمنة،
                ونعمل كل يوم لتحقيق هذا الهدف.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              قيمنا
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="p-6 text-center">
                  <div className="h-14 w-14 rounded-full bg-amazon-orange/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-amazon-orange" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-12 bg-amazon-orange text-white">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-bold mb-4">مهمتنا</h2>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              تمكين الجميع من البيع والشراء بسهولة وأمان، وبناء اقتصاد رقمي
              شامل يدعم رواد الأعمال ويخدم المستهلكين.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
