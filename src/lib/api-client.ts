/**
 * API client with automatic CSRF token handling.
 * Use this instead of raw fetch() for all state-changing API calls.
 */

function getCSRFToken(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/csrf-token=([^;]+)/)
  return match ? match[1] : null
}

interface ApiOptions extends Omit<RequestInit, 'method'> {
  data?: unknown
}

async function apiRequest(method: string, url: string, options: ApiOptions = {}) {
  const { data, headers: customHeaders, ...rest } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(customHeaders as Record<string, string>),
  }

  // Add CSRF token for state-changing requests
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const csrfToken = getCSRFToken()
    if (csrfToken) {
      headers['x-csrf-token'] = csrfToken
    }
  }

  const response = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    ...rest,
  })

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.error || `Request failed with status ${response.status}`)
  }

  return json
}

export const api = {
  get: (url: string, options?: ApiOptions) => apiRequest('GET', url, options),
  post: (url: string, options?: ApiOptions) => apiRequest('POST', url, options),
  patch: (url: string, options?: ApiOptions) => apiRequest('PATCH', url, options),
  put: (url: string, options?: ApiOptions) => apiRequest('PUT', url, options),
  delete: (url: string, options?: ApiOptions) => apiRequest('DELETE', url, options),
}
