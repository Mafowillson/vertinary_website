/**
 * Payment Service
 * Handles integration with Stripe and Flutterwave payment gateways
 */

// Stripe Payment Handler
export const stripeService = {
  /**
   * Initialize Stripe payment
   * @param {Object} paymentData - Payment data including card details
   * @param {Object} orderData - Order information
   * @returns {Promise<Object>} Payment result
   */
  async processPayment(paymentData, orderData) {
    try {
      // In a real implementation, you would:
      // 1. Create a payment intent on your backend
      // 2. Use Stripe.js to confirm the payment
      // 3. Handle 3D Secure authentication if required
      
      // For now, this is a placeholder that would be replaced with actual Stripe integration
      // You would typically use @stripe/stripe-js and @stripe/react-stripe-js
      
      const response = await fetch('/api/payments/stripe/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: orderData.amount,
          currency: orderData.currency || 'usd',
          payment_method_data: {
            card: {
              number: paymentData.cardData.number,
              exp_month: paymentData.cardData.expiry.split('/')[0].trim(),
              exp_year: '20' + paymentData.cardData.expiry.split('/')[1].trim(),
              cvc: paymentData.cardData.cvc,
            },
          },
          metadata: {
            order_id: orderData.orderId,
            product_id: orderData.productId,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to process Stripe payment')
      }

      return await response.json()
    } catch (error) {
      console.error('Stripe payment error:', error)
      throw error
    }
  },

  /**
   * Validate card number using Luhn algorithm
   * @param {string} cardNumber - Card number to validate
   * @returns {boolean} True if valid
   */
  validateCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\s/g, '')
    if (cleaned.length < 13 || cleaned.length > 19) return false

    let sum = 0
    let isEven = false

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10)

      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }

      sum += digit
      isEven = !isEven
    }

    return sum % 10 === 0
  },
}

// Flutterwave Payment Handler
export const flutterwaveService = {
  /**
   * Initialize Flutterwave payment
   * @param {Object} paymentData - Payment data including provider and phone number
   * @param {Object} orderData - Order information
   * @returns {Promise<Object>} Payment result
   */
  async processPayment(paymentData, orderData) {
    try {
      // In a real implementation, you would:
      // 1. Initialize Flutterwave payment modal
      // 2. Handle mobile money payment request
      // 3. Verify payment status via webhook or polling

      const response = await fetch('/api/payments/flutterwave/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tx_ref: `order_${orderData.orderId}_${Date.now()}`,
          amount: orderData.amount,
          currency: orderData.currency || 'XOF',
          payment_type: 'mobilemoney',
          customer: {
            email: orderData.email,
            phone_number: paymentData.phoneNumber,
          },
          meta: {
            order_id: orderData.orderId,
            product_id: orderData.productId,
          },
          customizations: {
            title: 'Veterinary Knowledge Marketplace',
            description: `Payment for ${orderData.productTitle}`,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to initialize Flutterwave payment')
      }

      const data = await response.json()

      // In a real implementation, you would open Flutterwave payment modal here
      // For example: window.FlutterwaveCheckout({ ...data.data })

      return data
    } catch (error) {
      console.error('Flutterwave payment error:', error)
      throw error
    }
  },

  /**
   * Verify Flutterwave payment status
   * @param {string} transactionId - Transaction ID to verify
   * @returns {Promise<Object>} Payment verification result
   */
  async verifyPayment(transactionId) {
    try {
      const response = await fetch(`/api/payments/flutterwave/verify/${transactionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to verify Flutterwave payment')
      }

      return await response.json()
    } catch (error) {
      console.error('Flutterwave verification error:', error)
      throw error
    }
  },
}

// Main payment service that routes to appropriate provider
export const paymentService = {
  /**
   * Process payment using the specified provider
   * @param {string} provider - Payment provider ('stripe' or 'flutterwave')
   * @param {Object} paymentData - Payment data
   * @param {Object} orderData - Order data
   * @returns {Promise<Object>} Payment result
   */
  async processPayment(provider, paymentData, orderData) {
    switch (provider) {
      case 'stripe':
        return await stripeService.processPayment(paymentData, orderData)
      case 'flutterwave':
        return await flutterwaveService.processPayment(paymentData, orderData)
      default:
        throw new Error(`Unsupported payment provider: ${provider}`)
    }
  },
}

export default paymentService
