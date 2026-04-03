import { useState, useEffect } from 'react'
import { productService, setTranslationFunction } from '../services/productService'
import ProductCard from '../components/ProductCard/ProductCard'
import SkeletonLoader from '../components/LoadingSpinner/SkeletonLoader'
import { useLanguage } from '../contexts/LanguageContext'
import {
  FiSearch,
  FiX,
  FiFilter,
  FiSliders,
  FiDollarSign,
  FiGrid,
  FiVideo,
  FiHeadphones,
  FiBookOpen,
  FiBook,
  FiFileText,
} from 'react-icons/fi'
import { formatCurrency } from '../utils/formatters'

/** Sidebar options + keyword fallbacks when API has no structured species/format */
const SPECIES_OPTIONS = [
  { id: 'poultry', label: 'Poules & volailles', hint: 'Pondeuses, chair, aviculture', emoji: '🐔', keywords: ['poule', 'poussin', 'avicole', 'pondeuse', 'chair', 'volaille', 'poulet', 'œuf', 'oeuf'] },
  { id: 'pigs', label: 'Porcs', hint: 'Élevage porcin', emoji: '🐷', keywords: ['porc', 'porcin', 'truie'] },
  { id: 'turkeys', label: 'Dindes', hint: 'Dindons, dinde', emoji: '🦃', keywords: ['dinde', 'dindon'] },
  { id: 'small_ruminants', label: 'Chèvres & moutons', hint: 'Caprins, ovins', emoji: '🐐', keywords: ['chèvre', 'mouton', 'caprin', 'ovin'] },
  { id: 'cattle', label: 'Bovins', hint: 'Vaches, bœufs', emoji: '🐄', keywords: ['bovin', 'vache', 'bœuf', 'boeuf'] },
  { id: 'rabbits', label: 'Lapins', hint: 'Cuniculture', emoji: '🐰', keywords: ['lapin', 'cunicole'] },
]

const CONTENT_TYPE_OPTIONS = [
  { id: 'course', label: 'Cours (vidéo)', hint: 'Séries, formations', icon: FiVideo, keywords: ['cours', 'vidéo', 'video', 'formation', 'série', 'serie'] },
  { id: 'document', label: 'Documents', hint: 'PDF, fiches', icon: FiFileText, keywords: ['pdf', 'document', 'fiche', 'manuel', 'kit'] },
  { id: 'audio', label: 'Audio', hint: 'Podcasts, enregistrements', icon: FiHeadphones, keywords: ['audio', 'podcast', 'enregistrement'] },
  { id: 'article', label: 'Articles', hint: 'Lecture courte', icon: FiBookOpen, keywords: ['article', 'blog'] },
  { id: 'ebook', label: 'E-books', hint: 'Livres numériques', icon: FiBook, keywords: ['e-book', 'ebook', 'livre numérique'] },
]

function productTextBlob(p) {
  return `${p.title || ''} ${p.description || ''}`.toLowerCase()
}

