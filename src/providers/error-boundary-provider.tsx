'use client'

import { useEffect } from 'react'
import { setupGlobalErrorHandlers } from '@/lib/error-tracking'

/**
 * Sets up global error handlers for uncaught errors and unhandled promise rejections.
 * Place this component once in the app tree (e.g., root layout).
 */
export function ErrorBoundaryProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupGlobalErrorHandlers()
  }, [])

  return <>{children}</>
}
