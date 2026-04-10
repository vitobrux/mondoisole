import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <>
      <Helmet><title>404 — Pagina non trovata | Mondoisole</title></Helmet>
      <div className="min-h-[60vh] flex items-center justify-center px-[5%]">
        <div className="text-center">
          <p className="text-6xl font-bold text-brand-200 mb-4">404</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pagina non trovata</h1>
          <p className="text-gray-500 mb-6">La pagina che cerchi non esiste o è stata spostata.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-brand-700 transition">
            Torna alla Home
          </Link>
        </div>
      </div>
    </>
  );
}
