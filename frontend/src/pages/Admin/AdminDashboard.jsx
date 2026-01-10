import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { FiPackage, FiUsers, FiDollarSign, FiSettings, FiFileText } from 'react-icons/fi'
import ProductsManagement from './ProductsManagement'
import OrdersManagement from './OrdersManagement'
import SettingsManagement from './SettingsManagement'
import Analytics from './Analytics'

const AdminDashboard = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/admin', label: 'Analytiques', icon: FiDollarSign },
    { path: '/admin/products', label: 'Produits', icon: FiPackage },
    { path: '/admin/orders', label: 'Commandes', icon: FiFileText },
    { path: '/admin/settings', label: 'Paramètres', icon: FiSettings },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord Admin</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Routes>
            <Route index element={<Analytics />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="orders" element={<OrdersManagement />} />
            <Route path="settings" element={<SettingsManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

