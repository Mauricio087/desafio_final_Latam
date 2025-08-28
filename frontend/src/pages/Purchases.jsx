import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'
import { usePurchasesStore, useAuthStore } from '../stores'
import LoadingSpinner from '../components/LoadingSpinner'
import {
  Receipt,
  Calendar,
  CreditCard,
  Box,
  Eye,
  ArrowLeft,
  CheckCircle,
  Clock,
  Truck,
  Bag
} from 'react-bootstrap-icons'

const Purchases = () => {
  const { isAuthenticated } = useAuthStore()
  const { purchases, loading, error, loadPurchases, getPurchaseDetails } = usePurchasesStore()
  const [selectedPurchase, setSelectedPurchase] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      loadPurchases()
    }
  }, [isAuthenticated, loadPurchases])

  const handleViewDetails = async (purchaseId) => {
    try {
      const details = await getPurchaseDetails(purchaseId)
      setSelectedPurchase(details)
      setShowDetails(true)
    } catch (error) {
      console.error('Error loading purchase details:', error)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completado':
        return <CheckCircle className='text-success' />
      case 'pendiente':
        return <Clock className='text-warning' />
      case 'enviado':
        return <Truck className='text-info' />
      default:
        return <Box className='text-secondary' />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completado':
        return 'Completado'
      case 'pendiente':
        return 'Pendiente'
      case 'enviado':
        return 'Enviado'
      default:
        return 'Desconocido'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAuthenticated) {
    return (
      <div className='container py-5'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='text-center'>
              <Receipt size={64} className='text-muted mb-3' />
              <h3 className='mb-3'>Inicia sesión para ver tus compras</h3>
              <p className='text-muted mb-4'>
                Necesitas una cuenta para acceder a tu historial de compras
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

  if (loading) {
    return <LoadingSpinner text='Cargando historial de compras...' />
  }

  return (
    <div className='container py-4'>
      {/* Header */}
      <div className='row mb-4'>
        <div className='col-12'>
          <div className='d-flex align-items-center mb-3'>
            <Link to={ROUTES.HOME} className='btn btn-outline-secondary me-3'>
              <ArrowLeft className='me-2' />
              Inicio
            </Link>
            <h1 className='display-5 fw-bold text-primary-custom mb-0'>
              Mis Compras
            </h1>
          </div>
        </div>
      </div>

      {error ? (
        <div className='row'>
          <div className='col-12'>
            <div className='alert alert-danger text-center'>
              <h5>Error al cargar las compras</h5>
              <p>{error}</p>
              <button
                className='btn btn-primary'
                onClick={() => loadPurchases()}
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      ) : purchases.length === 0 ? (
        /* No Purchases */
        <div className='row'>
          <div className='col-12'>
            <div className='text-center py-5'>
              <Receipt size={64} className='text-muted mb-3' />
              <h3 className='mb-3'>No tienes compras aún</h3>
              <p className='text-muted mb-4'>
                Explora nuestros productos y realiza tu primera compra
              </p>
              <Link to={ROUTES.PRODUCTS} className='btn btn-primary btn-lg'>
                Explorar Productos
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Purchases List */
        <div className='row'>
          <div className='col-12'>
            {purchases.map((purchase) => (
              <div key={purchase.id} className='card shadow-sm mb-3'>
                <div className='card-body'>
                  <div className='row align-items-center'>
                    {/* Purchase Info */}
                    <div className='col-md-3'>
                      <div className='d-flex align-items-center mb-2'>
                        <Receipt className='text-primary-custom me-2' />
                        <strong>#{purchase.id}</strong>
                      </div>
                      <div className='d-flex align-items-center text-muted small'>
                        <Calendar className='me-1' />
                        {formatDate(purchase.fecha)}
                      </div>
                    </div>

                    {/* Status */}
                    <div className='col-md-2'>
                      <div className='d-flex align-items-center'>
                        {getStatusIcon(purchase.estado)}
                        <span className='ms-2'>{getStatusText(purchase.estado)}</span>
                      </div>
                    </div>

                    {/* Items Count */}
                    <div className='col-md-2'>
                      <div className='d-flex align-items-center'>
                        <Box className='text-muted me-1' />
                        <span>{purchase.productos?.length || 0} productos</span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className='col-md-2'>
                      <div className='d-flex align-items-center'>
                        <CreditCard className='text-success me-1' />
                        <strong className='text-primary-custom'>
                          €{purchase.total?.toFixed(2) || '0.00'}
                        </strong>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className='col-md-3 text-end'>
                      <button
                        className='btn btn-outline-primary btn-sm'
                        onClick={() => handleViewDetails(purchase.id)}
                      >
                        <Eye className='me-1' />
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Purchase Details Modal */}
      {showDetails && selectedPurchase && (
        <div className='modal fade show d-block' tabIndex='-1' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>
                  <Receipt className='me-2' />
                  Detalles de Compra #{selectedPurchase.id}
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={() => setShowDetails(false)}
                />
              </div>
              <div className='modal-body'>
                {/* Purchase Summary */}
                <div className='row mb-4'>
                  <div className='col-md-6'>
                    <h6>Información del Pedido</h6>
                    <p className='mb-1'>
                      <strong>Fecha:</strong> {formatDate(selectedPurchase.fecha)}
                    </p>
                    <p className='mb-1'>
                      <strong>Estado:</strong>
                      <span className='ms-2'>
                        {getStatusIcon(selectedPurchase.estado)}
                        <span className='ms-1'>{getStatusText(selectedPurchase.estado)}</span>
                      </span>
                    </p>
                  </div>
                  <div className='col-md-6 text-end'>
                    <h6>Total del Pedido</h6>
                    <h4 className='text-primary-custom'>
                      €{selectedPurchase.total?.toFixed(2) || '0.00'}
                    </h4>
                  </div>
                </div>

                {/* Products List */}
                <h6>Productos</h6>
                <div className='table-responsive'>
                  <table className='table table-sm'>
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unit.</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPurchase.productos?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className='d-flex align-items-center'>
                              <img
                                src={item.producto?.imagen || '/api/placeholder/40/40'}
                                alt={item.producto?.nombre}
                                className='rounded me-2'
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                              />
                              <div>
                                <div className='fw-bold'>{item.producto?.nombre}</div>
                                <small className='text-muted'>{item.producto?.categoria}</small>
                              </div>
                            </div>
                          </td>
                          <td>{item.cantidad}</td>
                          <td>€{item.precio?.toFixed(2) || '0.00'}</td>
                          <td>€{((item.cantidad || 0) * (item.precio || 0)).toFixed(2)}</td>
                        </tr>
                      )) || (
                        <tr>
                          <td colSpan='4' className='text-center text-muted'>
                            No hay productos disponibles
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setShowDetails(false)}
                >
                  Cerrar
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => window.print()}
                >
                  Imprimir Recibo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Purchases
