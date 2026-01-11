import { useCreateSession } from "./useSession";
import { useNavigate } from "react-router";

export function useStartGame(gameId) {
  const { createSession, isCreating: isStartingGame } = useCreateSession();
  const navigate = useNavigate();

  function startGame() {
    const onSuccessFn = (session) => {
      localStorage.setItem("isHostingId", JSON.stringify(session.id));
      const { sessionCode: code } = session;
      navigate(`/game/${code}`);
    };

    const data = { gameId };
    createSession(data, { onSuccess: onSuccessFn });
  }

  return { startGame, isStartingGame };
}