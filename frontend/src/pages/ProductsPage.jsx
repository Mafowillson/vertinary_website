import { useState, useEffect } from 'react'
import { productService, setTranslationFunction } from '../services/productService'
import ProductCard from '../components/ProductCard/ProductCard'
import SkeletonLoader from '../components/LoadingSpinner/SkeletonLoader'
import { useLanguage } from '../contexts/LanguageContext'
import { FiSearch, FiX, FiFilter, FiSliders, FiDollarSign, FiFileText, FiGrid } from 'react-icons/fi'
import { formatCurrency } from '../utils/formatters'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [displayedProducts, setDisplayedProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('most-popular')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const productsPerPage = 12

  // Filter states
  const [selectedSpecies, setSelectedSpecies] = useState([])
  const [priceRange, setPriceRange] = useState(100000)
  const [selectedFormats, setSelectedFormats] = useState([])

  const { t } = useLanguage()

  useEffect(() => {
    setTranslationFunction(t)
  }, [t])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const searchParam = urlParams.get('search')
        
        if (searchParam) {
          setSearchQuery(searchParam)
          const data = await productService.searchProducts(searchParam)
          // Handle both array response and object with data property
          const productsList = Array.isArray(data) ? data : (data?.data || [])
          setProducts(productsList)
        } else {
          const data = await productService.getAllProducts()
          // Handle both array response (from API) and object with data property (from mock)
          const productsList = Array.isArray(data) ? data : (data?.data || [])
          setProducts(productsList)
        }
      } catch (error) {
        console.error('Failed to load products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [t])

  // Apply filters and search
  useEffect(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Price filter
    filtered = filtered.filter((product) => {
      const price = product.price || 0
      return price <= priceRange
    })

    // Sort
    if (sortBy === 'most-popular') {
      filtered.sort((a, b) => (b.purchase_count || b.sold || 0) - (a.purchase_count || a.sold || 0))
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.created_at || b.createdAt || 0) - new Date(a.created_at || a.createdAt || 0))
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [products, searchQuery, selectedSpecies, priceRange, selectedFormats, sortBy])

  // Pagination
  useEffect(() => {
    const startIndex = 0
    const endIndex = currentPage * productsPerPage
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex))
  }, [filteredProducts, currentPage])

  const handleSpeciesChange = (species) => {
    setSelectedSpecies(prev =>
      prev.includes(species)
        ? prev.filter(s => s !== species)
        : [...prev, species]
    )
  }

  const handleFormatChange = (format) => {
    setSelectedFormats(prev =>
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    )
  }

  const clearAllFilters = () => {
    setSelectedSpecies([])
    setPriceRange(100000)
    setSelectedFormats([])
    setSearchQuery('')
  }

  const removeSpeciesFilter = (species) => {
    setSelectedSpecies(prev => prev.filter(s => s !== species))
  }

  const removeFormatFilter = (format) => {
    setSelectedFormats(prev => prev.filter(f => f !== format))
  }

  const loadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const activeFiltersCount = selectedSpecies.length + selectedFormats.length + (priceRange < 100000 ? 1 : 0)

  // Filter Sidebar Component
  const FilterSidebar = ({ isMobile = false }) => (
    <div 
      className={`${isMobile ? 'lg:hidden' : 'hidden lg:block'} ${isMobile ? 'fixed inset-0 z-50 bg-black bg-opacity-50' : ''}`}
      onClick={isMobile ? (e) => {
        if (e.target === e.currentTarget) {
          setMobileFiltersOpen(false)
        }
      } : undefined}
    >
      <div 
        className={`${isMobile ? 'absolute right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto' : 'bg-white border border-gray-200 rounded-xl p-6 sticky top-24'} transition-transform duration-300 ${isMobile && !mobileFiltersOpen ? 'translate-x-full' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Filtres</h2>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
        
        <div className={isMobile ? 'p-4' : ''}>
          {!isMobile && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FiSliders className="w-5 h-5 text-green-600" />
                Filtres
              </h2>
              {activeFiltersCount > 0 && (
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
          )}

          {/* SPECIES Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2.5 6c.83 0 1.5.67 1.5 1.5S10.33 11 9.5 11 8 10.33 8 9.5 8.67 8 9.5 8zm5 0c.83 0 1.5.67 1.5 1.5S15.33 11 14.5 11 13 10.33 13 9.5 13.67 8 14.5 8zM12 7.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"/>
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Espèces</h3>
            </div>
            <div className="space-y-3">
              {['Bovine', 'Equine', 'Canine', 'Feline'].map((species) => (
                <label key={species} className="flex items-center group cursor-pointer p-2 rounded-lg hover:bg-green-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedSpecies.includes(species)}
                    onChange={() => handleSpeciesChange(species)}
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">{species}</span>
                </label>
              ))}
            </div>
          </div>

          {/* PRICE RANGE Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <FiDollarSign className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Gamme de Prix</h3>
            </div>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between mt-3 text-xs font-medium text-gray-600">
                <span>0 FCFA</span>
                <span className="text-green-600 font-bold">{formatCurrency(priceRange)}</span>
                <span>100.000+ FCFA</span>
              </div>
            </div>
          </div>

          {/* FORMAT Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <FiFileText className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Format</h3>
            </div>
            <div className="space-y-3">
              {['PDF Guide', 'Video Lecture', 'E-book'].map((format) => (
                <label key={format} className="flex items-center group cursor-pointer p-2 rounded-lg hover:bg-green-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedFormats.includes(format)}
                    onChange={() => handleFormatChange(format)}
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">{format}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear All Filters Button */}
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <FiX className="w-4 h-4" />
              Réinitialiser les Filtres
            </button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Ressources Vétérinaires
          </h1>
          <p className="text-green-50 text-lg max-w-2xl">
            Découvrez notre collection complète de livres, guides et formations en médecine vétérinaire pour éleveurs et professionnels.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des ressources, livres, formations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden px-6 py-3 bg-white border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <FiFilter className="w-5 h-5" />
              Filtres
              {activeFiltersCount > 0 && (
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Active Filters Chips */}
          {(selectedSpecies.length > 0 || selectedFormats.length > 0 || priceRange < 100000 || searchQuery) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Recherche: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-green-900">
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              )}
              {selectedSpecies.map((species) => (
                <span key={species} className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {species}
                  <button onClick={() => removeSpeciesFilter(species)} className="hover:text-green-900">
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              ))}
              {selectedFormats.map((format) => (
                <span key={format} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {format}
                  <button onClick={() => removeFormatFilter(format)} className="hover:text-blue-900">
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              ))}
              {priceRange < 100000 && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Max: {formatCurrency(priceRange)}
                  <button onClick={() => setPriceRange(100000)} className="hover:text-purple-900">
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters (Desktop) */}
          <FilterSidebar />

          {/* Mobile Filters Overlay */}
          <FilterSidebar isMobile={true} />

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Limited Time Offers Banner */}
            {!loading && filteredProducts.some(p => {
              const discountEndDate = p.discount_end_date || p.discountEndDate || p.offer_end_date || p.offerEndDate
              const originalPrice = p.original_price || p.originalPrice
              return originalPrice && p.price < originalPrice && discountEndDate && new Date(discountEndDate) > new Date()
            }) && (
              <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 mb-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <h3 className="font-bold text-lg">Offres Limitées Disponibles!</h3>
                      <p className="text-sm text-red-50">Profitez de réductions exclusives qui expirent bientôt</p>
                    </div>
                  </div>
                  <span className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold text-sm">
                    {filteredProducts.filter(p => {
                      const discountEndDate = p.discount_end_date || p.discountEndDate || p.offer_end_date || p.offerEndDate
                      const originalPrice = p.original_price || p.originalPrice
                      return originalPrice && p.price < originalPrice && discountEndDate && new Date(discountEndDate) > new Date()
                    }).length} Offres
                  </span>
                </div>
              </div>
            )}

            {/* Results Header */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {loading ? 'Chargement...' : `${filteredProducts.length} Ressources Disponibles`}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {filteredProducts.length > 0 
                      ? `Trouvez exactement ce dont vous avez besoin pour votre pratique vétérinaire`
                      : 'Aucune ressource ne correspond à vos critères'
                    }
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <FiGrid className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-700 font-medium">Trier par:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                  >
                    <option value="most-popular">Plus Populaire</option>
                    <option value="price-low">Prix: Croissant</option>
                    <option value="price-high">Prix: Décroissant</option>
                    <option value="newest">Plus Récent</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <SkeletonLoader count={12} />
            ) : displayedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {displayedProducts.length < filteredProducts.length && (
                  <div className="text-center mb-8">
                    <button
                      onClick={loadMore}
                      className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all hover:shadow-md"
                    >
                      Charger Plus de Ressources ({filteredProducts.length - displayedProducts.length} restantes)
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`min-w-[40px] h-10 px-3 rounded-lg font-semibold transition-all ${
                            currentPage === pageNum
                              ? 'bg-green-600 text-white shadow-md scale-105'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-green-300'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="text-gray-400 px-2">...</span>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className="min-w-[40px] h-10 px-3 rounded-lg font-semibold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-green-300 transition-all"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200 shadow-sm">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiSearch className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Aucun résultat trouvé
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery 
                      ? `Aucune ressource ne correspond à "${searchQuery}". Essayez de modifier vos critères de recherche.`
                      : 'Aucune ressource ne correspond à vos filtres. Essayez de modifier vos critères.'
                    }
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Réinitialiser les Filtres
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
