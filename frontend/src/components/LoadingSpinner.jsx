const LoadingSpinner = ({ size = 'md', text = 'Cargando...', className = '' }) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  }

  return (
    <div className={`d-flex flex-column align-items-center justify-content-center p-4 ${className}`}>
      <div className={`spinner-border text-primary ${sizeClasses[size]}`} role='status'>
        <span className='visually-hidden'>Cargando...</span>
      </div>
      {text && (
        <p className='mt-3 mb-0 text-muted'>{text}</p>
      )}
    </div>
  )
}

export default LoadingSpinner
