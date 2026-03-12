'use client'

import { useState, useCallback, useRef } from 'react'
import type { DocumentSnapshot } from 'firebase/firestore'

interface PaginatedResult<T> {
  items: T[]
  lastDoc: DocumentSnapshot | null
  hasMore: boolean
}

interface UsePaginatedQueryReturn<T> {
  items: T[]
  isLoading: boolean
  isLoadingMore: boolean
  hasMore: boolean
  error: Error | null
  loadMore: () => Promise<void>
  refresh: () => Promise<void>
}

type FetchFn<T> = (cursor?: DocumentSnapshot) => Promise<{
  items: T[]
  lastDoc: DocumentSnapshot | null
  hasMore: boolean
}>

/**
 * A reusable hook for cursor-based Firestore pagination.
 *
 * @param fetchFn - An async function that accepts an optional cursor (DocumentSnapshot)
 *   and returns `{ items, lastDoc, hasMore }`.
 *
 * @example
 * ```tsx
 * const { items, isLoading, hasMore, loadMore, isLoadingMore } = usePaginatedQuery(
 *   useCallback(async (cursor) => {
 *     const result = await getProductsPaginated({ storeId, lastDoc: cursor })
 *     return { items: result.products, lastDoc: result.lastDoc, hasMore: result.hasMore }
 *   }, [storeId])
 * )
 * ```
 */
export function usePaginatedQuery<T>(
  fetchFn: FetchFn<T>
): UsePaginatedQueryReturn<T> {
  const [items, setItems] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const lastDocRef = useRef<DocumentSnapshot | null>(null)
  const initializedRef = useRef(false)

  // Initial load — runs once when the hook is first used
  const doInitialLoad = useCallback(async () => {
    if (initializedRef.current) return
    initializedRef.current = true
    setIsLoading(true)
    setError(null)
    try {
      const result = await fetchFn(undefined)
      setItems(result.items)
      lastDocRef.current = result.lastDoc
      setHasMore(result.hasMore)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }, [fetchFn])

  // Trigger initial load on first render
  if (!initializedRef.current) {
    doInitialLoad()
  }

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return
    setIsLoadingMore(true)
    setError(null)
    try {
      const cursor = lastDocRef.current ?? undefined
      const result = await fetchFn(cursor)
      setItems((prev) => [...prev, ...result.items])
      lastDocRef.current = result.lastDoc
      setHasMore(result.hasMore)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoadingMore(false)
    }
  }, [fetchFn, hasMore, isLoadingMore])

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    lastDocRef.current = null
    try {
      const result = await fetchFn(undefined)
      setItems(result.items)
      lastDocRef.current = result.lastDoc
      setHasMore(result.hasMore)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }, [fetchFn])

  return { items, isLoading, isLoadingMore, hasMore, error, loadMore, refresh }
}
