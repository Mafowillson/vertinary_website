import { Link } from 'react-router-dom'
import { FiFileText, FiAlertCircle, FiCheckCircle, FiArrowLeft, FiShield } from 'react-icons/fi'

const TermsOfServicePage = () => {
  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptation des conditions',
      content: (
        <div className="space-y-4">
          <p>
            En accédant et en utilisant le site web et les services de l'Académie des Éleveurs, vous acceptez et convenez d'être lié par les termes et dispositions de cet accord. Si vous n'acceptez pas de respecter ce qui précède, veuillez ne pas utiliser ce service.
          </p>
          <p>
            Ces Conditions d'Utilisation (« Conditions ») régissent votre accès et votre utilisation de notre site web, de nos produits et de nos services (collectivement, le « Service »). Veuillez lire attentivement ces Conditions avant d'utiliser notre Service.
          </p>
        </div>
      )
    },
    {
      id: 'definitions',
      title: '2. Définitions',
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
            <li><strong>« Service »</strong> désigne le site web de l'Académie des Éleveurs, les produits, les cours et tous les services associés.</li>
            <li><strong>« Utilisateur », « vous » ou « votre »</strong> désigne la personne accédant ou utilisant le Service.</li>
            <li><strong>« Société », « nous », « notre » ou « nos »</strong> désigne l'Académie des Éleveurs.</li>
            <li><strong>« Contenu »</strong> désigne toutes les informations, textes, graphiques, images, vidéos et autres matériels disponibles via le Service.</li>
            <li><strong>« Compte »</strong> désigne le compte que vous créez pour accéder à certaines fonctionnalités du Service.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'account-registration',
      title: '3. Inscription au compte et sécurité',
      content: (
        <div className="space-y-4">
          <p>Pour accéder à certaines fonctionnalités du Service, vous pouvez être amené à créer un compte. Lors de la création d'un compte, vous acceptez de :</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
            <li>Fournir des informations exactes, actuelles et complètes</li>
            <li>Maintenir et mettre à jour rapidement les informations de votre compte</li>
            <li>Maintenir la sécurité de votre mot de passe et de votre identification</li>
            <li>Accepter toute responsabilité pour les activités qui se produisent sous votre compte</li>
            <li>Nous informer immédiatement de toute utilisation non autorisée de votre compte</li>
          </ul>
          <p>
            Vous êtes responsable du maintien de la confidentialité de vos identifiants de compte et de toutes les activités qui se produisent sous votre compte.
          </p>
        </div>
      )
    },
    {
      id: 'use-of-service',
      title: '4. Utilisation du Service',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">4.1 Utilisation autorisée</h4>
            <p>Vous ne pouvez utiliser le Service qu'à des fins licites et conformément à ces Conditions. Vous acceptez d'utiliser le Service :</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>À des fins éducatives et professionnelles</li>
              <li>En conformité avec toutes les lois et réglementations applicables</li>
              <li>Sans violer les droits d'autrui</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">4.2 Activités interdites</h4>
            <p>Vous acceptez de ne pas :</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>Violer toute loi ou réglementation applicable</li>
              <li>Porter atteinte aux droits d'autrui</li>
              <li>Transmettre tout contenu nuisible, offensant ou illégal</li>
              <li>Tenter d'obtenir un accès non autorisé au Service</li>
              <li>Interférer avec ou perturber le Service ou les serveurs</li>
              <li>Copier, modifier ou distribuer le contenu sans autorisation</li>
              <li>Utiliser des systèmes automatisés pour accéder au Service</li>
              <li>Usurper l'identité de toute personne ou entité</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'intellectual-property',
      title: '5. Droits de propriété intellectuelle',
      content: (
        <div className="space-y-4">
          <p>
            Le Service et son contenu original, ses fonctionnalités et sa fonctionnalité sont la propriété de l'Académie des Éleveurs et sont protégés par les lois internationales sur le droit d'auteur, les marques de commerce, les brevets, les secrets commerciaux et autres lois sur la propriété intellectuelle.
          </p>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">5.1 Notre contenu</h4>
            <p>
              Tout le contenu fourni par le Service, y compris mais sans s'y limiter les textes, graphiques, logos, images, vidéos, cours et logiciels, est la propriété de l'Académie des Éleveurs ou de ses fournisseurs de contenu et est protégé par les lois sur le droit d'auteur.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">5.2 Licence limitée</h4>
            <p>
              Nous vous accordons une licence limitée, non exclusive, non transférable et révocable pour accéder et utiliser le Service à des fins personnelles et non commerciales, sous réserve de ces Conditions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">5.3 Restrictions</h4>
            <p>Vous ne pouvez pas :</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>Reproduire, distribuer ou créer des œuvres dérivées à partir de notre contenu</li>
              <li>Utiliser notre contenu à des fins commerciales sans autorisation</li>
              <li>Supprimer tout avis de droit d'auteur ou de propriété</li>
              <li>Partager vos identifiants de compte avec d'autres personnes</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'purchases',
      title: '6. Achats et paiements',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">6.1 Tarification</h4>
            <p>
              Tous les prix des produits et services sont affichés dans la devise applicable et sont susceptibles d'être modifiés sans préavis. Nous nous réservons le droit de modifier les prix à tout moment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">6.2 Conditions de paiement</h4>
            <p>En effectuant un achat, vous acceptez de :</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>Fournir des informations de paiement valides</li>
              <li>Payer tous les frais encourus par votre compte</li>
              <li>Nous autoriser à débiter votre moyen de paiement</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">6.3 Remboursements</h4>
            <p>
              Les politiques de remboursement varient selon le type de produit. Les produits numériques peuvent être éligibles à un remboursement dans un délai spécifié après l'achat, sous réserve de notre politique de remboursement. Veuillez nous contacter pour connaître les conditions spécifiques de remboursement.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'user-content',
      title: '7. Contenu généré par les utilisateurs',
      content: (
        <div className="space-y-4">
          <p>
            Si vous soumettez, publiez ou affichez du contenu sur ou via le Service, vous nous accordez une licence mondiale, non exclusive, libre de redevances pour utiliser, reproduire, modifier et distribuer ce contenu aux fins d'exploitation et de promotion du Service.
          </p>
          <p>
            Vous déclarez et garantissez que vous possédez ou disposez des droits nécessaires pour accorder la licence décrite ci-dessus, et que votre contenu ne viole aucun droit de tiers ni aucune loi applicable.
          </p>
        </div>
      )
    },
    {
      id: 'disclaimers',
      title: '8. Avertissements',
      content: (
        <div className="space-y-4">
          <p>
            LE SERVICE EST FOURNI « EN L'ÉTAT » ET « TEL QUE DISPONIBLE » SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS MAIS SANS S'Y LIMITER LES GARANTIES IMPLICITES DE QUALITÉ MARCHANDE, D'ADÉQUATION À UN USAGE PARTICULIER OU DE NON-CONTREFAÇON.
          </p>
          <p>
            Nous ne garantissons pas que :
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
            <li>Le Service sera ininterrompu ou exempt d'erreurs</li>
            <li>Les défauts seront corrigés</li>
            <li>Le Service est exempt de virus ou d'autres composants nuisibles</li>
            <li>Les informations fournies sont exactes, complètes ou à jour</li>
          </ul>
          <p className="text-sm text-gray-600 italic">
            Le contenu éducatif fourni est uniquement à titre informatif et ne doit pas remplacer les conseils vétérinaires professionnels. Consultez toujours un vétérinaire agréé pour les problèmes de santé spécifiques des animaux.
          </p>
        </div>
      )
    },
    {
      id: 'limitation-liability',
      title: '9. Limitation de responsabilité',
      content: (
        <div className="space-y-4">
          <p>
            DANS LA MESURE MAXIMALE PERMISE PAR LA LOI, L'ACADÉMIE DES ÉLEVEURS NE SERA PAS RESPONSABLE DE TOUT DOMMAGE INDIRECT, ACCESSOIRE, SPÉCIAL, CONSÉCUTIF OU PUNITIF, NI DE TOUTE PERTE DE BÉNÉFICES OU DE REVENUS, QU'ILS SOIENT SUBIS DIRECTEMENT OU INDIRECTEMENT, NI DE TOUTE PERTE DE DONNÉES, D'UTILISATION, DE CLIENTÈLE OU D'AUTRES PERTES IMMATÉRIELLES.
          </p>
          <p>
            Notre responsabilité totale envers vous pour toutes les réclamations découlant de ou liées à l'utilisation du Service ne dépassera pas le montant que vous nous avez payé au cours des douze (12) mois précédant la réclamation.
          </p>
        </div>
      )
    },
    {
      id: 'indemnification',
      title: '10. Indemnisation',
      content: (
        <div className="space-y-4">
          <p>
            Vous acceptez d'indemniser, de défendre et de dégager de toute responsabilité l'Académie des Éleveurs, ses dirigeants, administrateurs, employés et agents contre toute réclamation, responsabilité, dommage, perte et dépense, y compris les honoraires d'avocats raisonnables, découlant de ou liés de quelque manière que ce soit à :
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
            <li>Votre accès ou utilisation du Service</li>
            <li>Votre violation de ces Conditions</li>
            <li>Votre violation des droits d'autrui</li>
            <li>Votre contenu généré par l'utilisateur</li>
          </ul>
        </div>
      )
    },
    {
      id: 'termination',
      title: '11. Résiliation',
      content: (
        <div className="space-y-4">
          <p>
            Nous pouvons résilier ou suspendre votre compte et votre accès au Service immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris si vous enfreignez ces Conditions.
          </p>
          <p>
            Lors de la résiliation, votre droit d'utiliser le Service cessera immédiatement. Si vous souhaitez résilier votre compte, vous pouvez simplement cesser d'utiliser le Service ou nous contacter pour supprimer votre compte.
          </p>
          <p>
            Toutes les dispositions de ces Conditions qui, par leur nature, devraient survivre à la résiliation survivront à la résiliation, y compris les dispositions relatives à la propriété, les exclusions de garantie, l'indemnisation et les limitations de responsabilité.
          </p>
        </div>
      )
    },
    {
      id: 'governing-law',
      title: '12. Droit applicable',
      content: (
        <div className="space-y-4">
          <p>
            Ces Conditions sont régies et interprétées conformément aux lois du Cameroun, sans égard aux dispositions relatives aux conflits de lois.
          </p>
          <p>
            Tout litige découlant de ou lié à ces Conditions ou au Service sera soumis à la juridiction exclusive des tribunaux situés au Cameroun.
          </p>
        </div>
      )
    },
    {
      id: 'changes',
      title: '13. Modifications des conditions',
      content: (
        <div className="space-y-4">
          <p>
            Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à tout moment. Si une révision est importante, nous fournirons un préavis d'au moins 30 jours avant l'entrée en vigueur des nouvelles conditions.
          </p>
          <p>
            Ce qui constitue une modification importante sera déterminé à notre seule discrétion. En continuant à accéder ou à utiliser notre Service après l'entrée en vigueur de toute révision, vous acceptez d'être lié par les conditions révisées.
          </p>
        </div>
      )
    },
    {
      id: 'contact',
      title: '14. Informations de contact',
      content: (
        <div className="space-y-4">
          <p>
            Si vous avez des questions concernant ces Conditions d'Utilisation, veuillez nous contacter :
          </p>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p><strong>Académie des Éleveurs</strong></p>
            <p>Email : legal@academie-eleveurs.com</p>
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
              <FiFileText className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Conditions d'Utilisation</h1>
              <p className="text-gray-600 mt-1">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <FiAlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Avis important</h3>
                <p className="text-sm text-yellow-800">
                  Veuillez lire attentivement ces Conditions d'Utilisation avant d'utiliser notre Service. En utilisant le Service, vous acceptez d'être lié par ces Conditions. Si vous n'acceptez pas ces Conditions, veuillez ne pas utiliser le Service.
                </p>
              </div>
            </div>
          </div>

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

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  {section.id === 'acceptance' && <FiCheckCircle className="w-6 h-6 text-green-600" />}
                  {section.id === 'intellectual-property' && <FiShield className="w-6 h-6 text-green-600" />}
                  {section.id === 'disclaimers' && <FiAlertCircle className="w-6 h-6 text-yellow-600" />}
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
              En utilisant nos services, vous reconnaissez avoir lu, compris et accepté d'être lié par ces Conditions d'Utilisation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsOfServicePage
