import WaitingRoom from "../components/WaitingRoom";
import TriviaGame from "./TriviaGame";
import TriviaGameEnd from "../components/TriviaGameEnd";
import { useParams } from "react-router";
import { useGetSession } from "../hooks/useSession";
import { useGetGame } from "../hooks/useGame";
import { useCreatePlayer } from "../hooks/usePlayer";
import { usePlayerContext } from "../contexts/PlayerContext";
import Spinner from "./Spinner";
import Error from "../components/Error";

function GameController() {
  const { sessionCode } = useParams();
  const {
    session,
    isLoadingSession,
    error: sessionError,
  } = useGetSession(sessionCode);
  const { createPlayer, isCreatingPlayer } = useCreatePlayer(session?.id);
  const {
    game,
    isLoadingGame,
    error: gameError,
  } = useGetGame(session?.gameId, {
    enabled: !!session?.gameId,
  });

  const { currentPlayer, clearPlayer } = usePlayerContext();
  
  if (isLoadingSession) return <Spinner />;
  if (sessionError) return <Error message="Session not found" />;
  if (isLoadingGame || isCreatingPlayer) return <Spinner />;
  if (gameError) return <Error message="Game not found" />;

  if (!currentPlayer || currentPlayer?.sessionId !== session?.id) {
    clearPlayer();
    const playerObj = { sessionId: session?.id, score: 0 };
    createPlayer(playerObj);
  }

  const { status } = session;

  if (status === "waiting") {
    return <WaitingRoom game={game} gameSession={session} />;
  } else if (status === "active") {
    return <TriviaGame game={game} session={session} />;
  } else if (status === "finished") {
    return <TriviaGameEnd game={game} session={session} />;
  } else {
    return <Error message="Session state not recognized" />;
  }

}

export default GameController;
