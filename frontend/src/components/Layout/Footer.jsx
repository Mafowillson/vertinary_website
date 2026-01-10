import { Link } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { FiFacebook, FiMessageCircle } from 'react-icons/fi'

const Footer = () => {
  const { socialLinks, siteConfig } = useApp()
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {siteConfig.siteName || "L'Académie DES Éleveurs"}
            </h3>
            <p className="text-gray-300 text-sm">
              {t('footerDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  {t('products')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contactUs')}</h3>
            <div className="space-y-3">
              {socialLinks.whatsapp && (
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <FiMessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <FiFacebook className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {siteConfig.siteName || "L'Académie DES Éleveurs"}. {t('allRightsReserved')}.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

