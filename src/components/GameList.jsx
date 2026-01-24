import { useState, useEffect } from "react";
import GameItemV2 from "./GameItemV2";
import { HiUserCircle, HiSparkles, HiOutlineFaceFrown } from "react-icons/hi2";
import Pagination from "./Pagination";

export default function GameList({ type, games }) {
  if (!games) return null;
  
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(games.length / itemsPerPage);
  
  // Reset to page 1 if games array changes (e.g. search filter)
  useEffect(() => {
    setPage(1);
  }, [games.length]);

  const displayedGames = games.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="max-w-dvw w-full flex flex-col gap-3 pb-10">
      <header className="flex items-center gap-4 mb-6 md:pl-4 transition-all hover:translate-x-2 duration-300 w-fit">
        <div className={`p-3 rounded-2xl ${type === "private" ? "bg-purple-500/20 text-purple-400" : "bg-pink-500/20 text-pink-400"}`}>
          {type === "private" ? <HiUserCircle className="text-3xl" /> : <HiSparkles className="text-3xl" />}
        </div>
        <h2 className={`border-2 text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r ${type === "private" ? "from-purple-400 to-indigo-400" : "from-pink-400 to-rose-400"} drop-shadow-sm`}>
          {type === "private" && "My TrivMes"}
          {type === "public" && "Popular TrivMes   "}
        </h2>
      </header>
      
      {games.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white/5 border border-dashed border-white/10 rounded-3xl text-center text-purple-200/40">
           <HiOutlineFaceFrown className="text-6xl mb-4 opacity-50" />
           <p className="text-xl font-bold uppercase tracking-widest mb-1">No games found</p>
           <p className="text-sm font-medium tracking-wide">
             {type === "private" ? "You haven't created any games yet!" : "Try searching for something else."}
           </p>
        </div>
      ) : (
        <>
          <section className="grid md:grid-cols-3 gap-3 w-full">
            {displayedGames.map((game) => (
              <GameItemV2 key={game.id} game={game} />
            ))}
          </section>
          
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={(p) => setPage(p)} 
          />
        </>
      )}
    </div>
  );
}
