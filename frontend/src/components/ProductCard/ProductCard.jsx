import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatters'
import { useLanguage } from '../../contexts/LanguageContext'

const ProductCard = ({ product }) => {
  const { t } = useLanguage()
  
  // Handle both API format (original_price, image_url) and mock format (originalPrice, imageUrl)
  const originalPrice = product.original_price || product.originalPrice
  const imageUrl = product.image_url || product.imageUrl
  const price = product.price
  
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group transform hover:-translate-y-1">
        <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 group-hover:from-green-200 group-hover:to-green-300 transition-colors">
              <span className="text-green-600 text-4xl group-hover:scale-110 transition-transform">📚</span>
              </div>
            )}
            {discountPercentage > 0 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                -{discountPercentage}%
              </div>
            )}
          </div>
        </Link>

      <div className="p-5">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors min-h-[3rem] leading-snug">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {originalPrice && (
              <p className="text-xs text-gray-400 line-through mb-1">
                {formatCurrency(originalPrice)}
              </p>
            )}
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

