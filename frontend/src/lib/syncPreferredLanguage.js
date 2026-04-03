const SUPPORTED = ['en', 'fr', 'zh', 'hi', 'es']

/**
 * Persist language preference to the backend for transactional email copy (when logged in).
 */
export function syncPreferredLanguageToServer(lng) {
  const code = (lng || 'en').split('-')[0].toLowerCase()
  if (!SUPPORTED.includes(code)) return
  const token = localStorage.getItem('token')
  if (!token) return
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
  void fetch(`${base}/v1/users/me/language`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Accept-Language': code,
    },
    body: JSON.stringify({ language: code }),
  })
}
