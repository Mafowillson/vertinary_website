import api from './api'
import { findUserByEmail, validatePassword, createUserResponse, getUserByToken, mockUsers } from '../data/mockUsers'

// Helper to check if API is available
const isApiAvailable = async () => {
  try {
    await api.get('/health').catch(() => {})
    return true
  } catch {
    return false
  }
}

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password })
      return response.data
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message)
      
      // Use mock data
      const user = findUserByEmail(email)
      if (!user) {
        throw new Error('Email ou mot de passe incorrect')
      }
      
      if (!validatePassword(user, password)) {
        throw new Error('Email ou mot de passe incorrect')
      }
      
      return createUserResponse(user)
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData)
      return response.data
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message)
      
      // Check if user already exists
      const existingUser = findUserByEmail(userData.email)
      if (existingUser) {
        throw new Error('Cet email est déjà utilisé')
      }
      
      // Create new user
      const newUser = {
        id: mockUsers.length + 1,
        email: userData.email,
        name: userData.name,
        role: 'user',
        password: userData.password,
      }
      
      // Add to mock users (in memory only)
      mockUsers.push(newUser)
      
      return createUserResponse(newUser)
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me')
      return response.data
    } catch (error) {
      console.warn('API unavailable, using mock data:', error.message)
      
      // Get token from localStorage
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Non authentifié')
      }
      
      const user = getUserByToken(token)
      if (!user) {
        throw new Error('Token invalide')
      }
      
      return user
    }
  },

  async logout() {
    // Token removal is handled client-side
    return Promise.resolve()
  },
}

