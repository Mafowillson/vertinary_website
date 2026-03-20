import { useState, useEffect } from 'react'
import { productService } from '../../services/productService'
import {
  FiX,
  FiPackage,
  FiDollarSign,
  FiImage,
  FiInfo,
  FiAlertCircle,
  FiCheckCircle,
  FiCalendar,
  FiTrendingUp,
} from 'react-icons/fi'

const ProductForm = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    original_price: '',
    image_url: '',
    stock: '',
    offer_end_date: '',
    featured: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        original_price: product.original_price || product.originalPrice || '',
        image_url: product.image_url || product.imageUrl || '',
        stock: product.stock || '',
        offer_end_date: product.offer_end_date
          ? new Date(product.offer_end_date).toISOString().slice(0, 16)
          : product.offerEndDate
            ? new Date(product.offerEndDate).toISOString().slice(0, 16)
            : '',
        featured: product.featured || false,
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    // Clear errors when user starts typing
    if (error) setError('')
    if (success) setSuccess(false)
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Le titre est requis')
      return false
    }
    if (!formData.description?.trim()) {
      setError('La description est requise')
      return false
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Un prix valide est requis')
      return false
    }
    if (formData.original_price && parseFloat(formData.original_price) <= parseFloat(formData.price)) {
      setError('Le prix original doit être supérieur au prix actuel')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const submitData = {
        title: formData.title.trim(),
        description: formData.description?.trim() || null,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        image_url: formData.image_url?.trim() || null,
        stock: formData.stock ? parseInt(formData.stock) : 0,
        offer_end_date: formData.offer_end_date || null,
        featured: formData.featured,
      }

      if (product) {
        await productService.updateProduct(product.id, submitData)
        setSuccess(true)
        setTimeout(() => {
          onClose()
        }, 1000)
      } else {
        await productService.createProduct(submitData)
        setSuccess(true)
        setTimeout(() => {
          onClose()
        }, 1000)
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Échec de l\'enregistrement du produit. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-50 to-primary-100 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-600 rounded-lg">
              <FiPackage className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {product ? 'Modifier le produit' : 'Créer un nouveau produit'}
              </h2>
              <p className="text-sm text-gray-600">
                {product ? 'Mettre à jour les informations du produit' : 'Ajouter un nouveau produit à votre catalogue'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-lg"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-3">
              <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="font-medium">
                {product ? 'Produit mis à jour avec succès !' : 'Produit créé avec succès !'}
              </span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center space-x-3">
              <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <FiInfo className="w-5 h-5 text-primary-600" />
              <span>Informations de base</span>
            </h3>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Titre du produit <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="ex. Guide avancé d'élevage bovin"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Fournissez une description détaillée du produit..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
              />
            </div>
          </div>

          {/* Pricing Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <FiDollarSign className="w-5 h-5 text-primary-600" />
              <span>Tarification</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Prix actuel (FCFA) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    FCFA
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Prix original (FCFA)
                  <span className="text-xs text-gray-500 ml-2">(pour les réductions)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="original_price"
                    min="0"
                    step="0.01"
                    value={formData.original_price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    FCFA
                  </span>
                </div>
                {formData.original_price && parseFloat(formData.original_price) > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Réduction :{' '}
                    {formData.price
                      ? `${(
                          ((parseFloat(formData.original_price) - parseFloat(formData.price)) /
                            parseFloat(formData.original_price)) *
                          100
                        ).toFixed(0)}%`
                      : '0%'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <FiImage className="w-5 h-5 text-primary-600" />
              <span>Image du produit</span>
            </h3>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                URL de l'image
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://exemple.com/image-produit.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center space-x-1">
                <FiInfo className="w-3 h-3" />
                <span>Entrez une URL d'image valide. L'image sera affichée sur les cartes produit.</span>
              </p>
              {formData.image_url && (
                <div className="mt-3">
                  <img
                    src={formData.image_url}
                    alt="Aperçu"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Inventory & Settings Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <FiPackage className="w-5 h-5 text-primary-600" />
              <span>Inventaire & Paramètres</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Quantité en stock
                </label>
                <input
                  type="number"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Laissez vide ou 0 pour un stock illimité</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                  <FiCalendar className="w-4 h-4" />
                  <span>Date de fin d'offre</span>
                </label>
                <input
                  type="datetime-local"
                  name="offer_end_date"
                  value={formData.offer_end_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Définir quand l'offre spéciale expire</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="featured" className="flex-1 cursor-pointer">
                <div className="flex items-center space-x-2">
                  <FiTrendingUp className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-semibold text-gray-900">Produit en vedette</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Les produits en vedette sont mis en avant et affichés de manière visible sur le site
                </p>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Enregistrement...</span>
                </>
              ) : success ? (
                <>
                  <FiCheckCircle className="w-5 h-5" />
                  <span>Enregistré !</span>
                </>
              ) : (
                <span>{product ? 'Mettre à jour le produit' : 'Créer le produit'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm

