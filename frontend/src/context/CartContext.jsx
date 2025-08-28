import { createContext, useContext, useReducer, useEffect } from 'react'
import { cartService } from '../services/api'
import { useAuth } from './AuthContext'

const CartContext = createContext()

// Estados del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
        loading: false,
        error: null
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        loading: false
      }
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        loading: false
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        loading: false
      }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        loading: false
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const { isAuthenticated } = useAuth()

  // Cargar carrito cuando el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated) {
      loadCart()
    } else {
      // Limpiar carrito si no está autenticado
      dispatch({ type: 'CLEAR_CART' })
    }
  }, [isAuthenticated])

  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await cartService.getCart()

      if (response.success) {
        dispatch({
          type: 'SET_CART',
          payload: response.data
        })
      }
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Error al cargar el carrito'
      })
    }
  }

  const addToCart = async (productId, cantidad = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await cartService.addToCart({ producto_id: productId, cantidad })

      if (response.success) {
        // Recargar carrito después de agregar
        await loadCart()
        return { success: true }
      } else {
        dispatch({
          type: 'SET_ERROR',
          payload: response.message || 'Error al agregar al carrito'
        })
        return { success: false, message: response.message }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al agregar al carrito'
      dispatch({
        type: 'SET_ERROR',
        payload: errorMessage
      })
      return { success: false, message: errorMessage }
    }
  }

  const updateCartItem = async (productId, cantidad) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await cartService.updateCartItem({ producto_id: productId, cantidad })

      if (response.success) {
        await loadCart()
        return { success: true }
      } else {
        dispatch({
          type: 'SET_ERROR',
          payload: response.message || 'Error al actualizar el carrito'
        })
        return { success: false, message: response.message }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al actualizar el carrito'
      dispatch({
        type: 'SET_ERROR',
        payload: errorMessage
      })
      return { success: false, message: errorMessage }
    }
  }

  const removeFromCart = async (productId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await cartService.removeFromCart(productId)

      if (response.success) {
        await loadCart()
        return { success: true }
      } else {
        dispatch({
          type: 'SET_ERROR',
          payload: response.message || 'Error al eliminar del carrito'
        })
        return { success: false, message: response.message }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al eliminar del carrito'
      dispatch({
        type: 'SET_ERROR',
        payload: errorMessage
      })
      return { success: false, message: errorMessage }
    }
  }

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await cartService.clearCart()

      if (response.success) {
        dispatch({ type: 'CLEAR_CART' })
        return { success: true }
      } else {
        dispatch({
          type: 'SET_ERROR',
          payload: response.message || 'Error al vaciar el carrito'
        })
        return { success: false, message: response.message }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al vaciar el carrito'
      dispatch({
        type: 'SET_ERROR',
        payload: errorMessage
      })
      return { success: false, message: errorMessage }
    }
  }

  const processPurchase = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await cartService.processPurchase()

      if (response.success) {
        dispatch({ type: 'CLEAR_CART' })
        return { success: true, data: response.data }
      } else {
        dispatch({
          type: 'SET_ERROR',
          payload: response.message || 'Error al procesar la compra'
        })
        return { success: false, message: response.message }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al procesar la compra'
      dispatch({
        type: 'SET_ERROR',
        payload: errorMessage
      })
      return { success: false, message: errorMessage }
    }
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.cantidad, 0)
  }

  const value = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    processPurchase,
    clearError,
    getCartItemsCount,
    loadCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider')
  }
  return context
}

export default CartContext
