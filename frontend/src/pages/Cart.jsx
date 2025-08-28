import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes'
import { useCartStore, useAuthStore } from '../stores'
import LoadingSpinner from '../components/LoadingSpinner'
import { Trash, Plus, Dash, Bag, ArrowLeft, CreditCard } from 'react-bootstrap-icons'
import { toast } from 'react-toastify'

const Cart = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const {
    items,
    total,
    loading,
    updateCartItem,
    removeFromCart,
    clearCart
  } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(productId)
    } else {
      await updateCartItem(productId, newQuantity)
    }
  }

  const handleRemoveItem = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
      await removeFromCart(productId)
      toast.success('Producto eliminado del carrito')
    }
  }

  const handleClearCart = async () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
      await clearCart()
      toast.success('Carrito vaciado')
    }
  }

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para realizar una compra')
      navigate('/login', { state: { from: { pathname: '/cart' } } })
      return
    }

    if (items.length === 0) {
      toast.error('Tu carrito está vacío')
      return
    }

    setIsProcessing(true)
    try {
      await processPurchase()
      toast.success('¡Compra realizada exitosamente!')
      navigate('/purchases')
    } catch (error) {
      toast.error('Error al procesar la compra. Inténtalo de nuevo.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (loading) {
    return <LoadingSpinner text='Cargando carrito...' />
  }

  if (!isAuthenticated) {
    return (
      <div className='container py-5'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='text-center'>
              <Bag size={64} className='text-muted mb-3' />
              <h3 className='mb-3'>Inicia sesión para ver tu carrito</h3>
              <p className='text-muted mb-4'>
                Necesitas una cuenta para guardar productos en tu carrito
              </p>
              <div className='d-flex gap-2 justify-content-center'>
                <Link to={ROUTES.LOGIN} className='btn btn-primary'>
                  Iniciar Sesión
                </Link>
                <Link to={ROUTES.REGISTER} className='btn btn-outline-primary'>
                  Crear Cuenta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container py-4'>
      {/* Header */}
      <div className='row mb-4'>
        <div className='col-12'>
          <div className='d-flex align-items-center mb-3'>
            <Link to={ROUTES.PRODUCTS} className='btn btn-outline-secondary me-3'>
              <ArrowLeft className='me-2' />
              Seguir Comprando
            </Link>
            <h1 className='display-5 fw-bold text-primary-custom mb-0'>
              Mi Carrito
            </h1>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        /* Empty Cart */
        <div className='row'>
          <div className='col-12'>
            <div className='text-center py-5'>
              <Bag size={64} className='text-muted mb-3' />
              <h3 className='mb-3'>Tu carrito está vacío</h3>
              <p className='text-muted mb-4'>
                Descubre nuestros productos esotéricos y añade algunos a tu carrito
              </p>
              <Link to={ROUTES.PRODUCTS} className='btn btn-primary btn-lg'>
                Explorar Productos
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Cart with Items */
        <div className='row'>
          {/* Cart Items */}
          <div className='col-lg-8'>
            <div className='card shadow-sm'>
              <div className='card-header d-flex justify-content-between align-items-center'>
                <h5 className='mb-0'>Productos ({items.length})</h5>
                <button
                  className='btn btn-outline-danger btn-sm'
                  onClick={handleClearCart}
                  disabled={isProcessing}
                >
                  <Trash className='me-1' />
                  Vaciar Carrito
                </button>
              </div>
              <div className='card-body p-0'>
                {items.map((item, index) => (
                  <div key={item.producto.id} className={`p-3 ${index !== items.length - 1 ? 'border-bottom' : ''}`}>
                    <div className='row align-items-center'>
                      {/* Product Image */}
                      <div className='col-md-2'>
                        <img
                          src={item.producto.imagen || '/api/placeholder/100/100'}
                          alt={item.producto.nombre}
                          className='img-fluid rounded'
                          style={{ maxHeight: '80px', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className='col-md-4'>
                        <h6 className='mb-1'>{item.producto.nombre}</h6>
                        <p className='text-muted small mb-1'>{item.producto.categoria}</p>
                        <span className='badge bg-secondary'>
                          Stock: {item.producto.stock}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className='col-md-3'>
                        <div className='input-group input-group-sm'>
                          <button
                            className='btn btn-outline-secondary'
                            type='button'
                            onClick={() => handleQuantityChange(item.producto.id, item.cantidad - 1)}
                            disabled={isProcessing}
                          >
                            <Dash />
                          </button>
                          <input
                            type='number'
                            className='form-control text-center'
                            value={item.cantidad}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value) || 1
                              if (newQuantity <= item.producto.stock) {
                                handleQuantityChange(item.producto.id, newQuantity)
                              }
                            }}
                            min='1'
                            max={item.producto.stock}
                            disabled={isProcessing}
                          />
                          <button
                            className='btn btn-outline-secondary'
                            type='button'
                            onClick={() => handleQuantityChange(item.producto.id, item.cantidad + 1)}
                            disabled={isProcessing || item.cantidad >= item.producto.stock}
                          >
                            <Plus />
                          </button>
                        </div>
                      </div>

                      {/* Price and Remove */}
                      <div className='col-md-3 text-end'>
                        <div className='d-flex flex-column align-items-end'>
                          <span className='fw-bold text-primary-custom'>
                            €{(item.producto.precio * item.cantidad).toFixed(2)}
                          </span>
                          <small className='text-muted'>
                            €{item.producto.precio.toFixed(2)} c/u
                          </small>
                          <button
                            className='btn btn-outline-danger btn-sm mt-2'
                            onClick={() => handleRemoveItem(item.producto.id)}
                            disabled={isProcessing}
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className='col-lg-4'>
            <div className='card shadow-sm sticky-top' style={{ top: '100px' }}>
              <div className='card-header'>
                <h5 className='mb-0'>Resumen del Pedido</h5>
              </div>
              <div className='card-body'>
                <div className='d-flex justify-content-between mb-2'>
                  <span>Subtotal:</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className='d-flex justify-content-between mb-2'>
                  <span>Envío:</span>
                  <span className='text-success'>
                    {total >= 50 ? 'Gratis' : '€5.99'}
                  </span>
                </div>
                <hr />
                <div className='d-flex justify-content-between mb-3'>
                  <strong>Total:</strong>
                  <strong className='text-primary-custom'>
                    €{(total + (total >= 50 ? 0 : 5.99)).toFixed(2)}
                  </strong>
                </div>

                {total < 50 && (
                  <div className='alert alert-info small'>
                    Añade €{(50 - total).toFixed(2)} más para envío gratis
                  </div>
                )}

                <div className='d-grid'>
                  <button
                    className='btn btn-primary btn-lg'
                    onClick={handlePurchase}
                    disabled={isProcessing || items.length === 0}
                  >
                    {isProcessing
                      ? (
                        <>
                          <span className='spinner-border spinner-border-sm me-2' />
                          Procesando...
                        </>
                        )
                      : (
                        <>
                          <CreditCard className='me-2' />
                          Proceder al Pago
                        </>
                        )}
                  </button>
                </div>

                <div className='text-center mt-3'>
                  <small className='text-muted'>
                    Pago seguro con encriptación SSL
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
