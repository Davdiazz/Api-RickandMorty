'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCharacters } from '../hooks/useCharacters';
import { LoginForm } from '../components/LoginForm';
import { Header } from '../components/Header';
import { Profile } from '../components/Profile';
import { CharacterCard } from '../components/CharacterCard';
import { CharacterModal } from '../components/CharacterModal';
import { Pagination } from '../components/Pagination';
import { Character } from '../types/character';

export default function Home() {
  const { user, isLoading: authLoading } = useAuth();
  
  // Estados existentes (sin cambios)
  const { characters, page, info, loading, error, nextPage, prevPage } = useCharacters();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  
  // NUEVO: Estado para mostrar/ocultar perfil
  const [showProfile, setShowProfile] = useState(false);

  // NUEVO: Loading inicial mientras verifica autenticación
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛸</div>
          <div className="text-2xl text-white animate-pulse">Loading portal...</div>
        </div>
      </div>
    );
  }

  // NUEVO: Si no hay usuario, muestra el login
  if (!user) {
    return <LoginForm />;
  }

  // Usuario autenticado: Muestra la aplicación (tu código existente con mejoras)
  return (
    <main className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/*  NUEVO: Header con botón de perfil */}
        <Header 
          onToggleProfile={() => setShowProfile(!showProfile)}
          showProfile={showProfile}
        />

        {/*  NUEVO: Sección de perfil (se muestra/oculta) */}
        {showProfile && (
          <div className="fade-in">
            <Profile />
          </div>
        )}

        {/*  Error (sin cambios) */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6 flex items-center gap-2">
            <span>❌</span>
            <span>Error: {error}</span>
          </div>
        )}

        {/*Loading (mejorado con icono) */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-4xl mb-2">🌀</div>
              <div className="text-2xl text-white">Loading characters...</div>
            </div>
          </div>
        ) : (
          <>
            {/*Grid de personajes (sin cambios) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
              {characters.map((character) => (
                <CharacterCard 
                  key={character.id} 
                  character={character}
                  onViewDetails={setSelectedCharacter}
                />
              ))}
            </div>

            {/* Paginación (sin cambios) */}
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

        {/* 🔍 Modal de detalles (sin cambios) */}
        <CharacterModal 
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      </div>
    </main>
  );
}

