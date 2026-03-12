import { generatePageMetadata } from '@/lib/metadata'
import HomePage from './home-page'

export const metadata = generatePageMetadata({
  title: 'الرئيسية - منصة التسوق الإلكتروني الأولى في الكويت',
  description:
    'تسوق أفضل المنتجات من آلاف المتاجر في الكويت. عروض يومية، توصيل سريع، ودفع آمن على Shoporia.',
})

export default function Page() {
  return <HomePage />
}
