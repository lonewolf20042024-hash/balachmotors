import React from 'react';
import { useAuth } from './hooks/useAuth';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import PublicSite from './components/PublicSite';

function App() {
  const { user, loading } = useAuth();
  const isAdmin = window.location.pathname.startsWith('/admin');

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (isAdmin) {
    return user ? <AdminDashboard /> : <AdminLogin />;
  }

  return (
    <PublicSite />
  );
}

export default App;