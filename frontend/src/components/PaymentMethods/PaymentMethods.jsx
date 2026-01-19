import { useLanguage } from '../../contexts/LanguageContext'

// Stripe Logo SVG Component
const StripeLogo = () => (
  <svg viewBox="0 0 468 222" className="w-full h-full" fill="#635BFF" preserveAspectRatio="xMidYMid meet">
    <path d="M414 113.4c0-25.6-12.4-45.8-36.1-45.8-23.8 0-38.2 20.2-38.2 45.6 0 30.1 17 45.3 41.4 45.3 11.9 0 20.9-2.7 27.7-6.5V132c-6.8 3.4-14.6 5.5-24.5 5.5-9.7 0-18.3-3.4-19.4-15.2h48.9c0-1.3.2-6.5.2-6.5zm-49-21.5c0-11.3 6.9-16 13.2-16 6.1 0 12.6 4.7 12.6 16h-25.8zM301.1 67.6c-9.8 0-16.1 4.6-19.6 7.8l-1.3-6.2h-22v116.6l25-5.3.1-28.4c3.6 2.6 8.9 6.3 17.7 6.3 17.9 0 34.1-14.4 34.1-46.1-.1-29-15.6-45.7-33.4-45.7zm-6 68.9c-5.9 0-9.4-2.1-11.8-4.7l-.1-37.1c2.6-2.9 6.2-4.9 11.9-4.9 9.9 0 17.2 13.2 17.2 23.3 0 15.6-8 23.4-17.2 23.4zM223.3 61.3l25.1-5.4V36.4l-25.1 5.3v19.6zM223.2 69.3h25.1v87.5h-25.1V69.3zm113.3-45.7V80c-2.6-1.9-12.2-8.7-25.6-8.7-24.8 0-42.3 20.8-42.3 46.2 0 26.6 16.2 45.5 41.3 45.5 12.6 0 23.3-4.2 26.9-6.7l-1.2-20.7c-3.8 1.7-10.3 4.2-16.1 4.2-10.4 0-17.8-5.6-19.4-13.8h45.9c.1-1 .1-1.2.1-1.8 0-24.1-10.9-35.3-30.1-35.3-16.1 0-25.6 7.8-27.7 11.1l-22.8-4.6c4.6-7.8 16.8-16.1 50.6-16.1 32.1 0 48.2 19.1 48.2 48.1v60.2h-24.4v-19.6zM196.9 76.7l-1.6-7.4h-21.6v87.5h25v-63.1c0-10.3 6.9-16.1 13.2-16.1 5.4 0 9.1 2.3 10.5 4.7l11.2-19.1c-3.2-2.6-10.1-6.3-21.7-6.3-12.1 0-23.1 6.9-23.1 23.4v-61.6h-25.1v19.6h.2zM146.9 47.6l-24.4 5.2-.1 80.1c0 14.8 11.1 25.7 25.9 25.7 8.2 0 14.2-1.5 17.5-3.3V135c-3.2 1.3-19 5.9-19-8.9V90.6h19V69.3h-19V47.6zM79.3 94.7c0-3.9.3-7.9 1-11.7H55.1l-.2.1c-6.2.1-10.9 7.1-11.8 13.3v88.1h25.1v-58.6c0-5.4.4-10.5 1.1-15.2h-1.1c-2.1 4.1-5.2 7.1-8.6 9.1v64.7h25.1v-59.1c.1-.1.1-.1.1 0zM53.5 69.3H28.2v87.5h25.1v-13.6c3.1 2.2 7.2 4.3 12.4 4.3 17.9 0 34.1-15.1 34.1-46.1 0-26.1-13.8-44.8-31.8-44.8-7.4 0-12.1 2.1-15.5 4.7v-1.2zm-2.1 68.9c-5.9 0-9.4-2.1-11.8-4.7V90.6c2.6-2.9 6.2-4.9 11.9-4.9 9.9 0 17.2 13.2 17.2 23.3-.1 15.6-8.1 23.4-17.3 23.4z"/>
  </svg>
)

// Orange Money Logo Component
const OrangeMoneyLogo = () => (
  <div className="flex flex-col items-center justify-center w-full h-full">
    <div className="flex items-center justify-center space-x-1">
      <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full"></div>
      <span className="text-white font-bold text-sm md:text-base">Orange</span>
    </div>
    <span className="text-white text-xs md:text-sm font-medium mt-0.5">Money</span>
  </div>
)

// Mobile Money Logo Component (MTN)
const MobileMoneyLogo = () => (
  <div className="flex flex-col items-center justify-center w-full h-full">
    <div className="flex items-center justify-center">
      <span className="text-white font-bold text-lg md:text-xl">MTN</span>
    </div>
    <span className="text-white text-xs md:text-sm font-medium mt-0.5">Mobile Money</span>
  </div>
)

const PaymentMethods = () => {
  const { t } = useLanguage()
  
  const paymentMethods = [
    { 
      name: 'Stripe', 
      component: <StripeLogo />,
      bgColor: 'bg-white',
      borderColor: 'border-gray-300',
      hoverBorder: 'hover:border-green-400'
    },
    { 
      name: 'Orange Money', 
      component: <OrangeMoneyLogo />,
      bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
      borderColor: 'border-orange-400',
      hoverBorder: 'hover:border-orange-500'
    },
    { 
      name: 'Mobile Money', 
      component: <MobileMoneyLogo />,
      bgColor: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      borderColor: 'border-yellow-400',
      hoverBorder: 'hover:border-yellow-500'
    },
  ]

  return (
    <div className="text-center">
      <p className="text-gray-700 mb-6 text-sm md:text-base font-medium">
        {t('paymentMethodsSupported')}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
        {paymentMethods.map((method, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-28 h-20 md:w-36 md:h-24 ${method.bgColor} rounded-xl border-2 ${method.borderColor} ${method.hoverBorder} hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer`}
            title={method.name}
          >
            <div className="w-full h-full p-3 md:p-4 flex items-center justify-center">
              {method.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentMethods

