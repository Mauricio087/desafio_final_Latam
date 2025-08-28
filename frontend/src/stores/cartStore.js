import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { cartService } from '../services/api'

export const useCartStore = create(
  persist(
    (set, get) => ({
      // Estado
      items: [],
      total: 0,
      loading: false,
      error: null,

      // Acciones
      setLoading: (loading) => set({ loading, error: null }),

      setError: (error) => set({ error, loading: false }),

      clearError: () => set({ error: null }),

      setCart: (cartData) => set({
        items: cartData.items || [],
        total: cartData.total || 0,
        loading: false,
        error: null
      }),

      loadCart: async () => {
        try {
          set({ loading: true, error: null })

          const response = await cartService.getCart()

          if (response.success) {
            set({
              items: response.data.items || [],
              total: response.data.total || 0,
              loading: false,
              error: null
            })
          } else {
            set({
              error: response.message || 'Error al cargar el carrito',
              loading: false
            })
          }
        } catch (error) {
          set({
            error: error.message || 'Error al cargar el carrito',
            loading: false
          })
        }
      },

      addToCart: async (productId, quantity = 1) => {
        try {
          set({ loading: true, error: null })

          const response = await cartService.addToCart({ productId, quantity })

          if (response.success) {
            set({
              items: response.data.items || [],
              total: response.data.total || 0,
              loading: false,
              error: null
            })

            return { success: true }
          } else {
            set({
              error: response.message || 'Error al agregar al carrito',
              loading: false
            })

            return { success: false, message: response.message }
          }
        } catch (error) {
          set({
            error: error.message || 'Error al agregar al carrito',
            loading: false
          })

          return { success: false, message: error.message }
        }
      },

      updateCartItem: async (itemId, quantity) => {
        try {
          set({ loading: true, error: null })

          const response = await cartService.updateCartItem({ itemId, quantity })

          if (response.success) {
            set({
              items: response.data.items || [],
              total: response.data.total || 0,
              loading: false,
              error: null
            })

            return { success: true }
          } else {
            set({
              error: response.message || 'Error al actualizar el carrito',
              loading: false
            })

            return { success: false, message: response.message }
          }
        } catch (error) {
          set({
            error: error.message || 'Error al actualizar el carrito',
            loading: false
          })

          return { success: false, message: error.message }
        }
      },

      removeFromCart: async (itemId) => {
        try {
          set({ loading: true, error: null })

          const response = await cartService.removeFromCart(itemId)

          if (response.success) {
            set({
              items: response.data.items || [],
              total: response.data.total || 0,
              loading: false,
              error: null
            })

            return { success: true }
          } else {
            set({
              error: response.message || 'Error al eliminar del carrito',
              loading: false
            })

            return { success: false, message: response.message }
          }
        } catch (error) {
          set({
            error: error.message || 'Error al eliminar del carrito',
            loading: false
          })

          return { success: false, message: error.message }
        }
      },

      clearCart: async () => {
        try {
          set({ loading: true, error: null })

          const response = await cartService.clearCart()

          if (response.success) {
            set({
              items: [],
              total: 0,
              loading: false,
              error: null
            })

            return { success: true }
          } else {
            set({
              error: response.message || 'Error al limpiar el carrito',
              loading: false
            })

            return { success: false, message: response.message }
          }
        } catch (error) {
          set({
            error: error.message || 'Error al limpiar el carrito',
            loading: false
          })

          return { success: false, message: error.message }
        }
      },

      // Getters
      getItems: () => get().items,
      getTotal: () => get().total,
      getLoading: () => get().loading,
      getError: () => get().error,
      getItemCount: () => get().items.length,
      getItemById: (itemId) => get().items.find(item => item.id === itemId),
      getTotalPrice: () => get().total
    }),
    {
      name: 'cart-storage', // nombre para localStorage
      partialize: (state) => ({
        items: state.items,
        total: state.total
      })
    }
  )
)
