import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FiAlertCircle, FiCheckCircle, FiEye, FiEyeOff, FiLock, FiArrowLeft } from 'react-icons/fi'
import { authService } from '../../services/authService'

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!token.trim()) {
      setError('Lien invalide ou expiré. Demandez un nouveau lien depuis la page mot de passe oublié.')
      return
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }

    setLoading(true)

    try {
      await authService.resetPassword(token.trim(), password)
      setSuccess(true)
      setTimeout(() => navigate('/login', { replace: true }), 2000)
    } catch (err) {
      setError(err.message || 'Impossible de réinitialiser le mot de passe. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  if (!token.trim() && !success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 space-y-4 text-center">
          <p className="text-gray-700">
            Lien invalide ou expiré. Utilisez le lien reçu par email ou demandez-en un nouveau.
          </p>
          <Link
            to="/forgot-password"
            className="inline-flex items-center justify-center text-green-600 hover:text-green-700 font-medium"
          >
            Mot de passe oublié
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <FiLock className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Nouveau mot de passe
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Choisissez un mot de passe sécurisé. Au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.
              </p>
            </div>
          </div>

          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center text-sm">
              <p>Mot de passe mis à jour. Redirection vers la connexion…</p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                  <FiAlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enregistrement…' : 'Enregistrer le mot de passe'}
              </button>
            </form>
          )}

          <div className="text-center pt-4">
            <Link
              to="/login"
              className="text-sm text-gray-700 hover:text-gray-900 font-medium flex items-center justify-center space-x-2"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Retour à la connexion</span>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-gray-500 text-xs">
              <FiCheckCircle className="w-4 h-4 text-green-600" />
              <span className="font-medium">CONFORME HIPAA</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center space-x-2 text-gray-500 text-xs">
              <FiLock className="w-4 h-4 text-green-600" />
              <span className="font-medium">CRYPTAGE 256 BITS</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Académie des Éleveurs. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
