'use client'

import { Header, Footer } from '@/components/layout'
import { Card } from '@/components/ui'
import { Scale } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function SellerTermsPage() {
  const t = useTranslations('pages.sellerTerms')

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-navy py-12">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-amazon-orange flex items-center justify-center mx-auto mb-6">
              <Scale className="h-10 w-10 text-white" />
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
                  1. مقدمة
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  هذه الشروط والأحكام تنظم العلاقة بين Shoporia والبائعين المسجلين على المنصة. بتسجيلك كبائع، فإنك توافق على الالتزام بجميع هذه الشروط.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  2. التسجيل كبائع
                </h2>
                <ul className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  <li>• يجب أن تكون شخصاً بالغاً (18 سنة فأكثر) أو كياناً تجارياً مسجلاً</li>
                  <li>• يجب تقديم معلومات صحيحة ودقيقة عن نشاطك التجاري</li>
                  <li>• يجب توفير وثائق الهوية والسجل التجاري عند الطلب</li>
                  <li>• نحتفظ بالحق في رفض أو إلغاء أي حساب بائع</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  3. المنتجات والقوائم
                </h2>
                <ul className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  <li>• يجب أن تكون المنتجات المعروضة قانونية ومطابقة للوصف</li>
                  <li>• يُحظر بيع المنتجات المقلدة أو المسروقة أو المحظورة قانونياً</li>
                  <li>• يجب توفير صور واضحة وأوصاف دقيقة للمنتجات</li>
                  <li>• الأسعار يجب أن تكون شاملة لجميع الرسوم والضرائب المطبقة</li>
                  <li>• نحتفظ بالحق في إزالة أي منتج يخالف سياساتنا</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  4. العمولات والمدفوعات
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  تحتسب Shoporia عمولة على كل عملية بيع تتم عبر المنصة. نسبة العمولة تعتمد على فئة المنتج ويتم الإعلان عنها مسبقاً. يتم تحويل المبالغ المستحقة للبائع وفقاً لجدول الدفع المتفق عليه بعد خصم العمولة والرسوم.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  5. الشحن والتوصيل
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  يلتزم البائع بشحن الطلبات خلال المدة المحددة (عادة 1-3 أيام عمل). يجب استخدام شركات الشحن المعتمدة من المنصة. البائع مسؤول عن تغليف المنتجات بشكل آمن ومناسب.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  6. الإرجاع والاستبدال
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  يلتزم البائع بسياسة الإرجاع الخاصة بالمنصة. يحق للمشتري إرجاع المنتج خلال 14 يوماً إذا كان غير مطابق للوصف أو به عيب. تكاليف الإرجاع في هذه الحالة يتحملها البائع.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  7. خدمة العملاء
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  يلتزم البائع بالرد على استفسارات المشترين خلال 24 ساعة. يجب التعامل مع الشكاوى بمهنية وحلها في أسرع وقت. عدم الاستجابة المتكرر قد يؤدي إلى تعليق الحساب.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  8. تقييم البائعين
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  يتم تقييم البائعين بناءً على جودة المنتجات، سرعة الشحن، خدمة العملاء، ونسبة الإرجاع. البائعون ذوو التقييم المنخفض قد يتعرضون لقيود على حساباتهم.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  9. المخالفات والعقوبات
                </h2>
                <ul className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  <li>• مخالفة هذه الشروط قد تؤدي إلى تحذير، تعليق مؤقت، أو إغلاق الحساب</li>
                  <li>• بيع منتجات مقلدة يؤدي إلى إغلاق فوري للحساب</li>
                  <li>• التلاعب بالتقييمات أو المراجعات محظور</li>
                  <li>• نحتفظ بالحق في حجز المبالغ المستحقة في حال وجود نزاعات</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  10. إنهاء العلاقة
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  يمكن لأي طرف إنهاء هذه الاتفاقية بإشعار مسبق مدته 30 يوماً. عند الإنهاء، يلتزم البائع بإكمال جميع الطلبات المعلقة. المبالغ المستحقة يتم تسويتها خلال 30 يوماً من الإنهاء.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  11. التواصل معنا
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  لأي استفسارات حول شروط البائعين:
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
