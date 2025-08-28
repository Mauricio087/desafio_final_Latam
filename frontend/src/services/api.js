import axiosInstance from '../config/axios.config.js'

// Configuración base de Axios
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axiosInstance
api.defaults.baseURL = API_BASE_URL

// Interceptor para agregar el token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Servicios de autenticación
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/api/v1/auth/signin', credentials)
    return response.data
  },

  register: async (userData) => {
    const response = await api.post('/api/v1/auth/signup', userData)
    return response.data
  },

  getProfile: async () => {
    const response = await api.get('/api/v1/auth/profile')
    return response.data
  }
}

// Servicios de productos
export const productService = {
  getAll: async () => {
    const response = await api.get('/api/v1/products')
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/api/v1/products/${id}`)
    return response.data
  },

  create: async (productData) => {
    const response = await api.post('/api/v1/products', productData)
    return response.data
  },

  update: async (id, productData) => {
    const response = await api.put(`/api/v1/products/${id}`, productData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/api/v1/products/${id}`)
    return response.data
  }
}

// Servicios del carrito
export const cartService = {
  getCart: async () => {
    const response = await api.get('/api/v1/cart')
    return response.data
  },

  addToCart: async (productData) => {
    const response = await api.post('/api/v1/cart/add', productData)
    return response.data
  },

  updateCartItem: async (updateData) => {
    const response = await api.put('/api/v1/cart/update', updateData)
    return response.data
  },

  removeFromCart: async (productId) => {
    const response = await api.delete(`/api/v1/cart/remove/${productId}`)
    return response.data
  },

  clearCart: async () => {
    const response = await api.delete('/api/v1/cart/clear')
    return response.data
  },

  processPurchase: async () => {
    const response = await api.post('/api/v1/cart/purchase')
    return response.data
  },

  getPurchaseHistory: async () => {
    const response = await api.get('/api/v1/purchases')
    return response.data
  },

  getPurchaseDetail: async (purchaseId) => {
    const response = await api.get(`/api/v1/purchases/${purchaseId}`)
    return response.data
  }
}

export default api
