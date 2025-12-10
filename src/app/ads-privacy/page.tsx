'use client'

import { Header, Footer } from '@/components/layout'
import { Card, Button } from '@/components/ui'
import { Eye, Shield, Settings, Target, XCircle, CheckCircle } from 'lucide-react'

export default function AdsPrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-navy py-12">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-amazon-orange flex items-center justify-center mx-auto mb-6">
              <Target className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              الإعلانات القائمة على الاهتمامات
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              تعرف على كيفية استخدامنا لبياناتك لعرض إعلانات مخصصة وكيفية التحكم في تفضيلاتك
            </p>
          </div>
        </section>

        {/* What is it */}
        <section className="py-12">
          <div className="container-custom">
            <Card className="max-w-4xl mx-auto p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                ما هي الإعلانات المخصصة؟
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                الإعلانات المخصصة (أو القائمة على الاهتمامات) هي إعلانات تُعرض لك بناءً على:
              </p>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <Eye className="h-5 w-5 text-amazon-orange shrink-0 mt-0.5" />
                  <span>المنتجات التي تصفحتها على موقعنا</span>
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="h-5 w-5 text-amazon-orange shrink-0 mt-0.5" />
                  <span>عمليات البحث والفئات التي زرتها</span>
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="h-5 w-5 text-amazon-orange shrink-0 mt-0.5" />
                  <span>مشترياتك السابقة</span>
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="h-5 w-5 text-amazon-orange shrink-0 mt-0.5" />
                  <span>تفاعلاتك مع المنتجات (المفضلة، السلة)</span>
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400">
                الهدف هو عرض منتجات وعروض تناسب اهتماماتك بدلاً من إعلانات عشوائية.
              </p>
            </Card>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              مزايا وعيوب الإعلانات المخصصة
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Benefits */}
              <Card className="p-6 border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    المزايا
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <li>• اكتشاف منتجات تناسب اهتماماتك</li>
                  <li>• عروض وخصومات مخصصة لك</li>
                  <li>• توفير الوقت في البحث</li>
                  <li>• تجربة تسوق أفضل</li>
                </ul>
              </Card>

              {/* Concerns */}
              <Card className="p-6 border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="h-6 w-6 text-red-600" />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    المخاوف
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <li>• جمع بيانات التصفح</li>
                  <li>• تتبع السلوك عبر المواقع</li>
                  <li>• مشاركة البيانات مع شركاء الإعلانات</li>
                  <li>• الشعور بانتهاك الخصوصية</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Your Choices */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              خياراتك
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 text-center">
                <Settings className="h-10 w-10 text-amazon-orange mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  إعدادات الحساب
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  تحكم في تفضيلات الإعلانات من إعدادات حسابك
                </p>
                <Button variant="outline" size="sm">
                  الذهاب للإعدادات
                </Button>
              </Card>

              <Card className="p-6 text-center">
                <Shield className="h-10 w-10 text-amazon-orange mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  إلغاء الاشتراك
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  يمكنك إلغاء الاشتراك في الإعلانات المخصصة
                </p>
                <Button variant="outline" size="sm">
                  إلغاء الاشتراك
                </Button>
              </Card>

              <Card className="p-6 text-center">
                <XCircle className="h-10 w-10 text-amazon-orange mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  حذف البيانات
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  اطلب حذف بيانات التتبع الخاصة بك
                </p>
                <Button variant="outline" size="sm">
                  طلب الحذف
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Note */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800/50">
          <div className="container-custom">
            <Card className="max-w-2xl mx-auto p-6">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-amazon-orange shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    ملاحظة مهمة
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    إلغاء الإعلانات المخصصة لا يعني أنك لن ترى إعلانات. ستظل ترى نفس عدد الإعلانات،
                    لكنها ستكون عامة وغير مرتبطة باهتماماتك.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
