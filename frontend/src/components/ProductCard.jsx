import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, useCartStore } from '../stores'
import { ROUTES } from '../routes'
import { CartPlus, Eye, Star } from 'react-bootstrap-icons'
import { toast } from 'react-toastify'

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuthStore()
  const { addToCart } = useCartStore()
  const navigate = useNavigate()

  const handleAddToCart = async (e) => {
    e.stopPropagation()

    if (!isAuthenticated) {
      toast.warning('Debes iniciar sesión para agregar productos al carrito')
      navigate(ROUTES.LOGIN)
      return
    }

    if (product.stock <= 0) {
      toast.error('Producto sin stock disponible')
      return
    }

    setLoading(true)
    try {
      const result = await addToCart(product.id, 1)
      if (result.success) {
        toast.success('Producto agregado al carrito')
      } else {
        toast.error(result.message || 'Error al agregar al carrito')
      }
    } catch (error) {
      toast.error('Error al agregar al carrito')
    } finally {
      setLoading(false)
    }
  }

  const handleViewProduct = () => {
    navigate(`/products/${product.id}`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  if (viewMode === 'list') {
    return (
      <div className='col-12 mb-3'>
        <div className='card shadow-sm product-card'>
          <div className='row g-0'>
            <div className='col-md-3'>
              <div className='position-relative'>
                <img
                  src={product.imagen || '/api/placeholder/300/200'}
                  className='img-fluid rounded-start h-100'
                  alt={product.nombre}
                  style={{ objectFit: 'cover', minHeight: '150px' }}
                  onError={(e) => {
                    e.target.src = '/api/placeholder/300/200'
                  }}
                />
                {product.stock <= 0 && (
                  <div className='position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 rounded-start'>
                    <span className='badge bg-danger fs-6'>Sin Stock</span>
                  </div>
                )}
              </div>
            </div>
            <div className='col-md-9'>
              <div className='card-body h-100 d-flex flex-column'>
                <div className='row'>
                  <div className='col-md-8'>
                    <h5 className='card-title'>{product.nombre}</h5>
                    <p className='card-text text-muted'>
                      {product.descripcion || 'Sin descripción disponible'}
                    </p>
                    <div className='mb-2'>
                      {product.stock > 0 && product.stock <= 5 && (
                        <span className='badge bg-warning text-dark me-2'>Últimas unidades</span>
                      )}
                      <span className='badge bg-info'>Stock: {product.stock}</span>
                    </div>
                  </div>
                  <div className='col-md-4 text-end'>
                    <div className='h-100 d-flex flex-column justify-content-between'>
                      <span className='h4 mb-3 text-primary'>
                        {formatPrice(product.precio)}
                      </span>
                      <div className='d-flex gap-2 justify-content-end'>
                        <button
                          className='btn btn-outline-primary btn-sm'
                          onClick={handleViewProduct}
                        >
                          <Eye size={16} className='me-1' />
                          Ver
                        </button>
                        <button
                          className='btn btn-primary btn-sm'
                          onClick={handleAddToCart}
                          disabled={loading || product.stock <= 0 || !isAuthenticated}
                          title={!isAuthenticated ? 'Inicia sesión para comprar' : ''}
                        >
                          {loading
                            ? (
                              <div className='spinner-border spinner-border-sm' role='status'>
                                <span className='visually-hidden'>Cargando...</span>
                              </div>
                              )
                            : (
                              <>
                                <CartPlus size={16} className='me-1' />
                                Añadir
                              </>
                              )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view (default)
  return (
    <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
      <div className='card product-card h-100' onClick={handleViewProduct}>
        <div className='position-relative'>
          <img
            src={product.imagen || '/api/placeholder/300/200'}
            className='card-img-top product-image'
            alt={product.nombre}
            onError={(e) => {
              e.target.src = '/api/placeholder/300/200'
            }}
          />
          {product.stock <= 0 && (
            <div className='position-absolute top-0 end-0 m-2'>
              <span className='badge bg-danger'>Sin Stock</span>
            </div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <div className='position-absolute top-0 end-0 m-2'>
              <span className='badge bg-warning text-dark'>Últimas unidades</span>
            </div>
          )}
        </div>

        <div className='card-body d-flex flex-column'>
          <h6 className='card-title text-truncate' title={product.nombre}>
            {product.nombre}
          </h6>

          <p className='card-text text-muted small flex-grow-1'>
            {product.descripcion && product.descripcion.length > 80
              ? `${product.descripcion.substring(0, 80)}...`
              : product.descripcion || 'Sin descripción disponible'}
          </p>

          <div className='d-flex justify-content-between align-items-center mb-2'>
            <span className='product-price'>
              {formatPrice(product.precio)}
            </span>
            <small className='text-muted'>
              Stock: {product.stock}
            </small>
          </div>

          <div className='d-flex gap-2'>
            <button
              className='btn btn-outline-primary btn-sm flex-grow-1'
              onClick={handleViewProduct}
            >
              <Eye size={16} className='me-1' />
              Ver
            </button>

            <button
              className='btn btn-primary btn-sm'
              onClick={handleAddToCart}
              disabled={loading || product.stock <= 0 || !isAuthenticated}
              title={!isAuthenticated ? 'Inicia sesión para comprar' : ''}
            >
              {loading
                ? (
                  <div className='spinner-border spinner-border-sm' role='status'>
                    <span className='visually-hidden'>Cargando...</span>
                  </div>
                  )
                : (
                  <CartPlus size={16} />
                  )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
