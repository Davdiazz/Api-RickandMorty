// components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export const Header = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 rounded-2xl shadow-2xl p-6 mb-8 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-2">
            <span>🛸</span> Rick & Morty Portal
          </h1>
          {/* ✅ BIEN: Accediendo a user.name */}
// ✅ CORRECTO:
<p className="text-gray-400">
  Welcome back, <span className="text-blue-400 font-semibold">{user?.name}</span>!
</p>
        </div>

        <nav className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors ${
              pathname === '/dashboard'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <span>📊</span> Dashboard
          </Link>

          <Link
            href="/profile"
            className={`px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors ${
              pathname === '/profile'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <span>👤</span> Profile
          </Link>

          <button
            onClick={logout}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
          >
            <span>🚪</span> Logout
          </button>
        </nav>
      </div>
    </header>
  );
};