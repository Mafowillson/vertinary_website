import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

const CurrencySelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState({
    code: 'FCFA',
    flag: '🇨🇲',
    name: 'Franc CFA',
  })

  const currencies = [
    { code: 'FCFA', flag: '🇨🇲', name: 'Franc CFA' },
    { code: 'EUR', flag: '🇪🇺', name: 'Euro' },
    { code: 'USD', flag: '🇺🇸', name: 'US Dollar' },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1.5 text-gray-700 hover:text-gray-900 transition-colors text-sm"
      >
        <span className="font-medium">{selectedCurrency.code}</span>
        <FiChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  setSelectedCurrency(currency)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2 ${
                  selectedCurrency.code === currency.code ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                }`}
              >
                <span>{currency.flag}</span>
                <span className="font-medium">{currency.code}</span>
                <span className="text-sm text-gray-600">{currency.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default CurrencySelector

