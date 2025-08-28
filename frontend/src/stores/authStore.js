import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '../services/api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null,

      // Acciones
      setLoading: (loading) => set({ loading, error: null }),

      setError: (error) => set({ error, loading: false }),

      clearError: () => set({ error: null }),

      login: async (credentials) => {
        try {
          set({ loading: true, error: null })

          const response = await authService.login(credentials)

          if (response.success) {
            const { token, user } = response.data

            set({
              isAuthenticated: true,
              user,
              token,
              loading: false,
              error: null
            })

            return { success: true }
          } else {
            set({
              isAuthenticated: false,
              user: null,
              token: null,
              loading: false,
              error: response.message || 'Error en el inicio de sesión'
            })

            return { success: false, message: response.message }
          }
        } catch (error) {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            loading: false,
            error: error.message || 'Error en el inicio de sesión'
          })

          return { success: false, message: error.message }
        }
      },

      register: async (userData) => {
        try {
          set({ loading: true, error: null })

          const response = await authService.register(userData)

          if (response.success) {
            const { token, user } = response.data

            set({
              isAuthenticated: true,
              user,
              token,
              loading: false,
              error: null
            })

            return { success: true }
          } else {
            set({
              loading: false,
              error: response.message || 'Error en el registro'
            })

            return { success: false, message: response.message }
          }
        } catch (error) {
          set({
            loading: false,
            error: error.message || 'Error en el registro'
          })

          return { success: false, message: error.message }
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false,
          error: null
        })
      },

      updateProfile: async (profileData) => {
        try {
          set({ loading: true, error: null })

          const response = await authService.updateProfile(profileData)

          if (response.success) {
            const { user } = response.data

            set({
              user,
              loading: false,
              error: null
            })

            return { success: true }
          } else {
            set({
              loading: false,
              error: response.message || 'Error al actualizar perfil'
            })

            return { success: false, message: response.message }
          }
        } catch (error) {
          set({
            loading: false,
            error: error.message || 'Error al actualizar perfil'
          })

          return { success: false, message: error.message }
        }
      },

      // Getters
      getUser: () => get().user,
      getToken: () => get().token,
      getIsAuthenticated: () => get().isAuthenticated,
      getLoading: () => get().loading,
      getError: () => get().error
    }),
    {
      name: 'auth-storage', // nombre para localStorage
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token
      })
    }
  )
)
