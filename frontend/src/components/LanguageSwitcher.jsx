import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
]

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const active = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]

  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">Select language</span>
      <select
        aria-label="Select language"
        value={LANGUAGES.some((l) => l.code === active) ? active : 'en'}
        onChange={(e) => {
          const code = e.target.value
          void i18n.changeLanguage(code)
        }}
        className="text-sm rounded-lg border border-[#1A7A6E]/40 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-2 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#1A7A6E] focus:border-[#1A7A6E] min-w-[9.5rem] cursor-pointer"
      >
        {LANGUAGES.map(({ code, label, flag }) => (
          <option key={code} value={code}>
            {flag} {label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default LanguageSwitcher
