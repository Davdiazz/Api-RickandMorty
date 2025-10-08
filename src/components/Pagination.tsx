import { Info } from '../types/character';

interface PaginationProps {
  info: Info;
  page: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  info,
  page,
  onPrevPage,
  onNextPage,
}) => {
  // Generar array de páginas para mostrar
  const getPageNumbers = () => {
    const pages = [];
    const totalPages = info.pages;
    const currentPage = page;
    
    // Mostrar siempre la primera página
    pages.push(1);
    
    // Agregar páginas intermedias
    if (currentPage > 3) pages.push('...');
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    
    // Agregar última página
    if (currentPage < totalPages - 2) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    
    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Info de resultados */}
      <div className="text-gray-400 text-sm">
        Showing page <span className="text-white font-semibold">{page}</span> of{' '}
        <span className="text-white font-semibold">{info.pages}</span>
        {' '}({info.count} total characters)
      </div>

      {/* Botones de paginación */}
      <div className="flex items-center gap-2">
        {/* Botón Previous */}
        <button
          onClick={onPrevPage}
          disabled={!info.prev}
          className="group flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:opacity-50 text-white rounded-xl transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <svg 
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Previous</span>
        </button>

        {/* Números de página */}
        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((pageNum, index) => (
            pageNum === '...' ? (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                onClick={() => {
                  const diff = (pageNum as number) - page;
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) onNextPage();
                  } else if (diff < 0) {
                    for (let i = 0; i < Math.abs(diff); i++) onPrevPage();
                  }
                }}
                className={`min-w-[40px] h-10 rounded-lg font-medium transition-all ${
                  pageNum === page
                    ? 'bg-blue-600 text-white shadow-lg scale-110'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {pageNum}
              </button>
            )
          ))}
        </div>

        {/* Indicador mobile */}
        <div className="sm:hidden bg-gray-800 px-4 py-2.5 rounded-xl">
          <span className="text-white font-semibold">{page}</span>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-gray-400">{info.pages}</span>
        </div>

        {/* Botón Next */}
        <button
          onClick={onNextPage}
          disabled={!info.next}
          className="group flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-900 disabled:opacity-50 text-white rounded-xl transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <span className="font-medium">Next</span>
          <svg 
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Barra de progreso */}
      <div className="w-full max-w-md">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${(page / info.pages) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};