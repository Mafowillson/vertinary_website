// Mock order data for testing when API is unavailable

function base64UrlToJson(part) {
  let base64 = part.replace(/-/g, '+').replace(/_/g, '/')
  const pad = base64.length % 4
  if (pad) base64 += '='.repeat(4 - pad)
  return JSON.parse(atob(base64))
}

function getCurrentUserFromToken() {
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }
  try {
    const part = token.split('.')[1]
    if (!part) return null
    const payload = base64UrlToJson(part)
    const sub = payload.sub
    if (!sub) return null
    return {
      id: sub,
      email: sub,
      name: sub.split('@')[0] || 'User',
      role: payload.role || 'user',
    }
  } catch {
    return null
  }
}

// Generate a mock order number
const generateOrderNumber = () => {
  return `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
}

// Store mock orders in memory (simulating a database)
let mockOrders = []
let nextOrderId = 1

// Create a mock order
export const createMockOrder = (orderData, product) => {
  const user = getCurrentUserFromToken()
  if (!user) {
    throw new Error('User must be logged in to create an order')
  }
  const order = {
    id: nextOrderId++,
    order_number: generateOrderNumber(),
    user_id: user.id,
    product_id: orderData.productId,
    amount: orderData.amount,
    status: 'pending',
    payment_method: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product: product || {
      id: orderData.productId,
      title: 'Product',
      description: 'Product description',
      price: orderData.amount,
    },
    user: user
  }
  mockOrders.push(order)
  return order
}

// Get a mock order by ID
export const getMockOrderById = (orderId) => {
  return mockOrders.find(o => o.id === parseInt(orderId))
}

// Process payment for a mock order
export const processMockPayment = (orderId, paymentData) => {
  const order = mockOrders.find(o => o.id === parseInt(orderId))
  if (!order) {
    throw new Error('Order not found')
  }

  // Update order status and payment method
  order.status = 'completed'
  order.payment_method = paymentData.paymentMethod || 'online'
  order.updated_at = new Date().toISOString()

  return {
    success: true,
    message: 'Payment processed successfully',
    order: order
  }
}

// Get all orders for current user
export const getMockUserOrders = () => {
  const user = getCurrentUserFromToken()
  if (!user) return []
  return mockOrders.filter(o => o.user_id === user.id)
}
