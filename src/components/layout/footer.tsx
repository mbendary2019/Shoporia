import Link from 'next/link'
import {
  Store,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  CreditCard,
  Smartphone,
} from 'lucide-react'
import { APP_CONFIG } from '@/utils/constants'

const footerLinks = {
  getToKnowUs: [
    { name: 'من نحن', href: '/about' },
    { name: 'الوظائف', href: '/careers' },
    { name: 'المدونة', href: '/blog' },
    { name: 'علاقات المستثمرين', href: '/investors' },
  ],
  makeMoney: [
    { name: 'بيع على Shoporia', href: '/seller/register' },
    { name: 'برنامج الأفلييت', href: '/affiliate' },
    { name: 'أعلن عن منتجاتك', href: '/advertise' },
    { name: 'انشر كتابك', href: '/publish' },
  ],
  paymentProducts: [
    { name: 'بطاقة ائتمان Shoporia', href: '/credit-card' },
    { name: 'Shoporia Pay', href: '/pay' },
    { name: 'خطط التقسيط', href: '/installments' },
    { name: 'التحويل البنكي', href: '/bank-transfer' },
  ],
  help: [
    { name: 'حسابك', href: '/account' },
    { name: 'المرتجعات والاستبدال', href: '/returns' },
    { name: 'تتبع طلباتك', href: '/track' },
    { name: 'المساعدة', href: '/help' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Youtube', icon: Youtube, href: '#' },
]

const paymentMethods = [
  'Visa',
  'Mastercard',
  'كي نت',
  'بطاقة ائتمان',
  'نقد عند الاستلام',
  'تحويل بنكي',
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="mt-auto">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full bg-amazon-navyLight hover:bg-amazon-navy text-white text-sm py-4 transition-colors"
      >
        <ChevronUp className="h-4 w-4 mx-auto mb-1" />
        العودة لأعلى
      </button>

      {/* Main Footer */}
      <div className="bg-amazon-navy text-white">
        <div className="container-custom py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Get to Know Us */}
            <div>
              <h4 className="font-bold text-lg mb-4">تعرف علينا</h4>
              <ul className="space-y-3">
                {footerLinks.getToKnowUs.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Make Money */}
            <div>
              <h4 className="font-bold text-lg mb-4">اربح معنا</h4>
              <ul className="space-y-3">
                {footerLinks.makeMoney.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Products */}
            <div>
              <h4 className="font-bold text-lg mb-4">طرق الدفع</h4>
              <ul className="space-y-3">
                {footerLinks.paymentProducts.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-bold text-lg mb-4">دعنا نساعدك</h4>
              <ul className="space-y-3">
                {footerLinks.help.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-8" />

          {/* Logo & Social */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amazon-orange text-white">
                <Store className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-white">
                Shoporia
              </span>
            </Link>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-amazon-navyLight text-white hover:bg-amazon-orange transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Language & Region */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded border border-gray-600 hover:border-white text-sm">
                <span>🇰🇼</span>
                <span>الكويت</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded border border-gray-600 hover:border-white text-sm">
                <span>العربية</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-amazon-footer text-gray-400">
        <div className="container-custom py-6">
          {/* Payment Methods */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <span className="text-sm">طرق الدفع المتاحة:</span>
            {paymentMethods.map((method) => (
              <div
                key={method}
                className="px-3 py-1.5 bg-white/10 rounded text-xs text-white"
              >
                {method}
              </div>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs mb-4">
            <Link href="/terms" className="hover:text-white hover:underline">
              شروط الاستخدام
            </Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-white hover:underline">
              سياسة الخصوصية
            </Link>
            <span>|</span>
            <Link href="/cookies" className="hover:text-white hover:underline">
              إشعار الكوكيز
            </Link>
            <span>|</span>
            <Link href="/ads-privacy" className="hover:text-white hover:underline">
              الإعلانات القائمة على الاهتمامات
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-center text-xs">
            © {new Date().getFullYear()} Shoporia.com, Inc. أو الشركات التابعة لها. جميع الحقوق محفوظة.
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs">
            <a href={`mailto:${APP_CONFIG.supportEmail}`} className="flex items-center gap-1 hover:text-white">
              <Mail className="h-3 w-3" />
              {APP_CONFIG.supportEmail}
            </a>
            <a href={`tel:${APP_CONFIG.supportPhone}`} className="flex items-center gap-1 hover:text-white">
              <Phone className="h-3 w-3" />
              {APP_CONFIG.supportPhone}
            </a>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              الكويت
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
