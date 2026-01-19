// Mock services data for the Académie des Éleveurs

export const mockServices = [
  {
    id: 1,
    title: 'formationEnLigneEtPratique',
    titleKey: 'formationEnLigneEtPratique',
    description: 'formationEnLigneEtPratiqueDesc',
    icon: '📚',
    imageUrl: '/services/formation.jpg',
    category: 'training',
    features: [
      'formationFeature1',
      'formationFeature2',
      'formationFeature3',
      'formationFeature4'
    ],
    price: null, // Training service pricing varies
    featured: true
  },
  {
    id: 2,
    title: 'venteAnimaux',
    titleKey: 'venteAnimaux',
    description: 'venteAnimauxDesc',
    icon: '🐔',
    imageUrl: '/services/vente-animaux.jpg',
    category: 'sales',
    features: [
      'venteFeature1',
      'venteFeature2',
      'venteFeature3',
      'venteFeature4'
    ],
    price: null, // Prices vary by animal type
    featured: true
  },
  {
    id: 3,
    title: 'accelerateurCroissance',
    titleKey: 'accelerateurCroissance',
    description: 'accelerateurCroissanceDesc',
    icon: '💊',
    imageUrl: '/services/accelerateur.jpg',
    category: 'products',
    features: [
      'accelerateurFeature1',
      'accelerateurFeature2',
      'accelerateurFeature3',
      'accelerateurFeature4'
    ],
    price: 15000, // Example price
    featured: true
  },
  {
    id: 4,
    title: 'constructionBatiments',
    titleKey: 'constructionBatiments',
    description: 'constructionBatimentsDesc',
    icon: '🏗️',
    imageUrl: '/services/construction.jpg',
    category: 'construction',
    features: [
      'constructionFeature1',
      'constructionFeature2',
      'constructionFeature3',
      'constructionFeature4'
    ],
    price: null, // Custom pricing
    featured: true
  },
  {
    id: 5,
    title: 'projetsElevage',
    titleKey: 'projetsElevage',
    description: 'projetsElevageDesc',
    icon: '🌾',
    imageUrl: '/services/projets-elevage.jpg',
    category: 'consulting',
    features: [
      'projetsFeature1',
      'projetsFeature2',
      'projetsFeature3',
      'projetsFeature4'
    ],
    price: null, // Consulting pricing
    featured: true
  },
  {
    id: 6,
    title: 'venteLivresGuides',
    titleKey: 'venteLivresGuides',
    description: 'venteLivresGuidesDesc',
    icon: '📖',
    imageUrl: '/services/vente-livres.jpg',
    category: 'sales',
    features: [
      'venteLivresFeature1',
      'venteLivresFeature2',
      'venteLivresFeature3',
      'venteLivresFeature4'
    ],
    price: null, // Prices vary by book
    featured: true
  }
]

// Helper to get services with translations
export const getServices = (t) => {
  return mockServices.map(service => ({
    ...service,
    title: t(service.titleKey),
    description: t(service.description),
    features: service.features.map(featureKey => t(featureKey))
  }))
}

// Helper to get service by ID
export const getServiceById = (id, t) => {
  const service = mockServices.find(s => s.id === parseInt(id))
  if (!service) return null
  
  return {
    ...service,
    title: t(service.titleKey),
    description: t(service.description),
    features: service.features.map(featureKey => t(featureKey))
  }
}

// Helper to filter services by category
export const getServicesByCategory = (category, t) => {
  return getServices(t).filter(s => s.category === category)
}
