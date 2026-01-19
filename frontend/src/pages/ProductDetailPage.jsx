import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { productService, setTranslationFunction } from '../services/productService'
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
    // Set translation function for productService
    setTranslationFunction(t)
  }, [t])

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
  }, [id, t])

  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: `/products/${id}` } })
      return
    }
    navigate(`/checkout/${id}`)
  }

  // Handle both API format and mock format
  const originalPrice = product?.original_price || product?.originalPrice
  const imageUrl = product?.image_url || product?.imageUrl
  const price = product?.price
  const description = product?.description

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center bg-white min-h-screen">
        <p className="text-gray-600 text-lg mb-4">{t('productNotFound')}</p>
        <Link to="/products" className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
          <FiArrowLeft className="w-4 h-4" />
          <span>{t('backToProducts')}</span>
        </Link>
      </div>
    )
  }

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const offerEndDate = product.offer_end_date || product.offerEndDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 bg-white min-h-screen">
      <Link
        to="/products"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-6 transition-colors text-sm md:text-base group"
      >
        <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>{t('backToProducts')}</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="sticky top-20 self-start">
          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.title}
                className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
              />
            ) : (
              <div className="w-full h-64 md:h-96 lg:h-[500px] flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
                <span className="text-green-600 text-6xl md:text-8xl">📚</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center space-x-4 mb-6 text-sm md:text-base">
            <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
              <FiDownload className="w-4 h-4 md:w-5 md:h-5" />
              <span>{t('downloadable')}</span>
            </div>
            {(product.purchase_count || product.purchaseCount) && (
              <span className="text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                {product.purchase_count || product.purchaseCount} {t('purchases')}
              </span>
            )}
          </div>

          {/* Sales Progress */}
          {(product.stock || product.stock === 0) && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">{t('sold')}: {product.sold || 0}</span>
                <span className="text-gray-700 font-medium">{t('remaining')}: {product.stock}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${((product.sold || 0) / ((product.sold || 0) + product.stock)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Limited Time Offer */}
          {offerEndDate && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <span className="inline-block bg-red-600 text-white px-3 py-1 rounded text-xs md:text-sm font-semibold mb-3">
                {t('limitedOffer')}
              </span>
              <CountdownTimer targetDate={offerEndDate} />
            </div>
          )}

          {/* Pricing */}
          <div className="mb-6 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
            {originalPrice && (
              <p className="text-lg text-gray-500 line-through mb-2">
                {formatCurrency(originalPrice)}
              </p>
            )}
            <div className="flex items-baseline space-x-3">
              <p className="text-4xl md:text-5xl font-bold text-green-600">
                {formatCurrency(price)}
              </p>
              {discountPercentage > 0 && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{discountPercentage}%
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <p className="text-green-600 font-semibold text-sm mt-2">
                {t('saveMoney')} {discountPercentage}%
              </p>
            )}
          </div>

          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 mb-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FiMessageCircle className="w-5 h-5" />
              <span>{t('contactWhatsApp')}</span>
            </a>
          )}

          {/* Description */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">{t('description')}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {description || t('noDescriptionAvailable')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage

