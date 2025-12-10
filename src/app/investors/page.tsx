'use client'

import { Header, Footer } from '@/components/layout'
import { Card, Button } from '@/components/ui'
import {
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  BarChart3,
  FileText,
  Download,
  Mail,
} from 'lucide-react'

const stats = [
  { label: 'حجم المعاملات السنوي', value: '$500M+', icon: DollarSign },
  { label: 'معدل النمو السنوي', value: '150%', icon: TrendingUp },
  { label: 'عدد المستخدمين النشطين', value: '1M+', icon: Users },
  { label: 'الدول المخدومة', value: '5+', icon: Globe },
]

const reports = [
  { title: 'التقرير السنوي 2024', type: 'PDF', size: '2.5 MB' },
  { title: 'البيانات المالية Q3 2024', type: 'PDF', size: '1.2 MB' },
  { title: 'عرض المستثمرين', type: 'PDF', size: '5.8 MB' },
  { title: 'استراتيجية النمو 2025', type: 'PDF', size: '3.1 MB' },
]

export default function InvestorsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-navy py-16">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-amazon-orange flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              علاقات المستثمرين
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              نبني مستقبل التجارة الإلكترونية في منطقة الشرق الأوسط وشمال أفريقيا
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

        {/* Investment Highlights */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              لماذا Shoporia؟
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                  سوق ضخم
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  سوق التجارة الإلكترونية في MENA يتجاوز $50 مليار مع نمو سنوي 25%+
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                  نموذج عمل مثبت
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  هامش ربح قوي مع إيرادات متنوعة من العمولات والإعلانات والخدمات
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                  فريق قيادة قوي
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  فريق من الخبراء بخبرة تتجاوز 50 عاماً في التقنية والتجارة الإلكترونية
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Reports */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              التقارير والمستندات
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {reports.map((report) => (
                <Card key={report.title} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-amazon-orange/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-amazon-orange" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {report.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {report.type} • {report.size}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-custom text-center">
            <Card className="max-w-xl mx-auto p-8">
              <Mail className="h-12 w-12 text-amazon-orange mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                تواصل مع فريق علاقات المستثمرين
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                للاستفسارات والمعلومات الإضافية
              </p>
              <Button className="bg-amazon-orange hover:bg-amazon-orangeHover">
                <Mail className="h-4 w-4 ml-2" />
                investors@shoporia.com
              </Button>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
