import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { orderService } from '../services/orderService'
import { FiCheck, FiCopy, FiDownload, FiMessageCircle } from 'react-icons/fi'
import { useApp } from '../contexts/AppContext'

const PurchaseConfirmationPage = () => {
  const { orderId } = useParams()
  const { socialLinks } = useApp()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await orderService.getOrderById(orderId)
        setOrder(data)
      } catch (error) {
        console.error('Failed to load order:', error)
      } finally {
        setLoading(false)
      }
    }
    loadOrder()
  }, [orderId])

  const copyOrderNumber = () => {
    if (order?.orderNumber) {
      navigator.clipboard.writeText(order.orderNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-600 text-lg">Commande non trouvée</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Success Icon */}
      <div className="text-center mb-6 md:mb-8">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl md:text-4xl">👏</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terminé</h1>
        <p className="text-lg md:text-xl text-gray-600">Merci pour votre achat !</p>
      </div>

      {/* Order Number */}
      <div className="card mb-4 md:mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs md:text-sm text-gray-600 mb-1">Commande:</p>
            <p className="text-base md:text-lg font-semibold text-gray-900 break-all">{order.orderNumber}</p>
          </div>
          <button
            onClick={copyOrderNumber}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-2 flex-shrink-0"
            title="Copier le numéro de commande"
          >
            <FiCopy className={`w-5 h-5 ${copied ? 'text-green-600' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="card bg-gray-50 mb-6">
        <h2 className="text-lg font-semibold mb-4">Instructions</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <FiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">
              <span className="font-semibold text-red-600">Merci pour ton achat !</span>
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl">👏</span>
            <p className="text-gray-700">
              Félicitations ! Tu viens de faire un excellent choix en investissant dans{' '}
              <span className="bg-primary-100 px-2 py-1 rounded font-semibold">
                {order.product?.title || 'ce produit'}.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Download Link */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold mb-4">Télécharger votre document</h2>
        <p className="text-gray-600 mb-4">
          Cliquez sur le bouton ci-dessous pour télécharger votre fichier.
        </p>
        <Link
          to={`/download/${orderId}`}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <FiDownload className="w-5 h-5" />
          <span>Télécharger maintenant</span>
        </Link>
      </div>

      {/* WhatsApp Support */}
      {socialLinks.whatsapp && (
        <div className="card bg-green-50 border border-green-200">
          <div className="flex items-start space-x-3 mb-4">
            <FiMessageCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Besoin d'aide ?
              </h3>
              <p className="text-gray-700 mb-4">
                Clique ici pour nous écrire sur WhatsApp en cas de problème:
              </p>
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-semibold underline"
              >
                {socialLinks.whatsapp}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PurchaseConfirmationPage

