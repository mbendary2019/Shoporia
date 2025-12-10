import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

interface WishlistState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  getItemCount: () => number
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get()
        const exists = items.some((item) => item.id === product.id)

        if (!exists) {
          set({ items: [...items, product] })
        }
      },

      removeItem: (productId) => {
        const { items } = get()
        set({ items: items.filter((item) => item.id !== productId) })
      },

      toggleItem: (product) => {
        const { items, addItem, removeItem } = get()
        const exists = items.some((item) => item.id === product.id)

        if (exists) {
          removeItem(product.id)
        } else {
          addItem(product)
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId)
      },

      clearWishlist: () => set({ items: [] }),

      getItemCount: () => get().items.length,
    }),
    {
      name: 'shoporia-wishlist',
    }
  )
)
