import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCart } from '../../contexts/CartContext'
import { FiMenu, FiX, FiUser, FiShoppingCart } from 'react-icons/fi'
import CurrencySelector from '../CurrencySelector/CurrencySelector'
import LanguageSwitcher from '../LanguageSwitcher'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout, isAdmin } = useAuth()
  const { t } = useLanguage()
  const { getCartItemCount } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  const cartItemCount = getCartItemCount()
  const tc = (key) => t(key, { ns: 'common' })

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const handleSectionClick = (sectionId, e) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    if (location.pathname === '/') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
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
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/academydeseleveurs.png"
              alt="Académie des Éleveurs"
              className="h-16 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              to="/"
              className="text-sm font-semibold text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors"
            >
              {tc('nav.home')}
            </Link>
            <Link
              to="/products"
              className="text-sm font-semibold text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors"
            >
              {tc('nav.catalogue')}
            </Link>
            <a
              href="#categories"
              onClick={(e) => handleSectionClick('categories', e)}
              className="text-sm font-semibold text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors cursor-pointer"
            >
              {tc('nav.categories')}
            </a>
            <a
              href="#resources"
              onClick={(e) => handleSectionClick('resources', e)}
              className="text-sm font-semibold text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors cursor-pointer"
            >
              {tc('nav.resources')}
            </a>
            <a
              href="#services"
              onClick={(e) => handleSectionClick('services', e)}
              className="text-sm font-semibold text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors cursor-pointer"
            >
              {tc('nav.services')}
            </a>
            <a
              href="#about"
              onClick={(e) => handleSectionClick('about', e)}
              className="text-sm font-semibold text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors cursor-pointer"
            >
              {tc('nav.about')}
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <LanguageSwitcher />
            <CurrencySelector />
            {isAuthenticated ? (
              <>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="text-sm font-semibold text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors"
                  >
                    {tc('nav.admin')}
                  </Link>
                )}
                <Link
                  to="/cart"
                  className="relative p-2 text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors"
                  title={tc('nav.cart')}
                >
                  <FiShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#1A7A6E] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
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
                    type="button"
                    onClick={handleLogout}
                    className="text-sm font-semibold text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    {tc('nav.logout')}
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors px-4 py-2"
                >
                  {tc('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-[#1A7A6E] hover:brightness-105 text-white text-sm font-bold px-5 py-2 rounded-lg transition-all"
                >
                  {tc('nav.register')}
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={tc('nav.toggleMenu')}
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <nav className="flex flex-col space-y-4 py-4">
              <Link
                to="/"
                className="px-2 text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tc('nav.home')}
              </Link>
              <Link
                to="/products"
                className="px-2 text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tc('nav.catalogue')}
              </Link>
              <a
                href="#categories"
                onClick={(e) => handleSectionClick('categories', e)}
                className="px-2 text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors text-sm font-medium cursor-pointer"
              >
                {tc('nav.categories')}
              </a>
              <a
                href="#resources"
                onClick={(e) => handleSectionClick('resources', e)}
                className="px-2 text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors text-sm font-medium cursor-pointer"
              >
                {tc('nav.resources')}
              </a>
              <a
                href="#services"
                onClick={(e) => handleSectionClick('services', e)}
                className="px-2 text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors text-sm font-medium cursor-pointer"
              >
                {tc('nav.services')}
              </a>
              <a
                href="#about"
                onClick={(e) => handleSectionClick('about', e)}
                className="px-2 text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors text-sm font-medium cursor-pointer"
              >
                {tc('nav.about')}
              </a>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center gap-3 px-2 py-2">
                  <LanguageSwitcher />
                  <CurrencySelector />
                </div>
              </div>

              {isAuthenticated ? (
                <>
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className="px-2 text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {tc('nav.admin')}
                    </Link>
                  )}
                  <Link
                    to="/cart"
                    className="px-2 text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors text-sm font-medium flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="relative">
                      <FiShoppingCart className="w-5 h-5" />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#1A7A6E] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItemCount > 9 ? '9+' : cartItemCount}
                        </span>
                      )}
                    </div>
                    <span>
                      {tc('nav.cart')} {cartItemCount > 0 && `(${cartItemCount})`}
                    </span>
                  </Link>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 px-2">
                    <div className="flex items-center space-x-2 text-gray-900 dark:text-white mb-2">
                      <FiUser className="w-4 h-4" />
                      <span className="text-sm">{user?.email}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors text-sm font-medium"
                    >
                      {tc('nav.logout')}
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2 px-2">
                  <Link
                    to="/login"
                    className="block text-gray-900 dark:text-white hover:text-[#1A7A6E] dark:hover:text-green-500 transition-colors text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {tc('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 bg-[#1A7A6E] hover:brightness-105 text-white rounded-lg transition-colors text-center text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {tc('nav.register')}
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
