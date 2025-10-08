export interface Origin {
  name: string;
}

export interface Location {
  name: string;
}

export interface Episode {
  id: string;
}

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: Origin;
  location: Location;
  image: string;
  episode: Episode[];
}

export interface Info {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface CharactersResponse {
  data: {
    characters: {
      info: Info;
      results: Character[];
    };
  };
  errors?: Array<{ message: string }>;
}