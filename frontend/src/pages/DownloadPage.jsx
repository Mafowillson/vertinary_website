import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { downloadService } from '../services/downloadService'
import { formatFileSize } from '../utils/formatters'
import { FiDownload, FiEye, FiMessageCircle, FiInfo } from 'react-icons/fi'
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Instructions */}
      <div className="card bg-gray-50 mb-4 md:mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-orange-600 font-bold text-sm">i</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Comment télécharger mon fichier?
            </h3>
            <p className="text-gray-700 text-sm md:text-base">
              Cliquez sur le bouton "Télécharger" ci-dessous pour télécharger votre fichier.
            </p>
          </div>
        </div>
      </div>

      {/* Files Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Fichiers</h1>

        {files.length > 0 ? (
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-red-600 font-bold">PDF</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 uppercase">
                        {file.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        PDF - {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDownload(file.id, file.name)}
                      disabled={downloading === file.id}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                    >
                      <FiDownload className="w-4 h-4" />
                      <span>{downloading === file.id ? 'Téléchargement...' : 'Télécharger'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-600">Aucun fichier disponible pour le moment.</p>
          </div>
        )}
      </div>

      {/* WhatsApp Support */}
      {socialLinks.whatsapp && (
        <div className="card bg-green-50 border border-green-200 mb-6">
          <div className="flex items-start space-x-3">
            <FiMessageCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                Clique ici pour nous écrire sur WhatsApp en cas de problème:
              </h3>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xl md:text-2xl">👉</span>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 font-semibold underline break-all text-sm md:text-base"
                >
                  {socialLinks.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Prompt with Emojis */}
      <div className="text-center mb-4 md:mb-6">
        <div className="flex justify-center space-x-1 mb-2">
          {[...Array(7)].map((_, i) => (
            <span key={i} className="text-xl md:text-2xl">👉</span>
          ))}
        </div>
        <p className="text-lg md:text-xl font-bold text-gray-900 mb-2">
          Télécharge ton document ici
        </p>
        <div className="flex justify-center space-x-1">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="text-xl md:text-2xl">👉</span>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Besoin d'aide?</h2>
        <div className="card">
          <details className="group">
            <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
              <span>Je ne vois pas mon fichier - que faire ?</span>
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 text-gray-700">
              <p>
                Vérifiez vos bloqueurs de pop-ups, essayez de rafraîchir la page, ou contactez-nous via WhatsApp pour obtenir de l'aide.
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}

export default DownloadPage

