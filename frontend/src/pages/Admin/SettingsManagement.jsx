import { useState, useEffect } from 'react'
import { useApp } from '../../contexts/AppContext'
import {
  FiSave,
  FiMessageCircle,
  FiFacebook,
  FiYoutube,
  FiGlobe,
  FiSettings,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
  FiLink,
  FiExternalLink,
  FiInfo,
  FiDollarSign,
} from 'react-icons/fi'

const SettingsManagement = () => {
  const { socialLinks, updateSocialLinks, siteConfig } = useApp()
  const [activeTab, setActiveTab] = useState('social')
  const [formData, setFormData] = useState({
    whatsapp: '',
    facebook: '',
    youtube: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setFormData({
      whatsapp: socialLinks.whatsapp || '',
      facebook: socialLinks.facebook || '',
      youtube: socialLinks.youtube || '',
    })
  }, [socialLinks])

  useEffect(() => {
    const hasChanged =
      formData.whatsapp !== (socialLinks.whatsapp || '') ||
      formData.facebook !== (socialLinks.facebook || '') ||
      formData.youtube !== (socialLinks.youtube || '')
    setHasChanges(hasChanged)
  }, [formData, socialLinks])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (message.text) {
      setMessage({ type: '', text: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      await updateSocialLinks(formData)
      setMessage({
        type: 'success',
        text: 'Settings updated successfully!',
      })
      setTimeout(() => setMessage({ type: '', text: '' }), 5000)
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update settings. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      whatsapp: socialLinks.whatsapp || '',
      facebook: socialLinks.facebook || '',
      youtube: socialLinks.youtube || '',
    })
    setMessage({ type: '', text: '' })
  }

  const validateUrl = (url) => {
    if (!url) return true
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const tabs = [
    { id: 'social', label: 'Social Media', icon: FiLink },
    { id: 'general', label: 'General', icon: FiSettings },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
        <p className="text-gray-600">Manage your site configuration and social media links</p>
      </div>

      {/* Success/Error Message */}
      {message.text && (
        <div
          className={`p-4 rounded-lg flex items-center justify-between ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center space-x-3">
            {message.type === 'success' ? (
              <FiCheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <FiAlertCircle className="w-5 h-5 text-red-600" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
          <button
            onClick={() => setMessage({ type: '', text: '' })}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl">
        {activeTab === 'social' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Social Media Links Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <FiLink className="w-5 h-5 text-primary-600" />
                  <span>Social Media Links</span>
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Update your social media links that appear throughout the site
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* WhatsApp */}
                <div className="space-y-2">
                  <label
                    htmlFor="whatsapp"
                    className="flex items-center space-x-2 text-sm font-semibold text-gray-900"
                  >
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FiMessageCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span>WhatsApp</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="https://wa.me/237699933135"
                      className={`w-full pl-4 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        formData.whatsapp && !validateUrl(formData.whatsapp)
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    />
                    {formData.whatsapp && (
                      <a
                        href={formData.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-600 hover:text-primary-700"
                        title="Test link"
                      >
                        <FiExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-start space-x-2 text-xs text-gray-500">
                    <FiInfo className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Format: https://wa.me/[country code][phone number]</span>
                  </div>
                  {formData.whatsapp && !validateUrl(formData.whatsapp) && (
                    <p className="text-xs text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>Please enter a valid URL</span>
                    </p>
                  )}
                </div>

                {/* Facebook */}
                <div className="space-y-2">
                  <label
                    htmlFor="facebook"
                    className="flex items-center space-x-2 text-sm font-semibold text-gray-900"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FiFacebook className="w-5 h-5 text-blue-600" />
                    </div>
                    <span>Facebook</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="facebook"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                      placeholder="https://web.facebook.com/your-page"
                      className={`w-full pl-4 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        formData.facebook && !validateUrl(formData.facebook)
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    />
                    {formData.facebook && (
                      <a
                        href={formData.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-600 hover:text-primary-700"
                        title="Test link"
                      >
                        <FiExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-start space-x-2 text-xs text-gray-500">
                    <FiInfo className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Link to your Facebook page or group</span>
                  </div>
                  {formData.facebook && !validateUrl(formData.facebook) && (
                    <p className="text-xs text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>Please enter a valid URL</span>
                    </p>
                  )}
                </div>

                {/* YouTube */}
                <div className="space-y-2">
                  <label
                    htmlFor="youtube"
                    className="flex items-center space-x-2 text-sm font-semibold text-gray-900"
                  >
                    <div className="p-2 bg-red-100 rounded-lg">
                      <FiYoutube className="w-5 h-5 text-red-600" />
                    </div>
                    <span>YouTube</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="youtube"
                      name="youtube"
                      value={formData.youtube}
                      onChange={handleChange}
                      placeholder="https://www.youtube.com/@your-channel"
                      className={`w-full pl-4 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                        formData.youtube && !validateUrl(formData.youtube)
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    />
                    {formData.youtube && (
                      <a
                        href={formData.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-600 hover:text-primary-700"
                        title="Test link"
                      >
                        <FiExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-start space-x-2 text-xs text-gray-500">
                    <FiInfo className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Link to your YouTube channel</span>
                  </div>
                  {formData.youtube && !validateUrl(formData.youtube) && (
                    <p className="text-xs text-red-600 flex items-center space-x-1">
                      <FiAlertCircle className="w-4 h-4" />
                      <span>Please enter a valid URL</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3">
              {hasChanges && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Reset
                </button>
              )}
              <button
                type="submit"
                disabled={loading || !hasChanges}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <FiSave className="w-5 h-5" />
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}

        {activeTab === 'general' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <FiSettings className="w-5 h-5 text-primary-600" />
                <span>General Settings</span>
              </h2>
              <p className="text-sm text-gray-600 mt-1">Site-wide configuration settings</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Site Name */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900">
                  <FiGlobe className="w-5 h-5 text-primary-600" />
                  <span>Site Name</span>
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                  <p className="text-gray-900 font-medium">{siteConfig.siteName}</p>
                  <p className="text-xs text-gray-500 mt-1">This setting cannot be changed</p>
                </div>
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900">
                  <FiDollarSign className="w-5 h-5 text-primary-600" />
                  <span>Currency</span>
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                  <p className="text-gray-900 font-medium">{siteConfig.currency || 'FCFA'}</p>
                  <p className="text-xs text-gray-500 mt-1">Default currency for all transactions</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <FiInfo className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">Information</p>
                    <p className="text-sm text-blue-700">
                      General settings are managed by the system. Contact your administrator for
                      changes to site name or currency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingsManagement

