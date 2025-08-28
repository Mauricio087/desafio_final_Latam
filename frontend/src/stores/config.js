// Configuración para Zustand
export const storeConfig = {
  // Configuración de persistencia
  persist: {
    // Versión del store para migraciones
    version: 1,
    // Función para migrar datos entre versiones
    migrate: (persistedState, version) => {
      if (version === 1) {
        // Migración de la versión 1
        return persistedState
      }
      return persistedState
    }
  },
  
  // Configuración de devtools (solo en desarrollo)
  devtools: process.env.NODE_ENV === 'development',
  
  // Configuración de middleware
  middleware: {
    // Logging en desarrollo
    log: process.env.NODE_ENV === 'development',
    // Immer para actualizaciones inmutables
    immer: false
  }
}

// Función helper para crear stores con configuración estándar
export const createStore = (initializer, options = {}) => {
  const config = {
    ...storeConfig,
    ...options
  }
  
  return initializer(config)
}
