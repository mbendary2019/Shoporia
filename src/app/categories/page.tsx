import { generatePageMetadata } from '@/lib/metadata'
import CategoriesPage from './categories-page'

export const metadata = generatePageMetadata({
  title: 'الأقسام',
  description:
    'تصفح جميع أقسام Shoporia - إلكترونيات، أزياء، منزل وحديقة، جمال وعناية، رياضة، وأكثر.',
})

export default function Page() {
  return <CategoriesPage />
}
