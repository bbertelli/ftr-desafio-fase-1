import { Routes, Route, useParams } from 'react-router-dom'
import Redirect from './pages/Redirect'
import { useState, useEffect } from 'react'
import { Link as LinkIcon, Download, Trash2, Copy } from 'lucide-react'
import type { Link as LinkType } from './types'
import { apiService } from './services/api'
import './App.css'
import Logo from './assets/Logo.svg'
import { Button } from './components/Button'
import { IconButton } from './components/IconButton'
import { Input } from './components/Input'

function RedirectWrapper() {
  const { code } = useParams();
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    apiService.getLinkByCode(code)
      .then((link) => {
        setUrl(link?.originalUrl || null);
        setLoading(false);
      })
      .catch(() => {
        setError('Link não encontrado');
        setLoading(false);
      });
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner h-12 w-12 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }
  if (error || !url) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm p-10 max-w-md w-full flex flex-col items-center text-center gap-6">
          <img src={Logo} alt="brev.ly logo" className="h-12 mx-auto" />
          <h1 className="text-2xl font-bold text-danger">Link não encontrado</h1>
        </div>
      </div>
    );
  }
  return <Redirect url={url} shortCode={code} />;
}

function MainLayout() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [links, setLinks] = useState<LinkType[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<string | null>(null);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  }

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

    try {
      const newLink = await apiService.createLink(originalUrl)
      setLinks(prev => [newLink, ...prev])
      setOriginalUrl('')
      showToast('Link salvo com sucesso!')
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
      showToast('Link deletado com sucesso!');
    } catch (err) {
      console.error('Error deleting link:', err instanceof Error ? err.message : 'Unknown error')
      setError('Erro ao deletar link')
    }
  }

  const handleExportLinks = async () => {
    try {
      const response = await apiService.exportLinks()
      window.open(response.downloadUrl, '_blank')
      showToast('Exportação iniciada!')
    } catch (err) {
      console.error('Error exporting links:', err instanceof Error ? err.message : 'Unknown error')
      setError('Erro ao exportar links')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Link copiado para a área de transferência!');
  }

  function getFrontendShortUrl(code: string) {
    return `${window.location.origin}/r/${code}`;
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner h-12 w-12 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Logo centralizado */}
      <header className="w-full flex justify-center py-10">
        <img src={Logo} alt="brev.ly logo" className="h-10" />
      </header>
      {/* Container central */}
      <main className="flex-1 flex flex-col items-center px-2">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card: Novo link */}
          <section className="bg-white rounded-xl shadow-sm p-8 flex flex-col gap-6 min-w-0">
            <h2 className="text-xl font-bold text-gray-600 mb-2">Novo link</h2>
            <form onSubmit={handleCreateLink} className="flex flex-col gap-6">
              <Input
                label="Link original"
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="www.exemplo.com.br"
                required
                error={error || undefined}
              />
              {/* Campo de link encurtado (apenas leitura, opcional) */}
              {/* <Input label="Link encurtado" value="brev.ly/" readOnly /> */}
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="w-full h-12 text-base mt-2"
              >
                {loading ? (
                  <>
                    <div className="loading-spinner h-4 w-4"></div>
                    Salvando...
                  </>
                ) : (
                  'Salvar link'
                )}
              </Button>
            </form>
          </section>
          {/* Card: Meus links */}
          <section className="bg-white rounded-xl shadow-sm p-8 flex flex-col gap-6 min-w-0">
            <div className="flex flex-row items-center gap-4 mb-2">
              <h2 className="text-xl font-bold text-gray-600 whitespace-nowrap">Meus links</h2>
              <Button
                type="button"
                variant="secondary"
                leftIcon={<Download size={16} />}
                className="h-9 px-3 text-sm inline-flex"
                disabled={links.length === 0}
                onClick={handleExportLinks}
              >
                Baixar CSV
              </Button>
            </div>
            <div className="border-t border-gray-200 mb-2" />
            {links.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 py-12 text-gray-400 gap-2">
                <LinkIcon size={40} />
                <span className="text-xs font-semibold tracking-wide">AINDA NÃO EXISTEM LINKS CADASTRADOS</span>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {links.map((link) => (
                  <li key={link.id} className="flex items-center py-4 gap-4">
                    <div className="flex-1 min-w-0">
                      <a
                        href={getFrontendShortUrl(link.shortCode)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-base font-semibold hover:underline text-sm break-all"
                      >
                        {getFrontendShortUrl(link.shortCode).replace(/^https?:\/\//, '')}
                      </a>
                      <div className="text-gray-400 text-xs truncate">
                        {link.originalUrl.replace(/^https?:\/\//, '')}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-gray-500 text-xs w-16 text-right">{(link.accessCount ?? 0)} acesso{(link.accessCount ?? 0) === 1 ? '' : 's'}</span>
                      <IconButton
                        icon={<Copy size={16} />}
                        label="Copiar"
                        onClick={() => copyToClipboard(getFrontendShortUrl(link.shortCode))}
                      />
                      <IconButton
                        icon={<Trash2 size={18} />}
                        label="Deletar"
                        onClick={() => handleDeleteLink(link.id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      {/* Toast de feedback */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-blue-base text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/r/:code" element={<RedirectWrapper />} />
    </Routes>
  );
}
