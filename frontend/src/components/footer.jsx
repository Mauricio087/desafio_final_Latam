import { Heart, Envelope, Telephone, GeoAlt } from 'react-bootstrap-icons'

const Footer = () => {
  return (
    <footer className='footer mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 col-md-6 mb-4'>
            <h5 className='text-accent mb-3'>Tarot Místico</h5>
            <p className='text-light mb-3'>
              Tu tienda de confianza para productos esotéricos y de tarot.
              Descubre el misterio y la sabiduría ancestral.
            </p>
            <div className='d-flex flex-column'>
              <div className='mb-2'>
                <GeoAlt className='me-2' size={16} />
                <small>Calle Mística 123, Ciudad Esotérica</small>
              </div>
              <div className='mb-2'>
                <Telephone className='me-2' size={16} />
                <small>+1 (555) 123-4567</small>
              </div>
              <div className='mb-2'>
                <Envelope className='me-2' size={16} />
                <small>info@tarotmistico.com</small>
              </div>
            </div>
          </div>

          <div className='col-lg-2 col-md-6 mb-4'>
            <h6 className='text-accent mb-3'>Enlaces</h6>
            <ul className='list-unstyled'>
              <li className='mb-2'>
                <a href='/' className='text-light text-decoration-none'>
                  Inicio
                </a>
              </li>
              <li className='mb-2'>
                <a href='/products' className='text-light text-decoration-none'>
                  Productos
                </a>
              </li>
              <li className='mb-2'>
                <a href='/about' className='text-light text-decoration-none'>
                  Acerca de
                </a>
              </li>
              <li className='mb-2'>
                <a href='/contact' className='text-light text-decoration-none'>
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className='col-lg-3 col-md-6 mb-4'>
            <h6 className='text-accent mb-3'>Categorías</h6>
            <ul className='list-unstyled'>
              <li className='mb-2'>
                <span className='text-light'>Cartas de Tarot</span>
              </li>
              <li className='mb-2'>
                <span className='text-light'>Cristales</span>
              </li>
              <li className='mb-2'>
                <span className='text-light'>Inciensos</span>
              </li>
              <li className='mb-2'>
                <span className='text-light'>Velas</span>
              </li>
              <li className='mb-2'>
                <span className='text-light'>Amuletos</span>
              </li>
            </ul>
          </div>

          <div className='col-lg-3 col-md-6 mb-4'>
            <h6 className='text-accent mb-3'>Información</h6>
            <ul className='list-unstyled'>
              <li className='mb-2'>
                <a href='/privacy' className='text-light text-decoration-none'>
                  Política de Privacidad
                </a>
              </li>
              <li className='mb-2'>
                <a href='/terms' className='text-light text-decoration-none'>
                  Términos y Condiciones
                </a>
              </li>
              <li className='mb-2'>
                <a href='/shipping' className='text-light text-decoration-none'>
                  Envíos y Devoluciones
                </a>
              </li>
              <li className='mb-2'>
                <a href='/faq' className='text-light text-decoration-none'>
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className='my-4' style={{ borderColor: '#666' }} />

        <div className='row align-items-center'>
          <div className='col-md-6'>
            <p className='text-light mb-0'>
              &copy; {new Date().getFullYear()} Tarot Místico. Todos los derechos reservados.
            </p>
          </div>
          <div className='col-md-6 text-md-end'>
            <p className='text-light mb-0'>
              Hecho con <Heart className='text-danger mx-1' size={16} /> para los amantes del misterio
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
