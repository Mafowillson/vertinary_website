import { Link } from 'react-router-dom'
import { FiMapPin, FiMail, FiPhone, FiYoutube, FiFacebook, FiGlobe } from 'react-icons/fi'
import { useApp } from '../../contexts/AppContext'

const Footer = () => {
  const { siteConfig } = useApp()

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Logo & Description */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-green-600 text-2xl">🐾</span>
              <span className="text-xl font-semibold text-gray-800">
                Académie des Éleveurs
              </span>
            </Link>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Partageons nos connaissances en élevage avec les Camerounais et le monde entier. Plateforme dédiée au partage de savoir en médecine vétérinaire à travers des livres, formations et ressources accessibles à tous, partout.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://www.youtube.com/@academiedeseleveurs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube className="w-4 h-4" />
              </a>
              <a
                href="https://web.facebook.com/search/top/?q=l%27acad%C3%A9mie%20des%20%C3%A9leveurs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/237699933135"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <FiPhone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Trouver des Ressources
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Nos Livres
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Formations en Ligne
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  À Propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Centre d'Aide
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/237699933135"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors text-sm"
                >
                  Nous Contacter
                </a>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                  Conditions d'Utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Informations de Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  Cameroun<br />
                  Académie des Éleveurs
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-green-600 flex-shrink-0" />
                <a
                  href="https://wa.me/237699933135"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors text-sm"
                >
                  +237 699 933 135
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FiYoutube className="w-5 h-5 text-green-600 flex-shrink-0" />
                <a
                  href="https://www.youtube.com/@academiedeseleveurs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors text-sm"
                >
                  YouTube Channel
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FiFacebook className="w-5 h-5 text-green-600 flex-shrink-0" />
                <a
                  href="https://web.facebook.com/search/top/?q=l%27acad%C3%A9mie%20des%20%C3%A9leveurs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors text-sm"
                >
                  Page Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Académie des Éleveurs. Tous droits réservés.
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <Link to="/privacy" className="hover:text-green-600 transition-colors">
                Politique de Confidentialité
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-green-600 transition-colors">
                Conditions d'Utilisation
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span>Fondé par TCHOUALA FONDEM BODRIC</span>
              <span>•</span>
              <span>Français (CM)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
