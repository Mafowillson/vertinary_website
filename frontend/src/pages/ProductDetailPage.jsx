import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { productService, setTranslationFunction } from '../services/productService'
import { useAuth } from '../contexts/AuthContext'
import { useApp } from '../contexts/AppContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useCart } from '../contexts/CartContext'
import CountdownTimer from '../components/CountdownTimer/CountdownTimer'
import { formatCurrency } from '../utils/formatters'
import { 
  FiDownload, 
  FiShoppingCart, 
  FiMessageCircle, 
  FiArrowLeft, 
  FiStar,
  FiCheck,
  FiShield,
  FiClock,
  FiZap,
  FiBookOpen,
  FiFileText,
  FiVideo,
  FiShare2,
  FiHeart,
  FiPlus
} from 'react-icons/fi'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { socialLinks } = useApp()
  const { t } = useLanguage()
  const { addToCart, isInCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('description')
  const [imageZoom, setImageZoom] = useState(false)
  const [cartAdded, setCartAdded] = useState(false)

  useEffect(() => {
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

  const handleAddToCart = () => {
    if (!product) return
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: `/products/${id}` } })
      return
    }
    
    // Prepare product data for cart (handle both API and mock formats)
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      original_price: product.original_price || product.originalPrice,
      image_url: product.image_url || product.imageUrl,
      imageUrl: product.image_url || product.imageUrl,
      description: product.description,
      category: product.category,
      format: product.format || 'PDF Guide',
    }
    
    addToCart(cartProduct)
    setCartAdded(true)
    
    // Reset the added state after 2 seconds
    setTimeout(() => setCartAdded(false), 2000)
  }

  // Handle both API format and mock format
  const originalPrice = product?.original_price || product?.originalPrice
  const imageUrl = product?.image_url || product?.imageUrl
  const price = product?.price
  const description = product?.description

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement du produit...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiFileText className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('detail.productNotFound', { ns: 'product' })}</h2>
          <p className="text-gray-600 mb-6">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>{t('detail.backToProducts', { ns: 'product' })}</span>
          </Link>
        </div>
      </div>
    )
  }

  // Handle both field names (offer_end_date from backend, discount_end_date from mock)
  const discountEndDate = product.discount_end_date || product.discountEndDate || product.offer_end_date || product.offerEndDate
  const discountPercentage = originalPrice && price < originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0
  // Show discount if originalPrice > price, even without an end date (but if there's an end date, it must be valid)
  const hasActiveDiscount = discountPercentage > 0 && (!discountEndDate || new Date(discountEndDate) > new Date())
  
  // Determine format
  const format = product.format || 'PDF Guide'
  const formatIcon = format === 'Video Lecture' ? FiVideo : format === 'E-book' ? FiBookOpen : FiFileText
  const FormatIcon = formatIcon

  // Calculate rating (mock - would come from reviews)
  const rating = 4.8
  const reviewCount = product.purchase_count || product.purchaseCount || 0
  const downloadCount =
    product.download_count ??
    product.downloadCount ??
    product.sold ??
    product.purchase_count ??
    product.purchaseCount ??
    0

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors group"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Retour aux produits</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Image Section */}
          <div className="relative">
            <div className="lg:sticky lg:top-24">
              <div 
                className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 group cursor-zoom-in"
                onClick={() => setImageZoom(!imageZoom)}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className={`w-full h-64 sm:h-80 md:h-96 lg:h-[600px] object-cover transition-transform duration-300 ${imageZoom ? 'scale-110' : 'group-hover:scale-105'}`}
                  />
                ) : (
                  <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[600px] flex items-center justify-center bg-gradient-to-br from-green-100 via-green-50 to-green-100">
                    <span className="text-green-600 text-6xl sm:text-8xl">📚</span>
                  </div>
                )}
                
                {/* Discount Badge Overlay */}
                {hasActiveDiscount && (
                  <div className="absolute top-3 left-3 sm:top-6 sm:left-6">
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-1.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl shadow-2xl transform -rotate-3 animate-pulse">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FiZap className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="font-bold text-sm sm:text-lg">-{discountPercentage}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Format Badge */}
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shadow-lg flex items-center gap-1 sm:gap-2">
                    <FormatIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span className="font-semibold text-gray-900 text-xs sm:text-sm">{format}</span>
                  </div>
                </div>

                {/* Favorite Button */}
                <button className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110">
                  <FiHeart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
              </div>

              {/* Share Button */}
              <div className="mt-4 flex items-center justify-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                  <FiShare2 className="w-4 h-4" />
                  <span>Partager</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>
              
              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-gray-700 font-semibold">{rating}</span>
                </div>
                <span className="text-sm text-gray-600 tabular-nums">
                  {downloadCount.toLocaleString()} vendus
                </span>
              </div>

              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-green-700 font-semibold text-sm">
                  {product.category || 'RESSOURCE VÉTÉRINAIRE'}
                </span>
              </div>
            </div>

            {/* Limited Time Discount Banner */}
            {hasActiveDiscount && discountEndDate && (
              <div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl transform hover:scale-[1.02] transition-transform">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <FiZap className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl">OFFRE LIMITÉE</h3>
                      <p className="text-red-50 text-xs sm:text-sm">Économisez {formatCurrency(originalPrice - price)}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl sm:text-3xl font-bold">{discountPercentage}%</div>
                    <div className="text-xs sm:text-sm text-red-50">DE RÉDUCTION</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 flex items-center gap-2">
                    <FiClock className="w-3 h-3 sm:w-4 sm:h-4" />
                    Cette offre expire dans:
                  </p>
                  <CountdownTimer targetDate={discountEndDate} />
                </div>
              </div>
            )}

            {/* Pricing Card */}
            <div className={`rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border-2 transition-all ${
              hasActiveDiscount 
                ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300' 
                : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
            }`}>
              <div className="space-y-3 sm:space-y-4">
                {originalPrice && hasActiveDiscount && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl text-gray-400 line-through font-medium">
                      {formatCurrency(originalPrice)}
                    </span>
                    <span className="bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm font-bold">
                      ÉCONOMISEZ {formatCurrency(originalPrice - price)}
                    </span>
                  </div>
                )}
                
                <div className="flex flex-wrap items-baseline gap-3 sm:gap-4">
                  <span className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${hasActiveDiscount ? 'text-red-600' : 'text-green-600'}`}>
                    {formatCurrency(price)}
                  </span>
                  {hasActiveDiscount && (
                    <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-1 sm:px-5 sm:py-2 rounded-lg sm:rounded-xl text-lg sm:text-xl lg:text-2xl font-bold shadow-lg">
                      -{discountPercentage}%
                    </span>
                  )}
                </div>

                {hasActiveDiscount && (
                  <p className="text-red-700 font-semibold text-lg flex items-center gap-2">
                    <FiZap className="w-5 h-5" />
                    Prix promotionnel - Offre expire bientôt!
                  </p>
                )}
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <FiDownload className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-semibold text-gray-900 text-sm">Téléchargement</p>
                <p className="text-gray-600 text-xs">Immédiat</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <FiShield className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-semibold text-gray-900 text-sm">Garantie</p>
                <p className="text-gray-600 text-xs">Satisfait ou remboursé</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <FiCheck className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-semibold text-gray-900 text-sm">Format</p>
                <p className="text-gray-600 text-xs">{format}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handlePurchase}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                >
                  <FiDownload className="w-6 h-6" />
                  <span>{t('detail.downloadNow', { ns: 'product' })}</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={!product || cartAdded || (product && isInCart(product.id))}
                  className={`w-full font-bold py-5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg ${
                    !product || cartAdded || (product && isInCart(product.id))
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                  }`}
                >
                  {cartAdded || (product && isInCart(product.id)) ? (
                    <>
                      <FiCheck className="w-6 h-6" />
                      <span>{product && isInCart(product.id) ? t('detail.inCart', { ns: 'product' }) : t('detail.addedToCart', { ns: 'product' })}</span>
                    </>
                  ) : (
                    <>
                      <FiPlus className="w-6 h-6" />
                      <span>{t('detail.addToCart', { ns: 'product' })}</span>
                    </>
                  )}
                </button>
              </div>

              {socialLinks.whatsapp && (
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <FiMessageCircle className="w-5 h-5" />
                  <span>{t('services.contactWhatsApp', { ns: 'common' })}</span>
                </a>
              )}
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-around text-center">
                <div>
                  <FiShield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 font-medium">Paiement sécurisé</p>
                </div>
                <div>
                  <FiDownload className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 font-medium">Accès immédiat</p>
                </div>
                <div>
                  <FiCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 font-medium">Garantie qualité</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description and Details Tabs */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 font-semibold text-sm transition-colors border-b-2 ${
                  activeTab === 'description'
                    ? 'border-green-600 text-green-600 bg-white'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`px-6 py-4 font-semibold text-sm transition-colors border-b-2 ${
                  activeTab === 'details'
                    ? 'border-green-600 text-green-600 bg-white'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Détails
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 font-semibold text-sm transition-colors border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-green-600 text-green-600 bg-white'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Avis ({reviewCount})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                  {description || t('detail.noDescriptionAvailable', { ns: 'product' })}
                </p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FormatIcon className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Format</p>
                      <p className="text-gray-600">{format}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiDownload className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Téléchargement</p>
                      <p className="text-gray-600">Immédiat après achat</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiDownload className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Ventes</p>
                      <p className="text-gray-600 tabular-nums">{downloadCount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FiShield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Garantie</p>
                      <p className="text-gray-600">Satisfait ou remboursé sous 30 jours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiCheck className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Qualité</p>
                      <p className="text-gray-600">Contenu vérifié et approuvé</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiStar className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Note</p>
                      <p className="text-gray-600">{rating}/5.0 basé sur {reviewCount} {reviewCount === 1 ? 'avis' : 'avis'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <FiStar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">Aucun avis pour le moment</p>
                <p className="text-gray-500">Soyez le premier à laisser un avis sur ce produit!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
