import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes'
import { useAuthStore } from '../stores'
import { useForm } from '../hooks/useForm'
import { Eye, EyeSlash, PersonFill, LockFill, EnvelopeFill } from 'react-bootstrap-icons'
import { toast } from 'react-toastify'

const Register = () => {
  const navigate = useNavigate()
  const { register, isAuthenticated, loading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
      nombre: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate: (values) => {
      const errors = {}

      if (!values.nombre) {
        errors.nombre = 'El nombre es requerido'
      } else if (values.nombre.length < 2) {
        errors.nombre = 'El nombre debe tener al menos 2 caracteres'
      }

      if (!values.email) {
        errors.email = 'El email es requerido'
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'El email no es válido'
      }

      if (!values.password) {
        errors.password = 'La contraseña es requerida'
      } else if (values.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres'
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
        errors.password = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirma tu contraseña'
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden'
      }

      return errors
    },
    onSubmit: async (values) => {
      try {
        await register(values.nombre, values.email, values.password)
        toast.success('¡Cuenta creada exitosamente! Bienvenido.')
        navigate(ROUTES.HOME)
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Error al crear la cuenta'
        toast.error(errorMessage)

        // Manejar errores específicos
        if (err.response?.status === 409) {
          setFieldError('email', 'Este email ya está registrado')
        }
      }
    }
  })

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME)
    }
  }, [isAuthenticated, navigate])

  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-lg-5'>
          <div className='card shadow-lg border-0'>
            <div className='card-body p-5'>
              {/* Header */}
              <div className='text-center mb-4'>
                <h2 className='fw-bold text-primary-custom mb-2'>
                  Crear Cuenta
                </h2>
                <p className='text-muted'>
                  Únete a nuestra comunidad esotérica
                </p>
              </div>

              {/* Register Form */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Name Field */}
                <div className='mb-3'>
                  <label htmlFor='nombre' className='form-label'>
                    <PersonFill className='me-2' />
                    Nombre completo
                  </label>
                  <input
                    type='text'
                    className={`form-control ${touched.nombre && errors.nombre ? 'is-invalid' : ''}`}
                    id='nombre'
                    name='nombre'
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Tu nombre completo'
                    disabled={isSubmitting || loading}
                  />
                  {touched.nombre && errors.nombre && (
                    <div className='invalid-feedback'>
                      {errors.nombre}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>
                    <EnvelopeFill className='me-2' />
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
                <div className='mb-3'>
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
                      placeholder='Mínimo 6 caracteres'
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

                {/* Confirm Password Field */}
                <div className='mb-4'>
                  <label htmlFor='confirmPassword' className='form-label'>
                    <LockFill className='me-2' />
                    Confirmar contraseña
                  </label>
                  <div className='input-group'>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                      id='confirmPassword'
                      name='confirmPassword'
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='Repite tu contraseña'
                      disabled={isSubmitting || loading}
                    />
                    <button
                      type='button'
                      className='btn btn-outline-secondary'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isSubmitting || loading}
                    >
                      {showConfirmPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                    </button>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className='invalid-feedback'>
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className='mb-3'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='terms'
                      required
                    />
                    <label className='form-check-label' htmlFor='terms'>
                      Acepto los{' '}
                      <Link to='/terms' className='text-primary-custom text-decoration-none'>
                        términos y condiciones
                      </Link>
                      {' '}y la{' '}
                      <Link to='/privacy' className='text-primary-custom text-decoration-none'>
                        política de privacidad
                      </Link>
                    </label>
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
                          Creando cuenta...
                        </>
                        )
                      : (
                          'Crear Cuenta'
                        )}
                  </button>
                </div>

                {/* Divider */}
                <hr className='my-4' />

                {/* Login Link */}
                <div className='text-center'>
                  <p className='mb-0'>
                    ¿Ya tienes una cuenta?{' '}
                    <Link to={ROUTES.LOGIN} className='text-primary-custom text-decoration-none fw-bold'>
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Security Info */}
          <div className='card mt-3 border-0 bg-light'>
            <div className='card-body text-center py-3'>
              <small className='text-muted'>
                <LockFill className='me-1' />
                Tu información está protegida con encriptación de nivel bancario
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
