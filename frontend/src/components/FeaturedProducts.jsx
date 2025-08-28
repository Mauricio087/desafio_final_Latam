import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'
import ProductCard from './ProductCard'

const FeaturedProducts = ({ products, loading, error }) => {
  if (error) {
    return (
      <section className='py-5 bg-light'>
        <div className='container'>
          <div className='row mb-5'>
            <div className='col-12 text-center'>
              <h2 className='display-5 fw-bold text-primary-custom mb-3'>
                Productos Destacados
              </h2>
              <p className='lead text-muted'>
                Descubre nuestra selección especial de productos más populares
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <div className='alert alert-warning text-center'>
                <h5>No se pudieron cargar los productos</h5>
                <p>{error}</p>
                <button
                  className='btn btn-primary'
                  onClick={() => window.location.reload()}
                >
                  Intentar de nuevo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-5 bg-light'>
      <div className='container'>
        <div className='row mb-5'>
          <div className='col-12 text-center'>
            <h2 className='display-5 fw-bold text-primary-custom mb-3'>
              Productos Destacados
            </h2>
            <p className='lead text-muted'>
              Descubre nuestra selección especial de productos más populares
            </p>
          </div>
        </div>

        <div className='row'>
          {products.length > 0
            ? (
                products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              )
            : (
              <div className='col-12 text-center'>
                <p className='text-muted'>No hay productos disponibles en este momento.</p>
                <Link to={ROUTES.PRODUCTS} className='btn btn-primary'>
                  Ver todos los productos
                </Link>
              </div>
              )}
        </div>

        {products.length > 0 && (
          <div className='row mt-4'>
            <div className='col-12 text-center'>
              <Link to={ROUTES.PRODUCTS} className='btn btn-outline-primary btn-lg'>
                Ver Todos los Productos
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedProducts
