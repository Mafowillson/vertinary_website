import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { formatCurrency } from '../../utils/formatters'
import { FiArrowRight } from 'react-icons/fi'

const ServiceCard = ({ service }) => {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Service Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              // Show icon when image fails to load
              const iconElement = e.target.nextElementSibling
              if (iconElement) {
                iconElement.style.display = 'flex'
              }
            }}
          />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center" style={{ display: service.imageUrl ? 'none' : 'flex' }}>
          <span className="text-6xl">{service.icon}</span>
        </div>
        {service.featured && (
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
            {t('featured')}
          </div>
        )}
      </div>

      {/* Service Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {service.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {service.description}
        </p>

        {/* Features List */}
        {service.features && service.features.length > 0 && (
          <ul className="space-y-2 mb-4">
            {service.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <span className="text-green-600 mr-2">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Price or Contact */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          {service.price ? (
            <div className="text-lg font-bold text-green-600">
              {formatCurrency(service.price)}
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">
              {t('contactForPricing')}
            </div>
          )}
          <Link
            to={`/services/${service.id}`}
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
          >
            <span>{t('learnMore')}</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
