import { useCountdown } from '../../utils/countdown'
import { useLanguage } from '../../contexts/LanguageContext'

const CountdownTimer = ({ targetDate, onExpire }) => {
  const { timeLeft, isExpired } = useCountdown(targetDate)
  const { t } = useLanguage()

  if (isExpired) {
    if (onExpire) onExpire()
    return (
      <div className="text-center py-4">
        <p className="text-red-600 dark:text-red-400 font-semibold">{t('offerExpired')}</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-md">
      <p className="text-center text-gray-700 dark:text-gray-300 mb-3 md:mb-4 font-medium text-sm md:text-base">
        {t('offerEndsIn')}
      </p>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        <div className="text-center">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 md:p-4 mb-1 md:mb-2">
            <span className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{t('days')}</p>
        </div>
        <div className="text-center">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 md:p-4 mb-1 md:mb-2">
            <span className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{t('hours')}</p>
        </div>
        <div className="text-center">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 md:p-4 mb-1 md:mb-2">
            <span className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{t('minutes')}</p>
        </div>
        <div className="text-center">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 md:p-4 mb-1 md:mb-2">
            <span className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{t('seconds')}</p>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer

