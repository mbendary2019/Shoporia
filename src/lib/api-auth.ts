import { NextRequest, NextResponse } from 'next/server'

interface AuthUser {
  id: string
  email: string
  role: string
  storeId?: string
}

/**
 * Extract authenticated user from request cookies.
 * Returns null if not authenticated.
 */
export function getAuthUser(request: NextRequest): AuthUser | null {
  const authCookie = request.cookies.get('shoporia-auth')
  if (!authCookie) return null

  try {
    const decoded = decodeURIComponent(authCookie.value)
    const authData = JSON.parse(decoded)
    if (authData?.state?.user) {
      const user = authData.state.user
      return {
        id: user.id,
        email: user.email,
        role: user.role || 'customer',
        storeId: user.storeId,
      }
    }
  } catch {
    // Invalid cookie
  }
  return null
}

/**
 * Returns 401 response for unauthenticated requests
 */
export function unauthorizedResponse() {
  return NextResponse.json(
    { success: false, error: 'يجب تسجيل الدخول' },
    { status: 401 }
  )
}

/**
 * Returns 403 response for unauthorized requests
 */
export function forbiddenResponse() {
  return NextResponse.json(
    { success: false, error: 'ليس لديك صلاحية لهذا الإجراء' },
    { status: 403 }
  )
}
