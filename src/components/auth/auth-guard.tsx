'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store'

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: 'seller' | 'admin'
  fallbackUrl?: string
}

export function AuthGuard({
  children,
  requiredRole,
  fallbackUrl = '/login',
}: AuthGuardProps) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuthStore()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated) {
      router.replace(fallbackUrl)
      return
    }

    if (requiredRole && user?.role !== requiredRole) {
      router.replace('/')
    }
  }, [isAuthenticated, isLoading, user?.role, requiredRole, router, fallbackUrl])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500" />
      </div>
    )
  }

  if (!isAuthenticated) return null
  if (requiredRole && user?.role !== requiredRole) return null

  return <>{children}</>
}
