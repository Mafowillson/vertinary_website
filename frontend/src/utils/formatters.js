export const formatCurrency = (amount, currency = 'FCFA') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF', // West African CFA franc
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('XOF', currency)
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

