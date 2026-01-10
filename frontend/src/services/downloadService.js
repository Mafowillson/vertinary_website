import api from './api'

export const downloadService = {
  async getDownloadFiles(orderId) {
    const response = await api.get(`/downloads/${orderId}`)
    return response.data
  },

  async downloadFile(orderId, fileId) {
    const response = await api.get(`/downloads/${orderId}/files/${fileId}`, {
      responseType: 'blob',
    })
    return response.data
  },
}

