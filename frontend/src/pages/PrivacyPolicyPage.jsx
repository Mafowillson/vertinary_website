import { Link } from 'react-router-dom'
import { FiShield, FiLock, FiEye, FiFileText, FiArrowLeft } from 'react-icons/fi'

const PrivacyPolicyPage = () => {
  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <div className="space-y-4">
          <p>
            Bienvenue chez Académie des Éleveurs (« nous », « notre » ou « nos »). Nous nous engageons à protéger votre vie privée et à assurer la sécurité de vos informations personnelles. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site web et utilisez nos services.
          </p>
          <p>
            En utilisant nos services, vous acceptez la collecte et l'utilisation des informations conformément à cette politique. Si vous n'êtes pas d'accord avec nos politiques et pratiques, veuillez ne pas utiliser nos services.
          </p>
        </div>
      )
    },
    {
      id: 'information-collection',
      title: '2. Informations que nous collectons',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">2.1 Informations personnelles</h4>
            <p className="mb-2">Nous pouvons collecter les types d'informations personnelles suivants :</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>Nom et coordonnées (adresse email, numéro de téléphone)</li>
              <li>Identifiants de compte (nom d'utilisateur, mot de passe)</li>
              <li>Informations de paiement (détails de carte de crédit, adresse de facturation)</li>
              <li>Informations professionnelles (numéro de licence vétérinaire, informations sur la clinique)</li>
              <li>Historique des achats et enregistrements de transactions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">2.2 Informations collectées automatiquement</h4>
            <p className="mb-2">Lorsque vous visitez notre site web, nous collectons automatiquement certaines informations :</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>Adresse IP et informations sur l'appareil</li>
              <li>Type et version du navigateur</li>
              <li>Pages visitées et temps passé sur les pages</li>
              <li>Adresses des sites web de référence</li>
              <li>Cookies et technologies de suivi similaires</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'how-we-use',
      title: '3. Comment nous utilisons vos informations',
      content: (
        <div className="space-y-4">
          <p>Nous utilisons les informations collectées aux fins suivantes :</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
            <li>Fournir, maintenir et améliorer nos services</li>
            <li>Traiter les transactions et envoyer les informations associées</li>
            <li>Envoyer des informations administratives et des mises à jour</li>
            <li>Répondre à vos demandes et fournir un support client</li>
            <li>Envoyer des communications marketing (avec votre consentement)</li>
            <li>Détecter, prévenir et résoudre les problèmes techniques</li>
            <li>Se conformer aux obligations légales et faire respecter nos conditions</li>
            <li>Protéger les droits, la propriété et la sécurité de nos utilisateurs</li>
          </ul>
        </div>
      )
    },
    {
      id: 'information-sharing',
      title: '4. Partage et divulgation des informations',
      content: (
        <div className="space-y-4">
          <p>Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Nous ne pouvons partager vos informations que dans les circonstances suivantes :</p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4.1 Prestataires de services</h4>
              <p>Nous pouvons partager des informations avec des prestataires de services tiers qui effectuent des services en notre nom, tels que le traitement des paiements, l'analyse de données et la livraison d'emails.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4.2 Exigences légales</h4>
              <p>Nous pouvons divulguer des informations si la loi l'exige ou en réponse à des demandes valides des autorités publiques.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4.3 Transferts d'entreprise</h4>
              <p>En cas de fusion, d'acquisition ou de vente d'actifs, vos informations peuvent être transférées à l'entité acquéreuse.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-security',
      title: '5. Sécurité des données',
      content: (
        <div className="space-y-4">
          <p>
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos informations personnelles contre l'accès, la modification, la divulgation ou la destruction non autorisés. Ces mesures comprennent :
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
            <li>Cryptage SSL 256 bits pour la transmission des données</li>
            <li>Infrastructure de serveurs sécurisée avec des audits de sécurité réguliers</li>
            <li>Contrôles d'accès et mécanismes d'authentification</li>
            <li>Sauvegardes régulières et procédures de reprise après sinistre</li>
            <li>Pratiques de traitement des données conformes aux normes HIPAA</li>
          </ul>
          <p className="text-sm text-gray-600 italic">
            Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est sûre à 100%. Bien que nous nous efforçons d'utiliser des moyens commercialement acceptables pour protéger vos informations, nous ne pouvons garantir une sécurité absolue.
          </p>
        </div>
      )
    },
    {
      id: 'cookies',
      title: '6. Cookies et technologies de suivi',
      content: (
        <div className="space-y-4">
          <p>
            Nous utilisons des cookies et des technologies de suivi similaires pour suivre l'activité sur notre site web et stocker certaines informations. Les cookies sont des fichiers contenant une petite quantité de données pouvant inclure un identifiant unique anonyme.
          </p>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Types de cookies que nous utilisons :</h4>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li><strong>Cookies essentiels :</strong> Nécessaires au bon fonctionnement du site web</li>
              <li><strong>Cookies analytiques :</strong> Nous aident à comprendre comment les visiteurs interagissent avec notre site web</li>
              <li><strong>Cookies de préférences :</strong> Mémorisent vos préférences et paramètres</li>
              <li><strong>Cookies marketing :</strong> Utilisés pour diffuser des publicités pertinentes</li>
            </ul>
          </div>
          <p>
            Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour indiquer quand un cookie est envoyé. Cependant, si vous n'acceptez pas les cookies, vous pourriez ne pas pouvoir utiliser certaines parties de notre site web.
          </p>
        </div>
      )
    },
    {
      id: 'your-rights',
      title: '7. Vos droits et choix',
      content: (
        <div className="space-y-4">
          <p>Vous disposez des droits suivants concernant vos informations personnelles :</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
            <li><strong>Accès :</strong> Demander l'accès à vos informations personnelles</li>
            <li><strong>Correction :</strong> Demander la correction d'informations inexactes</li>
            <li><strong>Suppression :</strong> Demander la suppression de vos informations personnelles</li>
            <li><strong>Opposition :</strong> Vous opposer au traitement de vos informations personnelles</li>
            <li><strong>Portabilité :</strong> Demander le transfert de vos données vers un autre service</li>
            <li><strong>Retrait :</strong> Retirer votre consentement au traitement des données</li>
          </ul>
          <p>
            Pour exercer ces droits, veuillez nous contacter en utilisant les informations fournies dans la section « Nous contacter » ci-dessous.
          </p>
        </div>
      )
    },
    {
      id: 'data-retention',
      title: '8. Conservation des données',
      content: (
        <div className="space-y-4">
          <p>
            Nous ne conserverons vos informations personnelles que pendant la durée nécessaire pour atteindre les objectifs décrits dans cette Politique de Confidentialité, sauf si une période de conservation plus longue est requise ou autorisée par la loi.
          </p>
          <p>
            Lorsque nous n'avons plus besoin de vos informations personnelles, nous les supprimerons ou les anonymiserons de manière sécurisée conformément à nos politiques de conservation des données.
          </p>
        </div>
      )
    },
    {
      id: 'children-privacy',
      title: '9. Confidentialité des mineurs',
      content: (
        <div className="space-y-4">
          <p>
            Nos services ne sont pas destinés aux personnes de moins de 18 ans. Nous ne collectons pas sciemment d'informations personnelles auprès de mineurs. Si vous êtes un parent ou un tuteur et pensez que votre enfant nous a fourni des informations personnelles, veuillez nous contacter immédiatement.
          </p>
        </div>
      )
    },
    {
      id: 'international-transfers',
      title: '10. Transferts internationaux de données',
      content: (
        <div className="space-y-4">
          <p>
            Vos informations peuvent être transférées vers et conservées sur des ordinateurs situés en dehors de votre état, province, pays ou autre juridiction gouvernementale où les lois sur la protection des données peuvent différer de celles de votre juridiction.
          </p>
          <p>
            En utilisant nos services, vous consentez au transfert de vos informations vers des installations situées en dehors de votre juridiction. Nous prendrons toutes les mesures raisonnablement nécessaires pour garantir que vos données sont traitées de manière sécurisée et conformément à cette Politique de Confidentialité.
          </p>
        </div>
      )
    },
    {
      id: 'changes',
      title: '11. Modifications de cette Politique de Confidentialité',
      content: (
        <div className="space-y-4">
          <p>
            Nous pouvons mettre à jour notre Politique de Confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle Politique de Confidentialité sur cette page et en mettant à jour la date de « Dernière mise à jour ».
          </p>
          <p>
            Il vous est conseillé de consulter périodiquement cette Politique de Confidentialité pour tout changement. Les modifications apportées à cette Politique de Confidentialité prennent effet dès leur publication sur cette page.
          </p>
        </div>
      )
    },
    {
      id: 'contact',
      title: '12. Nous contacter',
      content: (
        <div className="space-y-4">
          <p>
            Si vous avez des questions concernant cette Politique de Confidentialité ou nos pratiques en matière de données, veuillez nous contacter :
          </p>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p><strong>Académie des Éleveurs</strong></p>
            <p>Email : privacy@academie-eleveurs.com</p>
            <p>Téléphone : +237 699 933 135</p>
            <p>Adresse : Cameroun</p>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-12 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FiShield className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Politique de Confidentialité</h1>
              <p className="text-gray-600 mt-1">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Navigation */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiFileText className="w-5 h-5" />
              Navigation rapide
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-green-600 hover:text-green-700 hover:underline"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  {section.id === 'introduction' && <FiFileText className="w-6 h-6 text-green-600" />}
                  {section.id === 'data-security' && <FiLock className="w-6 h-6 text-green-600" />}
                  {section.id === 'cookies' && <FiEye className="w-6 h-6 text-green-600" />}
                  {section.title}
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <p className="text-gray-700">
              En utilisant nos services, vous reconnaissez avoir lu et compris cette Politique de Confidentialité.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicyPage
