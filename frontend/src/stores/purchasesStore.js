import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { cartService } from '../services/api'

export const usePurchasesStore = create(
  persist(
    (set, get) => ({
      // Estado
      purchases: [],
      currentPurchase: null,
      loading: false,
      error: null,
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      },

      // Acciones
      setLoading: (loading) => set({ loading, error: null }),

      setError: (error) => set({ error, loading: false }),

      clearError: () => set({ error: null }),

      setPagination: (pagination) => set({ pagination: { ...get().pagination, ...pagination } }),

      setPurchases: (purchases) => set({
        purchases: purchases || [],
        loading: false,
        error: null
      }),

      addPurchase: (purchase) => set({
        purchases: [purchase, ...get().purchases],
        loading: false,
        error: null
      }),

      setCurrentPurchase: (purchase) => set({
        currentPurchase: purchase,
        loading: false,
        error: null
      }),

      clearCurrentPurchase: () => set({
        currentPurchase: null
      }),

      updatePurchaseStatus: (purchaseId, status) => {
        const purchases = get().purchases.map(purchase =>
          purchase.id === purchaseId
            ? { ...purchase, status }
            : purchase
        )

        set({ purchases })
      },

      loadPurchases: async () => {
        try {
          set({ loading: true, error: null })

          const response = await cartService.getPurchaseHistory()

          if (response.success) {
            set({
              purchases: response.data.purchases || [],
              loading: false,
              error: null
            })
          } else {
            set({
              error: response.message || 'Error al cargar compras',
              loading: false
            })
          }
        } catch (error) {
          set({
            error: error.message || 'Error al cargar compras',
            loading: false
          })
        }
      },

      getPurchaseDetails: async (purchaseId) => {
        try {
          set({ loading: true, error: null })

          const response = await cartService.getPurchaseDetail(purchaseId)

          if (response.success) {
            set({
              currentPurchase: response.data.purchase,
              loading: false,
              error: null
            })

            return response.data.purchase
          } else {
            set({
              error: response.message || 'Error al cargar detalles',
              loading: false
            })

            return null
          }
        } catch (error) {
          set({
            error: error.message || 'Error al cargar detalles',
            loading: false
          })

          return null
        }
      },

      // Getters
      getPurchases: () => get().purchases,
      getCurrentPurchase: () => get().currentPurchase,
      getLoading: () => get().loading,
      getError: () => get().error,
      getPagination: () => get().pagination,
      getPurchaseById: (purchaseId) => get().purchases.find(purchase => purchase.id === purchaseId),
      getPurchasesByStatus: (status) => get().purchases.filter(purchase => purchase.status === status),
      getTotalPurchases: () => get().purchases.length
    }),
    {
      name: 'purchases-storage', // nombre para localStorage
      partialize: (state) => ({
        purchases: state.purchases
      })
    }
  )
)
