import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, ProductVariant } from '@/types'

interface CartItem {
  product: Product
  variant?: ProductVariant
  quantity: number
}

interface CartState {
  items: CartItem[]
  storeId: string | null
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      storeId: null,

      addItem: (product, variant, quantity = 1) => {
        const { items, storeId } = get()

        // Check if adding from different store
        if (storeId && storeId !== product.storeId) {
          // Clear cart if from different store
          set({ items: [], storeId: product.storeId })
        }

        const existingIndex = items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.variant?.id === variant?.id
        )

        if (existingIndex > -1) {
          const newItems = [...items]
          newItems[existingIndex].quantity += quantity
          set({ items: newItems })
        } else {
          set({
            items: [...items, { product, variant, quantity }],
            storeId: product.storeId,
          })
        }
      },

      removeItem: (productId, variantId) => {
        const { items } = get()
        const newItems = items.filter(
          (item) =>
            !(item.product.id === productId && item.variant?.id === variantId)
        )
        set({
          items: newItems,
          storeId: newItems.length > 0 ? get().storeId : null,
        })
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }

        const { items } = get()
        const newItems = items.map((item) => {
          if (
            item.product.id === productId &&
            item.variant?.id === variantId
          ) {
            return { ...item, quantity }
          }
          return item
        })
        set({ items: newItems })
      },

      clearCart: () => set({ items: [], storeId: null }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.variant?.price ?? item.product.price
          return total + price * item.quantity
        }, 0)
      },
    }),
    {
      name: 'shoporia-cart',
    }
  )
)
