import { getTranslations } from 'next-intl/server'
import { generatePageMetadata } from '@/lib/metadata'
import HomePage from './home-page'

export async function generateMetadata() {
  const t = await getTranslations('metadata')
  return generatePageMetadata({
    title: t('homeTitle'),
    description: t('homeDescription'),
  })
}

export default function Page() {
  return <HomePage />
}
