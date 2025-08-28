import { useState, useEffect, useMemo } from 'react'
import { useProductsStore } from '../stores'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { Search, Filter, Grid, List } from 'react-bootstrap-icons'

const Products = () => {
  const { products, loading, error, fetchProducts } = useProductsStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [viewMode, setViewMode] = useState('grid')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.categoria))]
    return uniqueCategories.filter(Boolean)
  }, [products])

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || product.categoria === selectedCategory
      const matchesPrice = (!priceRange.min || product.precio >= parseFloat(priceRange.min)) &&
                          (!priceRange.max || product.precio <= parseFloat(priceRange.max))

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Ordenar productos
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case 'precio':
          aValue = a.precio
          bValue = b.precio
          break
        case 'stock':
          aValue = a.stock
          bValue = b.stock
          break
        default:
          aValue = a.nombre.toLowerCase()
          bValue = b.nombre.toLowerCase()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [products, searchTerm, selectedCategory, sortBy, sortOrder, priceRange])

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setPriceRange({ min: '', max: '' })
    setSortBy('name')
    setSortOrder('asc')
  }

  if (loading) {
    return <LoadingSpinner text='Cargando productos...' />
  }

  return (
    <div className='container py-4'>
      {/* Header */}
      <div className='row mb-4'>
        <div className='col-12'>
          <h1 className='display-5 fw-bold text-primary-custom mb-3'>
            Nuestros Productos
          </h1>
          <p className='lead text-muted'>
            Explora nuestra colección completa de productos esotéricos
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className='row mb-4'>
        <div className='col-12'>
          <div className='card shadow-sm'>
            <div className='card-body'>
              <div className='row g-3'>
                {/* Search */}
                <div className='col-lg-4'>
                  <div className='input-group'>
                    <span className='input-group-text'>
                      <Search size={16} />
                    </span>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Buscar productos...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className='col-lg-2'>
                  <select
                    className='form-select'
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value=''>Todas las categorías</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className='col-lg-3'>
                  <div className='row g-1'>
                    <div className='col-6'>
                      <input
                        type='number'
                        className='form-control form-control-sm'
                        placeholder='Precio mín'
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      />
                    </div>
                    <div className='col-6'>
                      <input
                        type='number'
                        className='form-control form-control-sm'
                        placeholder='Precio máx'
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Sort */}
                <div className='col-lg-2'>
                  <select
                    className='form-select'
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-')
                      setSortBy(field)
                      setSortOrder(order)
                    }}
                  >
                    <option value='nombre-asc'>Nombre A-Z</option>
                    <option value='nombre-desc'>Nombre Z-A</option>
                    <option value='precio-asc'>Precio menor</option>
                    <option value='precio-desc'>Precio mayor</option>
                    <option value='stock-desc'>Stock mayor</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className='col-lg-1'>
                  <button
                    className='btn btn-outline-secondary w-100'
                    onClick={handleClearFilters}
                    title='Limpiar filtros'
                  >
                    <Filter size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Info and View Toggle */}
      <div className='row mb-3'>
        <div className='col-md-6'>
          <p className='text-muted mb-0'>
            Mostrando {filteredProducts.length} de {products.length} productos
          </p>
        </div>
        <div className='col-md-6 text-end'>
          <div className='btn-group' role='group'>
            <button
              type='button'
              className={`btn btn-outline-secondary ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </button>
            <button
              type='button'
              className={`btn btn-outline-secondary ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {error
        ? (
          <div className='row'>
            <div className='col-12'>
              <div className='alert alert-danger text-center'>
                <h5>Error al cargar productos</h5>
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
          )
        : filteredProducts.length === 0
          ? (
            <div className='row'>
              <div className='col-12'>
                <div className='text-center py-5'>
                  <h4 className='text-muted mb-3'>No se encontraron productos</h4>
                  <p className='text-muted mb-4'>
                    Intenta ajustar los filtros de búsqueda
                  </p>
                  <button
                    className='btn btn-primary'
                    onClick={handleClearFilters}
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            </div>
            )
          : (
            <div className={`row ${viewMode === 'list' ? 'row-cols-1' : ''}`}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>
            )}

      {/* Load More Button (for future pagination) */}
      {filteredProducts.length > 0 && filteredProducts.length >= 12 && (
        <div className='row mt-4'>
          <div className='col-12 text-center'>
            <button className='btn btn-outline-primary btn-lg'>
              Cargar más productos
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
