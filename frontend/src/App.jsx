import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AppProvider } from './contexts/AppContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ServicesPage from './pages/ServicesPage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import CheckoutPage from './pages/CheckoutPage'
import PurchaseConfirmationPage from './pages/PurchaseConfirmationPage'
import DownloadPage from './pages/DownloadPage'
import AdminDashboard from './pages/Admin/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import './styles/index.css'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="products/:id" element={<ProductDetailPage />} />
                  <Route path="services" element={<ServicesPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="checkout/:productId" element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } />
                  <Route path="purchase-confirmation/:orderId" element={
                    <ProtectedRoute>
                      <PurchaseConfirmationPage />
                    </ProtectedRoute>
                  } />
                  <Route path="download/:orderId" element={
                    <ProtectedRoute>
                      <DownloadPage />
                    </ProtectedRoute>
                  } />
                  <Route path="admin/*" element={
                    <ProtectedRoute requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                </Route>
              </Routes>
            </Router>
          </AppProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

