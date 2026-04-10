import { useState, type FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Lock, Loader2 } from 'lucide-react';
import { adminLogin } from '../lib/api';

interface Props {
  onLogin: (token: string) => void;
}

export default function AdminLoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Compila tutti i campi.'); return; }

    setLoading(true);
    try {
      const { token } = await adminLogin(email, password);
      onLogin(token);
    } catch {
      setError('Credenziali non valide.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet><title>Admin Login | Mondoisole</title></Helmet>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-brand-100 rounded-2xl flex items-center justify-center">
              <Lock size={28} className="text-brand-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Area Riservata</h1>
            <p className="text-gray-500 text-sm mt-1">Pannello gestione Mondoisole</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-error bg-red-50 p-3 rounded-lg">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold py-3 rounded-xl hover:bg-brand-700 disabled:opacity-60 transition-colors"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : 'Accedi'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
