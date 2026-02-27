import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  FiPackage,
  FiUsers,
  FiDollarSign,
  FiSettings,
  FiFileText,
  FiSearch,
  FiBell,
  FiHelpCircle,
  FiLogOut,
  FiGrid,
  FiFolder,
  FiBarChart2,
  FiDownload,
  FiTrendingUp,
  FiMoreHorizontal,
} from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import ProductsManagement from './ProductsManagement'
import OrdersManagement from './OrdersManagement'
import SettingsManagement from './SettingsManagement'
import Analytics from './Analytics'
import UserManagement from './UserManagement'

const AdminDashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [timeframe, setTimeframe] = useState('weekly')

  // Mock data for dashboard
  const [dashboardData, setDashboardData] = useState({
    totalSales: 25000000,
    totalDownloads: 1240,
    activeProducts: 48,
    newCustomers: 156,
    salesGrowth: 12.5,
    downloadsGrowth: 5.2,
    customersGrowth: 18.3,
    monthlyProgress: 72,
    coursesSold: { current: 124, target: 200 },
    newLeads: { current: 85, target: 100 },
    weeklySales: [12000, 15000, 18000, 14000, 25000, 16000, 19000],
  })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return 'AD'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const menuItems = [
    { path: '', label: 'Dashboard Overview', icon: FiGrid, section: 'main' },
    { path: 'products', label: 'Content Management', icon: FiFolder, section: 'management' },
    { path: 'orders', label: 'Orders & Payments', icon: FiFileText, section: 'management' },
    { path: 'users', label: 'User Management', icon: FiUsers, section: 'management' },
    { path: 'analytics', label: 'Analytics', icon: FiBarChart2, section: 'management' },
    { path: 'settings', label: 'Settings', icon: FiSettings, section: 'system' },
  ]

  const mainMenuItem = menuItems.find((item) => item.section === 'main')
  const managementItems = menuItems.filter((item) => item.section === 'management')
  const systemItems = menuItems.filter((item) => item.section === 'system')

  const recentOrders = [
    {
      id: 'ORD-9452',
      customer: { name: 'Marc Kasem', initials: 'MK' },
      product: 'Advanced Cattle Breeding',
      price: 120000,
      status: 'PAID',
    },
    {
      id: 'ORD-9451',
      customer: { name: 'Sarah Johnson', initials: 'SJ' },
      product: 'Poultry Management Guide',
      price: 85000,
      status: 'PAID',
    },
    {
      id: 'ORD-9450',
      customer: { name: 'Ahmed Hassan', initials: 'AH' },
      product: 'Veterinary Basics',
      price: 95000,
      status: 'PENDING',
    },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'
  }

  const maxSales = Math.max(...dashboardData.weeklySales)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">ACADÉMIE DES ÉLEVEURS</h2>
                <p className="text-xs text-gray-500">ADMIN DASHBOARD</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Dashboard Overview */}
            {mainMenuItem && (() => {
              const isActive = location.pathname === '/admin' || location.pathname === '/admin/'
              return (
                <Link
                  to="/admin"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <mainMenuItem.icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-primary-600' : 'text-gray-500'
                    }`}
                  />
                  <span className="font-medium text-sm">{mainMenuItem.label}</span>
                </Link>
              )
            })()}

            {/* MANAGEMENT Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">
                MANAGEMENT
              </h3>
              <div className="space-y-1">
                {managementItems.map((item) => {
                  const Icon = item.icon
                  // Check if current path matches the menu item path
                  const isActive =
                    location.pathname === `/admin/${item.path}` ||
                    location.pathname.startsWith(`/admin/${item.path}/`)
                  return (
                    <Link
                      key={item.path}
                      to={`/admin/${item.path}`}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`}
                      />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* SYSTEM Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">
                SYSTEM
              </h3>
              <div className="space-y-1">
                {systemItems.map((item) => {
                  const Icon = item.icon
                  // Check if current path matches the menu item path
                  const isActive =
                    location.pathname === `/admin/${item.path}` ||
                    location.pathname.startsWith(`/admin/${item.path}/`)
                  return (
                    <Link
                      key={item.path}
                      to={`/admin/${item.path}`}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`}
                      />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search orders, customers, or content..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Right Side Icons and User */}
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiBell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiHelpCircle className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name || 'Jean Dupont'}
                    </p>
                    <p className="text-xs text-gray-500">{user?.role || 'Super Admin'}</p>
                  </div>
                  <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-amber-800">
                      {getUserInitials(user?.name || 'Jean Dupont')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <Routes>
              <Route
                index
                element={
                  <DashboardOverview
                    dashboardData={dashboardData}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    recentOrders={recentOrders}
                    formatCurrency={formatCurrency}
                    maxSales={maxSales}
                    user={user}
                  />
                }
              />
              <Route path="products" element={<ProductsManagement />} />
              <Route path="orders" element={<OrdersManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<SettingsManagement />} />
              <Route
                path="*"
                element={
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
                      <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
                      <Link
                        to="/admin"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Go to Dashboard
                      </Link>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

// Dashboard Overview Component
const DashboardOverview = ({
  dashboardData,
  timeframe,
  setTimeframe,
  recentOrders,
  formatCurrency,
  maxSales,
  user,
}) => {
  const metricCards = [
    {
      label: 'Total Sales',
      value: formatCurrency(dashboardData.totalSales),
      change: `+${dashboardData.salesGrowth}%`,
      icon: FiDollarSign,
      iconColor: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Downloads',
      value: dashboardData.totalDownloads.toLocaleString(),
      change: `+${dashboardData.downloadsGrowth}%`,
      icon: FiDownload,
      iconColor: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Active Products',
      value: dashboardData.activeProducts,
      change: 'Stable',
      icon: FiPackage,
      iconColor: 'bg-orange-100 text-orange-600',
    },
    {
      label: 'New Customers',
      value: dashboardData.newCustomers,
      change: `+${dashboardData.customersGrowth}%`,
      icon: FiUsers,
      iconColor: 'bg-purple-100 text-purple-600',
    },
  ]

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  // Get sales data based on timeframe
  const getSalesData = () => {
    switch (timeframe) {
      case 'monthly':
        // Monthly data - weeks of the month
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          data: [85000, 92000, 110000, 98000],
        }
      case 'yearly':
        // Yearly data - months
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [850000, 920000, 1100000, 980000, 1250000, 1180000],
        }
      case 'weekly':
      default:
        // Weekly data - days of the week
        return {
          labels: days,
          data: dashboardData.weeklySales,
        }
    }
  }

  const salesData = getSalesData()
  const currentMaxSales = Math.max(...salesData.data, 1)

  return (
    <div className="space-y-6">
      {/* Title and Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome back, {user?.name?.split(' ')[0] || 'Jean'}. Here's what's happening today at
          the academy.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.iconColor} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    card.change === 'Stable' ? 'text-gray-500' : 'text-green-600'
                  }`}
                >
                  {card.change}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          )
        })}
      </div>

      {/* Charts and Progress Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Over Time Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Sales Over Time</h2>
            <div className="flex space-x-2">
              {['Weekly', 'Monthly', 'Yearly'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period.toLowerCase())}
                  className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                    timeframe === period.toLowerCase()
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-52 flex flex-col justify-between text-xs text-gray-500 pr-3 pointer-events-none">
              <span className="font-semibold text-gray-700">{formatCurrency(currentMaxSales)}</span>
              <span>{formatCurrency(Math.round(currentMaxSales / 2))}</span>
              <span className="font-semibold">0</span>
            </div>
            {/* Chart Container - Fixed height with bottom alignment */}
            <div className="flex items-end justify-between h-52 space-x-2 pb-10 pl-10">
              {salesData.data.map((sales, index) => {
                const barHeight = currentMaxSales > 0 ? (sales / currentMaxSales) * 100 : 0
                // Highlight the highest value or Friday for weekly view
                const isHighlighted =
                  timeframe === 'weekly' ? index === 4 : sales === currentMaxSales
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center group relative h-full"
                  >
                    {/* Tooltip - positioned above the bar */}
                    <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
                      <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl">
                        <div className="font-semibold text-white">{salesData.labels[index]}</div>
                        <div className="text-primary-300 mt-0.5 font-medium">
                          {formatCurrency(sales)}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                    {/* Bar - grows from bottom */}
                    <div className="w-full h-full flex items-end justify-center relative">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-90 cursor-pointer relative ${
                          isHighlighted
                            ? 'bg-primary-600 shadow-md'
                            : 'bg-primary-200 hover:bg-primary-300'
                        }`}
                        style={{
                          height: `${Math.max(barHeight, 3)}%`,
                          minHeight: barHeight > 0 ? '6px' : '0px',
                        }}
                      />
                    </div>
                    {/* Day Label */}
                    <span
                      className={`text-xs mt-3 font-medium whitespace-nowrap transition-colors ${
                        isHighlighted ? 'text-primary-600 font-semibold' : 'text-gray-500'
                      }`}
                    >
                      {salesData.labels[index]}
                    </span>
                  </div>
                )
              })}
            </div>
            {/* Grid lines for better readability */}
            <div className="absolute inset-0 pl-10 pb-10 pointer-events-none">
              <div className="h-full flex flex-col justify-between">
                <div className="border-t border-gray-100"></div>
                <div className="border-t border-gray-100"></div>
                <div className="border-t border-gray-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Target Progress Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Target Progress</h2>
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - dashboardData.monthlyProgress / 100)}`}
                  className="text-primary-600"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">
                    {dashboardData.monthlyProgress}%
                  </p>
                  <p className="text-xs text-gray-500">MONTHLY</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Courses Sold</span>
                <span className="font-medium text-gray-900">
                  {dashboardData.coursesSold.current} / {dashboardData.coursesSold.target}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (dashboardData.coursesSold.current / dashboardData.coursesSold.target) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">New Leads</span>
                <span className="font-medium text-gray-900">
                  {dashboardData.newLeads.current} / {dashboardData.newLeads.target}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (dashboardData.newLeads.current / dashboardData.newLeads.target) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
          <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
            <FiPackage className="w-5 h-5" />
            <span>Upload New Content</span>
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <Link
            to="/admin/orders"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            View All Orders
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ORDER ID
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  CUSTOMER
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  PRODUCT
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  PRICE
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="text-primary-600 font-medium">#{order.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary-700">
                          {order.customer.initials}
                        </span>
                      </div>
                      <span className="text-sm text-gray-900">{order.customer.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">{order.product}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{formatCurrency(order.price)}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'PAID'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiMoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

