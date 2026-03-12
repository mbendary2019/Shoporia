import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { generatePageMetadata } from '@/lib/metadata'
import SearchPage from './search-page'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const t = await getTranslations('metadata')
  const { q } = await searchParams
  if (q) {
    return generatePageMetadata({
      title: t('searchResultsTitle', { query: q }),
      description: t('searchResultsDescription', { query: q }),
    })
  }
  return generatePageMetadata({
    title: t('searchTitle'),
    description: t('searchDescription'),
  })
}

export default function Page() {
  return <SearchPage />
}
