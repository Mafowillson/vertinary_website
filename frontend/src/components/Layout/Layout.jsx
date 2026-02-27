import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import FloatingChat from '../FloatingChat/FloatingChat'

const Layout = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  // Don't render Header and Footer for admin routes
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-white">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  )
}

export default Layout

