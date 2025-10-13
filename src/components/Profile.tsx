'use client';

//import { useAuth } from '@/context/AuthContext';
import { useAuthStore } from '../app/store/authStore';

export const Profile = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto border border-gray-700">
      
      <div className="space-y-6">
        {/* Avatar y datos principales */}
        <div className="flex items-center gap-6 pb-6 border-b border-gray-700">
          {/* Avatar con inicial */}
          <div
            className={`w-28 h-28 bg-gradient-to-br ${getAvatarColor(
              user.username
            )} rounded-full flex items-center justify-center shadow-xl ring-4 ring-gray-700`}
          >
            <span className="text-5xl font-bold text-white">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Información del usuario */}
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-white mb-2">{user.username}</h3>
            <p className="text-gray-400 flex items-center gap-2 text-lg">
              <span>📧</span>
              {user.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fecha de registro */}
          <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600 hover:border-gray-500 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📅</span>
              <p className="text-gray-400 text-sm font-medium">Member since</p>
            </div>
            <p className="text-white font-semibold text-xl ml-8">
              {formatDate(user.loginDate)}
            </p>
          </div>

          <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600 hover:border-gray-500 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🕐</span>
              <p className="text-gray-400 text-sm font-medium">Last login</p>
            </div>
            <p className="text-white font-semibold text-xl ml-8">
              {formatTime(user.loginDate)}
            </p>
          </div>
        </div>

        <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
            <span>ℹ️</span>
            Account Information
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-600">
              <span className="text-gray-400">Account Type:</span>
              <span className="text-white font-semibold">Standard User</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">Status:</span>
              <span className="text-green-400 font-semibold flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};