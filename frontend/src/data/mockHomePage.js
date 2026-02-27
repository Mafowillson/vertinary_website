// Mock data for HomePage sections

export const categories = [
  {
    id: 1,
    title: 'Animaux de Compagnie',
    description: 'Guides complets sur les soins aux petits animaux, nutrition et conseils comportementaux.',
    icon: '🐾',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: 2,
    title: 'Bétail',
    description: 'Gestion professionnelle de ferme, santé du troupeau et ressources pour améliorer la productivité.',
    icon: '🚜',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: 3,
    title: 'Professionnel',
    description: 'Formations en ligne, modèles de gestion de clinique et matériel de formation continue.',
    icon: '➕',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: 4,
    title: 'Bien-être Animal',
    description: 'Cadres politiques, normes éthiques et outils pour organisations de sauvetage.',
    icon: '❤️',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50'
  }
]

export const featuredResources = [
  {
    id: 1,
    title: 'TOUT SUR L\'ÉLEVAGE DE POULES PONDEUSES',
    price: 24990,
    originalPrice: 35000,
    discountEndDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days
    tag: 'LIVRE • E-BOOK',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c94be19?w=400&h=300&fit=crop',
    category: 'Livestock'
  },
  {
    id: 2,
    title: 'TOUT SUR L\'ÉLEVAGE DE PORCS - GUIDE COMPLET',
    price: 35000,
    originalPrice: 50000,
    discountEndDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days
    tag: 'LIVRE • E-BOOK',
    imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop',
    category: 'Livestock'
  },
  {
    id: 3,
    title: 'KIT DE DÉMARRAGE EN ÉLEVAGE AVICOLE',
    price: 45000,
    tag: 'FORMATION • COURS',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c94be19?w=400&h=300&fit=crop',
    category: 'Professional'
  },
  {
    id: 4,
    title: 'GUIDE DE VACCINATION ET MÉDICATION',
    price: 20000,
    originalPrice: 30000,
    discountEndDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day (urgent!)
    tag: 'LIVRE • GUIDE',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    category: 'Professional'
  }
]

export const founderData = {
  name: 'TCHOUALA FONDEM BODRIC',
  role: 'FONDATEUR & EXPERT EN MÉDECINE VÉTÉRINAIRE',
  description: 'Étudiant Docteur en Médecine Vétérinaire, Ingénieur en Production Animale, Fondateur de l\'Académie des Éleveurs, Fabricant du produit Accélérateur de Croissance Bio, et Auteur de la série de livres "TOUT SUR L\'ÉLEVAGE". Sa mission principale est de partager ses connaissances en élevage avec les Camerounais et avec tous ceux, proches ou lointains, qui souhaitent apprendre. Passionné par l\'éducation et le partage de connaissances, il crée du contenu éducatif sur YouTube et Facebook pour aider les éleveurs à réussir, au Cameroun et au-delà.',
  imageUrl: '/profile-photo.jpg',
  achievements: [
    { label: '4+ Ans', value: 'D\'EXPÉRIENCE' },
    { label: '50+', value: 'GUIDES VÉRIFIÉS' }
  ],
  socialLinks: {
    youtube: 'https://www.youtube.com/@academiedeseleveurs',
    facebook: 'https://web.facebook.com/search/top/?q=l%27acad%C3%A9mie%20des%20%C3%A9leveurs',
    whatsapp: 'https://wa.me/237699933135'
  },
  location: 'Cameroun',
  mission: 'Partager les connaissances en élevage avec les Camerounais et le monde entier'
}
