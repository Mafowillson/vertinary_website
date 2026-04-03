import api, { getApiErrorMessage } from '../../axiosInterceptor'

function mapUserFromApi(user) {
  if (!user || typeof user !== 'object') return user
  return {
    ...user,
    isActive: user.isActive ?? user.is_active,
    isVerified: user.isVerified ?? user.is_verified,
    createdAt: user.createdAt ?? user.created_at,
  }
}

export const authService = {
  async login(email, password) {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      return {
        token: data.token,
        refresh_token: data.refresh_token,
        user: mapUserFromApi(data.user),
      }
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  /**
   * Registration succeeds without tokens; user must verify email before login.
   */
  async register(userData) {
    try {
      const { data } = await api.post('/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      })
      return {
        message: data.message,
        email: data.email,
      }
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async getCurrentUser() {
    try {
      const { data } = await api.get('/auth/me')
      return mapUserFromApi(data)
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async verifyEmail(token) {
    try {
      const { data } = await api.post('/auth/verify-email', { token })
      return data
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async resendVerificationEmail(email) {
    try {
      const { data } = await api.post('/auth/resend-verification-email', { email })
      return data
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async forgotPassword(email) {
    try {
      const { data } = await api.post('/auth/forgot-password', { email })
      return data
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  async resetPassword(token, password) {
    try {
      const { data } = await api.post('/auth/reset-password', { token, password })
      return data
    } catch (error) {
      throw new Error(getApiErrorMessage(error))
    }
  },

  logout() {
    return Promise.resolve()
  },
}
