import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useApp } from '../../contexts/AppContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { FiMenu, FiX, FiUser, FiLogOut, FiSearch, FiShoppingCart } from 'react-icons/fi'
import CurrencySelector from '../CurrencySelector/CurrencySelector'
import LanguageSelector from '../LanguageSelector/LanguageSelector'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { isAuthenticated, user, logout, isAdmin } = useAuth()
  const { siteConfig } = useApp()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50 transition-all duration-200 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <span className="text-2xl md:text-3xl font-academy bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent group-hover:from-green-700 group-hover:to-green-900 transition-all">
                {siteConfig.siteName || "L'Académie DES Éleveurs"}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-3">
              <Link
                to="/products"
                className="px-3 py-2 text-gray-700 hover:text-green-600 transition-colors text-sm font-medium"
              >
                {t('products')}
              </Link>
              <Link
                to="/services"
                className="px-3 py-2 text-gray-700 hover:text-green-600 transition-colors text-sm font-medium"
              >
                {t('services')}
              </Link>
              
              {/* Search Icon */}
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-50"
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5" />
              </button>

            {/* Currency Selector */}
            <CurrencySelector />

            {/* Language Selector */}
            <LanguageSelector />

            {/* Cart */}
            <button className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors">
              <FiShoppingCart className="w-5 h-5" />
              <span className="text-sm">{t('cart')}</span>
            </button>

            {isAuthenticated ? (
              <>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors text-sm"
                  >
                    {t('admin')}
                  </Link>
                )}
                <div className="flex items-center space-x-3 ml-2 pl-3 border-l border-gray-200">
                  <span className="text-gray-700 flex items-center space-x-1 text-sm">
                    <FiUser className="w-4 h-4" />
                    <span className="hidden lg:inline">{user?.email}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors text-sm"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">{t('logout')}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3 ml-2 pl-3 border-l border-gray-200">
                <Link
                  to="/login"
                  className="px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors text-sm"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setSearchOpen(true)
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors text-left"
              >
                <FiSearch className="w-5 h-5" />
                <span>{t('search')}</span>
              </button>
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('products')}
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('services')}
              </Link>
              <div className="flex items-center space-x-2 py-2">
                <LanguageSelector />
                <CurrencySelector />
              </div>
              {isAuthenticated ? (
                <>
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('admin')}
                    </Link>
                  )}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-700 mb-2">
                      <FiUser className="w-4 h-4" />
                      <span>{user?.email}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    className="block text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>

    {/* Search Modal */}
    {searchOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 px-4 animate-fadeIn"
        onClick={() => setSearchOpen(false)}
      >
        <div 
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative animate-slideDown"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close search"
          >
            <FiX className="w-6 h-6" />
          </button>
          <form onSubmit={handleSearch} className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-12 pr-24 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-lg"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              {t('search')}
            </button>
          </form>
        </div>
      </div>
    )}
    </>
  )
}

export default Header

