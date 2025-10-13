'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useAuthStore } from '../app/store/authStore';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const [formUsername, setFormUsername] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedUsername = formUsername.trim();
    const trimmedEmail = formEmail.trim();
    const trimmedPassword = formPassword.trim();

    if (trimmedUsername && trimmedEmail && trimmedPassword) {
      console.log("✅ Ejecutando login con:", formUsername, formEmail);
      login({
        username: trimmedUsername,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      // Limpia los campos
      setFormUsername('');
      setFormEmail('');
      setFormPassword('');

      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🛸</div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to Rick & Morty Portal
          </h1>
          <p className="text-gray-400">
            Please enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              👤 Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formUsername}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormUsername(e.target.value)
              }
              placeholder="Enter your username"
              required
              autoComplete="username"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              📧 Email Address
            </label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              value={formEmail}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormEmail(e.target.value)
              }
              placeholder="Enter your email"
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="userPassword"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              🔒 Password
            </label>
            <input
              id="userPassword"
              name="userPassword"
              type="password"
              value={formPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormPassword(e.target.value)
              }
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={
              !formUsername.trim() ||
              !formEmail.trim() ||
              !formPassword.trim()
            }
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <span>🚀</span>
            <span>Enter Portal</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Get schwifty and explore the multiverse! 🌌
          </p>
        </div>
      </div>
    </div>
  );
};
