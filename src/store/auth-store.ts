import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

// Sync auth state to cookie for middleware access
function syncAuthCookie(user: User | null) {
  if (typeof document === 'undefined') return

  if (user) {
    const cookieData = JSON.stringify({
      state: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          storeId: user.storeId,
        },
      },
    })
    // Set cookie with SameSite=Lax for navigation requests
    document.cookie = `shoporia-auth=${encodeURIComponent(cookieData)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
  } else {
    // Clear cookie on logout
    document.cookie = 'shoporia-auth=; path=/; max-age=0'
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,
      setUser: (user) => {
        syncAuthCookie(user)
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        })
      },
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => {
        syncAuthCookie(null)
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },
    }),
    {
      name: 'shoporia-auth',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
