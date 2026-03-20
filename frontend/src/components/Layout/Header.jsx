import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useApp } from '../../contexts/AppContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCart } from '../../contexts/CartContext'
import { FiMenu, FiX, FiUser, FiLogOut, FiShoppingCart } from 'react-icons/fi'
import CurrencySelector from '../CurrencySelector/CurrencySelector'
import LanguageSelector from '../LanguageSelector/LanguageSelector'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout, isAdmin } = useAuth()
  const { siteConfig } = useApp()
  const { t } = useLanguage()
  const { getCartItemCount } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  
  const cartItemCount = getCartItemCount()

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const handleSectionClick = (sectionId, e) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    
    if (location.pathname === '/') {
      // Already on landing page, scroll to section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // Navigate to landing page first, then scroll
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-[#dbe6df] dark:border-[#2a3a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Header Bar */}
        <div className="h-16 flex items-center justify-between">
          {/* Logo - Left Side */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/academydeseleveurs.png"
              alt="Académie des Éleveurs"
              className="h-16 w-auto"
            />
          </Link>

          {/* Center Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors"
            >
              Accueil
            </Link>
            <a
              href="#categories"
              onClick={(e) => handleSectionClick('categories', e)}
              className="text-sm font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors cursor-pointer"
            >
              Catégories
            </a>
            <a
              href="#resources"
              onClick={(e) => handleSectionClick('resources', e)}
              className="text-sm font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors cursor-pointer"
            >
              Ressources
            </a>
            <a
              href="#services"
              onClick={(e) => handleSectionClick('services', e)}
              className="text-sm font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors cursor-pointer"
            >
              Services
            </a>
            <a
              href="#about"
              onClick={(e) => handleSectionClick('about', e)}
              className="text-sm font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors cursor-pointer"
            >
              À Propos
            </a>
          </nav>

          {/* Right Side Actions - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="text-sm font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                {/* Cart Button */}
                <Link
                  to="/cart"
                  className="relative p-2 text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors"
                  title={t('cart')}
                >
                  <FiShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </span>
                  )}
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-900 dark:text-white flex items-center gap-1">
                    <FiUser className="w-4 h-4" />
                    <span className="hidden lg:inline">{user?.email}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors px-4 py-2"
                >
                  Se Connecter
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:brightness-105 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all"
                >
                  Rejoindre
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Separate Container */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <nav className="flex flex-col space-y-4 py-4">
              <Link
                to="/"
                className="px-2 text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <a
                href="#categories"
                onClick={(e) => handleSectionClick('categories', e)}
                className="px-2 text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors text-sm font-medium cursor-pointer"
              >
                Catégories
              </a>
              <a
                href="#resources"
                onClick={(e) => handleSectionClick('resources', e)}
                className="px-2 text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors text-sm font-medium cursor-pointer"
              >
                Ressources
              </a>
              <a
                href="#services"
                onClick={(e) => handleSectionClick('services', e)}
                className="px-2 text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors text-sm font-medium cursor-pointer"
              >
                Services
              </a>
              <a
                href="#about"
                onClick={(e) => handleSectionClick('about', e)}
                className="px-2 text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors text-sm font-medium cursor-pointer"
              >
                À Propos
              </a>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 px-2 py-2">
                  <LanguageSelector />
                  <CurrencySelector />
                </div>
              </div>

              {isAuthenticated ? (
                <>
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className="px-2 text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  {/* Cart Button - Mobile */}
                  <Link
                    to="/cart"
                    className="px-2 text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors text-sm font-medium flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="relative">
                      <FiShoppingCart className="w-5 h-5" />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItemCount > 9 ? '9+' : cartItemCount}
                        </span>
                      )}
                    </div>
                    <span>{t('cart')} {cartItemCount > 0 && `(${cartItemCount})`}</span>
                  </Link>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 px-2">
                    <div className="flex items-center space-x-2 text-gray-900 dark:text-white mb-2">
                      <FiUser className="w-4 h-4" />
                      <span className="text-sm">{user?.email}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors text-sm font-medium"
                    >
                      Déconnexion
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2 px-2">
                  <Link
                    to="/login"
                    className="block text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Se Connecter
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-center text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Rejoindre
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
