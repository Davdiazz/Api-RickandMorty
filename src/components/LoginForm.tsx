'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export const LoginForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '' });

  const { login } = useAuth();

  const validateForm = (): boolean => {
    const newErrors = { name: '', email: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      login({ name, email });
      // No necesitamos redirect, el layout se encarga
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-6xl">🛸</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Rick & Morty
            </h1>
            <p className="text-gray-400">Welcome to the multiverse</p>
          </div>

          {/* FORMULARIO */}
          <div className="space-y-6">
            {/* Campo Nombre */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Campo Email */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Botón Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
               Enter Portal
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs">
              No password required - just your name and email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};