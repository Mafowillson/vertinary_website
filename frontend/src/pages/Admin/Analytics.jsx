import { useState, useEffect } from 'react'
import { FiDollarSign, FiPackage, FiUsers, FiTrendingUp } from 'react-icons/fi'

const Analytics = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This would fetch real analytics data from the API
    // For now, using mock data
    setTimeout(() => {
      setStats({
        totalRevenue: 1250000,
        totalOrders: 591,
        totalProducts: 12,
        totalUsers: 450,
      })
      setLoading(false)
    }, 500)
  }, [])

  const statCards = [
    {
      label: 'Revenus totaux',
      value: stats.totalRevenue,
      icon: FiDollarSign,
      color: 'bg-green-500',
      format: (val) => `${(val / 1000).toFixed(0)}K FCFA`,
    },
    {
      label: 'Commandes',
      value: stats.totalOrders,
      icon: FiPackage,
      color: 'bg-blue-500',
    },
    {
      label: 'Produits',
      value: stats.totalProducts,
      icon: FiTrendingUp,
      color: 'bg-green-500',
    },
    {
      label: 'Utilisateurs',
      value: stats.totalUsers,
      icon: FiUsers,
      color: 'bg-orange-500',
    },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytiques</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.format ? stat.format(stat.value) : stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Analytics

