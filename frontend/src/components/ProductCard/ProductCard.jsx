import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatters'
import { useLanguage } from '../../contexts/LanguageContext'
import { FiShoppingCart, FiClock } from 'react-icons/fi'
import { useCountdown } from '../../utils/countdown'

const ProductCard = ({ product }) => {
  const { t } = useLanguage()
  
  const imageUrl = product.image_url || product.imageUrl
  const price = product.price
  const originalPrice = product.original_price || product.originalPrice
  
  // Discount information - handle both field names (offer_end_date from backend, discount_end_date from mock)
  const discountEndDate = product.discount_end_date || product.discountEndDate || product.offer_end_date || product.offerEndDate
  const hasDiscountDate = discountEndDate && new Date(discountEndDate) > new Date()
  const { timeLeft, isExpired } = useCountdown(hasDiscountDate ? discountEndDate : null)
  // Show discount if originalPrice > price, even without an end date (but if there's an end date, it must be valid)
  const hasActiveDiscount = originalPrice && price < originalPrice && (!discountEndDate || (hasDiscountDate && !isExpired))
  const discountPercentage = hasActiveDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0
  
  // Determine format badge (mock - would come from product data)
  const format = product.format || 'PDF Guide'
  const formatBadge = {
    'PDF Guide': { text: 'PDF', color: 'bg-green-600' },
    'Video Lecture': { text: 'VIDEO', color: 'bg-blue-600' },
    'E-book': { text: 'E-BOOK', color: 'bg-orange-500' }
  }[format] || { text: 'PDF', color: 'bg-green-600' }

  // Determine category (mock - would come from product data)
  const category = product.category || 'LIVESTOCK HEALTH'
  
  // Check if bestseller
  const isBestseller = product.bestseller || (product.purchase_count || product.sold || 0) > 50

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
              <span className="text-green-600 text-4xl">📚</span>
            </div>
          )}
          
          {/* Format Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <span className={`${formatBadge.color} text-white text-xs font-semibold px-2 py-1 rounded`}>
              {formatBadge.text}
            </span>
            
            {/* Discount Badge */}
            {hasActiveDiscount && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">
                -{discountPercentage}%
              </span>
            )}
          </div>
          
          {/* Bestseller Badge */}
          {isBestseller && (
            <div className="absolute top-3 right-3">
              <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                BESTSELLER
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {/* Category */}
        <p className="text-green-600 text-xs font-semibold uppercase mb-2">
          {category}
        </p>
        
        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-green-600 transition-colors min-h-[2.5rem]">
            {product.title}
          </h3>
        </Link>

        {/* Discount Countdown - only show if there's a discount end date */}
        {hasActiveDiscount && discountEndDate && hasDiscountDate && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <FiClock className="w-3 h-3 text-red-600" />
              <span className="text-xs font-semibold text-red-600">Offre expire dans:</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {timeLeft.days > 0 && (
                <span className="font-bold text-red-700">{timeLeft.days}j</span>
              )}
              <span className="font-bold text-red-700">
                {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
            </div>
          </div>
        )}

        {/* Price and Cart */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {originalPrice && hasActiveDiscount && (
              <span className="text-xs text-gray-400 line-through mb-1">
                {formatCurrency(originalPrice)}
              </span>
            )}
            <span className={`text-lg font-bold ${hasActiveDiscount ? 'text-red-600' : 'text-gray-900'}`}>
              {formatCurrency(price)}
            </span>
          </div>
          <button className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center transition-colors shadow-md hover:shadow-lg">
            <FiShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
