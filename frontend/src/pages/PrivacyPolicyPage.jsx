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
            Welcome to Académie des Éleveurs ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <p>
            By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
          </p>
        </div>
      )
    },
    {
      id: 'information-collection',
      title: '2. Information We Collect',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">2.1 Personal Information</h4>
            <p className="mb-2">We may collect the following types of personal information:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>Name and contact information (email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Payment information (credit card details, billing address)</li>
              <li>Professional information (veterinary license number, clinic information)</li>
              <li>Purchase history and transaction records</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">2.2 Automatically Collected Information</h4>
            <p className="mb-2">When you visit our website, we automatically collect certain information:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'how-we-use',
      title: '3. How We Use Your Information',
      content: (
        <div className="space-y-4">
          <p>We use the collected information for the following purposes:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
            <li>To provide, maintain, and improve our services</li>
            <li>To process transactions and send related information</li>
            <li>To send administrative information and updates</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To send marketing communications (with your consent)</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To comply with legal obligations and enforce our terms</li>
            <li>To protect the rights, property, and safety of our users</li>
          </ul>
        </div>
      )
    },
    {
      id: 'information-sharing',
      title: '4. Information Sharing and Disclosure',
      content: (
        <div className="space-y-4">
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4.1 Service Providers</h4>
              <p>We may share information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, and email delivery.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4.2 Legal Requirements</h4>
              <p>We may disclose information if required by law or in response to valid requests by public authorities.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">4.3 Business Transfers</h4>
              <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-security',
      title: '5. Data Security',
      content: (
        <div className="space-y-4">
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
            <li>256-bit SSL encryption for data transmission</li>
            <li>Secure server infrastructure with regular security audits</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Regular backups and disaster recovery procedures</li>
            <li>HIPAA-compliant data handling practices</li>
          </ul>
          <p className="text-sm text-gray-600 italic">
            However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
          </p>
        </div>
      )
    },
    {
      id: 'cookies',
      title: '6. Cookies and Tracking Technologies',
      content: (
        <div className="space-y-4">
          <p>
            We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
          </p>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Types of Cookies We Use:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Preference Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
          </div>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
          </p>
        </div>
      )
    },
    {
      id: 'your-rights',
      title: '7. Your Rights and Choices',
      content: (
        <div className="space-y-4">
          <p>You have the following rights regarding your personal information:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
            <li><strong>Access:</strong> Request access to your personal information</li>
            <li><strong>Correction:</strong> Request correction of inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Objection:</strong> Object to processing of your personal information</li>
            <li><strong>Portability:</strong> Request transfer of your data to another service</li>
            <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
          </p>
        </div>
      )
    },
    {
      id: 'data-retention',
      title: '8. Data Retention',
      content: (
        <div className="space-y-4">
          <p>
            We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
          </p>
          <p>
            When we no longer need your personal information, we will securely delete or anonymize it in accordance with our data retention policies.
          </p>
        </div>
      )
    },
    {
      id: 'children-privacy',
      title: '9. Children\'s Privacy',
      content: (
        <div className="space-y-4">
          <p>
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
          </p>
        </div>
      )
    },
    {
      id: 'international-transfers',
      title: '10. International Data Transfers',
      content: (
        <div className="space-y-4">
          <p>
            Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ from those in your jurisdiction.
          </p>
          <p>
            By using our services, you consent to the transfer of your information to facilities located outside your jurisdiction. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.
          </p>
        </div>
      )
    },
    {
      id: 'changes',
      title: '11. Changes to This Privacy Policy',
      content: (
        <div className="space-y-4">
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </div>
      )
    },
    {
      id: 'contact',
      title: '12. Contact Us',
      content: (
        <div className="space-y-4">
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p><strong>Académie des Éleveurs</strong></p>
            <p>Email: privacy@academie-eleveurs.com</p>
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
              <FiShield className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600 mt-1">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
              By using our services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicyPage
