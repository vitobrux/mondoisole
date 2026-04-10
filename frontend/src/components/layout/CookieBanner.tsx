import { useState, useEffect } from 'react';

const COOKIE_KEY = 'mondoisole_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-200 shadow-2xl p-4 md:p-6" role="alert">
      <div className="mx-auto max-w-screen-xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600 flex-1">
          Utilizziamo cookie tecnici e di analytics per migliorare la tua esperienza.
          Consulta la nostra{' '}
          <a href="/privacy" className="text-brand-600 underline hover:text-brand-800">Privacy Policy</a>{' '}
          per maggiori informazioni.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Rifiuta
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
