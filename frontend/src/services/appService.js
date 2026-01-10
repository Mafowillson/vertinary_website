import api from './api'

export const appService = {
  async getSiteConfig() {
    const response = await api.get('/config')
    return response.data
  },

  async updateSocialLinks(links) {
    const response = await api.put('/config/social-links', links)
    return response.data
  },
}

