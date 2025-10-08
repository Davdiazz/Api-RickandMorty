'use client';

import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  onToggleProfile: () => void;
  showProfile: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleProfile, showProfile }) => {
  const { user } = useAuth();

  // Si no hay usuario, no muestra el header
  if (!user) return null;

  // Genera el mismo color que en el perfil
  const getAvatarColor = (name: string) => {
    const colors = [
      'from-blue-600 to-purple-600',
      'from-green-600 to-teal-600',
      'from-pink-600 to-rose-600',
      'from-orange-600 to-red-600',
      'from-indigo-600 to-blue-600',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-6 border-b border-gray-700">
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-1">
          The Rick and Morty API
        </h1>
        <p className="text-gray-400 text-sm">
          Explore the multiverse of characters
        </p>
      </div>

      <button
        onClick={onToggleProfile}
        className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all shadow-lg ${
          showProfile
            ? 'bg-blue-600 hover:bg-blue-700 ring-2 ring-blue-400'
            : 'bg-gray-800 hover:bg-gray-700'
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-11 h-11 bg-gradient-to-br ${getAvatarColor(
            user.name
          )} rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20`}
        >
          <span className="text-lg font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="text-left">
          <p className="text-white font-semibold text-sm leading-tight">{user.name}</p>
          <p className="text-gray-300 text-xs leading-tight">
            {showProfile ? 'Hide Profile' : 'View Profile'}
          </p>
        </div>

        <svg
          className={`w-5 h-5 text-white transition-transform duration-300 ${
            showProfile ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};