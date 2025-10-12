'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Profile } from '@/components/Profile';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        <header className="bg-gray-800 rounded-2xl shadow-2xl p-6 mb-8 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-2">
                <span>👤</span> My Profile
              </h1>
              {user && (
                <p className="text-gray-400">
                  Manage your account, <span className="text-blue-400 font-semibold">{user.name}</span>
                </p>
              )}
            </div>

            <nav className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                <span>📊</span> Dashboard
              </Link>

              <div className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2">
                <span>👤</span> Profile
              </div>

              <button
                onClick={logout}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                <span>🚪</span> Logout
              </button>
            </nav>
          </div>
        </header>

        <Profile />

      </div>
    </main>
  );
}