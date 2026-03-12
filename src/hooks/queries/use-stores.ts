import { useQuery } from '@tanstack/react-query'
import { getStoreBySlug } from '@/services/store'
import { getActiveProductsByStore } from '@/services/product'
import type { Store, Product } from '@/types'

export function useStore(slug: string | undefined) {
  return useQuery<Store | null>({
    queryKey: ['store', slug],
    queryFn: () => getStoreBySlug(slug!),
    enabled: !!slug,
  })
}

export function useStoreProducts(storeId: string | undefined, pageSize: number = 20) {
  return useQuery<Product[]>({
    queryKey: ['storeProducts', storeId, pageSize],
    queryFn: () => getActiveProductsByStore(storeId!, pageSize),
    enabled: !!storeId,
  })
}
