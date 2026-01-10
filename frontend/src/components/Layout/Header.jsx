import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useApp } from '../../contexts/AppContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'
import CurrencySelector from '../CurrencySelector/CurrencySelector'
import LanguageSelector from '../LanguageSelector/LanguageSelector'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout, isAdmin } = useAuth()
  const { siteConfig } = useApp()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center border-2 border-red-500">
              <span className="text-white font-bold text-sm">AE</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              {siteConfig.siteName || "L'Académie DES Éleveurs"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              to="/products"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {t('products')}
            </Link>

            <LanguageSelector />
            <ThemeToggle />
            <CurrencySelector />

            {isAuthenticated ? (
              <>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {t('admin')}
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                    <FiUser className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 dark:text-gray-300"
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
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link
                to="/products"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('products')}
              </Link>
              <div className="flex items-center space-x-2 py-2">
                <LanguageSelector />
                <ThemeToggle />
              </div>
              <div className="py-2">
                <CurrencySelector />
              </div>
              {isAuthenticated ? (
                <>
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('admin')}
                    </Link>
                  )}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 mb-2">
                      <FiUser className="w-4 h-4" />
                      <span>{user?.email}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <Link
                    to="/login"
                    className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/register"
                    className="block btn-primary text-center"
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
  )
}

export default Header

