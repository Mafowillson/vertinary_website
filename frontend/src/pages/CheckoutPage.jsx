import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService } from '../services/productService'
import { orderService } from '../services/orderService'
import { formatCurrency } from '../utils/formatters'
import PaymentMethods from '../components/PaymentMethods/PaymentMethods'
import { useLanguage } from '../contexts/LanguageContext'
import { FiArrowLeft, FiCreditCard, FiAlertCircle } from 'react-icons/fi'

const CheckoutPage = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

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
  }, [productId])

  const handlePayment = async () => {
    setProcessing(true)
    setError('')

    try {
      // Create order
      const order = await orderService.createOrder({
        productId: product.id,
        amount: product.price,
      })

      if (!order || !order.id) {
        throw new Error('Failed to create order')
      }

      // Process payment (this would integrate with payment gateway)
      const paymentResult = await orderService.processPayment(order.id, {
        paymentMethod: 'online', // This would be selected by user
      })

      if (paymentResult && paymentResult.success) {
        navigate(`/purchase-confirmation/${order.id}`)
      } else {
        setError(t('paymentFailed'))
      }
    } catch (err) {
      console.error('Payment error:', err)
      // Show user-friendly error message
      const errorMessage = err.response?.data?.message || err.message || t('paymentError')
      setError(errorMessage)
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-600 text-lg mb-4">{error || t('productNotFound')}</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          {t('backToProducts')}
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-6 transition-colors"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>{t('back')}</span>
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('finalizePurchase')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">{t('orderSummary')}</h2>
            <div className="flex items-start space-x-4 mb-4">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">📚</span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{product.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.description?.substring(0, 100)}...</p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">{t('paymentMethods')}</h2>
            <PaymentMethods />
          </div>
        </div>

        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h2 className="text-xl font-semibold mb-4">{t('paymentDetails')}</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center space-x-2">
                <FiAlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>{t('price')}</span>
                <span>{formatCurrency(product.price)}</span>
              </div>
              {product.originalPrice && (
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>{t('reduction')}</span>
                  <span>-{formatCurrency(product.originalPrice - product.price)}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <span>{t('total')}</span>
                <span className="text-green-600">{formatCurrency(product.price)}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiCreditCard className="w-5 h-5" />
              <span>{processing ? t('processing') : t('payNow')}</span>
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              {t('securePaymentNote')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

