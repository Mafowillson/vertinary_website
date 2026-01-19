import api from './api'
import { createMockOrder, getMockOrderById, processMockPayment, getMockUserOrders } from '../data/mockOrders'
import { productService } from './productService'

export const orderService = {
  async createOrder(orderData) {
    try {
      const response = await api.post('/orders', {
        product_id: orderData.productId,
        amount: orderData.amount,
      })
      return response.data
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message)
      // Get product details for the mock order
      let product = null
      try {
        product = await productService.getProductById(orderData.productId)
      } catch (err) {
        console.warn('Could not fetch product details:', err.message)
      }
      // Create mock order
      const mockOrder = createMockOrder(orderData, product)
      return mockOrder
    }
  },

  async getOrderById(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}`)
      return response.data
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message)
      const mockOrder = getMockOrderById(orderId)
      if (!mockOrder) {
        throw new Error('Order not found')
      }
      return mockOrder
    }
  },

  async getUserOrders() {
    try {
      const response = await api.get('/orders/my-orders')
      return response.data
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message)
      return getMockUserOrders()
    }
  },

  async processPayment(orderId, paymentData) {
    try {
      const response = await api.post(`/orders/${orderId}/payment`, paymentData)
      return response.data
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message)
      // Process mock payment
      const result = processMockPayment(orderId, paymentData)
      return result
    }
  },
}

