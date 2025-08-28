import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'

const HeroSection = () => {
  return (
    <section className='bg-gradient-custom text-white py-5'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6'>
            <h1 className='display-4 fw-bold mb-4'>
              Descubre el Misterio del Tarot
            </h1>
            <p className='lead mb-4'>
              Explora nuestra colección única de cartas de tarot, cristales,
              inciensos y productos esotéricos. Conecta con tu sabiduría interior
              y descubre los secretos del universo.
            </p>
            <div className='d-flex gap-3'>
              <Link to={ROUTES.PRODUCTS} className='btn btn-light btn-lg'>
                Ver Productos
              </Link>
              <Link to='/about' className='btn btn-outline-light btn-lg'>
                Conoce Más
              </Link>
            </div>
          </div>
          <div className='col-lg-6 text-center'>
            <img
              src='/api/placeholder/500/400'
              alt='Tarot Cards'
              className='img-fluid rounded shadow-lg'
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
