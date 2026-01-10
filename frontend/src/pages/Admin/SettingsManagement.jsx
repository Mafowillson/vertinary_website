import { useState } from 'react'
import { useApp } from '../../contexts/AppContext'
import { FiSave, FiMessageCircle, FiFacebook } from 'react-icons/fi'

const SettingsManagement = () => {
  const { socialLinks, updateSocialLinks } = useApp()
  const [formData, setFormData] = useState({
    whatsapp: socialLinks.whatsapp || '',
    facebook: socialLinks.facebook || '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await updateSocialLinks(formData)
      setMessage('Paramètres mis à jour avec succès!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres</h2>

      <form onSubmit={handleSubmit} className="card max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Liens sociaux</h3>

        {message && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.includes('succès') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <FiMessageCircle className="w-5 h-5 text-green-600" />
                <span>WhatsApp</span>
              </div>
            </label>
            <input
              type="url"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="https://wa.me/237699933135"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">
              Format: https://wa.me/[numéro avec indicatif]
            </p>
          </div>

          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <FiFacebook className="w-5 h-5 text-blue-600" />
                <span>Facebook</span>
              </div>
            </label>
            <input
              type="url"
              id="facebook"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="https://web.facebook.com/search/top?q=l%27acad%C3%A9mie%20des%20%C3%A9leveurs"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">
              Lien vers votre groupe ou page Facebook
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            <FiSave className="w-4 h-4" />
            <span>{loading ? 'Enregistrement...' : 'Enregistrer'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default SettingsManagement

