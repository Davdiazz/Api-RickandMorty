// components/LoginForm.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useAuth } from '@/context/AuthContext';

export const LoginForm = () => {
  const [formName, setFormName] = useState<string>('');
  const [formEmail, setFormEmail] = useState<string>('');
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const trimmedName = formName.trim();
    const trimmedEmail = formEmail.trim();
    
if (trimmedName && trimmedEmail) {
  login(trimmedName, trimmedEmail); // ✅ Solo strings
}
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormEmail(e.target.value);
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
          
          <div>
            <label 
              htmlFor="userName" 
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              👤 Full Name
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              value={formName}
              onChange={handleNameChange}
              placeholder="Enter your name"
              required
              autoComplete="name"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

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
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!formName.trim() || !formEmail.trim()}
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