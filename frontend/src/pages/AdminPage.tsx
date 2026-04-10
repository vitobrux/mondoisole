import { useState, useEffect } from 'react';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboardPage from './AdminDashboardPage';

const TOKEN_KEY = 'mondoisole_admin_token';

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY);
    if (saved) setToken(saved);
  }, []);

  function handleLogin(t: string) {
    sessionStorage.setItem(TOKEN_KEY, t);
    setToken(t);
  }

  function handleLogout() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }

  if (!token) return <AdminLoginPage onLogin={handleLogin} />;
  return <AdminDashboardPage token={token} onLogout={handleLogout} />;
}
