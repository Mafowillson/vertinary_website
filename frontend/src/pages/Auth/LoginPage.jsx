import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'
import { FiLock, FiAlertCircle, FiArrowRight, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { t } = useTranslation('auth')
  const { t: tCommon } = useTranslation('common')
  const { t: tErrors } = useTranslation('errors')
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.returnTo || '/'

  useEffect(() => {
    if (location.state?.registrationSuccess) {
      setInfo(t('register.success'))
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.pathname, location.state?.registrationSuccess, navigate, t])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || err.response?.data?.message || tErrors('loginFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">{t('login.title')}</h2>
            <p className="text-sm text-gray-500">{t('login.secureMessage')}</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {info && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2">
                <FiCheckCircle className="w-5 h-5 shrink-0" />
                <span className="text-sm">{info}</span>
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                <FiAlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t('login.emailLabel')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A7A6E] focus:border-transparent outline-none transition-colors"
                  placeholder="name@clinic.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    {t('login.passwordLabel')}
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#1A7A6E] hover:text-[#156b60] font-medium"
                  >
                    {t('login.forgotPassword')}
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A7A6E] focus:border-transparent outline-none transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label={showPassword ? t('login.hidePassword') : t('login.showPassword')}
                  >
                    {showPassword ? <FiEye className="w-5 h-5" /> : <FiEyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A7A6E] hover:brightness-105 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>{loading ? tCommon('misc.processing') : t('login.submitButton')}</span>
              {!loading && <FiArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              {t('login.noAccount')}{' '}
              <Link to="/register" className="font-medium text-[#1A7A6E] hover:text-[#156b60]">
                {t('login.registerLink')}
              </Link>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-gray-500 text-xs">
              <FiCheckCircle className="w-4 h-4" />
              <span className="font-medium">{t('passwordReset.hipaa')}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500 text-xs">
              <FiLock className="w-4 h-4" />
              <span className="font-medium">{t('passwordReset.encryption')}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center space-y-2">
          <p className="text-xs text-gray-500">
            {t('passwordReset.footerRights', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Link to="/privacy" className="hover:text-gray-700">
              {tCommon('footer.privacy')}
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-gray-700">
              {tCommon('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
