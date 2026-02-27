import { Link } from 'react-router-dom'
import { FiFileText, FiAlertCircle, FiCheckCircle, FiArrowLeft, FiShield } from 'react-icons/fi'

const TermsOfServicePage = () => {
  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      content: (
        <div className="space-y-4">
          <p>
            By accessing and using the Académie des Éleveurs website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
          <p>
            These Terms of Service ("Terms") govern your access to and use of our website, products, and services (collectively, the "Service"). Please read these Terms carefully before using our Service.
          </p>
        </div>
      )
    },
    {
      id: 'definitions',
      title: '2. Definitions',
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
            <li><strong>"Service"</strong> refers to the Académie des Éleveurs website, products, courses, and all related services.</li>
            <li><strong>"User," "you," or "your"</strong> refers to the individual accessing or using the Service.</li>
            <li><strong>"Company," "we," "us," or "our"</strong> refers to Académie des Éleveurs.</li>
            <li><strong>"Content"</strong> refers to all information, text, graphics, images, videos, and other materials available through the Service.</li>
            <li><strong>"Account"</strong> refers to the account you create to access certain features of the Service.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'account-registration',
      title: '3. Account Registration and Security',
      content: (
        <div className="space-y-4">
          <p>To access certain features of the Service, you may be required to create an account. When creating an account, you agree to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your password and identification</li>
            <li>Accept all responsibility for activities that occur under your account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
          </ul>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
        </div>
      )
    },
    {
      id: 'use-of-service',
      title: '4. Use of Service',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">4.1 Permitted Use</h4>
            <p>You may use the Service for lawful purposes only and in accordance with these Terms. You agree to use the Service:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>For educational and professional purposes</li>
              <li>In compliance with all applicable laws and regulations</li>
              <li>Without violating any rights of others</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">4.2 Prohibited Activities</h4>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit any harmful, offensive, or illegal content</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Copy, modify, or distribute content without authorization</li>
              <li>Use automated systems to access the Service</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'intellectual-property',
      title: '5. Intellectual Property Rights',
      content: (
        <div className="space-y-4">
          <p>
            The Service and its original content, features, and functionality are owned by Académie des Éleveurs and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">5.1 Our Content</h4>
            <p>
              All content provided through the Service, including but not limited to text, graphics, logos, images, videos, courses, and software, is the property of Académie des Éleveurs or its content suppliers and is protected by copyright laws.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">5.2 Limited License</h4>
            <p>
              We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for personal, non-commercial purposes, subject to these Terms.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">5.3 Restrictions</h4>
            <p>You may not:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>Reproduce, distribute, or create derivative works from our content</li>
              <li>Use our content for commercial purposes without permission</li>
              <li>Remove any copyright or proprietary notices</li>
              <li>Share your account credentials with others</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'purchases',
      title: '6. Purchases and Payments',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">6.1 Pricing</h4>
            <p>
              All prices for products and services are displayed in the applicable currency and are subject to change without notice. We reserve the right to modify prices at any time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">6.2 Payment Terms</h4>
            <p>By making a purchase, you agree to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>Provide valid payment information</li>
              <li>Pay all charges incurred by your account</li>
              <li>Authorize us to charge your payment method</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">6.3 Refunds</h4>
            <p>
              Refund policies vary by product type. Digital products may be eligible for refunds within a specified period after purchase, subject to our refund policy. Please contact us for specific refund terms.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'user-content',
      title: '7. User-Generated Content',
      content: (
        <div className="space-y-4">
          <p>
            If you submit, post, or display content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content for the purpose of operating and promoting the Service.
          </p>
          <p>
            You represent and warrant that you own or have the necessary rights to grant the license described above, and that your content does not violate any third-party rights or applicable laws.
          </p>
        </div>
      )
    },
    {
      id: 'disclaimers',
      title: '8. Disclaimers',
      content: (
        <div className="space-y-4">
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
            <li>The Service will be uninterrupted or error-free</li>
            <li>Defects will be corrected</li>
            <li>The Service is free of viruses or other harmful components</li>
            <li>The information provided is accurate, complete, or current</li>
          </ul>
          <p className="text-sm text-gray-600 italic">
            The educational content provided is for informational purposes only and should not replace professional veterinary advice. Always consult with a licensed veterinarian for specific animal health concerns.
          </p>
        </div>
      )
    },
    {
      id: 'limitation-liability',
      title: '9. Limitation of Liability',
      content: (
        <div className="space-y-4">
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, ACADÉMIE DES ÉLEVEURS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
          </p>
          <p>
            Our total liability to you for all claims arising from or related to the use of the Service shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.
          </p>
        </div>
      )
    },
    {
      id: 'indemnification',
      title: '10. Indemnification',
      content: (
        <div className="space-y-4">
          <p>
            You agree to indemnify, defend, and hold harmless Académie des Éleveurs, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
            <li>Your access to or use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of another</li>
            <li>Your user-generated content</li>
          </ul>
        </div>
      )
    },
    {
      id: 'termination',
      title: '11. Termination',
      content: (
        <div className="space-y-4">
          <p>
            We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
          </p>
          <p>
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to delete your account.
          </p>
          <p>
            All provisions of these Terms that by their nature should survive termination shall survive termination, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>
        </div>
      )
    },
    {
      id: 'governing-law',
      title: '12. Governing Law',
      content: (
        <div className="space-y-4">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
          </p>
          <p>
            Any disputes arising from or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts located in [Your Jurisdiction].
          </p>
        </div>
      )
    },
    {
      id: 'changes',
      title: '13. Changes to Terms',
      content: (
        <div className="space-y-4">
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
          </p>
          <p>
            What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
          </p>
        </div>
      )
    },
    {
      id: 'contact',
      title: '14. Contact Information',
      content: (
        <div className="space-y-4">
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p><strong>Académie des Éleveurs</strong></p>
            <p>Email: legal@academie-eleveurs.com</p>
            <p>Phone: +237 XXX XXX XXX</p>
            <p>Address: [Your Business Address]</p>
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
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FiFileText className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-600 mt-1">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
                <h3 className="font-semibold text-yellow-900 mb-2">Important Notice</h3>
                <p className="text-sm text-yellow-800">
                  Please read these Terms of Service carefully before using our Service. By using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiFileText className="w-5 h-5" />
              Quick Navigation
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
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsOfServicePage
