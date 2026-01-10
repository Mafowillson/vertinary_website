import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { productService } from '../services/productService'
import { useAuth } from '../contexts/AuthContext'
import { useApp } from '../contexts/AppContext'
import { useLanguage } from '../contexts/LanguageContext'
import CountdownTimer from '../components/CountdownTimer/CountdownTimer'
import { formatCurrency } from '../utils/formatters'
import { FiDownload, FiShoppingCart, FiMessageCircle, FiArrowLeft } from 'react-icons/fi'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { socialLinks } = useApp()
  const { t } = useLanguage()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productService.getProductById(id)
        setProduct(data)
      } catch (error) {
        console.error('Failed to load product:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: `/products/${id}` } })
      return
    }
    navigate(`/checkout/${id}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">{t('productNotFound')}</p>
        <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
          <FiArrowLeft className="w-4 h-4" />
          <span>{t('backToProducts')}</span>
        </Link>
      </div>
    )
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const offerEndDate = product.offerEndDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
      <Link
        to="/products"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-4 md:mb-6 transition-colors text-sm md:text-base"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>{t('backToProducts')}</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Product Image */}
        <div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            ) : (
              <div className="w-full h-64 md:h-96 flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800">
                <span className="text-primary-600 dark:text-primary-400 text-6xl md:text-8xl">📚</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {product.title}
          </h1>

          <div className="flex items-center space-x-4 mb-4 md:mb-6 text-sm md:text-base">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <FiDownload className="w-4 h-4 md:w-5 md:h-5" />
              <span>{t('downloadable')}</span>
            </div>
            {product.purchaseCount && (
              <span className="text-gray-600 dark:text-gray-300 border-l pl-4">
                {product.purchaseCount} {t('purchases')}
              </span>
            )}
          </div>

          {/* Sales Progress */}
          {product.stock && (
            <div className="mb-4 md:mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-300 font-medium">{t('sold')}: {product.sold || 0}</span>
                <span className="text-gray-600 dark:text-gray-300 font-medium">{t('remaining')}: {product.stock}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
                <div
                  className="bg-accent-400 h-2 md:h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${((product.sold || 0) / (product.sold + product.stock)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Limited Time Offer */}
          {product.offerEndDate && (
            <div className="mb-4 md:mb-6">
              <span className="inline-block bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-3 py-1 rounded text-xs md:text-sm font-semibold mb-3 md:mb-4">
                {t('limitedOffer')}
              </span>
              <CountdownTimer targetDate={offerEndDate} />
            </div>
          )}

          {/* Pricing */}
          <div className="mb-4 md:mb-6">
            {product.originalPrice && (
              <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 line-through mb-1">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
            <p className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-1">
              {formatCurrency(product.price)}
            </p>
            {discountPercentage > 0 && (
              <p className="text-green-600 dark:text-green-400 font-semibold text-sm md:text-base">
                {t('saveMoney')} {discountPercentage}%
              </p>
            )}
          </div>

          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            className="w-full btn-primary flex items-center justify-center space-x-2 mb-4"
          >
            <FiShoppingCart className="w-5 h-5" />
            <span>{t('downloadNow')}</span>
          </button>

          {/* WhatsApp Contact */}
          {socialLinks.whatsapp && (
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <FiMessageCircle className="w-5 h-5" />
              <span>{t('contactWhatsApp')}</span>
            </a>
          )}

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">{t('description')}</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {product.description || t('noDescriptionAvailable')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage

