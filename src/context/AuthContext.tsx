// context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  loginDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = getCookie('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(savedUser));
        
        // ✅ VALIDACIÓN ESTRICTA
        if (
          parsedUser && 
          typeof parsedUser === 'object' &&
          typeof parsedUser.name === 'string' && 
          typeof parsedUser.email === 'string' &&
          typeof parsedUser.loginDate === 'string'
        ) {
          console.log('✅ User loaded from cookie:', parsedUser);
          setUser(parsedUser);
        } else {
          console.error('❌ Invalid user structure:', parsedUser);
          deleteCookie('user');
        }
      } catch (error) {
        console.error('❌ Error parsing user cookie:', error);
        deleteCookie('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (name: string, email: string) => {
    // ✅ VALIDACIÓN: Solo aceptar strings
    if (typeof name !== 'string' || typeof email !== 'string') {
      console.error('❌ Login error: name and email must be strings', { name, email });
      return;
    }

    const newUser: User = {
      name: name.trim(),
      email: email.trim(),
      loginDate: new Date().toISOString(),
    };
    
    console.log('✅ Login successful:', newUser);
    
    setUser(newUser);
    setCookie('user', JSON.stringify(newUser), 7);
    
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 100);
  };

  const logout = () => {
    console.log('🚪 Logging out');
    setUser(null);
    deleteCookie('user');
    window.location.href = '/login';
  };

  // ✅ DEBUG: Loggear cada vez que user cambia
  useEffect(() => {
    console.log('👤 User state changed:', user);
    if (user) {
      console.log('  - name:', typeof user.name, user.name);
      console.log('  - email:', typeof user.email, user.email);
      console.log('  - loginDate:', typeof user.loginDate, user.loginDate);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Cookie utilities
function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = name + '=';
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
}