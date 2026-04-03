import axios from 'axios'
import i18next from 'i18next'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

let refreshPromise = null

function clearAuthAndRedirectToLogin() {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  window.location.href = '/login'
}

function refreshAccessToken() {
  if (!refreshPromise) {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      return Promise.reject(new Error('No refresh token'))
    }
    refreshPromise = refreshClient
      .post('/auth/refresh', { refresh_token: refreshToken })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        return data.token
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

/**
 * Human-readable message from FastAPI-style error responses (detail string or validation array).
 */
export function getApiErrorMessage(error) {
  const detail = error.response?.data?.detail
  if (detail == null) {
    return error.message || 'Request failed'
  }
  if (typeof detail === 'string') {
    return detail
  }
  if (Array.isArray(detail)) {
    return detail
      .map((item) => (typeof item === 'object' && item?.msg ? item.msg : String(item)))
      .join(', ')
  }
  return String(detail)
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    const lang = (i18next.language || 'en').split('-')[0]
    config.headers['Accept-Language'] = lang
    return config
  },
  (error) => Promise.reject(error)
)

refreshClient.interceptors.request.use((config) => {
  const lang = (i18next.language || 'en').split('-')[0]
  config.headers['Accept-Language'] = lang
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const status = error.response?.status

    if (status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error)
    }

    const reqUrl = String(originalRequest.url || '')
    if (
      reqUrl.includes('/auth/login') ||
      reqUrl.includes('/auth/register') ||
      reqUrl.includes('/auth/refresh') ||
      reqUrl.includes('/auth/forgot-password') ||
      reqUrl.includes('/auth/reset-password')
    ) {
      if (reqUrl.includes('/auth/login') || reqUrl.includes('/auth/register')) {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
      }
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      const newToken = await refreshAccessToken()
      originalRequest.headers.Authorization = `Bearer ${newToken}`
      return api(originalRequest)
    } catch {
      clearAuthAndRedirectToLogin()
      return Promise.reject(error)
    }
  }
)

export default api
