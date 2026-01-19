import { useState, useMemo } from 'react'
import { getServices } from '../data/mockServices'
import { useLanguage } from '../contexts/LanguageContext'
import ServiceCard from '../components/ServiceCard/ServiceCard'
import SkeletonLoader from '../components/LoadingSpinner/SkeletonLoader'

const ServicesPage = () => {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading] = useState(false)

  // Get services with translations - ensure it updates when language changes
  const services = useMemo(() => {
    return getServices(t)
  }, [t, language])

  // Categories
  const categories = [
    { id: 'all', name: t('allCategories') || 'Toutes les catégories', key: 'allCategories' },
    { id: 'training', name: t('training') || 'Formation', key: 'training' },
    { id: 'sales', name: t('sales') || 'Vente', key: 'sales' },
    { id: 'products', name: t('products') || 'Produits', key: 'products' },
    { id: 'construction', name: t('construction') || 'Construction', key: 'construction' },
    { id: 'consulting', name: t('consulting') || 'Consultation', key: 'consulting' },
  ]

  // Filter services by category
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'all') {
      return services
    }
    return services.filter(service => service.category === selectedCategory)
  }, [services, selectedCategory])

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('services')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('servicesDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <SkeletonLoader count={6} />
          ) : filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {t('noServicesFound') || 'Aucun service trouvé dans cette catégorie'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
