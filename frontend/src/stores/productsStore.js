import { create } from 'zustand'
import { productService } from '../services/api'

export const useProductsStore = create((set, get) => ({
  // Estado
  products: [],
  featuredProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
  filters: {
    category: null,
    priceRange: null,
    search: ''
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  },

  // Acciones
  setLoading: (loading) => set({ loading, error: null }),

  setError: (error) => set({ error, loading: false }),

  clearError: () => set({ error: null }),

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),

  resetFilters: () => set({
    filters: {
      category: null,
      priceRange: null,
      search: ''
    },
    pagination: {
      page: 1,
      limit: 12,
      total: 0,
      totalPages: 0
    }
  }),

  setPagination: (pagination) => set({ pagination: { ...get().pagination, ...pagination } }),

  fetchProducts: async (params = {}) => {
    try {
      set({ loading: true, error: null })

      const response = await productService.getAll(params)

      if (response.success) {
        const { products, pagination } = response.data

        set({
          products: products || [],
          pagination: {
            page: pagination?.page || 1,
            limit: pagination?.limit || 12,
            total: pagination?.total || 0,
            totalPages: pagination?.totalPages || 0
          },
          loading: false,
          error: null
        })

        return { success: true }
      } else {
        set({
          error: response.message || 'Error al cargar productos',
          loading: false
        })

        return { success: false, message: response.message }
      }
    } catch (error) {
      set({
        error: error.message || 'Error al cargar productos',
        loading: false
      })

      return { success: false, message: error.message }
    }
  },

  fetchFeaturedProducts: async () => {
    try {
      set({ loading: true, error: null })

      const response = await productService.getAll({ featured: true })

      if (response.success) {
        set({
          featuredProducts: response.data.products || [],
          loading: false,
          error: null
        })

        return { success: true }
      } else {
        set({
          error: response.message || 'Error al cargar productos destacados',
          loading: false
        })

        return { success: false, message: response.message }
      }
    } catch (error) {
      set({
        error: error.message || 'Error al cargar productos destacados',
        loading: false
      })

      return { success: false, message: error.message }
    }
  },

  fetchProductById: async (productId) => {
    try {
      set({ loading: true, error: null })

      const response = await productService.getById(productId)

      if (response.success) {
        set({
          currentProduct: response.data.product,
          loading: false,
          error: null
        })

        return { success: true }
      } else {
        set({
          error: response.message || 'Error al cargar el producto',
          loading: false
        })

        return { success: false, message: response.message }
      }
    } catch (error) {
      set({
        error: error.message || 'Error al cargar el producto',
        loading: false
      })

      return { success: false, message: error.message }
    }
  },

  searchProducts: async (searchTerm) => {
    try {
      set({ loading: true, error: null })

      const response = await productService.getAll({ search: searchTerm })

      if (response.success) {
        const { products, pagination } = response.data

        set({
          products: products || [],
          pagination: {
            page: pagination?.page || 1,
            limit: pagination?.limit || 12,
            total: pagination?.total || 0,
            totalPages: pagination?.totalPages || 0
          },
          loading: false,
          error: null
        })

        return { success: true }
      } else {
        set({
          error: response.message || 'Error en la búsqueda',
          loading: false
        })

        return { success: false, message: response.message }
      }
    } catch (error) {
      set({
        error: error.message || 'Error en la búsqueda',
        loading: false
      })

      return { success: false, message: error.message }
    }
  },

  // Getters
  getProducts: () => get().products,
  getFeaturedProducts: () => get().featuredProducts,
  getCurrentProduct: () => get().currentProduct,
  getLoading: () => get().loading,
  getError: () => get().error,
  getFilters: () => get().filters,
  getPagination: () => get().pagination,
  getProductById: (productId) => get().products.find(product => product.id === productId),
  getProductsByCategory: (category) => get().products.filter(product => product.category === category)
}))
