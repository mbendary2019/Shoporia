import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/account', '/checkout', '/messages']

// Routes that require admin access
const adminRoutes = ['/admin']

// Routes that should redirect to dashboard if already logged in
const authRoutes = ['/login', '/register', '/forgot-password']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for auth cookie/token (Zustand persists to localStorage which isn't available in middleware)
  // We use a cookie-based approach: the auth state is checked via a cookie set on login
  const authCookie = request.cookies.get('shoporia-auth')

  let isAuthenticated = false
  let userRole: string | null = null

  if (authCookie) {
    try {
      const decoded = decodeURIComponent(authCookie.value)
      const authData = JSON.parse(decoded)
      if (authData?.state?.user) {
        isAuthenticated = true
        userRole = authData.state.user.role || null
      }
    } catch {
      // Invalid cookie
    }
  }

  // Check protected routes
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Skip admin login page from admin protection
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect non-admin users from admin routes
  if (isAdminRoute && (!isAuthenticated || userRole !== 'admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Redirect authenticated users from auth routes to dashboard/home
  if (isAuthRoute && isAuthenticated) {
    const redirect = request.nextUrl.searchParams.get('redirect')
    // Prevent open redirect: only allow relative paths starting with /
    const safeRedirect = redirect && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/'
    return NextResponse.redirect(new URL(safeRedirect, request.url))
  }

  // CSRF protection for state-changing requests
  const method = request.method
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && pathname.startsWith('/api')) {
    const csrfCookie = request.cookies.get('csrf-token')?.value
    const csrfHeader = request.headers.get('x-csrf-token')
    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
      return NextResponse.json(
        { success: false, error: 'CSRF token missing or invalid' },
        { status: 403 }
      )
    }
  }

  // Add security headers
  const response = NextResponse.next()

  // Set CSRF token cookie if not present
  if (!request.cookies.get('csrf-token')) {
    const token = generateCSRFToken()
    response.cookies.set('csrf-token', token, {
      httpOnly: false, // Must be readable by JS to send in headers
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })
  }

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     * - API routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|images).*)',
  ],
}
