import { useQuery } from '@tanstack/react-query'
import { getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { productsRef } from '@/lib/firebase'
import { getProductById, searchProducts } from '@/services/product'
import type { Product } from '@/types'

export function useProducts(filters?: {
  status?: string
  category?: string
  limit?: number
}) {
  return useQuery<Product[]>({
    queryKey: ['products', filters],
    queryFn: async () => {
      const q = query(
        productsRef,
        where('status', '==', filters?.status || 'active'),
        orderBy('createdAt', 'desc'),
        limit(filters?.limit || 50)
      )
      const snapshot = await getDocs(q)
      return snapshot.docs.map((doc) => doc.data() as Product)
    },
  })
}

export function useProduct(id: string | undefined) {
  return useQuery<Product | null>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  })
}

export function useSearchProducts(searchTerm: string) {
  return useQuery<Product[]>({
    queryKey: ['products', 'search', searchTerm],
    queryFn: () => searchProducts(searchTerm.trim()),
    enabled: !!searchTerm.trim(),
  })
}
