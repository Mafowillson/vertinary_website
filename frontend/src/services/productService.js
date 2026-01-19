import api from './api'
import { getMockProducts, mapMockProductToAPI } from '../data/mockProducts'

// Store translation function globally (set by components)
let translationFunction = null

export const setTranslationFunction = (t) => {
  translationFunction = t
}

// Helper to check if API is available
const isApiAvailable = async () => {
  try {
    await api.get('/health').catch(() => {})
    return true
  } catch {
    return false
  }
}

// Helper to filter mock products
const filterMockProducts = (products, params = {}) => {
  let filtered = [...products]

  if (params.featured !== undefined) {
    filtered = filtered.filter(p => p.featured === params.featured)
  }

  if (params.limit) {
    filtered = filtered.slice(0, params.limit)
  }

  if (params.search) {
    const searchLower = params.search.toLowerCase()
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchLower) ||
      p.description?.toLowerCase().includes(searchLower)
    )
  }

  return filtered.map(mapMockProductToAPI)
}

export const productService = {
  async getAllProducts(params = {}) {
    try {
    const response = await api.get('/products', { params })
    return response.data
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message)
      // Use mock data when API is unavailable
      const mockProducts = translationFunction ? getMockProducts(translationFunction) : getMockProducts((key) => key)
      const filtered = filterMockProducts(mockProducts, params)
      return {
        data: filtered,
        total: filtered.length
      }
    }
  },

  async getProductById(id) {
    try {
    const response = await api.get(`/products/${id}`)
    return response.data
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message)
      // Find in mock data
      const mockProducts = translationFunction ? getMockProducts(translationFunction) : getMockProducts((key) => key)
      const product = mockProducts.find(p => p.id === parseInt(id))
      if (product) {
        return mapMockProductToAPI(product)
      }
      throw new Error('Product not found')
    }
  },

  async searchProducts(query) {
    try {
    const response = await api.get('/products/search', { params: { q: query } })
    return response.data
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message)
      // Search in mock data
      const mockProducts = translationFunction ? getMockProducts(translationFunction) : getMockProducts((key) => key)
      const filtered = filterMockProducts(mockProducts, { search: query })
      return filtered
    }
  },

  async createProduct(productData) {
    const response = await api.post('/products', productData)
    return response.data
  },

  async updateProduct(id, productData) {
    const response = await api.put(`/products/${id}`, productData)
    return response.data
  },

  async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },
}

