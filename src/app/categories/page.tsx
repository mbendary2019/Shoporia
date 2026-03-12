import { getTranslations } from 'next-intl/server'
import { generatePageMetadata } from '@/lib/metadata'
import CategoriesPage from './categories-page'

export async function generateMetadata() {
  const t = await getTranslations('metadata')
  return generatePageMetadata({
    title: t('categoriesTitle'),
    description: t('categoriesDescription'),
  })
}

export default function Page() {
  return <CategoriesPage />
}
