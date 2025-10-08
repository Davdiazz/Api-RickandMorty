'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 📝 TIPOS: Define la estructura de datos del usuario
export interface User {
  name: string;
  email: string;
  loginDate: string;
}

// 📝 TIPOS: Define qué funciones y datos estarán disponibles en el context
interface AuthContextType {
  user: User | null;              // Usuario actual (null si no está logueado)
  login: (userData: Omit<User, 'loginDate'>) => void;  // Función para hacer login
  logout: () => void;             // Función para hacer logout
  isLoading: boolean;             // Estado de carga inicial
}

// Creamos el contexto (inicialmente undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🎯 PROVIDER: Componente que envuelve la app y provee el estado de autenticación
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ⚡ EFECTO: Se ejecuta al montar el componente
  // Verifica si hay un usuario guardado en sessionStorage
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        sessionStorage.removeItem('user');
      }
    }
    setIsLoading(false); // Terminó de cargar
  }, []);

  // 🔐 FUNCIÓN LOGIN: Guarda el usuario en estado y sessionStorage
  const login = (userData: Omit<User, 'loginDate'>) => {
    const newUser: User = {
      ...userData,
      loginDate: new Date().toISOString(), // Guarda la fecha actual
    };
    setUser(newUser);
    sessionStorage.setItem('user', JSON.stringify(newUser));
  };

  // 🚪 FUNCIÓN LOGOUT: Limpia el usuario del estado y sessionStorage
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  // Provee estos valores a todos los componentes hijos
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 🪝 HOOK PERSONALIZADO: Facilita el uso del contexto
// Lanza error si se usa fuera del Provider
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}