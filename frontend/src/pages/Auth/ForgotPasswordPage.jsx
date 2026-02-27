import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiAlertCircle, FiCheckCircle, FiLock, FiRefreshCw, FiArrowLeft } from 'react-icons/fi'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // TODO: Implement API call to send reset password email
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate success
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Main Reset Password Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          {/* Header with Icon */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <FiRefreshCw className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Reset your password
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Enter your email address and we will send you a link to reset your password.
              </p>
            </div>
          </div>

          {/* Form */}
          {!success ? (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                  <FiAlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                  placeholder="e.g. name@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                <p className="text-sm">
                  If an account exists with that email, we've sent you a password reset link.
                </p>
              </div>
            </div>
          )}

          {/* Back to Login Link */}
          <div className="text-center pt-4">
            <Link
              to="/login"
              className="text-sm text-gray-700 hover:text-gray-900 font-medium flex items-center justify-center space-x-2"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>

          {/* Security Badges */}
          <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-gray-500 text-xs">
              <FiCheckCircle className="w-4 h-4 text-green-600" />
              <span className="font-medium">HIPAA COMPLIANT</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center space-x-2 text-gray-500 text-xs">
              <FiLock className="w-4 h-4 text-green-600" />
              <span className="font-medium">256-BIT ENCRYPTION</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2024 Académie des Éleveurs. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
