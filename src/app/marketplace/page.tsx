import { getTranslations } from 'next-intl/server'
import { generatePageMetadata } from '@/lib/metadata'
import MarketplacePage from './marketplace-page'

export async function generateMetadata() {
  const t = await getTranslations('metadata')
  return generatePageMetadata({
    title: t('marketplaceTitle'),
    description: t('marketplaceDescription'),
  })
}

export default function Page() {
  return <MarketplacePage />
}
