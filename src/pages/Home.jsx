import { Link } from "react-router-dom";
import Error from "../components/Error";
import GameList from "../components/GameList";
import { useAuth } from "../contexts/AuthContext";
import { useGetGames } from "../hooks/useGame";
import Spinner from "./Spinner";

function Home() {
  const { games, isLoadingGames, error: gamesError } = useGetGames();
  const {
    user,
    isAuthenticated,
    isLoading: isLoadingUser,
    error: userError,
  } = useAuth();

  const userGames = games?.filter((game) => game.ownerId === user?.id);
  const publicGames = games?.filter(
    (game) => !game?.isPrivate && game?.ownerId !== user?.id
  );

  if (isLoadingUser || isLoadingGames) return <Spinner />;
  if (gamesError) return <Error />;

  return (
    <>
      {isAuthenticated ? (
        <GameList type="private" games={userGames} />
      ) : (
        <Link
          to="/login"
          className="text-green-500 font-bold text-xl md:text-3xl py-4 pb-8 uppercase hover:underline cursor-pointer"
        >
          Login to create your own TrivMe now!
        </Link>
      )}
      <GameList type="public" games={publicGames} />
    </>
  );
}

export default Home;
