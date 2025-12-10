'use client'

import { Header, Footer } from '@/components/layout'
import { Card, Badge } from '@/components/ui'
import { Cookie, Settings, BarChart3, Target, Shield } from 'lucide-react'

const cookieTypes = [
  {
    icon: Shield,
    name: 'ملفات الضرورية',
    description: 'ضرورية لعمل الموقع بشكل صحيح، مثل تسجيل الدخول والسلة',
    canDisable: false,
    examples: ['session_id', 'auth_token', 'cart_items'],
  },
  {
    icon: Settings,
    name: 'ملفات التفضيلات',
    description: 'تحفظ تفضيلاتك مثل اللغة والموقع والوضع الليلي',
    canDisable: true,
    examples: ['language', 'theme', 'currency'],
  },
  {
    icon: BarChart3,
    name: 'ملفات التحليلات',
    description: 'تساعدنا في فهم كيفية استخدامك للموقع لتحسين الخدمة',
    canDisable: true,
    examples: ['_ga', '_gid', 'analytics_session'],
  },
  {
    icon: Target,
    name: 'ملفات الإعلانات',
    description: 'تُستخدم لعرض إعلانات مناسبة لاهتماماتك',
    canDisable: true,
    examples: ['_fbp', 'ads_id', 'remarketing'],
  },
]

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-navy py-12">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-amazon-orange flex items-center justify-center mx-auto mb-6">
              <Cookie className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              إشعار الكوكيز
            </h1>
            <p className="text-white/70">
              آخر تحديث: 10 ديسمبر 2024
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12">
          <div className="container-custom">
            <Card className="max-w-4xl mx-auto p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                ما هي ملفات تعريف الارتباط (Cookies)؟
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقعنا.
                تساعدنا هذه الملفات في تقديم تجربة أفضل وأكثر تخصيصاً لك.
              </p>
            </Card>
          </div>
        </section>

        {/* Cookie Types */}
        <section className="py-8">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              أنواع الكوكيز التي نستخدمها
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {cookieTypes.map((type) => (
                <Card key={type.name} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-amazon-orange/10 flex items-center justify-center shrink-0">
                      <type.icon className="h-6 w-6 text-amazon-orange" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {type.name}
                        </h3>
                        {!type.canDisable ? (
                          <Badge className="bg-gray-200 text-gray-700">مطلوبة</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700">اختيارية</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {type.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {type.examples.map((example) => (
                          <span
                            key={example}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400 font-mono"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Management */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <Card className="max-w-4xl mx-auto p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                إدارة تفضيلات الكوكيز
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                يمكنك التحكم في الكوكيز بعدة طرق:
              </p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-amazon-orange font-bold">1.</span>
                  <span>
                    <strong>إعدادات المتصفح:</strong> يمكنك ضبط متصفحك لرفض أو حذف الكوكيز.
                    لكن هذا قد يؤثر على بعض وظائف الموقع.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amazon-orange font-bold">2.</span>
                  <span>
                    <strong>إعدادات الموقع:</strong> نوفر خيارات للتحكم في الكوكيز الاختيارية
                    من خلال شريط إعدادات الخصوصية.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amazon-orange font-bold">3.</span>
                  <span>
                    <strong>أدوات الطرف الثالث:</strong> بعض المتصفحات والإضافات توفر
                    أدوات متقدمة لإدارة الكوكيز.
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Third Party */}
        <section className="py-12">
          <div className="container-custom">
            <Card className="max-w-4xl mx-auto p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                كوكيز الطرف الثالث
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                نستخدم خدمات من أطراف ثالثة قد تضع كوكيز على جهازك:
              </p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Google Analytics - للتحليلات</li>
                <li>• Facebook Pixel - للإعلانات</li>
                <li>• Hotjar - لتحليل تجربة المستخدم</li>
                <li>• Intercom - لخدمة العملاء</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                لكل من هذه الخدمات سياسات خصوصية خاصة بها. ننصحك بمراجعتها.
              </p>
            </Card>
          </div>
        </section>

        {/* Contact */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-custom text-center">
            <p className="text-gray-600 dark:text-gray-400">
              للاستفسارات حول الكوكيز، تواصل معنا على:
              <a href="mailto:privacy@shoporia.com" className="text-amazon-orange hover:underline mr-1">
                privacy@shoporia.com
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
