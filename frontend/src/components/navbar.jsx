import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore, useCartStore } from '../stores'
import { ROUTES } from '../routes'
import { CartFill, PersonFill, BoxArrowRight, House, Shop } from 'react-bootstrap-icons'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { getItemCount } = useCartStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.HOME)
  }

  const cartItemsCount = getItemCount()

  return (
    <nav className='navbar navbar-expand-lg navbar-custom sticky-top'>
      <div className='container'>
        <Link className='navbar-brand fw-bold' to={ROUTES.HOME}>
          <Shop className='me-2' size={24} />
          Tarot Místico
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav me-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to={ROUTES.HOME}>
                <House className='me-1' size={16} />
                Inicio
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to={ROUTES.PRODUCTS}>
                <Shop className='me-1' size={16} />
                Productos
              </Link>
            </li>
          </ul>

          <ul className='navbar-nav'>
            {isAuthenticated
              ? (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link position-relative' to={ROUTES.CART}>
                      <CartFill size={20} />
                      {cartItemsCount > 0 && (
                        <span className='position-absolute top-0 start-100 translate-middle cart-badge'>
                          {cartItemsCount}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className='nav-item dropdown'>
                    <a
                      className='nav-link dropdown-toggle'
                      href='#'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <PersonFill className='me-1' size={16} />
                      {user?.usuario || 'Usuario'}
                    </a>
                    <ul className='dropdown-menu'>
                      <li>
                        <Link className='dropdown-item' to='/profile'>
                          Mi Perfil
                        </Link>
                      </li>
                      <li>
                        <Link className='dropdown-item' to={ROUTES.PURCHASES}>
                          Mis Compras
                        </Link>
                      </li>
                      {user?.rol === 'admin' && (
                        <>
                          <li><hr className='dropdown-divider' /></li>
                          <li>
                            <Link className='dropdown-item' to='/admin'>
                              Panel Admin
                            </Link>
                          </li>
                        </>
                      )}
                      <li><hr className='dropdown-divider' /></li>
                      <li>
                        <button
                          className='dropdown-item'
                          onClick={handleLogout}
                        >
                          <BoxArrowRight className='me-1' size={16} />
                          Cerrar Sesión
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
                )
              : (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to={ROUTES.LOGIN}>
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='btn btn-outline-light ms-2' to={ROUTES.REGISTER}>
                      Registrarse
                    </Link>
                  </li>
                </>
                )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
