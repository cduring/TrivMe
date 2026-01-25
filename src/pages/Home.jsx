import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowLongRight, HiMagnifyingGlass } from "react-icons/hi2";
import Error from "../components/Error";
import GameList from "../components/GameList";
import { useAuth } from "../contexts/AuthContext";
import { useGetGames } from "../hooks/useGame";
import Spinner from "./Spinner";

import Filter from "../components/Filter";

function Home() {
  const { games, isLoadingGames, error: gamesError } = useGetGames();
  const {
    user,
    isAuthenticated,
    isLoading: isLoadingUser,
    error: userError,
  } = useAuth();
  const [category, setCategory] = useState("Any");
  
  const categories = useMemo(() => {
    return [
        "Any",
        "General Knowledge",
        "Science & Nature",
        "History",
        "Geography",
        "Entertainment",
        "Sports",
        "Art & Literature",
        "Technology",
        "Music",
        "Movies",
        "Television",
        "Politics",
        "Celebrities",
        "Animals",
        "Video Games"
    ];
  }, []);
  
  const [searchQuery, setSearchQuery] = useState("");

  const categorizedGames = useMemo(() => {
    if (!games) return [];
    if (category === "Any") return games;
    return games.filter(game => game.category === category);
  }, [games, category]);

  const queriedGames = useMemo(() => categorizedGames.filter((game) => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  ), [categorizedGames, searchQuery]);

  const userGames = useMemo(() => queriedGames?.filter((game) => game.ownerId === user?.id), [queriedGames, user]);
  const publicGames = useMemo(() => queriedGames?.filter(
    (game) => !game?.isPrivate && game?.ownerId !== user?.id
  ), [queriedGames, user]);

  if (isLoadingUser || isLoadingGames) return <Spinner />;
  if (gamesError) return <Error />;

  return (
    <>
      <div className="w-full max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-center px-4 relative z-20">
        {/* Search Bar */}
        <div className="flex-1 w-full relative group">
          <input 
            type="text" 
            placeholder="Search for a TrivMe..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-white placeholder-purple-200/50 focus:outline-none focus:bg-black/40 focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 transition-all shadow-lg font-medium"
          />
          <HiMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-300 text-xl group-focus-within:text-pink-400 transition-colors pointer-events-none" />
        </div>
        
        {/* Filter */}
        <Filter 
          items={categories}
          selected={category}
          onChange={setCategory}
        />
      </div>

      {isAuthenticated ? (
        <GameList type="private" games={userGames} />
      ) : (
        <div className="w-full bg-white/5 backdrop-blur-sm rounded-3xl p-10 mb-8 border border-white/5 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-white/10 transition-all duration-300 group shadow-lg shadow-black/20">
          <Link to="/login" className="flex flex-col items-center gap-3">
            <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm">
              Login to create your own TrivMe with AI!
            </h2>
            <div className="flex items-center gap-2 text-white/50 text-sm font-bold tracking-[0.2em] uppercase group-hover:text-green-400 transition-colors duration-300">
              Start Creating Now <HiArrowLongRight className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </Link>
        </div>
      )}

      <GameList type="public" games={publicGames} />
    </>
  );
}

export default Home;
