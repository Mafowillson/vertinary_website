import { useState, useEffect } from 'react'
import { productService } from '../services/productService'
import ProductCard from '../components/ProductCard/ProductCard'
import { useLanguage } from '../contexts/LanguageContext'
import { FiSearch } from 'react-icons/fi'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const { t } = useLanguage()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getAllProducts()
        const productsList = data.data || data
        setProducts(productsList)
        setFilteredProducts(productsList)
      } catch (error) {
        console.error('Failed to load products:', error)
        setProducts([])
        setFilteredProducts([])
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
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
            className="input-field pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {searchQuery ? t('noSearchResults') : t('noProductsFound')}
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductsPage

