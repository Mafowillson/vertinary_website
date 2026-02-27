import { Link } from 'react-router-dom'
import { FiYoutube, FiFacebook, FiPhone, FiMail, FiMapPin, FiBook, FiUsers, FiAward, FiTarget, FiHeart, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { founderData } from '../data/mockHomePage'

const AboutPage = () => {
  const missionPoints = [
    'Partager des connaissances vétérinaires accessibles à tous',
    'Éduquer les éleveurs camerounais et internationaux',
    'Créer une communauté d\'apprentissage continue',
    'Démocratiser l\'accès à l\'information en élevage',
    'Contribuer au développement de l\'agriculture durable'
  ]

  const milestones = [
    { year: '2020', title: 'Début du parcours', description: 'Commencement des études en médecine vétérinaire' },
    { year: '2021', title: 'Création de contenu', description: 'Lancement de la chaîne YouTube et page Facebook' },
    { year: '2022', title: 'Premier livre publié', description: 'Publication du premier livre "TOUT SUR L\'ÉLEVAGE"' },
    { year: '2023', title: 'Fondation de l\'Académie', description: 'Création de l\'Académie des Éleveurs' },
    { year: '2024', title: 'Plateforme digitale', description: 'Lancement de la plateforme web pour partager les connaissances' }
  ]

  const impactStats = [
    { icon: FiUsers, value: '5,000+', label: 'Éleveurs formés' },
    { icon: FiBook, value: '50+', label: 'Guides créés' },
    { icon: FiAward, value: '4+', label: 'Années d\'expérience' },
    { icon: FiTarget, value: '100+', label: 'Vidéos éducatives' }
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full text-sm font-semibold text-green-700 mb-6">
                <FiCheckCircle className="w-4 h-4" />
                <span>Fondateur & Expert Vérifié</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Rencontrez{' '}
                <span className="text-green-600">{founderData.name}</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {founderData.description}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 mb-8">
                <a
                  href={founderData.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <FiYoutube className="w-5 h-5" />
                  <span>YouTube</span>
                </a>
                <a
                  href={founderData.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <FiFacebook className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
                <a
                  href={founderData.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <FiPhone className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600">
                <FiMapPin className="w-5 h-5 text-green-600" />
                <span>{founderData.location}</span>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={founderData.imageUrl}
                  alt={founderData.name}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-100 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-200 rounded-full opacity-30 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {founderData.mission}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missionPoints.map((point, index) => (
              <div
                key={index}
                className="bg-green-50 border border-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre Parcours
            </h2>
            <p className="text-lg text-gray-600">
              L'évolution de l'Académie des Éleveurs au fil des années
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-green-200 transform md:-translate-x-1/2"></div>

            <div className="space-y-8 sm:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 sm:left-8 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full border-2 sm:border-4 border-white shadow-lg transform md:-translate-x-1/2 z-10"></div>

                  {/* Content */}
                  <div
                    className={`ml-8 sm:ml-16 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xl sm:text-2xl font-bold text-green-600">{milestone.year}</span>
                        <div className="h-px flex-1 bg-gray-200"></div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-xl p-6 text-center hover:shadow-lg transition-all"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Réalisations & Reconnaissances
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Formation & Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FiAward className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Étudiant Docteur en Médecine Vétérinaire</h4>
                      <p className="text-gray-600 text-sm">Formation continue en médecine vétérinaire</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiAward className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Ingénieur en Production Animale</h4>
                      <p className="text-gray-600 text-sm">Expertise en gestion et production animale</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiBook className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Auteur de la série "TOUT SUR L'ÉLEVAGE"</h4>
                      <p className="text-gray-600 text-sm">Plusieurs livres publiés sur l'élevage</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Innovation & Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FiTarget className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Fondateur de l'Académie des Éleveurs</h4>
                      <p className="text-gray-600 text-sm">Plateforme éducative pour éleveurs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiHeart className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Fabricant de l'Accélérateur de Croissance Bio</h4>
                      <p className="text-gray-600 text-sm">Produit innovant pour l'élevage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiUsers className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Créateur de contenu éducatif</h4>
                      <p className="text-gray-600 text-sm">YouTube et Facebook avec milliers de vues</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vision pour l'Avenir
            </h2>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 md:p-12 border border-green-100">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Notre vision est de créer une communauté mondiale d'éleveurs éduqués et prospères, où les connaissances en médecine vétérinaire sont accessibles à tous, indépendamment de leur localisation géographique ou de leurs ressources financières.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Nous croyons fermement que l'éducation est la clé du succès en élevage. En partageant nos connaissances et notre expérience, nous contribuons à améliorer la qualité des soins aux animaux et à renforcer l'industrie de l'élevage au Cameroun et au-delà.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Rejoignez-nous dans cette mission de partage et d'apprentissage continu. Ensemble, nous pouvons faire une différence significative dans la vie des éleveurs et de leurs animaux.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à commencer votre parcours d'apprentissage?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Explorez nos ressources, formations et livres pour améliorer vos compétences en élevage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-6 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>Voir les Ressources</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={founderData.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 hover:bg-green-800 text-white rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <FiPhone className="w-5 h-5" />
              <span>Nous Contacter</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
