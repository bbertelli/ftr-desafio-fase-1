import { useEffect } from 'react';
import LogoIcon from '../assets/Logo_Icon.svg';

interface RedirectProps {
  url: string;
  shortCode?: string;
}

export function Redirect({ url, shortCode }: RedirectProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (shortCode) {
        // Redireciona para o backend, que incrementa o contador e redireciona para a URL original
        window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:3333'}/r/${shortCode}`;
      } else {
        window.location.href = url;
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [url, shortCode]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-2">
      <div className="bg-white rounded-xl shadow-sm p-10 max-w-md w-full flex flex-col items-center text-center gap-6">
        <img src={LogoIcon} alt="brev.ly logo" className="h-12 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-700">Redirecionando...</h1>
        <p className="text-gray-500 text-base">
          O link será aberto automaticamente em alguns instantes.<br />
          Não foi redirecionado?{' '}
          {shortCode ? (
            <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:3333'}/r/${shortCode}`} className="text-blue-base font-semibold hover:underline">Acesse aqui</a>
          ) : (
            <a href={url} className="text-blue-base font-semibold hover:underline">Acesse aqui</a>
          )}
        </p>
      </div>
    </div>
  );
}

export default Redirect; 