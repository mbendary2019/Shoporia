'use client'

import { Header, Footer } from '@/components/layout'
import { Card, Button, Badge } from '@/components/ui'
import {
  Building2,
  Copy,
  CheckCircle,
  Clock,
  Shield,
  AlertCircle,
} from 'lucide-react'

const bankAccounts = [
  {
    bank: 'البنك الأهلي المصري',
    accountName: 'Shoporia للتجارة الإلكترونية',
    accountNumber: '1234567890123456',
    iban: 'EG380003000000000012345678901',
    branch: 'فرع التجمع الخامس',
  },
  {
    bank: 'بنك مصر',
    accountName: 'Shoporia للتجارة الإلكترونية',
    accountNumber: '9876543210987654',
    iban: 'EG380002000000000098765432109',
    branch: 'فرع المعادي',
  },
  {
    bank: 'البنك التجاري الدولي (CIB)',
    accountName: 'Shoporia للتجارة الإلكترونية',
    accountNumber: '5555666677778888',
    iban: 'EG380010000000000055556666777',
    branch: 'فرع الزمالك',
  },
]

const steps = [
  {
    step: 1,
    title: 'أكمل طلبك',
    description: 'اختر المنتجات وأضفها للسلة',
  },
  {
    step: 2,
    title: 'اختر التحويل البنكي',
    description: 'عند صفحة الدفع',
  },
  {
    step: 3,
    title: 'قم بالتحويل',
    description: 'من حسابك البنكي لحسابنا',
  },
  {
    step: 4,
    title: 'أرسل الإيصال',
    description: 'عبر WhatsApp أو البريد',
  },
]

export default function BankTransferPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-amazon-navy py-12">
          <div className="container-custom text-center">
            <div className="h-20 w-20 rounded-full bg-amazon-orange flex items-center justify-center mx-auto mb-6">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              التحويل البنكي
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              ادفع عبر التحويل البنكي المباشر لحساباتنا المعتمدة
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              خطوات الدفع
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="h-12 w-12 rounded-full bg-amazon-orange text-white text-xl font-bold flex items-center justify-center mx-auto mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bank Accounts */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              حساباتنا البنكية
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {bankAccounts.map((account) => (
                <Card key={account.bank} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {account.bank}
                    </h3>
                    <Badge className="bg-green-100 text-green-700">معتمد</Badge>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">اسم الحساب:</span>
                      <span className="text-gray-900 dark:text-white">{account.accountName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">رقم الحساب:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 dark:text-white font-mono">
                          {account.accountNumber}
                        </span>
                        <button
                          onClick={() => copyToClipboard(account.accountNumber)}
                          className="text-amazon-orange hover:text-amazon-orangeHover"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">IBAN:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 dark:text-white font-mono text-xs">
                          {account.iban}
                        </span>
                        <button
                          onClick={() => copyToClipboard(account.iban)}
                          className="text-amazon-orange hover:text-amazon-orangeHover"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">الفرع:</span>
                      <span className="text-gray-900 dark:text-white">{account.branch}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="py-12">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <Card className="p-6 border-amazon-orange border-2">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-amazon-orange shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      ملاحظات هامة
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        يجب إرسال إيصال التحويل خلال 24 ساعة
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        اكتب رقم الطلب في خانة البيان
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        سيتم تأكيد طلبك خلال 1-2 يوم عمل
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-amazon-orange shrink-0 mt-0.5" />
                        التحويلات في العطلات تُعالج في أول يوم عمل
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
