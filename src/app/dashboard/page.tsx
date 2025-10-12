'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCharacters } from '@/hooks/useCharacters';
import { CharacterCard } from '@/components/CharacterCard';
import { Pagination } from '@/components/Pagination';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { characters, page, info, loading, error, nextPage, prevPage } = useCharacters();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="bg-gray-800 rounded-2xl shadow-2xl p-6 mb-8 border border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-2">
                <span>🛸</span> Rick & Morty Portal
              </h1>
              {user && (
                <p className="text-gray-400">
                  Welcome back, <span className="text-blue-400 font-semibold">{user.name}</span>!
                </p>
              )}
            </div>

            <nav className="flex flex-wrap items-center gap-3">
              <div className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 shadow-lg">
                <span>📊</span> Dashboard
              </div>

              <Link
                href="/profile"
                className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
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

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-2xl p-6 mb-6 flex items-center gap-3">
            <span className="text-3xl">❌</span>
            <div>
              <p className="text-red-400 font-semibold text-lg">Error loading characters</p>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🛸</div>
              <div className="text-2xl text-white animate-pulse">
                Loading characters from the multiverse...
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Character Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
              {characters.map((character) => (
                <CharacterCard 
                  key={character.id} 
                  character={character}
                />
              ))}
            </div>

            {/* Pagination */}
            {info && (
              <Pagination
                info={info}
                page={page}
                onPrevPage={prevPage}
                onNextPage={nextPage}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}