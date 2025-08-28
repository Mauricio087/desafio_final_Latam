import { useState } from 'react'

/**
 * Hook personalizado para manejar formularios
 * @param {Object} initialValues - Valores iniciales del formulario
 * @param {Function} validate - Función de validación opcional
 */
export const useForm = (initialValues = {}, validate = null) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setValues(prev => ({
      ...prev,
      [name]: newValue
    }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))

    // Validar campo individual si hay función de validación
    if (validate) {
      const fieldErrors = validate({ [name]: values[name] })
      if (fieldErrors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: fieldErrors[name]
        }))
      }
    }
  }

  const handleSubmit = async (onSubmit) => {
    setIsSubmitting(true)
    setTouched(
      Object.keys(values).reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {})
    )

    // Validar todo el formulario
    if (validate) {
      const formErrors = validate(values)
      setErrors(formErrors)

      if (Object.keys(formErrors).length > 0) {
        setIsSubmitting(false)
        return
      }
    }

    try {
      await onSubmit(values)
    } catch (error) {
      console.error('Error en el envío del formulario:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }

  const setFieldValue = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const setFieldError = (name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError
  }
}

export default useForm
