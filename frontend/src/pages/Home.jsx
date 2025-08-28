import { useEffect, useState } from 'react'
import { useProductsStore } from '../stores'
import LoadingSpinner from '../components/LoadingSpinner'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import FeaturedProducts from '../components/FeaturedProducts'
import NewsletterSection from '../components/NewsletterSection'

const Home = () => {
  const { products, loading, error, fetchFeaturedProducts } = useProductsStore()
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    // Mostrar los primeros 4 productos como destacados
    if (products.length > 0) {
      setFeaturedProducts(products.slice(0, 4))
    }
  }, [products])

  if (loading) {
    return <LoadingSpinner text='Cargando productos destacados...' />
  }

  return (
    <div className='fade-in'>
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts
        products={featuredProducts}
        loading={loading}
        error={error}
      />
      <NewsletterSection />
    </div>
  )
}

export default Home
