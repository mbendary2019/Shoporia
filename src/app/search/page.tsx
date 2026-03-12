import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import SearchPage from './search-page'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams
  if (q) {
    return generatePageMetadata({
      title: `نتائج البحث: ${q}`,
      description: `نتائج البحث عن "${q}" على Shoporia. اعثر على أفضل المنتجات والعروض.`,
    })
  }
  return generatePageMetadata({
    title: 'البحث',
    description: 'ابحث عن المنتجات والمتاجر على Shoporia.',
  })
}

export default function Page() {
  return <SearchPage />
}
