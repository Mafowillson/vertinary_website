import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatters'
import { useLanguage } from '../../contexts/LanguageContext'
import { FiDownload, FiShoppingCart } from 'react-icons/fi'

const ProductCard = ({ product }) => {
  const { t } = useLanguage()
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
      <div className="card hover:shadow-lg transition-shadow duration-200">
        <Link to={`/products/${product.id}`}>
          <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800">
                <span className="text-primary-600 dark:text-primary-400 text-4xl">📚</span>
              </div>
            )}
          </div>
        </Link>

      <div>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FiDownload className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{t('downloadable')}</span>
          </div>
          {product.purchaseCount && (
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {product.purchaseCount} {t('purchases')}
            </span>
          )}
        </div>

        {product.stock && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-300">{t('sold')}: {product.sold || 0}</span>
              <span className="text-gray-600 dark:text-gray-300">{t('remaining')}: {product.stock}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-accent-400 h-2 rounded-full"
                style={{
                  width: `${((product.sold || 0) / (product.sold + product.stock)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
            <p className="text-xl font-bold text-primary-600">
              {formatCurrency(product.price)}
            </p>
          </div>
          {discountPercentage > 0 && (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
              -{discountPercentage}%
            </span>
          )}
        </div>

        <Link
          to={`/products/${product.id}`}
          className="mt-4 btn-primary w-full flex items-center justify-center space-x-2"
        >
          <FiShoppingCart className="w-4 h-4" />
          <span>{t('viewDetails')}</span>
        </Link>
      </div>
    </div>
  )
}

export default ProductCard

