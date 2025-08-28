// Exportar todos los stores
export { useAuthStore } from './authStore'
export { useCartStore } from './cartStore'
export { useProductsStore } from './productsStore'
export { usePurchasesStore } from './purchasesStore'

// También exportar hooks personalizados para facilitar el uso
export const useAuth = () => useAuthStore()
export const useCart = () => useCartStore()
export const useProducts = () => useProductsStore()
export const usePurchases = () => usePurchasesStore()
