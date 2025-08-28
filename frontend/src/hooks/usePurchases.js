import { useState, useEffect } from 'react'
import { cartService } from '../services/api'
import { useAuth } from '../context/AuthContext'

/**
 * Hook personalizado para manejar el historial de compras
 */
export const usePurchases = () => {
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { isAuthenticated } = useAuth()

  const loadPurchases = async () => {
    if (!isAuthenticated) return

    try {
      setLoading(true)
      setError(null)
      const response = await cartService.getPurchaseHistory()

      if (response.success) {
        setPurchases(response.data)
      } else {
        setError(response.message || 'Error al cargar el historial de compras')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  const getPurchaseDetail = async (purchaseId) => {
    try {
      setLoading(true)
      setError(null)
      const response = await cartService.getPurchaseDetail(purchaseId)

      if (response.success) {
        return response.data
      } else {
        setError(response.message || 'Error al cargar el detalle de la compra')
        return null
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error de conexión')
      return null
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  // Cargar compras cuando el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated) {
      loadPurchases()
    } else {
      setPurchases([])
    }
  }, [isAuthenticated])

  return {
    purchases,
    loading,
    error,
    loadPurchases,
    getPurchaseDetail,
    clearError
  }
}

export default usePurchases
