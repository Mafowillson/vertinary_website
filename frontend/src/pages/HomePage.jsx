import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productService } from '../services/productService'
import ProductCard from '../components/ProductCard/ProductCard'
import { useApp } from '../contexts/AppContext'
import { useLanguage } from '../contexts/LanguageContext'
import { FiArrowRight, FiMessageCircle } from 'react-icons/fi'

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { socialLinks } = useApp()
  const { t } = useLanguage()

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await productService.getAllProducts({ featured: true, limit: 6 })
        setFeaturedProducts(products.data || products)
      } catch (error) {
        console.error('Failed to load featured products:', error)
        // Mock data for development
        setFeaturedProducts([])
      } finally {
        setLoading(false)
      }
    }
    loadFeaturedProducts()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center space-x-2"
              >
                <span>{t('viewProducts')}</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>
              {socialLinks.whatsapp && (
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center space-x-2"
                >
                  <FiMessageCircle className="w-5 h-5" />
                  <span>{t('contactUs')}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('featuredProducts')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('featuredDescription')}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">{t('noProductsFound')}</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>{t('seeAllProducts')}</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('professionalGuides')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('professionalGuidesDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💾</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('instantDownload')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('instantDownloadDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('securePayment')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('securePaymentDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

