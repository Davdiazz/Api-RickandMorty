import { Character } from '../types/character';

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose }) => {
  if (!character) return null;

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
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center text-xl z-10"
          >
            ✕
          </button>
          
          <div className="flex flex-col md:flex-row">
            <img
              src={character.image}
              alt={character.name}
              className="w-full md:w-80 h-80 object-cover"
            />
            
            <div className="p-6 flex-1">
              <h1 className="text-4xl font-bold text-white mb-4">
                {character.name}
              </h1>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full ${getStatusColor(character.status)} mr-2`}></span>
                  <span className="text-white">
                    {character.status} - {character.species}
                  </span>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Gender:</p>
                  <p className="text-white text-lg">{character.gender}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Type:</p>
                  <p className="text-white text-lg">{character.type || 'Unknown'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-3">Origin</h3>
              <p className="text-gray-300">{character.origin.name}</p>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-3">Last Location</h3>
              <p className="text-gray-300">{character.location.name}</p>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-3">Episodes</h3>
            <p className="text-gray-300">
              Appears in <strong className="text-white">{character.episode.length}</strong> episodes
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {character.episode.slice(0, 10).map((ep) => (
                <span key={ep.id} className="bg-gray-600 text-white px-3 py-1 rounded text-sm">
                  Episode {ep.id}
                </span>
              ))}
              {character.episode.length > 10 && (
                <span className="text-gray-400 px-3 py-1 text-sm">
                  +{character.episode.length - 10} more
                </span>
              )}
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-3">Character Info</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">ID:</p>
                <p className="text-white font-medium">#{character.id}</p>
              </div>
              <div>
                <p className="text-gray-400">Status:</p>
                <p className="text-white font-medium">{character.status}</p>
              </div>
              <div>
                <p className="text-gray-400">Species:</p>
                <p className="text-white font-medium">{character.species}</p>
              </div>
              <div>
                <p className="text-gray-400">Gender:</p>
                <p className="text-white font-medium">{character.gender}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};