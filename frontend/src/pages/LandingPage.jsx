import { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiShoppingCart, FiArrowRight, FiCheckCircle, FiYoutube, FiFacebook, FiPhone, FiClock } from 'react-icons/fi'
import { categories, featuredResources, founderData } from '../data/mockHomePage'
import { formatCurrency } from '../utils/formatters'
import { useCountdown } from '../utils/countdown'
import { getServices } from '../data/mockServices'
import { useLanguage } from '../contexts/LanguageContext'
import ServiceCard from '../components/ServiceCard/ServiceCard'

// Featured Resource Card Component
const FeaturedResourceCard = ({ resource }) => {
  const originalPrice = resource.originalPrice || resource.original_price
  // Handle both field names (offer_end_date from backend, discount_end_date from mock)
  const discountEndDate = resource.discountEndDate || resource.discount_end_date || resource.offer_end_date || resource.offerEndDate
  const hasDiscountDate = discountEndDate && new Date(discountEndDate) > new Date()
  const { timeLeft, isExpired } = useCountdown(hasDiscountDate ? discountEndDate : null)
  // Show discount if originalPrice > price, even without an end date (but if there's an end date, it must be valid)
  const hasActiveDiscount = originalPrice && resource.price < originalPrice && (!discountEndDate || (hasDiscountDate && !isExpired))
  const discountPercentage = hasActiveDiscount
    ? Math.round(((originalPrice - resource.price) / originalPrice) * 100)
    : 0

  const handleCartClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // TODO: Add to cart functionality can be added here later
  }

  return (
    <Link
      to={`/products/${resource.id}`}
      className={`block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border-2 cursor-pointer ${hasActiveDiscount ? 'border-red-300' : 'border-gray-100'}`}
    >
      <div className="relative">
        <img
          src={resource.imageUrl}
          alt={resource.title}
          className="w-full h-40 sm:h-48 object-cover"
        />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5 sm:gap-2">
          <span className="bg-green-600 text-white text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs">
            {resource.tag}
          </span>
          {hasActiveDiscount && (
            <span className="bg-red-600 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded animate-pulse text-[10px] sm:text-xs">
              -{discountPercentage}%
            </span>
          )}
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem]">
          {resource.title}
        </h3>
        
        {/* Discount Countdown */}
        {hasActiveDiscount && (
          <div className="mb-2 sm:mb-3 p-1.5 sm:p-2 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-1 mb-1">
              <FiClock className="w-3 h-3 text-red-600" />
              <span className="text-xs font-semibold text-red-600">Expire dans:</span>
            </div>
            <div className="text-xs font-bold text-red-700">
              {timeLeft.days > 0 && `${timeLeft.days}j `}
              {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0 flex-1">
            {originalPrice && hasActiveDiscount && (
              <span className="text-xs text-gray-400 line-through mb-0.5 sm:mb-1">
                {formatCurrency(originalPrice)}
              </span>
            )}
            <span className={`text-lg sm:text-xl font-bold ${hasActiveDiscount ? 'text-red-600' : 'text-gray-900'}`}>
              {formatCurrency(resource.price)}
            </span>
          </div>
          <button
            onClick={handleCartClick}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center transition-colors shadow-md hover:shadow-lg flex-shrink-0"
          >
            <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </Link>
  )
}

const LandingPage = () => {
  const location = useLocation()
  const { t, language } = useLanguage()

  // Get services with translations - ensure it updates when language changes
  const services = useMemo(() => {
    return getServices(t)
  }, [t, language])

  // Get featured services (first 4)
  const featuredServices = useMemo(() => {
    return services.slice(0, 4)
  }, [services])

  useEffect(() => {
    // Handle hash navigation when component mounts or hash changes
    if (location.hash) {
      const hash = location.hash.substring(1) // Remove the '#'
      const element = document.getElementById(hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location.hash])

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Verified Content Expert Badge */}
              <div className="mb-3 sm:mb-4">
                <button className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-50 hover:bg-green-100 border border-green-200 rounded-full text-xs sm:text-sm font-semibold text-green-700 transition-colors">
                  <FiCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Verified Content Expert</span>
                </button>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Expert Veterinary Resources at Your{' '}
                <span className="text-green-600">Fingertips</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Partageons nos connaissances en élevage avec les Camerounais et le monde entier. Accédez à des livres spécialisés, des formations en ligne et des ressources certifiées en médecine vétérinaire pour éleveurs et professionnels, où que vous soyez.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  to="/products"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors text-center text-sm sm:text-base"
                >
                  Parcourir les Ressources
                </Link>
                <Link
                  to="/about"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-800 rounded-lg font-semibold transition-colors text-center text-sm sm:text-base"
                >
                  Comment ça marche
                </Link>
              </div>

              {/* User Count */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <span className="text-gray-600 text-xs sm:text-sm">Rejoignez 5,000+ éleveurs & professionnels</span>
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-500 border-2 border-white"></div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block w-full">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gradient-to-br from-green-50/30 to-white">
                <img
                  src="/profile-photo.jpg"
                  alt="Veterinarian with tablet"
                  className="w-full h-[500px] md:h-[600px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section id="categories" className="py-12 sm:py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Parcourir par Catégorie
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">Contenu spécialisé pour tous vos besoins vétérinaires.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-all cursor-pointer"
              >
                {/* Icon Container */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-50 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  {category.id === 1 && (
                    // Paw Print Icon
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2.5 6c.83 0 1.5.67 1.5 1.5S10.33 11 9.5 11 8 10.33 8 9.5 8.67 8 9.5 8zm5 0c.83 0 1.5.67 1.5 1.5S15.33 11 14.5 11 13 10.33 13 9.5 13.67 8 14.5 8zM12 7.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"/>
                    </svg>
                  )}
                  {category.id === 2 && (
                    // Tractor Icon
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.5 12c0-1.58-1.05-2.94-2.51-3.38L16 8h-2l-.99 2.62C12.55 11.06 11.58 12 10.5 12s-2.05-.94-2.51-2.38L7 8H5l-.99.62C2.55 9.06 1.5 10.42 1.5 12s1.05 2.94 2.51 3.38L5 16h2l.99-2.62C8.45 12.94 9.42 12 10.5 12s2.05.94 2.51 2.38L14 16h2l.99-.62C18.45 14.94 19.5 13.58 19.5 12zM3.66 14.47L2 13.5v-3l1.66-.97 1.66.97v3l-1.66.97zm16.68 0L20 13.5v-3l1.66-.97 1.66.97v3l-1.66.97z"/>
                    </svg>
                  )}
                  {category.id === 3 && (
                    // Briefcase with Plus/Cross
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-6h16v6zm0-8H4V8h16v3z"/>
                      <path d="M12 10v4m-2-2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    </svg>
                  )}
                  {category.id === 4 && (
                    // Heart Icon
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">{category.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources Section */}
      <section id="resources" className="py-12 sm:py-16 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ressources en Vedette
            </h2>
            <p className="text-green-600 text-sm sm:text-base md:text-lg italic max-w-2xl mx-auto px-4">
              "Une connaissance de qualité se traduit par de meilleurs soins. Explorez nos meilleures ressources numériques sélectionnées par des experts."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredResources.map((resource) => (
              <FeaturedResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-xs sm:text-sm"
            >
              <span>Voir tout</span>
              <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t('services') || 'Nos Services'}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
              {t('servicesDescription') || 'Découvrez notre gamme complète de services pour éleveurs et professionnels de l\'élevage.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              <span>{t('viewAllServices') || 'Voir tous les services'}</span>
              <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="about" className="py-12 sm:py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
              {/* Founder Image */}
              <div className="md:col-span-1">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={founderData.imageUrl}
                    alt={founderData.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Founder Info */}
              <div className="md:col-span-2">
                <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded mb-3 sm:mb-4">
                  {founderData.role}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {founderData.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {founderData.description}
                </p>
                
                {/* Achievements */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {founderData.achievements.map((achievement, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-green-600 font-bold text-base sm:text-lg">{achievement.label}</span>
                      <span className="text-gray-600 text-xs sm:text-sm">{achievement.value}</span>
                    </div>
                  ))}
                </div>

                {/* Social Media Links */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <a
                    href={founderData.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors text-sm sm:text-base"
                  >
                    <FiYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">YouTube</span>
                  </a>
                  <a
                    href={founderData.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base"
                  >
                    <FiFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">Facebook</span>
                  </a>
                  <a
                    href={founderData.socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors text-sm sm:text-base"
                  >
                    <FiPhone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">WhatsApp</span>
                  </a>
                </div>

                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold text-sm sm:text-base"
                >
                  <span>En savoir plus sur sa mission</span>
                  <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            {/* Decorative Paw Print */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-20">
              <span className="text-4xl sm:text-5xl md:text-6xl text-white">🐾</span>
            </div>
            
            <div className="max-w-2xl mx-auto text-center relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
                Prêt à partager et améliorer vos connaissances en élevage?
              </h2>
              <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg px-2">
                Rejoignez notre communauté d'éleveurs au Cameroun et dans le monde entier. Recevez chaque semaine des conseils vétérinaires, des formations exclusives et des réductions sur nos livres et cours pour continuer à apprendre et partager.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto px-2">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-2.5 sm:py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap text-sm sm:text-base"
                >
                  Commencer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
