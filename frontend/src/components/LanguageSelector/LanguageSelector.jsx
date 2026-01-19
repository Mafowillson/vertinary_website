import { useState } from 'react'
import { useLanguage, SUPPORTED_LANGUAGES } from '../../contexts/LanguageContext'
import { FiChevronDown } from 'react-icons/fi'

const LanguageSelector = () => {
  const { language, setLanguage, currentLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1.5 text-gray-700 hover:text-gray-900 transition-colors text-sm"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="font-medium">{currentLanguage.code.toUpperCase()}</span>
        <FiChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            {Object.values(SUPPORTED_LANGUAGES).map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2 ${
                  language === lang.code ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                }`}
              >
                <span>{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-auto text-primary-600 dark:text-primary-400">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSelector

