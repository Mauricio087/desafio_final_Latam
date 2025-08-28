import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../routes'
import { useAuthStore } from '../stores'
import { useForm } from '../hooks/useForm'
import { useNotification } from '../hooks/useNotification'
import { Eye, EyeSlash, PersonFill, LockFill } from 'react-bootstrap-icons'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, loading, error } = useAuthStore()
  const { addNotification } = useNotification()
  const [showPassword, setShowPassword] = useState(false)

  const from = location.state?.from?.pathname || '/'

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError
  } = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: (values) => {
      const errors = {}

      if (!values.email) {
        errors.email = 'El email es requerido'
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'El email no es válido'
      }

      if (!values.password) {
        errors.password = 'La contraseña es requerida'
      } else if (values.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres'
      }

      return errors
    },
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password)
        toast.success('¡Bienvenido de vuelta!')
        navigate(from, { replace: true })
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Error al iniciar sesión'
        toast.error(errorMessage)

        // Manejar errores específicos
        if (err.response?.status === 401) {
          setFieldError('password', 'Email o contraseña incorrectos')
        } else if (err.response?.status === 404) {
          setFieldError('email', 'Usuario no encontrado')
        }
      }
    }
  })

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-lg-5'>
          <div className='card shadow-lg border-0'>
            <div className='card-body p-5'>
              {/* Header */}
              <div className='text-center mb-4'>
                <h2 className='fw-bold text-primary-custom mb-2'>
                  Iniciar Sesión
                </h2>
                <p className='text-muted'>
                  Accede a tu cuenta para continuar
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Email Field */}
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    <PersonFill className='me-2' />
                    Email
                  </label>
                  <input
                    type='email'
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    id='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='tu@email.com'
                    disabled={isSubmitting || loading}
                  />
                  {touched.email && errors.email && (
                    <div className='invalid-feedback'>
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className='mb-4'>
                  <label htmlFor='password' className='form-label'>
                    <LockFill className='me-2' />
                    Contraseña
                  </label>
                  <div className='input-group'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                      id='password'
                      name='password'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='Tu contraseña'
                      disabled={isSubmitting || loading}
                    />
                    <button
                      type='button'
                      className='btn btn-outline-secondary'
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting || loading}
                    >
                      {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                    </button>
                    {touched.password && errors.password && (
                      <div className='invalid-feedback'>
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className='d-grid mb-3'>
                  <button
                    type='submit'
                    className='btn btn-primary btn-lg'
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading
                      ? (
                        <>
                          <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true' />
                          Iniciando sesión...
                        </>
                        )
                      : (
                          'Iniciar Sesión'
                        )}
                  </button>
                </div>

                {/* Forgot Password Link */}
                <div className='text-center mb-3'>
                  <Link to='/forgot-password' className='text-decoration-none'>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Divider */}
                <hr className='my-4' />

                {/* Register Link */}
                <div className='text-center'>
                  <p className='mb-0'>
                    ¿No tienes una cuenta?{' '}
                    <Link to={ROUTES.REGISTER} className='text-primary-custom text-decoration-none fw-bold'>
                      Regístrate aquí
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className='card mt-3 border-0 bg-light'>
            <div className='card-body text-center py-3'>
              <small className='text-muted'>
                <strong>Demo:</strong> admin@test.com / 123456 (Admin) | user@test.com / 123456 (Usuario)
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
