import { useState, useEffect } from 'react';
import { Character, Info, CharactersResponse } from '../types/character';

interface UseCharactersReturn {
  characters: Character[];
  page: number;
  info: Info | null;
  loading: boolean;
  error: string | null;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useCharacters = (): UseCharactersReturn => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [info, setInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async (pageNum: number): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://rickandmortyapi.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              characters(page: ${pageNum}) {
                info {
                  count
                  pages
                  next
                  prev
                }
                results {
                  id
                  name
                  status
                  species
                  type
                  gender
                  origin {
                    name
                  }
                  location {
                    name
                  }
                  image
                  episode {
                    id
                  }
                }
              }
            }
          `
        })
      });

      const data: CharactersResponse = await response.json();
      
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      setCharacters(data.data.characters.results);
      setInfo(data.data.characters.info);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const nextPage = (): void => {
    if (info?.next) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = (): void => {
    if (info?.prev) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    characters,
    page,
    info,
    loading,
    error,
    setPage,
    nextPage,
    prevPage,
  };
};