import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { productService } from '../services/productService'
import { orderService } from '../services/orderService'
import { formatCurrency } from '../utils/formatters'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import StripePaymentForm from '../components/PaymentForms/StripePaymentForm'
import FlutterwavePaymentForm from '../components/PaymentForms/FlutterwavePaymentForm'
import { 
  FiArrowLeft, 
  FiCreditCard, 
  FiAlertCircle, 
  FiMail, 
  FiShield, 
  FiCheck,
  FiArrowRight,
  FiLock
} from 'react-icons/fi'

const CheckoutPage = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { user, isAuthenticated } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState(user?.email || '')
  const [paymentMethod, setPaymentMethod] = useState('stripe') // 'stripe' or 'flutterwave'
  const [paymentData, setPaymentData] = useState(null)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productService.getProductById(productId)
        setProduct(data)
      } catch (err) {
        setError(t('productNotFound'))
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [productId, t])

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email)
    }
  }, [user])

  const handlePaymentSubmit = async (data) => {
    setPaymentData(data)
    setProcessing(true)
    setError('')

    try {
      // Validate email
      if (!email || !email.includes('@')) {
        setError(t('invalidEmail') || 'Please enter a valid email address')
        setProcessing(false)
        return
      }

      // Create order
      const order = await orderService.createOrder({
        productId: product.id,
        amount: product.price,
      })

      if (!order || !order.id) {
        throw new Error('Failed to create order')
      }

      // Process payment based on method
      const paymentResult = await orderService.processPayment(order.id, {
        paymentMethod: data.method === 'stripe' ? 'online' : 'mobile_money',
        paymentProvider: data.method,
        paymentData: data,
        email: email,
      })

      if (paymentResult && paymentResult.success) {
        navigate(`/purchase-confirmation/${order.id}`)
      } else {
        setError(t('paymentFailed'))
      }
    } catch (err) {
      console.error('Payment error:', err)
      const errorMessage = err.response?.data?.message || err.message || t('paymentError')
      setError(errorMessage)
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center bg-gray-50 min-h-screen">
        <p className="text-gray-600 text-lg mb-4">{error || t('productNotFound')}</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          {t('backToProducts')}
        </button>
      </div>
    )
  }

  const subtotal = product.price
  const taxes = 0
  const total = subtotal + taxes

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>{t('back')}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Contact and Payment Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{t('contactInformation')}</h2>
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    {t('alreadyHaveAccount')} {t('logIn')}
                  </Link>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={isAuthenticated}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('paymentMethod')}</h2>
              
              {/* Payment Method Tabs */}
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setPaymentMethod('stripe')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    paymentMethod === 'stripe'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t('creditDebitCard')}
                </button>
                <button
                  onClick={() => setPaymentMethod('flutterwave')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    paymentMethod === 'flutterwave'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t('mobileMoney') || 'Mobile Money'}
                </button>
              </div>

              {/* Payment Form */}
              <div className="mt-4">
                {paymentMethod === 'stripe' ? (
                  <StripePaymentForm 
                    onPaymentSubmit={handlePaymentSubmit}
                    processing={processing}
                  />
                ) : (
                  <FlutterwavePaymentForm 
                    onPaymentSubmit={handlePaymentSubmit}
                    processing={processing}
                  />
                )}
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiShield className="w-5 h-5 text-green-600" />
                <span className="font-semibold">{t('secureSslEncryption')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-green-600 font-bold">+</span>
                </div>
                <span className="font-semibold">{t('hipaaCompliant')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-green-600">★</span>
                </div>
                <span className="font-semibold">{t('moneyBackGuarantee')}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('orderSummary')}</h2>
              
              {/* Product Info */}
              <div className="flex items-start space-x-4 mb-6 pb-6 border-b">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">📚</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{product.title}</h3>
                  <p className="text-xs text-gray-600">
                    {product.type === 'digital' ? 'Digital Access' : 'Physical Product'} • {product.pages || '150+'} Pages
                  </p>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center space-x-2">
                  <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{t('subtotal')}</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('taxes')}</span>
                  <span>{formatCurrency(taxes)}</span>
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>{t('reduction')}</span>
                    <span className="text-green-600">-{formatCurrency(product.originalPrice - product.price)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>{t('total')}</span>
                  <span className="text-green-600">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Complete Purchase Button */}
              <button
                type="button"
                onClick={() => {
                  // Trigger form submission
                  const form = document.querySelector('form')
                  if (form) {
                    form.requestSubmit()
                  } else {
                    // If no form found, validate and submit directly
                    if (!email || !email.includes('@')) {
                      setError(t('invalidEmail') || 'Please enter a valid email address')
                      return
                    }
                    handlePaymentSubmit({
                      method: paymentMethod,
                      cardData: paymentMethod === 'stripe' ? {} : null,
                      phoneNumber: paymentMethod === 'flutterwave' ? '' : null,
                    })
                  }
                }}
                disabled={processing}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <span>{processing ? t('processing') : t('completePurchase')}</span>
                {!processing && <FiArrowRight className="w-5 h-5" />}
              </button>

              {/* Legal Text */}
              <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
                {t('byCompletingPurchase')}{' '}
                <Link to="/terms" className="text-green-600 hover:underline">
                  {t('termsOfService')}
                </Link>{' '}
                {t('and')}{' '}
                <Link to="/privacy" className="text-green-600 hover:underline">
                  {t('privacyPolicy')}
                </Link>
                .
              </p>

              {/* Security Assurance */}
              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-600 bg-green-50 rounded-lg p-3">
                <FiLock className="w-4 h-4 text-green-600" />
                <span className="text-center">{t('weNeverStoreCardDetails')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
