'use client'

import { Header, Footer } from '@/components/layout'
import { Card } from '@/components/ui'
import { FileText, Scale } from 'lucide-react'

export default function TermsPage() {
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
              شروط الاستخدام
            </h1>
            <p className="text-white/70">
              آخر تحديث: 10 ديسمبر 2024
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
                  مرحباً بك في Shoporia. باستخدامك لموقعنا وخدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل استخدام المنصة.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  2. تعريفات
                </h2>
                <ul className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  <li>• "المنصة": موقع Shoporia الإلكتروني وتطبيقات الهاتف المحمول</li>
                  <li>• "المستخدم": أي شخص يستخدم المنصة سواء كمشتري أو بائع</li>
                  <li>• "البائع": المستخدم الذي يعرض منتجات للبيع على المنصة</li>
                  <li>• "المشتري": المستخدم الذي يشتري منتجات من المنصة</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  3. الحساب والتسجيل
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  للاستفادة من خدماتنا، يجب عليك إنشاء حساب وتقديم معلومات صحيحة ودقيقة. أنت مسؤول عن الحفاظ على سرية بيانات حسابك وعن جميع الأنشطة التي تتم من خلاله.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  4. المنتجات والمعاملات
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  تعمل Shoporia كوسيط بين البائعين والمشترين. نحن لا نمتلك المنتجات المعروضة ولسنا طرفاً في عقد البيع بين البائع والمشتري. نحتفظ بالحق في إزالة أي منتج يخالف سياساتنا.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  5. الدفع
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  نوفر عدة طرق للدفع تشمل البطاقات الائتمانية، المحافظ الإلكترونية، والدفع عند الاستلام. جميع المعاملات المالية مشفرة وآمنة.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  6. الشحن والتوصيل
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  مواعيد التوصيل المذكورة تقديرية وقد تختلف حسب الموقع والظروف. نحن غير مسؤولين عن التأخير الناتج عن ظروف خارجة عن إرادتنا.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  7. الإرجاع والاستبدال
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  يحق للمشتري إرجاع المنتج خلال 14 يوماً من الاستلام وفقاً لسياسة الإرجاع الخاصة بنا. بعض المنتجات قد تكون غير قابلة للإرجاع.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  8. حقوق الملكية الفكرية
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  جميع المحتويات على المنصة (شعارات، نصوص، صور، تصاميم) هي ملكية حصرية لـ Shoporia أو مرخصة لها. يُحظر نسخها أو استخدامها دون إذن كتابي.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  9. تحديد المسؤولية
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  نقدم خدماتنا "كما هي" ولا نضمن خلوها من الأخطاء. لن نكون مسؤولين عن أي أضرار غير مباشرة أو عرضية ناتجة عن استخدام المنصة.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  10. تعديل الشروط
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطارك بالتغييرات الجوهرية عبر البريد الإلكتروني أو إشعار على المنصة.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  11. القانون الواجب التطبيق
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  تخضع هذه الشروط لقوانين جمهورية مصر العربية. أي نزاع ينشأ يحل بالتفاوض أولاً، وفي حال الفشل، يحال إلى المحاكم المصرية المختصة.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  12. التواصل معنا
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  لأي استفسارات حول هذه الشروط، يرجى التواصل معنا على:
                  <br />
                  البريد الإلكتروني: legal@shoporia.com
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
