'use client'

import Link from 'next/link'
import { Header, Footer } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Heart,
  Zap,
  Coffee,
  GraduationCap,
  ArrowLeft,
} from 'lucide-react'

const jobs = [
  {
    id: 1,
    title: 'مهندس برمجيات Senior',
    department: 'الهندسة',
    location: 'القاهرة',
    type: 'دوام كامل',
    experience: '5+ سنوات',
  },
  {
    id: 2,
    title: 'مصمم UI/UX',
    department: 'التصميم',
    location: 'القاهرة',
    type: 'دوام كامل',
    experience: '3+ سنوات',
  },
  {
    id: 3,
    title: 'مدير منتج',
    department: 'المنتجات',
    location: 'القاهرة',
    type: 'دوام كامل',
    experience: '4+ سنوات',
  },
  {
    id: 4,
    title: 'أخصائي تسويق رقمي',
    department: 'التسويق',
    location: 'عن بعد',
    type: 'دوام كامل',
    experience: '2+ سنوات',
  },
  {
    id: 5,
    title: 'محلل بيانات',
    department: 'البيانات',
    location: 'القاهرة',
    type: 'دوام كامل',
    experience: '2+ سنوات',
  },
  {
    id: 6,
    title: 'ممثل خدمة عملاء',
    department: 'الدعم',
    location: 'القاهرة',
    type: 'دوام كامل',
    experience: '1+ سنة',
  },
]

const benefits = [
  { icon: Heart, title: 'تأمين صحي شامل', description: 'لك ولعائلتك' },
  { icon: Coffee, title: 'بيئة عمل مرنة', description: 'ساعات عمل مرنة وعمل عن بعد' },
  { icon: GraduationCap, title: 'تطوير مهني', description: 'ميزانية تعليم سنوية' },
  { icon: Zap, title: 'مكافآت أداء', description: 'حوافز ومكافآت دورية' },
]

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-l from-purple-900 to-purple-700 py-16">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              انضم لفريق Shoporia
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              نبحث عن أشخاص موهوبين وشغوفين للانضمام لفريقنا وبناء مستقبل التجارة
              الإلكترونية معاً
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              لماذا Shoporia؟
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="p-6 text-center">
                  <benefit.icon className="h-10 w-10 text-amazon-orange mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
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

        {/* Jobs */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                الوظائف المتاحة
              </h2>
              <Badge className="bg-amazon-orange text-white">
                {jobs.length} وظيفة
              </Badge>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </span>
                        <Badge variant="secondary">{job.experience}</Badge>
                      </div>
                    </div>
                    <Button className="bg-amazon-orange hover:bg-amazon-orangeHover whitespace-nowrap">
                      قدم الآن
                      <ArrowLeft className="h-4 w-4 mr-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12">
          <div className="container-custom text-center">
            <Card className="p-8 bg-gradient-to-l from-amazon-navy to-amazon-navyLight text-white">
              <h2 className="text-2xl font-bold mb-4">
                لم تجد الوظيفة المناسبة؟
              </h2>
              <p className="text-white/70 mb-6">
                أرسل لنا سيرتك الذاتية وسنتواصل معك عند توفر فرصة مناسبة
              </p>
              <Button className="bg-amazon-orange hover:bg-amazon-orangeHover">
                أرسل سيرتك الذاتية
              </Button>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
