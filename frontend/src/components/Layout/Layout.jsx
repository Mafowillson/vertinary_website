import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import FloatingChat from '../FloatingChat/FloatingChat'

const Layout = () => {
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

