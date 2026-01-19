import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { productService, setTranslationFunction } from '../services/productService'
import ProductCard from '../components/ProductCard/ProductCard'
import PaymentMethods from '../components/PaymentMethods/PaymentMethods'
import SkeletonLoader from '../components/LoadingSpinner/SkeletonLoader'
import { useApp } from '../contexts/AppContext'
import { useLanguage } from '../contexts/LanguageContext'
import { FiFacebook } from 'react-icons/fi'

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const { socialLinks, siteConfig } = useApp()
  const { t, language } = useLanguage()

  // Profile data - using translations (memoized to update when language changes)
  const profileData = useMemo(() => ({
    name: t('profileName'),
    imageUrl: "/profile-photo.jpg", // Profile photo path - update this when photo is uploaded
    about: t('profileBio'),
  }), [t, language])

  useEffect(() => {
    // Set translation function for productService
    setTranslationFunction(t)
  }, [t])

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await productService.getAllProducts({ featured: true, limit: 6 })
        setFeaturedProducts(products.data || products)
      } catch (error) {
        console.error('Failed to load featured products:', error)
        setFeaturedProducts([])
      } finally {
        setLoading(false)
      }
    }
    loadFeaturedProducts()
  }, [t])

  return (
    <div className="bg-white min-h-screen">
      {/* Profile Section */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                {!imageError ? (
                  <img
                    src={profileData.imageUrl}
                    alt={profileData.name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-100 shadow-sm"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center border-4 border-gray-100 shadow-sm">
                    <span className="text-white text-3xl md:text-4xl font-bold">
                      {profileData.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {profileData.name}
            </h1>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4 whitespace-pre-line">
                  {profileData.about}
                </p>
                {socialLinks.facebook && (
                <a
                    href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                    <FiFacebook className="w-5 h-5" />
                    <span className="text-sm">Facebook</span>
                </a>
              )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {t('featuredProducts')}
              </h2>
              <p className="text-gray-600">
                {t('featuredDescription')}
              </p>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              <span>{t('seeAllProducts')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <SkeletonLoader count={4} />
          ) : featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center mt-8 md:hidden">
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <span>{t('seeAllProducts')}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">{t('noProductsFound')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PaymentMethods />
        </div>
      </section>
    </div>
  )
}

export default HomePage

