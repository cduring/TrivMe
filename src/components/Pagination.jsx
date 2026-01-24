export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`
            w-10 h-10 rounded-xl font-bold transition-all duration-300 flex items-center justify-center
            ${currentPage === i + 1 
              ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30 scale-110 border border-yellow-300/50' 
              : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white hover:scale-105 border border-white/5'
            }
          `}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
