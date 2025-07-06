import { useState, useEffect } from 'react'
import { Link as LinkIcon, Plus, Download, Trash2, Copy, ExternalLink } from 'lucide-react'
import type { Link as LinkType } from './types'
import { apiService } from './services/api'
import './App.css'

function App() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [links, setLinks] = useState<LinkType[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Load existing links on component mount
  useEffect(() => {
    const loadLinks = async () => {
      try {
        const response = await apiService.getLinks()
        setLinks(response || [])
      } catch (err) {
        console.error('Error loading links:', err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setInitialLoading(false)
      }
    }

    loadLinks()
  }, [])

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!originalUrl.trim()) return

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const newLink = await apiService.createLink(originalUrl)
      setLinks(prev => [newLink, ...prev])
      setOriginalUrl('')
      setSuccess('URL encurtada com sucesso!')
    } catch (err) {
      console.error('Error creating link:', err instanceof Error ? err.message : 'Unknown error')
      setError('Erro ao criar link encurtado')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteLink = async (id: string) => {
    try {
      await apiService.deleteLink(id)
      setLinks(prev => prev.filter(link => link.id !== id))
      setSuccess('Link deletado com sucesso!')
    } catch (err) {
      console.error('Error deleting link:', err instanceof Error ? err.message : 'Unknown error')
      setError('Erro ao deletar link')
    }
  }

  const handleExportLinks = async () => {
    try {
      const response = await apiService.exportLinks()
      window.open(response.downloadUrl, '_blank')
      setSuccess('Exportação iniciada!')
    } catch (err) {
      console.error('Error exporting links:', err instanceof Error ? err.message : 'Unknown error')
      setError('Erro ao exportar links')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setSuccess('Link copiado para a área de transferência!')
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Brev.ly
          </h1>
          <p className="text-gray-600">
            Encurte seus links de forma rápida e segura
          </p>
        </div>

        {/* Create Link Form */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleCreateLink} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex gap-4">
              <input
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Cole sua URL aqui..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  'Encurtando...'
                ) : (
                  <>
                    <Plus size={20} />
                    Encurtar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Messages */}
        {error && (
          <div className="max-w-2xl mx-auto mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="max-w-2xl mx-auto mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Links List */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Seus Links
            </h2>
            {links.length > 0 && (
              <button
                onClick={handleExportLinks}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2"
              >
                <Download size={16} />
                Exportar CSV
              </button>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {links.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <LinkIcon size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Nenhum link criado ainda</p>
                <p className="text-sm">Crie seu primeiro link encurtado acima</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {links.map((link) => (
                  <div key={link.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {link.originalUrl}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600 font-mono text-sm">
                            {link.shortUrl}
                          </span>
                          <button
                            onClick={() => copyToClipboard(link.shortUrl)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                            title="Copiar link"
                          >
                            <Copy size={14} />
                          </button>
                          <a
                            href={link.shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-gray-400 hover:text-gray-600"
                            title="Abrir link encurtado"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Criado em: {new Date(link.createdAt).toLocaleDateString('pt-BR')}</span>
                          <span>Cliques: {link.accessCount || 0}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteLink(link.id)}
                        className="ml-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Deletar link"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
