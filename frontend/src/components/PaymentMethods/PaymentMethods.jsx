const PaymentMethods = () => {
  const paymentMethods = [
    { name: 'Visa', icon: '💳', color: 'bg-blue-600' },
    { name: 'Mobile Money', icon: '📱', color: 'bg-orange-500' },
    { name: 'Orange Money', icon: '🟠', color: 'bg-orange-600' },
    { name: 'MTN MoMo', icon: '📲', color: 'bg-yellow-500' },
  ]

  return (
    <div>
      <p className="text-sm text-gray-600 mb-3">Moyens de paiement disponibles</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {paymentMethods.map((method, index) => (
          <div
            key={index}
            className="border-2 border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-primary-500 transition-colors"
          >
            <div className={`w-12 h-12 ${method.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
              <span className="text-2xl">{method.icon}</span>
            </div>
            <span className="text-xs text-gray-600">{method.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentMethods

