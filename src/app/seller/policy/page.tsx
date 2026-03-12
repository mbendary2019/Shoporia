'use client'

import { Header, Footer } from '@/components/layout'
import { Card } from '@/components/ui'
import { ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function SellerPolicyPage() {
  const t = useTranslations('pages.sellerPolicy')

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-navy py-12">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-amazon-orange flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-white/70">
              {t('lastUpdated')}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container-custom">
            <Card className="max-w-4xl mx-auto p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  1. معايير جودة المنتجات
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  تلتزم Shoporia بتقديم تجربة تسوق عالية الجودة. لذلك نطلب من جميع البائعين الالتزام بمعايير الجودة التالية:
                </p>
                <ul className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  <li>• جميع المنتجات يجب أن تكون جديدة وأصلية (ما لم يُذكر خلاف ذلك)</li>
                  <li>• يجب أن تطابق المنتجات الوصف والصور المعروضة</li>
                  <li>• المنتجات يجب أن تكون آمنة ومطابقة لمعايير السلامة المحلية</li>
                  <li>• يجب توفير ضمان المنتج وفقاً للقوانين المعمول بها</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  2. المنتجات المحظورة
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-3">يُحظر بيع المنتجات التالية على المنصة:</p>
                <ul className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  <li>• المنتجات المقلدة أو المزيفة</li>
                  <li>• المواد المحظورة قانونياً</li>
                  <li>• الأسلحة والذخيرة</li>
                  <li>• المواد الخطرة والسامة</li>
                  <li>• الأدوية والمستحضرات الطبية غير المرخصة</li>
                  <li>• المنتجات التي تنتهك حقوق الملكية الفكرية</li>
                  <li>• المحتوى غير اللائق أو المسيء</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  3. سياسة التسعير
                </h2>
                <ul className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  <li>• الأسعار يجب أن تكون عادلة وتنافسية</li>
                  <li>• يُحظر التلاعب بالأسعار أو تضخيمها بشكل مبالغ فيه</li>
                  <li>• يجب أن تشمل الأسعار ضريبة القيمة المضافة إن وُجدت</li>
                  <li>• أي تخفيضات أو عروض يجب أن تكون حقيقية</li>
                  <li>• يُحظر رفع السعر قبل التخفيض لإيهام المشتري بخصم أكبر</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  4. سياسة الصور والوصف
                </h2>
                <ul className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  <li>• يجب استخدام صور حقيقية وعالية الجودة للمنتج</li>
                  <li>• الصورة الرئيسية يجب أن تكون على خلفية بيضاء</li>
                  <li>• يُحظر استخدام صور مضللة أو معدلة بشكل مبالغ فيه</li>
                  <li>• الوصف يجب أن يكون دقيقاً ويشمل جميع التفاصيل المهمة</li>
                  <li>• يجب ذكر أي عيوب أو قيود في المنتج بوضوح</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  5. سياسة المخزون
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  يلتزم البائع بتحديث كميات المخزون بشكل دوري. في حال نفاد منتج، يجب تحديث حالته فوراً. إلغاء الطلبات المتكرر بسبب عدم توفر المخزون يؤثر سلباً على تقييم البائع.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  6. سياسة التعبئة والتغليف
                </h2>
                <ul className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  <li>• يجب تغليف المنتجات بشكل آمن يمنع التلف أثناء الشحن</li>
                  <li>• المنتجات القابلة للكسر تتطلب تغليفاً إضافياً</li>
                  <li>• يُفضل استخدام مواد تغليف صديقة للبيئة</li>
                  <li>• يجب تضمين فاتورة أو إيصال مع كل طلب</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  7. حماية بيانات المشترين
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  يلتزم البائع بحماية بيانات المشترين وعدم استخدامها لأي غرض خارج نطاق إتمام الطلب. يُحظر مشاركة بيانات المشترين مع أطراف ثالثة أو استخدامها لأغراض تسويقية مباشرة.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  8. حل النزاعات
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  في حال وجود نزاع بين البائع والمشتري، تتدخل Shoporia كوسيط لحل النزاع. قرار المنصة في النزاعات يكون نهائياً وملزماً. نسعى دائماً لإيجاد حلول عادلة لجميع الأطراف.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  9. التواصل معنا
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  لأي استفسارات حول سياسة البيع:
                  <br />
                  البريد الإلكتروني: sellers@shoporia.app
                  <br />
                  الهاتف: 19999
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
