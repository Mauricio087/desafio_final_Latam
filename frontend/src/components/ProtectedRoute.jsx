import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores'
import LoadingSpinner from './LoadingSpinner'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, user, loading } = useAuthStore()
  const location = useLocation()

  // Mostrar spinner mientras se verifica la autenticación
  if (loading) {
    return <LoadingSpinner text='Verificando autenticación...' />
  }

  // Redirigir a login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  // Verificar si requiere permisos de admin
  if (requireAdmin && user?.rol !== 'admin') {
    return (
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='alert alert-danger text-center'>
              <h4>Acceso Denegado</h4>
              <p>No tienes permisos para acceder a esta página.</p>
              <button
                className='btn btn-primary'
                onClick={() => window.history.back()}
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
