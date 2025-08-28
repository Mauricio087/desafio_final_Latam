// Route configuration
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  LOGIN: '/login',
  REGISTER: '/register',
  CART: '/cart',
  PURCHASES: '/purchases'
}

// Route metadata for navigation and other purposes
export const ROUTE_CONFIG = {
  [ROUTES.HOME]: {
    title: 'Inicio',
    isPublic: true,
    showInNav: true
  },
  [ROUTES.PRODUCTS]: {
    title: 'Productos',
    isPublic: true,
    showInNav: true
  },
  [ROUTES.LOGIN]: {
    title: 'Iniciar Sesión',
    isPublic: true,
    showInNav: false
  },
  [ROUTES.REGISTER]: {
    title: 'Registrarse',
    isPublic: true,
    showInNav: false
  },
  [ROUTES.CART]: {
    title: 'Carrito',
    isPublic: false,
    showInNav: true
  },
  [ROUTES.PURCHASES]: {
    title: 'Mis Compras',
    isPublic: false,
    showInNav: true
  }
}

// Helper functions
export const getRouteTitle = (path) => {
  return ROUTE_CONFIG[path]?.title || 'Página'
}

export const isPublicRoute = (path) => {
  return ROUTE_CONFIG[path]?.isPublic || false
}

export const shouldShowInNav = (path) => {
  return ROUTE_CONFIG[path]?.showInNav || false
}
