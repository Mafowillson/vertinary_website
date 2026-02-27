import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { downloadService } from '../services/downloadService'
import { formatFileSize } from '../utils/formatters'
import { FiDownload, FiMessageCircle, FiInfo, FiCheckCircle, FiFile, FiZap, FiShield, FiClock } from 'react-icons/fi'
import { useApp } from '../contexts/AppContext'

const DownloadPage = () => {
  const { orderId } = useParams()
  const { socialLinks } = useApp()
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(null)

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const data = await downloadService.getDownloadFiles(orderId)
        setFiles(data.files || [])
      } catch (error) {
        console.error('Failed to load files:', error)
      } finally {
        setLoading(false)
      }
    }
    loadFiles()
  }, [orderId])

  const handleDownload = async (fileId, fileName) => {
    setDownloading(fileId)
    try {
      const blob = await downloadService.downloadFile(orderId, fileId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Erreur lors du téléchargement. Veuillez réessayer.')
    } finally {
      setDownloading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement de vos fichiers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-600 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <FiCheckCircle className="w-5 h-5" />
              <span className="font-semibold text-sm sm:text-base">Achat confirmé</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Téléchargez vos fichiers
            </h1>
            <p className="text-lg sm:text-xl text-green-50 mb-6 max-w-2xl mx-auto">
              Vos ressources sont prêtes ! Téléchargez-les maintenant et commencez à apprendre.
            </p>
            {files.length > 0 && (
              <div className="flex items-center justify-center gap-2 text-green-100">
                <FiFile className="w-5 h-5" />
                <span className="font-medium">{files.length} {files.length === 1 ? 'fichier disponible' : 'fichiers disponibles'}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Quick Info Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-200 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiInfo className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Comment télécharger vos fichiers ?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Cliquez simplement sur le bouton <span className="font-semibold text-blue-600">"Télécharger"</span> à côté de chaque fichier. 
                Le téléchargement commencera automatiquement. Si vous rencontrez un problème, contactez-nous via WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Files Section */}
        <div className="mb-8">
          {files.length > 0 ? (
            <div className="space-y-4">
              {files.map((file, index) => (
                <div 
                  key={file.id} 
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    {/* File Info */}
                    <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                      {/* File Icon */}
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                          <FiFile className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                          <FiCheckCircle className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      
                      {/* File Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 break-words">
                          {file.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            <span className="font-medium">PDF Document</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiFile className="w-4 h-4" />
                            <span>{formatFileSize(file.size)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Download Button */}
                    <div className="w-full sm:w-auto flex-shrink-0">
                      <button
                        onClick={() => handleDownload(file.id, file.name)}
                        disabled={downloading === file.id}
                        className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {downloading === file.id ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            <span>Téléchargement...</span>
                          </>
                        ) : (
                          <>
                            <FiDownload className="w-5 h-5" />
                            <span>Télécharger</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiFile className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun fichier disponible</h3>
                <p className="text-gray-600 mb-6">
                  Vos fichiers seront disponibles ici une fois votre commande traitée.
                </p>
                {socialLinks.whatsapp && (
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors"
                  >
                    <FiMessageCircle className="w-5 h-5" />
                    <span>Contacter le support</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Trust & Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* WhatsApp Support Card */}
          {socialLinks.whatsapp && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiMessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    Besoin d'aide ?
                  </h3>
                  <p className="text-gray-700 mb-4 text-sm">
                    Contactez-nous sur WhatsApp pour toute assistance
                  </p>
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors text-sm"
                  >
                    <FiMessageCircle className="w-4 h-4" />
                    <span>Ouvrir WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Security & Guarantee Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiShield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Téléchargement sécurisé
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Fichiers vérifiés et sécurisés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Accès illimité après téléchargement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Garantie satisfait ou remboursé</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Questions fréquentes
          </h2>
          
          <div className="space-y-4">
            <details className="group bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors">
              <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between list-none">
                <span className="flex items-center gap-3">
                  <FiInfo className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Je ne vois pas mon fichier - que faire ?</span>
                </span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl">▼</span>
              </summary>
              <div className="mt-4 ml-8 text-gray-700 leading-relaxed">
                <p className="mb-2">
                  Si vous ne voyez pas vos fichiers, voici quelques solutions :
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Vérifiez que les pop-ups ne sont pas bloquées dans votre navigateur</li>
                  <li>Rafraîchissez la page (F5 ou Cmd+R)</li>
                  <li>Vérifiez votre dossier de téléchargements</li>
                  <li>Contactez-nous via WhatsApp pour obtenir de l'aide</li>
                </ul>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors">
              <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between list-none">
                <span className="flex items-center gap-3">
                  <FiClock className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Combien de temps ai-je pour télécharger mes fichiers ?</span>
                </span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl">▼</span>
              </summary>
              <div className="mt-4 ml-8 text-gray-700 leading-relaxed">
                <p>
                  Vous avez un accès illimité à vos fichiers après l'achat. Une fois téléchargés, 
                  vous pouvez les conserver indéfiniment sur votre appareil.
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors">
              <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between list-none">
                <span className="flex items-center gap-3">
                  <FiZap className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Le téléchargement est lent ou échoue</span>
                </span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl">▼</span>
              </summary>
              <div className="mt-4 ml-8 text-gray-700 leading-relaxed">
                <p className="mb-2">
                  Si le téléchargement est lent ou échoue :
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Vérifiez votre connexion internet</li>
                  <li>Essayez de télécharger à nouveau</li>
                  <li>Utilisez un navigateur différent (Chrome, Firefox, Safari)</li>
                  <li>Contactez-nous si le problème persiste</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadPage

