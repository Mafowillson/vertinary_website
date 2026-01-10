import api from './api'

export const orderService = {
  async createOrder(orderData) {
    const response = await api.post('/orders', orderData)
    return response.data
  },

  async getOrderById(orderId) {
    const response = await api.get(`/orders/${orderId}`)
    return response.data
  },

  async getUserOrders() {
    const response = await api.get('/orders/my-orders')
    return response.data
  },

  async processPayment(orderId, paymentData) {
    const response = await api.post(`/orders/${orderId}/payment`, paymentData)
    return response.data
  },
}

