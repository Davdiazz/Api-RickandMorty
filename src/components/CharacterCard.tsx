// components/CharacterCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Character } from '@/types/character';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const router = useRouter();

  const getStatusColor = (status: Character['status']): string => {
    switch (status) {
      case 'Alive':
        return 'bg-green-500 shadow-green-500/50';
      case 'Dead':
        return 'bg-red-500 shadow-red-500/50';
      default:
        return 'bg-gray-500 shadow-gray-500/50';
    }
  };

  const handleClick = () => {
    router.push(`/character/${character.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-blue-500/50 transform hover:scale-[1.02]"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Imagen */}
        <div className="relative flex-shrink-0 overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="w-full sm:w-56 h-56 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-blue-400 font-bold text-sm">#{character.id}</span>
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
              {character.name}
            </h2>
            
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${getStatusColor(character.status)} animate-pulse shadow-lg`} />
              <span className="text-gray-300 text-sm font-medium">
                {character.status}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400 text-sm">{character.species}</span>
            </div>

            <div className="space-y-2 pt-2">
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                  📍 Last Location
                </p>
                <p className="text-white text-sm font-medium line-clamp-1">
                  {character.location.name}
                </p>
              </div>
              
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                  🎬 First Appearance
                </p>
                <p className="text-white text-sm font-medium">
                  {character.episode.length > 0 
                    ? `Episode ${character.episode[0].id}` 
                    : 'Unknown'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>📺</span>
              <span>{character.episode.length} episodes</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400 font-medium text-sm group-hover:gap-3 transition-all">
              <span>View Details</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}