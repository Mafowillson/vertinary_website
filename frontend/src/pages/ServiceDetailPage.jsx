import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getServiceById } from '../data/mockServices'
import { useLanguage } from '../contexts/LanguageContext'
import { useApp } from '../contexts/AppContext'
import { formatCurrency } from '../utils/formatters'
import { FiArrowLeft, FiMessageCircle, FiCheck } from 'react-icons/fi'

const ServiceDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { socialLinks } = useApp()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const loadService = () => {
      try {
        const data = getServiceById(id, t)
        if (data) {
          setService(data)
        } else {
          // Service not found
        }
      } catch (error) {
        console.error('Failed to load service:', error)
      } finally {
        setLoading(false)
      }
    }
    loadService()
  }, [id, t, language])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-600 text-lg mb-4">{t('serviceNotFound') || 'Service not found'}</p>
        <button onClick={() => navigate('/services')} className="btn-primary">
          {t('backToServices') || 'Back to Services'}
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>{t('back')}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Image */}
          <div className="relative">
            <div className="relative h-96 bg-gradient-to-br from-green-50 to-green-100 rounded-xl overflow-hidden">
              {service.imageUrl && !imageError ? (
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-9xl">{service.icon}</span>
                </div>
              )}
              {service.featured && (
                <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {t('featured')}
                </div>
              )}
            </div>
          </div>

          {/* Service Details */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            
            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Price Section */}
            {service.price ? (
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-green-600">
                    {formatCurrency(service.price)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-600 italic">
                  {t('contactForPricing')}
                </p>
              </div>
            )}

            {/* Features List */}
            {service.features && service.features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('features') || 'Features'}
                </h2>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Section */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t('interestedInThisService') || 'Interested in this service?'}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('contactUsForMoreInfo') || 'Contact us for more information and pricing details.'}
              </p>
              {socialLinks.whatsapp && (
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <FiMessageCircle className="w-5 h-5" />
                  <span>{t('contactWhatsApp') || 'Contact Us on WhatsApp'}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Related Services Section */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('otherServices') || 'Other Services'}
            </h2>
            <Link
              to="/services"
              className="text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              {t('viewAllServices') || 'View All Services'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetailPage
