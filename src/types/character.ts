// src/types/character.ts

export interface Location {
  name: string;
  url?: string;
}

export interface Origin {
  name: string;
  url?: string;
}

// Tipo para episodios cuando vienen de GraphQL
export interface Episode {
  id: number;
  name?: string;
  air_date?: string;
  episode?: string;
  characters?: string[];
  url?: string;
  created?: string;
}

// ✅ Character para GraphQL (usado en Dashboard)
export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: Episode[]; // Array de objetos Episode con id
  url?: string;
  created?: string;
}

// ✅ Character para REST API (usado en página de detalles)
export interface CharacterAPI {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[]; // Array de URLs (strings)
  url: string;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

// Respuesta de GraphQL
export interface GraphQLCharactersData {
  characters: {
    info: Info;
    results: Character[];
  };
}

export interface GraphQLResponse {
  data: GraphQLCharactersData;
  errors?: Array<{ message: string }>;
}

// Respuesta de REST API
export interface CharactersResponse {
  info: Info;
  results: Character[];
}