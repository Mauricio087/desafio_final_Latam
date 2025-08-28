import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'

// Pages
import Home from '../pages/Home'
import Products from '../pages/Products'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Cart from '../pages/Cart'
import Purchases from '../pages/Purchases'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path='products' element={<Products />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

        {/* Protected Routes */}
        <Route
          path='cart' element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
        }
        />
        <Route
          path='purchases' element={
            <ProtectedRoute>
              <Purchases />
            </ProtectedRoute>
        }
        />

        {/* Catch all route */}
        <Route
          path='*' element={
            <div className='container py-5 text-center'>
              <h1>404 - Página no encontrada</h1>
              <p>La página que buscas no existe.</p>
              <a href='/' className='btn btn-primary'>Volver al inicio</a>
            </div>
        }
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes
