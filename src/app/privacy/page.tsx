'use client'

import { Header, Footer } from '@/components/layout'
import { Card } from '@/components/ui'
import { Shield, Lock } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-navy py-12">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-amazon-orange flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              سياسة الخصوصية
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
                  نحن في Shoporia نلتزم بحماية خصوصيتك وبياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  2. البيانات التي نجمعها
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-3">نجمع الأنواع التالية من البيانات:</p>
                <ul className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  <li>• <strong>بيانات الحساب:</strong> الاسم، البريد الإلكتروني، رقم الهاتف، العنوان</li>
                  <li>• <strong>بيانات المعاملات:</strong> سجل الطلبات، معلومات الدفع، الفواتير</li>
                  <li>• <strong>بيانات الاستخدام:</strong> سجل التصفح، المنتجات المفضلة، تفاعلاتك مع المنصة</li>
                  <li>• <strong>بيانات الجهاز:</strong> نوع الجهاز، نظام التشغيل، عنوان IP</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  3. كيفية استخدام البيانات
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-3">نستخدم بياناتك في:</p>
                <ul className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  <li>• معالجة طلباتك وتوصيلها</li>
                  <li>• تقديم خدمة عملاء فعالة</li>
                  <li>• تخصيص تجربتك وعرض منتجات مناسبة</li>
                  <li>• إرسال تحديثات وعروض (يمكنك إلغاء الاشتراك)</li>
                  <li>• تحسين خدماتنا ومنصتنا</li>
                  <li>• منع الاحتيال وحماية الأمان</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  4. مشاركة البيانات
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-3">قد نشارك بياناتك مع:</p>
                <ul className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  <li>• <strong>البائعين:</strong> لتنفيذ الطلبات فقط</li>
                  <li>• <strong>شركات الشحن:</strong> للتوصيل</li>
                  <li>• <strong>معالجي الدفع:</strong> لإتمام المعاملات المالية</li>
                  <li>• <strong>مقدمي الخدمات:</strong> الذين يساعدوننا في تشغيل المنصة</li>
                  <li>• <strong>الجهات القانونية:</strong> عند الاقتضاء بموجب القانون</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  5. حماية البيانات
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  نستخدم تقنيات تشفير متقدمة (SSL/TLS) لحماية بياناتك أثناء النقل. نخزن البيانات في مراكز بيانات آمنة مع إجراءات حماية صارمة.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  6. حقوقك
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-3">لديك الحق في:</p>
                <ul className="text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                  <li>• الوصول إلى بياناتك الشخصية</li>
                  <li>• تصحيح البيانات غير الصحيحة</li>
                  <li>• حذف بياناتك (مع بعض الاستثناءات القانونية)</li>
                  <li>• الاعتراض على معالجة بياناتك للتسويق</li>
                  <li>• نقل بياناتك إلى خدمة أخرى</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  7. ملفات تعريف الارتباط (Cookies)
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  نستخدم ملفات تعريف الارتباط لتحسين تجربتك. يمكنك التحكم في إعدادات الكوكيز من متصفحك. لمزيد من المعلومات، راجع إشعار الكوكيز.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  8. الاحتفاظ بالبيانات
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  نحتفظ ببياناتك طالما حسابك نشط أو حسب الحاجة لتقديم الخدمات. قد نحتفظ ببعض البيانات لفترات أطول للأغراض القانونية والمحاسبية.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  9. خصوصية الأطفال
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  خدماتنا غير موجهة للأطفال دون 18 عاماً. لا نجمع بيانات من القاصرين عن قصد. إذا علمت أن طفلاً قدم لنا بيانات، يرجى التواصل معنا لحذفها.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  10. التحديثات على السياسة
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  قد نحدث هذه السياسة من وقت لآخر. سنخطرك بالتغييرات الجوهرية عبر البريد الإلكتروني أو إشعار على المنصة.
                </p>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  11. التواصل معنا
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  لأي استفسارات حول خصوصيتك، تواصل معنا:
                  <br />
                  البريد الإلكتروني: privacy@shoporia.com
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
