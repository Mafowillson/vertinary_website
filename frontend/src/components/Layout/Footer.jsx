import { useApp } from '../../contexts/AppContext'
import { useLanguage } from '../../contexts/LanguageContext'

const Footer = () => {
  const { siteConfig } = useApp()
  const { t } = useLanguage()

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Developed by section */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{t('developedBy')}</span>
            <span className="text-green-600 font-bold">
              {siteConfig.siteName || "L'Académie DES Éleveurs"}
            </span>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-600 text-center">
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.siteName || "L'Académie DES Éleveurs"} {t('store')}. {t('allRightsReserved')}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

