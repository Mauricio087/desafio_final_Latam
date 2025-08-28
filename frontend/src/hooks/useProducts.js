import { useState, useEffect } from 'react'
import { productService } from '../services/api'

/**
 * Hook personalizado para manejar productos
 */
export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await productService.getAll()

      if (response.success) {
        setProducts(response.data)
      } else {
        setError(response.message || 'Error al cargar productos')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  const getProductById = async (id) => {
    try {
      setLoading(true)
      setError(null)
      const response = await productService.getById(id)

      if (response.success) {
        return response.data
      } else {
        setError(response.message || 'Error al cargar producto')
        return null
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error de conexión')
      return null
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (productData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await productService.create(productData)

      if (response.success) {
        await loadProducts() // Recargar lista
        return { success: true, data: response.data }
      } else {
        setError(response.message || 'Error al crear producto')
        return { success: false, message: response.message }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error de conexión'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (id, productData) => {
    try {
      setLoading(true)
      setError(null)
      const response = await productService.update(id, productData)

      if (response.success) {
        await loadProducts() // Recargar lista
        return { success: true, data: response.data }
      } else {
        setError(response.message || 'Error al actualizar producto')
        return { success: false, message: response.message }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error de conexión'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id) => {
    try {
      setLoading(true)
      setError(null)
      const response = await productService.delete(id)

      if (response.success) {
        await loadProducts() // Recargar lista
        return { success: true }
      } else {
        setError(response.message || 'Error al eliminar producto')
        return { success: false, message: response.message }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error de conexión'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  // Cargar productos al montar el hook
  useEffect(() => {
    loadProducts()
  }, [])

  return {
    products,
    loading,
    error,
    loadProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    clearError
  }
}

export default useProducts
