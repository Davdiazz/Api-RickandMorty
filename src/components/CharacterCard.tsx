import { Character } from '../types/character';

interface CharacterCardProps {
  character: Character;
  onViewDetails: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onViewDetails }) => {
  const getStatusColor = (status: Character['status']): string => {
    switch (status) {
      case 'Alive':
        return 'bg-green-500';
      case 'Dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer" onClick={() => onViewDetails(character)}>
      {/* Imagen */}
      <div className="flex-shrink-0">
        <img
          src={character.image}
          alt={character.name}
          className="w-48 h-48 object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {character.name}
          </h2>
          
          <div className="flex items-center mb-3">
            <span className={`w-2 h-2 rounded-full ${getStatusColor(character.status)} mr-2`}></span>
            <span className="text-white text-sm">
              {character.status} - {character.species}
            </span>
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-gray-400 text-xs">Last known location:</p>
              <p className="text-white text-sm">{character.location.name}</p>
            </div>
            
            <div>
              <p className="text-gray-400 text-xs">First seen in:</p>
              <p className="text-white text-sm">
                {character.episode.length > 0 
                  ? `Episode ${character.episode[0].id}` 
                  : 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};