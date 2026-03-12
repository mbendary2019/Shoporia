/**
 * Error tracking utility
 *
 * Provides a centralized error reporting system.
 * In production, this can be connected to Sentry, LogRocket, or any error tracking service.
 * Currently logs to console in development and stores errors for later analysis.
 */

interface ErrorReport {
  message: string
  stack?: string
  digest?: string
  componentStack?: string
  url?: string
  userAgent?: string
  timestamp: number
  metadata?: Record<string, unknown>
}

const ERROR_ENDPOINT = process.env.NEXT_PUBLIC_ERROR_ENDPOINT

/**
 * Report an error to the tracking system
 */
export function reportError(
  error: Error | string,
  metadata?: Record<string, unknown>
) {
  const errorReport: ErrorReport = {
    message: typeof error === 'string' ? error : error.message,
    stack: typeof error === 'string' ? undefined : error.stack,
    digest: typeof error === 'object' && 'digest' in error ? (error as Error & { digest?: string }).digest : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    timestamp: Date.now(),
    metadata,
  }

  // Always log in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Tracking]', errorReport)
    return
  }

  // Send to error endpoint if configured
  if (ERROR_ENDPOINT) {
    fetch(ERROR_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorReport),
    }).catch(() => {
      // Silently fail - don't cause more errors while reporting errors
    })
  }
}

/**
 * Set up global error handlers for uncaught errors and unhandled rejections
 */
export function setupGlobalErrorHandlers() {
  if (typeof window === 'undefined') return

  window.addEventListener('error', (event) => {
    reportError(event.error || event.message, {
      source: 'window.onerror',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error
      ? event.reason
      : String(event.reason)
    reportError(error, { source: 'unhandledrejection' })
  })
}
