// Mock user data for testing
export const mockUsers = [
  {
    id: 1,
    email: 'admin@academie.com',
    name: 'Admin User',
    role: 'admin',
    password: 'admin123', // In real app, this would be hashed
  },
  {
    id: 2,
    email: 'user@academie.com',
    name: 'Test User',
    role: 'user',
    password: 'user123', // In real app, this would be hashed
  },
  {
    id: 3,
    email: 'bodric@academie.com',
    name: 'TCHOUALA FODEM BODRIC',
    role: 'admin',
    password: 'bodric123',
  },
]

// Helper to generate a mock token
const generateMockToken = (userId) => {
  return `mock_token_${userId}_${Date.now()}`
}

// Helper to find user by email
export const findUserByEmail = (email) => {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase())
}

// Helper to validate password
export const validatePassword = (user, password) => {
  return user.password === password
}

// Helper to create user response
export const createUserResponse = (user) => {
  const { password, ...userWithoutPassword } = user
  return {
    user: userWithoutPassword,
    token: generateMockToken(user.id),
  }
}

// Helper to get user by token
export const getUserByToken = (token) => {
  // Extract user ID from token (mock implementation)
  const match = token.match(/mock_token_(\d+)_/)
  if (match) {
    const userId = parseInt(match[1])
    const user = mockUsers.find(u => u.id === userId)
    if (user) {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    }
  }
  return null
}
