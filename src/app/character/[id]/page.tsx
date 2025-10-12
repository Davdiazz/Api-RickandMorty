'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CharacterAPI } from '@/types/character';

export default function CharacterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [character, setCharacter] = useState<CharacterAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Character not found');
        }
        
        const data = await response.json();
        setCharacter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load character');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCharacter();
    }
  }, [params.id]);

  const getStatusColor = (status: CharacterAPI['status']): string => {
    switch (status) {
      case 'Alive':
        return 'bg-green-500 shadow-green-500/50';
      case 'Dead':
        return 'bg-red-500 shadow-red-500/50';
      default:
        return 'bg-gray-500 shadow-gray-500/50';
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🛸</div>
            <div className="text-2xl text-white animate-pulse">
              Loading character data...
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !character) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/20 border border-red-500 rounded-2xl p-8 text-center">
            <span className="text-6xl mb-4 block">❌</span>
            <p className="text-red-400 font-semibold text-2xl mb-4">
              {error || 'Character not found'}
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <span>←</span> Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium mb-6 border border-gray-700"
        >
          <span>←</span> Back to Dashboard
        </Link>

        {/* Character Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
          
          {/* Header with Image */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover blur-sm scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
            
            {/* Character Image Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end gap-6">
              <img
                src={character.image}
                alt={character.name}
                className="w-48 h-48 rounded-2xl border-4 border-gray-700 shadow-2xl"
              />
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                    #{character.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${getStatusColor(character.status)} animate-pulse shadow-lg`} />
                    <span className="text-gray-300 text-sm font-medium">{character.status}</span>
                  </div>
                </div>
                <h1 className="text-5xl font-bold text-white mb-2">{character.name}</h1>
                <p className="text-gray-400 text-lg">{character.species} • {character.gender}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Origin */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                  <span>🌍</span> Origin
                </p>
                <p className="text-white text-xl font-semibold">{character.origin.name}</p>
              </div>

              {/* Last Location */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                  <span>📍</span> Last Known Location
                </p>
                <p className="text-white text-xl font-semibold">{character.location.name}</p>
              </div>

              {/* Type */}
              {character.type && (
                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                  <p className="text-gray-500 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                    <span>🏷️</span> Type
                  </p>
                  <p className="text-white text-xl font-semibold">{character.type}</p>
                </div>
              )}

              {/* Episodes */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                  <span>📺</span> Episodes
                </p>
                <p className="text-white text-xl font-semibold">
                  {character.episode.length} appearances
                </p>
              </div>
            </div>

            {/* Episodes List */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🎬</span> Episode Appearances
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {character.episode.map((episodeUrl) => {
                  const episodeId = episodeUrl.split('/').pop();
                  return (
                    <div
                      key={episodeUrl}
                      className="bg-gray-800 hover:bg-gray-700 rounded-lg p-3 text-center transition-colors border border-gray-700/50"
                    >
                      <p className="text-blue-400 font-bold text-lg">E{episodeId}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Created Date */}
            <div className="text-center pt-4 border-t border-gray-700/50">
              <p className="text-gray-500 text-sm">
                Created: {new Date(character.created).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}