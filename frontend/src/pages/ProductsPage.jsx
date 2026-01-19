import { useState, useEffect } from 'react'
import { productService, setTranslationFunction } from '../services/productService'
import ProductCard from '../components/ProductCard/ProductCard'
import SkeletonLoader from '../components/LoadingSpinner/SkeletonLoader'
import { useLanguage } from '../contexts/LanguageContext'
import { FiSearch } from 'react-icons/fi'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const { t } = useLanguage()

  useEffect(() => {
    // Set translation function for productService
    setTranslationFunction(t)
  }, [t])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Check for search query in URL
        const urlParams = new URLSearchParams(window.location.search)
        const searchParam = urlParams.get('search')
        
        if (searchParam) {
          setSearchQuery(searchParam)
          const data = await productService.searchProducts(searchParam)
          const productsList = Array.isArray(data) ? data : (data.data || [])
          setProducts(productsList)
          setFilteredProducts(productsList)
        } else {
        const data = await productService.getAllProducts()
          const productsList = Array.isArray(data) ? data : (data.data || data)
        setProducts(productsList)
        setFilteredProducts(productsList)
        }
      } catch (error) {
        console.error('Failed to load products:', error)
        setProducts([])
        setFilteredProducts([])
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [t])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredProducts(filtered)
    }
  }, [searchQuery, products])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('allProducts')}
        </h1>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10 bg-white"
          />
        </div>
      </div>

      {loading ? (
        <SkeletonLoader count={8} />
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            {searchQuery ? t('noSearchResults') : t('noProductsFound')}
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductsPage

