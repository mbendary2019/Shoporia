import { generatePageMetadata } from '@/lib/metadata'
import MarketplacePage from './marketplace-page'

export const metadata = generatePageMetadata({
  title: 'السوق',
  description:
    'تصفح آلاف المنتجات من أفضل المتاجر في الكويت. إلكترونيات، أزياء، منزل، وأكثر على Shoporia.',
})

export default function Page() {
  return <MarketplacePage />
}
