import { useQuery } from '@tanstack/react-query'
import { STORE_CATEGORIES } from '@/utils/constants'

// Categories are currently static/hardcoded.
// This hook wraps them in React Query for consistency and
// to make it easy to switch to a server-fetched list later.
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => Promise.resolve(STORE_CATEGORIES),
    staleTime: Infinity, // static data, never stale
  })
}
