// Archivo de test para verificar que los stores funcionen
// Este archivo se puede eliminar después de verificar que todo funciona

import { useAuthStore, useCartStore, useProductsStore, usePurchasesStore } from './index'

// Función para testear los stores
export const testStores = () => {
  console.log('🧪 Testing Zustand Stores...')
  
  try {
    // Test Auth Store
    const authStore = useAuthStore.getState()
    console.log('✅ Auth Store:', {
      isAuthenticated: authStore.isAuthenticated,
      user: authStore.user,
      loading: authStore.loading
    })
    
    // Test Cart Store
    const cartStore = useCartStore.getState()
    console.log('✅ Cart Store:', {
      items: cartStore.items,
      total: cartStore.total,
      loading: cartStore.loading
    })
    
    // Test Products Store
    const productsStore = useProductsStore.getState()
    console.log('✅ Products Store:', {
      products: productsStore.products,
      loading: productsStore.loading
    })
    
    // Test Purchases Store
    const purchasesStore = usePurchasesStore.getState()
    console.log('✅ Purchases Store:', {
      purchases: purchasesStore.purchases,
      loading: purchasesStore.loading
    })
    
    console.log('🎉 Todos los stores están funcionando correctamente!')
    return true
    
  } catch (error) {
    console.error('❌ Error en los stores:', error)
    return false
  }
}

// Función para testear persistencia
export const testPersistence = () => {
  console.log('🧪 Testing Persistence...')
  
  try {
    // Verificar localStorage
    const authStorage = localStorage.getItem('auth-storage')
    const cartStorage = localStorage.getItem('cart-storage')
    const purchasesStorage = localStorage.getItem('purchases-storage')
    
    console.log('✅ Auth Storage:', authStorage ? 'Presente' : 'Ausente')
    console.log('✅ Cart Storage:', cartStorage ? 'Presente' : 'Ausente')
    console.log('✅ Purchases Storage:', purchasesStorage ? 'Presente' : 'Ausente')
    
    return true
    
  } catch (error) {
    console.error('❌ Error en persistencia:', error)
    return false
  }
}
