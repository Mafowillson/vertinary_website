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
    cart: 'Votre panier',
    search: 'Rechercher',
    
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
    
    // Product Titles & Descriptions
    product1Title: "GUIDE COMPLET DE L'ÉLEVAGE DE POULES PONDEUSES",
    product1Desc: "Guide pratique complet pour l'élevage de poules pondeuses, de la sélection des races à la gestion de la production d'œufs. Inclut des conseils sur l'alimentation, la santé, et la gestion des installations.",
    product2Title: "TOUT SUR L'ÉLEVAGE DE PORCS - GUIDE COMPLET",
    product2Desc: "Manuel complet sur l'élevage porcin moderne. Couvre la sélection génétique, l'alimentation, les soins vétérinaires, la gestion sanitaire et les techniques de reproduction.",
    product3Title: "KIT DE DÉMARRAGE EN ÉLEVAGE AVICOL - ÉDITION SPÉCIALE",
    product3Desc: "Kit complet pour débuter dans l'élevage avicole. Inclut des guides sur la construction de poulaillers, la sélection des poussins, l'alimentation, et la prévention des maladies.",
    product4Title: "GUIDE DE VACCINATION ET MÉDICATION - POULETS DE CHAIR (0-8 SEMAINES)",
    product4Desc: "Guide détaillé sur les protocoles de vaccination et de médication pour les poulets de chair de la naissance à 8 semaines. Inclut les calendriers de vaccination et les dosages.",
    product5Title: "MANAGEMENT DE LA PONTE - DU POINT DE PONTE AU MANAGEMENT MENSUEL",
    product5Desc: "Guide spécialisé sur la gestion des poules pondeuses, du début de la ponte jusqu'à la gestion mensuelle optimale. Techniques de maximisation de la production d'œufs.",
    product6Title: "ÉLEVAGE DE CHÈVRES ET MOUTONS - GUIDE PRATIQUE",
    product6Desc: "Manuel complet sur l'élevage caprin et ovin. Couvre la sélection des races, l'alimentation, les soins vétérinaires, la reproduction et la gestion des pâturages.",
    product7Title: "GESTION SANITAIRE EN ÉLEVAGE - PRÉVENTION ET TRAITEMENT",
    product7Desc: "Guide complet sur la prévention et le traitement des maladies courantes en élevage. Inclut les protocoles de biosécurité et les plans de vaccination.",
    product8Title: "ALIMENTATION ANIMALE - FORMULATION ET GESTION",
    product8Desc: "Guide pratique sur la formulation des rations alimentaires pour différents types d'élevage. Techniques de gestion des stocks et optimisation des coûts.",
    
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
    addToCart: 'Ajouter au panier',
    inCart: 'Dans le panier',
    addedToCart: 'Ajouté!',
    loginToAddToCart: 'Connectez-vous pour ajouter au panier',
    loginRequired: 'Connexion requise',
    
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
    contactInformation: 'Informations de contact',
    alreadyHaveAccount: 'Vous avez déjà un compte ?',
    logIn: 'Se connecter',
    paymentMethod: 'Méthode de paiement',
    creditDebitCard: 'Carte de crédit / débit',
    paypal: 'PayPal',
    mobileMoney: 'Mobile Money',
    cardNumber: 'Numéro de carte',
    expiryDate: 'Date d\'expiration',
    cvc: 'CVC',
    cardholderName: 'Nom du titulaire',
    cardholderNamePlaceholder: 'Nom sur la carte',
    invalidCardNumber: 'Numéro de carte invalide',
    invalidExpiryDate: 'Date d\'expiration invalide',
    invalidCvc: 'CVC invalide',
    invalidCardholderName: 'Nom du titulaire invalide',
    cvcHint: '3 ou 4 chiffres au dos de votre carte',
    secureTransaction: 'Votre transaction est cryptée et sécurisée',
    completePurchase: 'Finaliser l\'achat',
    subtotal: 'Sous-total',
    taxes: 'Taxes',
    byCompletingPurchase: 'En finalisant votre achat, vous acceptez nos',
    termsOfService: 'Conditions d\'utilisation',
    and: 'et',
    privacyPolicy: 'Politique de confidentialité',
    secureSslEncryption: 'CRYPTAGE SSL SÉCURISÉ',
    hipaaCompliant: 'CONFORME HIPAA',
    moneyBackGuarantee: 'GARANTIE DE REMBOURSEMENT 30 JOURS',
    selectMobileMoneyProvider: 'Sélectionner le fournisseur Mobile Money',
    phoneNumber: 'Numéro de téléphone',
    phoneNumberPlaceholder: 'Entrez votre numéro de téléphone',
    phoneNumberHint: 'Entrez votre numéro de téléphone Mobile Money',
    invalidPhoneNumber: 'Numéro de téléphone invalide',
    pleaseSelectPaymentMethod: 'Veuillez sélectionner une méthode de paiement',
    howItWorks: 'Comment ça marche',
    mobileMoneyInstructions: 'Vous recevrez une demande de paiement sur votre téléphone. Confirmez le paiement pour finaliser votre achat.',
    weNeverStoreCardDetails: 'Nous ne stockons jamais les détails complets de votre carte.',
    invalidEmail: 'Adresse email invalide',
    
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
    copied: 'Copié !',
    orderDate: 'Date de commande',
    purchasedProduct: 'Produit acheté',
    pages: 'Pages',
    digitalAccess: 'Accès numérique',
    thisProduct: 'ce produit',
    purchaseSuccessMessage: 'Vous avez maintenant un accès instantané pour télécharger votre achat.',
    contactWhatsApp: 'Contacter WhatsApp',
    securePurchase: 'Achat sécurisé',
    securePurchaseMessage: 'Votre achat est sécurisé et protégé. Toutes les transactions sont cryptées.',
    nextSteps: 'Prochaines étapes',
    step1: 'Cliquez sur le bouton de téléchargement ci-dessus',
    step2: 'Enregistrez le fichier sur votre appareil',
    step3: 'Commencez à apprendre et à appliquer',
    
    // Download
    files: 'Fichiers',
    howToDownload: 'Comment télécharger mon fichier?',
    downloadInstruction: 'Cliquez sur le bouton "Télécharger" ci-dessous pour télécharger votre fichier.',
    downloading: 'Téléchargement...',
    download: 'Télécharger',
    noFilesAvailable: 'Aucun fichier disponible pour le moment.',
    
    // Profile/Bio
    profileName: 'TCHOUALA FODEM BODRIC',
    profileBio: 'TCHOUALA FODEM BODRIC ( Élève Docteur en Médecine Vétérinaire, Ingénieur en production animale, Promoteur de l\'Académie des Éleveurs, Fabriquant du produit Accélérateur de Croissance Bio et Auteur de la collection des livres "TOUT SUR L\'ÉLEVAGE").\n\nCi dessous vous avez une liste de quelques documents qui vous permettrons de maîtriser au maximum le secteur de l\'élevage👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇',
    
    // Services
    services: 'Nos Services',
    servicesDescription: 'Découvrez nos services professionnels pour l\'élevage et l\'agriculture',
    viewService: 'Voir le service',
    contactForPricing: 'Contactez-nous pour le prix',
    learnMore: 'En savoir plus',
    
    // Service Titles
    formationEnLigneEtPratique: 'Formation en Ligne et Pratique',
    venteAnimaux: 'Vente d\'Animaux d\'un Jour et Matures',
    accelerateurCroissance: 'Accélérateur de Croissance Bio',
    constructionBatiments: 'Construction des Bâtiments d\'Élevage',
    projetsElevage: 'Projets d\'Élevage et Consultation',
    venteLivresGuides: 'Vente des Livres et Guides d\'Élevage',
    
    // Service Descriptions
    formationEnLigneEtPratiqueDesc: 'Formation complète en ligne et pratique sur les techniques modernes d\'élevage. Cours théoriques et sessions pratiques pour maîtriser tous les aspects de l\'élevage.',
    venteAnimauxDesc: 'Vente d\'animaux d\'un jour et matures de qualité : poulets, canards, lapins, cailles, dindes, porcs et autres animaux d\'élevage.',
    accelerateurCroissanceDesc: 'Produit bio pour accélérer la croissance des animaux. Convient pour les lapins, volailles, porcs, poissons et ruminants. Améliore la santé et la productivité.',
    constructionBatimentsDesc: 'Conception et construction de bâtiments d\'élevage modernes et fonctionnels. Solutions adaptées à tous les types d\'élevage.',
    projetsElevageDesc: 'Consultation et accompagnement pour vos projets d\'élevage. De la planification à la mise en œuvre, nous vous guidons à chaque étape.',
    venteLivresGuidesDesc: 'Vente de livres et guides professionnels sur l\'élevage. Collection complète "TOUT SUR L\'ÉLEVAGE" et autres documents spécialisés pour maîtriser tous les aspects de l\'élevage.',
    
    // Service Features
    formationFeature1: 'Cours en ligne accessibles 24/7',
    formationFeature2: 'Sessions pratiques sur le terrain',
    formationFeature3: 'Support continu via WhatsApp',
    formationFeature4: 'Certificats de formation',
    
    venteFeature1: 'Animaux d\'un jour disponibles',
    venteFeature2: 'Animaux matures de qualité',
    venteFeature3: 'Large variété d\'espèces',
    venteFeature4: 'Livraison possible',
    
    accelerateurFeature1: '100% Bio et naturel',
    accelerateurFeature2: 'Pour tous types d\'animaux',
    accelerateurFeature3: 'Améliore la croissance',
    accelerateurFeature4: 'Renforce le système immunitaire',
    
    constructionFeature1: 'Conception personnalisée',
    constructionFeature2: 'Matériaux de qualité',
    constructionFeature3: 'Respect des normes',
    constructionFeature4: 'Suivi et maintenance',
    
    projetsFeature1: 'Étude de faisabilité',
    projetsFeature2: 'Planification détaillée',
    projetsFeature3: 'Accompagnement technique',
    projetsFeature4: 'Suivi post-lancement',
    
    venteLivresFeature1: 'Collection complète "TOUT SUR L\'ÉLEVAGE"',
    venteLivresFeature2: 'Guides pratiques et professionnels',
    venteLivresFeature3: 'Documents téléchargeables',
    venteLivresFeature4: 'Livraison et support disponible',
    
    // Footer
    quickLinks: 'Liens rapides',
    allRightsReserved: 'Tous droits réservés',
    footerDescription: 'Votre partenaire pour réussir dans l\'élevage. Guides, articles et documents professionnels pour l\'élevage.',
    developedBy: 'Développé par',
    store: 'Magasin',
    paymentMethodsSupported: 'Plusieurs options de paiement prises en charge',
    
    // Categories
    allCategories: 'Toutes les catégories',
    training: 'Formation',
    sales: 'Vente',
    construction: 'Construction',
    consulting: 'Consultation',
    noServicesFound: 'Aucun service trouvé dans cette catégorie',
    featured: 'Populaire',
    serviceNotFound: 'Service non trouvé',
    backToServices: 'Retour aux services',
    features: 'Caractéristiques',
    interestedInThisService: 'Intéressé par ce service ?',
    contactUsForMoreInfo: 'Contactez-nous pour plus d\'informations et les détails de prix.',
    otherServices: 'Autres services',
    viewAllServices: 'Voir tous les services',
    
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
    cart: 'Your Cart',
    search: 'Search',
    
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
    addToCart: 'Add to Cart',
    inCart: 'In Cart',
    addedToCart: 'Added!',
    loginToAddToCart: 'Login to Add to Cart',
    loginRequired: 'Login Required',
    
    // Services
    services: 'Our Services',
    servicesDescription: 'Discover our professional services for livestock farming and agriculture',
    viewService: 'View Service',
    contactForPricing: 'Contact us for pricing',
    learnMore: 'Learn More',
    
    // Service Titles
    formationEnLigneEtPratique: 'Online and Practical Training',
    venteAnimaux: 'Sale of One-Day-Old and Mature Animals',
    accelerateurCroissance: 'Bio Growth Accelerator',
    constructionBatiments: 'Construction of Breeding Buildings',
    projetsElevage: 'Livestock Projects and Consulting',
    venteLivresGuides: 'Sale of Books and Livestock Farming Guides',
    
    // Service Descriptions
    formationEnLigneEtPratiqueDesc: 'Complete online and practical training on modern livestock farming techniques. Theoretical courses and practical sessions to master all aspects of farming.',
    venteAnimauxDesc: 'Sale of quality one-day-old and mature animals: chickens, ducks, rabbits, quails, turkeys, pigs and other livestock.',
    accelerateurCroissanceDesc: 'Bio product to accelerate animal growth. Suitable for rabbits, poultry, pigs, fish and ruminants. Improves health and productivity.',
    constructionBatimentsDesc: 'Design and construction of modern and functional livestock buildings. Solutions adapted to all types of farming.',
    projetsElevageDesc: 'Consulting and support for your livestock projects. From planning to implementation, we guide you at every step.',
    venteLivresGuidesDesc: 'Sale of professional books and guides on livestock farming. Complete collection "EVERYTHING ABOUT LIVESTOCK FARMING" and other specialized documents to master all aspects of farming.',
    
    // Service Features
    formationFeature1: 'Online courses accessible 24/7',
    formationFeature2: 'Practical sessions in the field',
    formationFeature3: 'Continuous support via WhatsApp',
    formationFeature4: 'Training certificates',
    
    venteFeature1: 'One-day-old animals available',
    venteFeature2: 'Quality mature animals',
    venteFeature3: 'Wide variety of species',
    venteFeature4: 'Delivery possible',
    
    accelerateurFeature1: '100% Bio and natural',
    accelerateurFeature2: 'For all types of animals',
    accelerateurFeature3: 'Improves growth',
    accelerateurFeature4: 'Strengthens immune system',
    
    constructionFeature1: 'Custom design',
    constructionFeature2: 'Quality materials',
    constructionFeature3: 'Compliance with standards',
    constructionFeature4: 'Follow-up and maintenance',
    
    projetsFeature1: 'Feasibility study',
    projetsFeature2: 'Detailed planning',
    projetsFeature3: 'Technical support',
    projetsFeature4: 'Post-launch follow-up',
    
    venteLivresFeature1: 'Complete collection "EVERYTHING ABOUT LIVESTOCK FARMING"',
    venteLivresFeature2: 'Practical and professional guides',
    venteLivresFeature3: 'Downloadable documents',
    venteLivresFeature4: 'Delivery and support available',
    
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
    contactInformation: 'Contact Information',
    alreadyHaveAccount: 'Already have an account?',
    logIn: 'Log in',
    paymentMethod: 'Payment Method',
    creditDebitCard: 'Credit / Debit Card',
    paypal: 'PayPal',
    mobileMoney: 'Mobile Money',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvc: 'CVC',
    cardholderName: 'Cardholder Name',
    cardholderNamePlaceholder: 'Name on card',
    invalidCardNumber: 'Invalid card number',
    invalidExpiryDate: 'Invalid expiry date',
    invalidCvc: 'Invalid CVC',
    invalidCardholderName: 'Invalid cardholder name',
    cvcHint: '3 or 4 digits on the back of your card',
    secureTransaction: 'Your transaction is encrypted and secure',
    completePurchase: 'Complete Purchase',
    subtotal: 'Subtotal',
    taxes: 'Taxes',
    byCompletingPurchase: 'By completing your purchase, you agree to our',
    termsOfService: 'Terms of Service',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
    secureSslEncryption: 'SECURE SSL ENCRYPTION',
    hipaaCompliant: 'HIPAA COMPLIANT',
    moneyBackGuarantee: '30-DAY MONEY BACK GUARANTEE',
    selectMobileMoneyProvider: 'Select Mobile Money Provider',
    phoneNumber: 'Phone Number',
    phoneNumberPlaceholder: 'Enter your phone number',
    phoneNumberHint: 'Enter your mobile money phone number',
    invalidPhoneNumber: 'Invalid phone number',
    pleaseSelectPaymentMethod: 'Please select a payment method',
    howItWorks: 'How it works',
    mobileMoneyInstructions: 'You will receive a payment request on your phone. Confirm the payment to complete your purchase.',
    weNeverStoreCardDetails: 'We never store your full card details.',
    invalidEmail: 'Invalid email address',
    
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
    copied: 'Copied!',
    orderDate: 'Order Date',
    purchasedProduct: 'Purchased Product',
    pages: 'Pages',
    digitalAccess: 'Digital Access',
    thisProduct: 'this product',
    purchaseSuccessMessage: 'You now have instant access to download your purchase.',
    contactWhatsApp: 'Contact WhatsApp',
    securePurchase: 'Secure Purchase',
    securePurchaseMessage: 'Your purchase is secure and protected. All transactions are encrypted.',
    nextSteps: 'Next Steps',
    step1: 'Click the download button above',
    step2: 'Save the file to your device',
    step3: 'Start learning and applying',
    
    // Download
    files: 'Files',
    howToDownload: 'How to download my file?',
    downloadInstruction: 'Click the "Download" button below to download your file.',
    downloading: 'Downloading...',
    download: 'Download',
    noFilesAvailable: 'No files available at the moment.',
    
    // Profile/Bio
    profileName: 'TCHOUALA FODEM BODRIC',
    profileBio: 'TCHOUALA FODEM BODRIC (Veterinary Medicine Student Doctor, Animal Production Engineer, Promoter of the Breeders Academy, Manufacturer of the Bio Growth Accelerator product and Author of the book collection "EVERYTHING ABOUT LIVESTOCK FARMING").\n\nBelow you have a list of some documents that will allow you to master the livestock farming sector to the maximum👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇',
    
    // Product Titles & Descriptions
    product1Title: "COMPLETE GUIDE TO LAYING HEN FARMING",
    product1Desc: "Complete practical guide for laying hen farming, from breed selection to egg production management. Includes advice on feeding, health, and facility management.",
    product2Title: "EVERYTHING ABOUT PIG FARMING - COMPLETE GUIDE",
    product2Desc: "Complete manual on modern pig farming. Covers genetic selection, feeding, veterinary care, health management and breeding techniques.",
    product3Title: "POULTRY FARMING STARTER KIT - SPECIAL EDITION",
    product3Desc: "Complete kit to get started in poultry farming. Includes guides on building chicken coops, chick selection, feeding, and disease prevention.",
    product4Title: "VACCINATION AND MEDICATION GUIDE - BROILER CHICKENS (0-8 WEEKS)",
    product4Desc: "Detailed guide on vaccination and medication protocols for broiler chickens from birth to 8 weeks. Includes vaccination schedules and dosages.",
    product5Title: "LAYING MANAGEMENT - FROM LAYING POINT TO MONTHLY MANAGEMENT",
    product5Desc: "Specialized guide on laying hen management, from the start of laying to optimal monthly management. Techniques for maximizing egg production.",
    product6Title: "GOAT AND SHEEP FARMING - PRACTICAL GUIDE",
    product6Desc: "Complete manual on goat and sheep farming. Covers breed selection, feeding, veterinary care, reproduction and pasture management.",
    product7Title: "HEALTH MANAGEMENT IN FARMING - PREVENTION AND TREATMENT",
    product7Desc: "Complete guide on prevention and treatment of common farming diseases. Includes biosecurity protocols and vaccination plans.",
    product8Title: "ANIMAL FEEDING - FORMULATION AND MANAGEMENT",
    product8Desc: "Practical guide on feed ration formulation for different types of farming. Stock management techniques and cost optimization.",
    
    // Footer
    quickLinks: 'Quick Links',
    allRightsReserved: 'All rights reserved',
    footerDescription: 'Your partner to succeed in agriculture. Guides, articles and professional documents for agriculture.',
    developedBy: 'Developed by',
    store: 'Store',
    paymentMethodsSupported: 'Multiple payment options supported',
    
    // Categories
    allCategories: 'All Categories',
    training: 'Training',
    sales: 'Sales',
    construction: 'Construction',
    consulting: 'Consulting',
    noServicesFound: 'No services found in this category',
    featured: 'Featured',
    serviceNotFound: 'Service not found',
    backToServices: 'Back to Services',
    features: 'Features',
    interestedInThisService: 'Interested in this service?',
    contactUsForMoreInfo: 'Contact us for more information and pricing details.',
    otherServices: 'Other Services',
    viewAllServices: 'View All Services',
    
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

  const [language, setLanguage] = useState(() => getInitialLanguage())

  // Save language preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language)
    }
  }, [language])

  const t = (key) => {
    if (!key) return ''
    const translation = translations[language]?.[key]
    return translation || key
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

