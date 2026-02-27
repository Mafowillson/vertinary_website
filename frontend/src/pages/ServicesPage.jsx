import { useState, useMemo } from 'react'
import { getServices } from '../data/mockServices'
import { useLanguage } from '../contexts/LanguageContext'
import ServiceCard from '../components/ServiceCard/ServiceCard'
import SkeletonLoader from '../components/LoadingSpinner/SkeletonLoader'
import { FiFilter, FiCheckCircle } from 'react-icons/fi'

const ServicesPage = () => {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading] = useState(false)

  // Get services with translations - ensure it updates when language changes
  const services = useMemo(() => {
    return getServices(t)
  }, [t, language])

  // Categories with icons
  const categories = [
    { 
      id: 'all', 
      name: t('allCategories') || 'Toutes les catégories', 
      key: 'allCategories',
      icon: '📋',
      color: 'from-green-500 to-green-600'
    },
    { 
      id: 'training', 
      name: t('training') || 'Formation', 
      key: 'training',
      icon: '📚',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'sales', 
      name: t('sales') || 'Vente', 
      key: 'sales',
      icon: '🛒',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'products', 
      name: t('products') || 'Produits', 
      key: 'products',
      icon: '💊',
      color: 'from-orange-500 to-orange-600'
    },
    { 
      id: 'construction', 
      name: t('construction') || 'Construction', 
      key: 'construction',
      icon: '🏗️',
      color: 'from-yellow-500 to-yellow-600'
    },
    { 
      id: 'consulting', 
      name: t('consulting') || 'Consultation', 
      key: 'consulting',
      icon: '🌾',
      color: 'from-teal-500 to-teal-600'
    },
  ]

  // Filter services by category
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') {
      return services
    }
    return services.filter(service => service.category === selectedCategory)
  }, [services, selectedCategory])

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory)

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-30 -ml-32 -mb-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full text-sm font-semibold text-green-700 mb-6">
              <FiCheckCircle className="w-4 h-4" />
              <span>Services Professionnels</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('services') || 'Nos Services'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('servicesDescription') || 'Découvrez notre gamme complète de services pour éleveurs et professionnels de l\'élevage. Des solutions adaptées à tous vos besoins.'}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            <FiFilter className="w-5 h-5 text-gray-600" />
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Filtrer par catégorie
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-gray-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </span>
                {selectedCategory === category.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          {!loading && filteredServices.length > 0 && (
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' 
                    ? t('allServices') || 'Tous les services'
                    : `${selectedCategoryData?.name || ''}`
                  }
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredServices.length} {filteredServices.length === 1 ? 'service disponible' : 'services disponibles'}
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <SkeletonLoader count={6} />
          ) : filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {t('noServicesFound') || 'Aucun service trouvé'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedCategory === 'all'
                    ? 'Aucun service n\'est disponible pour le moment.'
                    : `Aucun service trouvé dans la catégorie "${selectedCategoryData?.name}". Essayez une autre catégorie.`
                  }
                </p>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    <span>Voir tous les services</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