function productMatchesSpecies(product, selectedIds) {
  if (!selectedIds.length) return true
  const blob = productTextBlob(product)
  const explicit = [product.species, product.animal_type, product.category, ...(Array.isArray(product.tags) ? product.tags : [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return selectedIds.some((id) => {
    const opt = SPECIES_OPTIONS.find((o) => o.id === id)
    if (!opt) return false
    const inExplicit = opt.keywords.some((k) => explicit.includes(k))
    const inText = opt.keywords.some((k) => blob.includes(k))
    return inExplicit || inText
  })
}

function productMatchesContentType(product, selectedIds) {
  if (!selectedIds.length) return true
  const blob = productTextBlob(product)
  const fmt = (product.format || product.content_type || '').toString().toLowerCase()
  return selectedIds.some((id) => {
    const opt = CONTENT_TYPE_OPTIONS.find((o) => o.id === id)
    if (!opt) return false
    const labelMatch = opt.keywords.some((k) => fmt.includes(k))
    const textMatch = opt.keywords.some((k) => blob.includes(k))
    return labelMatch || textMatch
  })
}

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

    filtered = filtered.filter((p) => productMatchesSpecies(p, selectedSpecies))
    filtered = filtered.filter((p) => productMatchesContentType(p, selectedFormats))

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

  const handleSpeciesToggle = (speciesId) => {
    setSelectedSpecies((prev) =>
      prev.includes(speciesId) ? prev.filter((s) => s !== speciesId) : [...prev, speciesId]
    )
  }

  const handleContentTypeToggle = (typeId) => {
    setSelectedFormats((prev) =>
      prev.includes(typeId) ? prev.filter((f) => f !== typeId) : [...prev, typeId]
    )
  }

  const clearAllFilters = () => {
    setSelectedSpecies([])
    setPriceRange(100000)
    setSelectedFormats([])
    setSearchQuery('')
  }

  const removeSpeciesFilter = (speciesId) => {
    setSelectedSpecies((prev) => prev.filter((s) => s !== speciesId))
  }

  const removeFormatFilter = (typeId) => {
    setSelectedFormats((prev) => prev.filter((f) => f !== typeId))
  }

  const speciesLabel = (id) => SPECIES_OPTIONS.find((o) => o.id === id)?.label || id
  const contentTypeLabel = (id) => CONTENT_TYPE_OPTIONS.find((o) => o.id === id)?.label || id

  const loadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const activeFiltersCount = selectedSpecies.length + selectedFormats.length + (priceRange < 100000 ? 1 : 0)

  const FilterSidebar = ({ isMobile = false }) => (
    <div
      className={`${isMobile ? 'lg:hidden' : 'hidden lg:block'} ${isMobile ? 'fixed inset-0 z-50' : ''} ${
        isMobile && !mobileFiltersOpen ? 'pointer-events-none invisible' : ''
      }`}
      onClick={
        isMobile
          ? (e) => {
              if (e.target === e.currentTarget) setMobileFiltersOpen(false)
            }
          : undefined
      }
      role={isMobile ? 'presentation' : undefined}
    >
      {isMobile && (
        <div
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      )}
      <aside
        className={`
          ${isMobile ? 'absolute right-0 top-0 h-full w-[min(100%,20rem)]' : 'w-full max-w-[17.5rem] shrink-0'}
          ${isMobile ? 'shadow-2xl' : 'sticky top-24'}
          flex flex-col
          rounded-2xl border border-emerald-100/80 bg-gradient-to-b from-white via-emerald-50/30 to-white
          shadow-[0_4px_24px_-4px_rgba(5,150,105,0.12)]
          overflow-hidden
          transition-transform duration-300 ease-out
          ${isMobile && !mobileFiltersOpen ? 'translate-x-full' : 'translate-x-0'}
        `}
        onClick={(e) => e.stopPropagation()}
        aria-hidden={isMobile && !mobileFiltersOpen}
      >
        <div
          className={`flex items-center justify-between px-4 py-3.5 border-b border-emerald-100/80 bg-white/80 backdrop-blur-sm ${
            isMobile ? '' : 'rounded-t-2xl'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <FiSliders className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-slate-900 leading-tight">Affiner</h2>
              <p className="text-[11px] text-slate-500 truncate">Espèces, formats, budget</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {activeFiltersCount > 0 && (
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-bold text-white tabular-nums">
                {activeFiltersCount}
              </span>
            )}
            {isMobile && (
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-xl p-2 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                aria-label="Fermer les filtres"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-6">
          <section>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800/80 mb-2.5">
              Pour quel élevage ?
            </p>
            <div className="grid grid-cols-1 gap-2">
              {SPECIES_OPTIONS.map(({ id, label, hint, emoji }) => {
                const on = selectedSpecies.includes(id)
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleSpeciesToggle(id)}
                    className={`group flex w-full items-start gap-2.5 rounded-xl border-2 px-3 py-2.5 text-left transition-all
                      ${
                        on
                          ? 'border-emerald-600 bg-emerald-50/90 shadow-sm ring-1 ring-emerald-600/20'
                          : 'border-slate-100 bg-white/90 hover:border-emerald-200 hover:bg-emerald-50/40'
                      }`}
                  >
                    <span className="text-lg leading-none mt-0.5" aria-hidden>
                      {emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-semibold ${on ? 'text-emerald-950' : 'text-slate-800'}`}>
                        {label}
                      </span>
                      <span className="block text-[11px] text-slate-500 leading-snug">{hint}</span>
                    </span>
                    <span
                      className={`mt-1 h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors
                        ${on ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 bg-white group-hover:border-emerald-400'}`}
                    >
                      {on && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          <section>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800/80 mb-2.5">
              Type de contenu
            </p>
            <div className="flex flex-col gap-2">
              {CONTENT_TYPE_OPTIONS.map(({ id, label, hint, icon: Icon }) => {
                const on = selectedFormats.includes(id)
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleContentTypeToggle(id)}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 px-3 py-2.5 text-left transition-all
                      ${
                        on
                          ? 'border-amber-500/90 bg-amber-50/80 shadow-sm ring-1 ring-amber-400/25'
                          : 'border-slate-100 bg-white/90 hover:border-amber-200 hover:bg-amber-50/30'
                      }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        on ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-semibold ${on ? 'text-amber-950' : 'text-slate-800'}`}>
                        {label}
                      </span>
                      <span className="block text-[11px] text-slate-500">{hint}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-white">
                <FiDollarSign className="w-3.5 h-3.5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">Budget max</p>
                <p className="text-sm font-bold text-slate-900">{formatCurrency(priceRange)}</p>
              </div>
            </div>
            <div className="rounded-xl bg-slate-50/80 border border-slate-100 px-3 py-3">
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 rounded-full bg-slate-200 accent-emerald-600 cursor-pointer"
              />
              <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-500">
                <span>0</span>
                <span>100 000+ FCFA</span>
              </div>
            </div>
          </section>

          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="w-full rounded-xl border-2 border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-800 transition-colors flex items-center justify-center gap-2"
            >
              <FiX className="w-4 h-4" />
              Tout effacer
            </button>
          )}
        </div>

        {isMobile && (
          <div className="border-t border-emerald-100/80 bg-white/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition-colors"
            >
              Voir les résultats
            </button>
          </div>
        )}
      </aside>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero — catalogue contenus élevage */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <p className="text-emerald-100/90 text-sm font-semibold tracking-wide uppercase mb-2">
            Catalogue éleveurs
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold mb-4 max-w-3xl leading-tight">
            Formations et ressources pour bien élever vos animaux
          </h1>
          <p className="text-emerald-50/95 text-base md:text-lg max-w-2xl leading-relaxed">
            Cours en vidéo, guides PDF, audios et articles : tout ce qu’il faut pour les poules, porcs, dindes et autres
            élevages familiaux ou professionnels — choisissez une espèce et un format à gauche pour affiner.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Cours', 'Documents', 'Audio', 'Articles'].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm ring-1 ring-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
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
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden px-5 py-3 bg-white border-2 border-emerald-200 rounded-xl font-semibold text-emerald-900 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <FiFilter className="w-5 h-5 text-emerald-600" />
              Affiner
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
              {selectedSpecies.map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-900 rounded-full text-sm font-medium"
                >
                  {speciesLabel(id)}
                  <button type="button" onClick={() => removeSpeciesFilter(id)} className="hover:text-emerald-950 rounded-full p-0.5">
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              ))}
              {selectedFormats.map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-900 rounded-full text-sm font-medium"
                >
                  {contentTypeLabel(id)}
                  <button type="button" onClick={() => removeFormatFilter(id)} className="hover:text-amber-950 rounded-full p-0.5">
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
            <div className="bg-white rounded-2xl p-5 sm:p-6 mb-6 shadow-sm border border-slate-200/80 ring-1 ring-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                    {loading ? 'Chargement...' : `${filteredProducts.length} contenu${filteredProducts.length !== 1 ? 's' : ''} à explorer`}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {filteredProducts.length > 0
                      ? 'Parcourez les guides et formations pour nourrir, soigner et développer votre élevage.'
                      : 'Aucun contenu ne correspond à vos critères — élargissez le budget ou retirez un filtre.'}
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
