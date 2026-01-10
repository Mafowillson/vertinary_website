import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext(null)

// Supported languages
export const SUPPORTED_LANGUAGES = {
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
  },
}

// Translations
const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    products: 'Produits',
    login: 'Connexion',
    register: "S'inscrire",
    logout: 'Déconnexion',
    admin: 'Admin',
    
    // Homepage
    heroTitle: 'Réduis 70% de tes dépenses en médicaments',
    heroSubtitle: 'Avec nos guides des remèdes naturels pour poulets',
    viewProducts: 'Voir les produits',
    contactUs: 'Nous contacter',
    featuredProducts: 'Produits en vedette',
    featuredDescription: 'Découvrez nos guides professionnels et documents vétérinaires les plus populaires',
    seeAllProducts: 'Voir tous les produits',
    professionalGuides: 'Guides Professionnels',
    professionalGuidesDesc: 'Documents rédigés par des vétérinaires experts',
    instantDownload: 'Téléchargement Immédiat',
    instantDownloadDesc: 'Accès instantané après achat',
    securePayment: 'Paiement Sécurisé',
    securePaymentDesc: 'Transactions sécurisées et protégées',
    
    // Products
    allProducts: 'Tous les produits',
    searchPlaceholder: 'Rechercher un produit...',
    noProductsFound: 'Aucun produit disponible pour le moment.',
    noSearchResults: 'Aucun produit ne correspond à votre recherche.',
    downloadable: 'Téléchargeable',
    purchases: 'Achats',
    sold: 'Vendu',
    remaining: 'Restant',
    viewDetails: 'Voir les détails',
    
    // Product Detail
    productNotFound: 'Produit non trouvé',
    backToProducts: 'Retour aux produits',
    description: 'Description',
    noDescriptionAvailable: 'Aucune description disponible.',
    limitedOffer: 'Offre à durée limitée',
    offerEndsIn: "L'offre se termine dans",
    days: 'Jours',
    hours: 'Heures',
    minutes: 'Minutes',
    seconds: 'Secondes',
    saveMoney: 'Économisez',
    downloadNow: 'Télécharger maintenant',
    contactWhatsApp: 'Nous contacter sur WhatsApp',
    
    // Auth
    loginTitle: 'Connexion à votre compte',
    registerTitle: 'Créer un compte',
    email: 'Adresse email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    fullName: 'Nom complet',
    loginButton: 'Se connecter',
    registerButton: "S'inscrire",
    orCreateAccount: "Ou créez un nouveau compte",
    orLogin: "Ou connectez-vous à votre compte existant",
    
    // Checkout
    finalizePurchase: 'Finaliser votre achat',
    orderSummary: 'Résumé de la commande',
    paymentMethods: 'Moyens de paiement disponibles',
    paymentDetails: 'Détails du paiement',
    price: 'Prix',
    reduction: 'Réduction',
    total: 'Total',
    payNow: 'Payer maintenant',
    securePaymentNote: 'Paiement sécurisé et protégé',
    
    // Confirmation
    completed: 'Terminé',
    thankYou: 'Merci pour votre achat !',
    order: 'Commande',
    instructions: 'Instructions',
    thankYouMessage: 'Merci pour ton achat !',
    congratulations: 'Félicitations ! Tu viens de faire un excellent choix en investissant dans',
    downloadDocument: 'Télécharger votre document',
    downloadButton: 'Télécharger maintenant',
    needHelp: 'Besoin d\'aide ?',
    contactWhatsAppHelp: 'Clique ici pour nous écrire sur WhatsApp en cas de problème:',
    
    // Download
    files: 'Fichiers',
    howToDownload: 'Comment télécharger mon fichier?',
    downloadInstruction: 'Cliquez sur le bouton "Télécharger" ci-dessous pour télécharger votre fichier.',
    downloading: 'Téléchargement...',
    download: 'Télécharger',
    noFilesAvailable: 'Aucun fichier disponible pour le moment.',
    
    // Footer
    quickLinks: 'Liens rapides',
    allRightsReserved: 'Tous droits réservés',
    footerDescription: 'Votre partenaire pour réussir dans l\'élevage. Guides, articles et documents professionnels pour l\'élevage.',
    
    // Common
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    cancel: 'Annuler',
    save: 'Enregistrer',
    back: 'Retour',
    processing: 'Traitement...',
    orderNotFound: 'Commande non trouvée',
    copyOrderNumber: 'Copier le numéro de commande',
    downloadFileInstruction: 'Cliquez sur le bouton ci-dessous pour télécharger votre fichier.',
    downloadHere: 'Télécharge ton document ici',
    faqTitle: 'Je ne vois pas mon fichier - que faire ?',
    faqAnswer: 'Vérifiez vos bloqueurs de pop-ups, essayez de rafraîchir la page, ou contactez-nous via WhatsApp pour obtenir de l\'aide.',
    downloadError: 'Erreur lors du téléchargement. Veuillez réessayer.',
    paymentFailed: 'Le paiement a échoué. Veuillez réessayer.',
    paymentError: 'Erreur lors du traitement du paiement.',
    passwordsDoNotMatch: 'Les mots de passe ne correspondent pas.',
    passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères.',
    loginError: 'Erreur lors de la connexion. Veuillez réessayer.',
    registerError: 'Erreur lors de l\'inscription. Veuillez réessayer.',
    offerExpired: 'L\'offre a expiré',
  },
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    admin: 'Admin',
    
    // Homepage
    heroTitle: 'Reduce 70% of your medication expenses',
    heroSubtitle: 'With our guides to natural remedies for chickens',
    viewProducts: 'View Products',
    contactUs: 'Contact Us',
    featuredProducts: 'Featured Products',
    featuredDescription: 'Discover our most popular professional guides and veterinary documents',
    seeAllProducts: 'See All Products',
    professionalGuides: 'Professional Guides',
    professionalGuidesDesc: 'Documents written by expert veterinarians',
    instantDownload: 'Instant Download',
    instantDownloadDesc: 'Instant access after purchase',
    securePayment: 'Secure Payment',
    securePaymentDesc: 'Secure and protected transactions',
    
    // Products
    allProducts: 'All Products',
    searchPlaceholder: 'Search for a product...',
    noProductsFound: 'No products available at the moment.',
    noSearchResults: 'No products match your search.',
    downloadable: 'Downloadable',
    purchases: 'Purchases',
    sold: 'Sold',
    remaining: 'Remaining',
    viewDetails: 'View Details',
    
    // Product Detail
    productNotFound: 'Product not found',
    backToProducts: 'Back to Products',
    description: 'Description',
    noDescriptionAvailable: 'No description available.',
    limitedOffer: 'Limited Time Offer',
    offerEndsIn: 'The offer ends in',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    saveMoney: 'Save',
    downloadNow: 'Download Now',
    contactWhatsApp: 'Contact Us on WhatsApp',
    
    // Auth
    loginTitle: 'Login to your account',
    registerTitle: 'Create an account',
    email: 'Email address',
    password: 'Password',
    confirmPassword: 'Confirm password',
    fullName: 'Full name',
    loginButton: 'Login',
    registerButton: 'Register',
    orCreateAccount: 'Or create a new account',
    orLogin: 'Or login to your existing account',
    
    // Checkout
    finalizePurchase: 'Finalize Your Purchase',
    orderSummary: 'Order Summary',
    paymentMethods: 'Available Payment Methods',
    paymentDetails: 'Payment Details',
    price: 'Price',
    reduction: 'Reduction',
    total: 'Total',
    payNow: 'Pay Now',
    securePaymentNote: 'Secure and protected payment',
    
    // Confirmation
    completed: 'Completed',
    thankYou: 'Thank you for your purchase!',
    order: 'Order',
    instructions: 'Instructions',
    thankYouMessage: 'Thank you for your purchase!',
    congratulations: 'Congratulations! You have made an excellent choice by investing in',
    downloadDocument: 'Download Your Document',
    downloadButton: 'Download Now',
    needHelp: 'Need Help?',
    contactWhatsAppHelp: 'Click here to write to us on WhatsApp if you have a problem:',
    
    // Download
    files: 'Files',
    howToDownload: 'How to download my file?',
    downloadInstruction: 'Click the "Download" button below to download your file.',
    downloading: 'Downloading...',
    download: 'Download',
    noFilesAvailable: 'No files available at the moment.',
    
    // Footer
    quickLinks: 'Quick Links',
    allRightsReserved: 'All rights reserved',
    footerDescription: 'Your partner to succeed in agriculture. Guides, articles and professional documents for agriculture.',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    back: 'Back',
    processing: 'Processing...',
    orderNotFound: 'Order not found',
    copyOrderNumber: 'Copy order number',
    downloadFileInstruction: 'Click the button below to download your file.',
    downloadHere: 'Download your document here',
    faqTitle: 'I don\'t see my file - what to do?',
    faqAnswer: 'Check your pop-up blockers, try refreshing the page, or contact us via WhatsApp for help.',
    downloadError: 'Error downloading. Please try again.',
    paymentFailed: 'Payment failed. Please try again.',
    paymentError: 'Error processing payment.',
    passwordsDoNotMatch: 'Passwords do not match.',
    passwordTooShort: 'Password must be at least 6 characters.',
    loginError: 'Error logging in. Please try again.',
    registerError: 'Error registering. Please try again.',
    offerExpired: 'The offer has expired',
  },
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  // Detect system language
  const getSystemLanguage = () => {
    if (typeof window !== 'undefined') {
      const systemLang = navigator.language || navigator.userLanguage
      const langCode = systemLang.split('-')[0].toLowerCase()
      return Object.keys(SUPPORTED_LANGUAGES).includes(langCode) ? langCode : 'en'
    }
    return 'en'
  }

  // Get initial language from localStorage or system preference
  const getInitialLanguage = () => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language')
      if (savedLanguage && Object.keys(SUPPORTED_LANGUAGES).includes(savedLanguage)) {
        return savedLanguage
      }
      return getSystemLanguage()
    }
    return 'en'
  }

  const [language, setLanguage] = useState(getInitialLanguage)

  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key) => {
    return translations[language]?.[key] || key
  }

  const changeLanguage = (langCode) => {
    if (Object.keys(SUPPORTED_LANGUAGES).includes(langCode)) {
      setLanguage(langCode)
      localStorage.setItem('language', langCode)
    }
  }

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    currentLanguage: SUPPORTED_LANGUAGES[language],
    supportedLanguages: SUPPORTED_LANGUAGES,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

