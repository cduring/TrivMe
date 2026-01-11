import { useGetPlayers } from "../hooks/usePlayer";
import Spinner from "../pages/Spinner";
import Error from "./Error";
import { usePlayerContext } from "../contexts/PlayerContext";
import { useUpdateSession, useDeleteSession } from "../hooks/useSession";
import { useNavigate } from "react-router";
import Modal from "./Modal";
import ConfirmAction from "./ConfirmAction";

export default function WaitingRoom({ game, gameSession }) {
  const { title, gameType, description } = game;
  const { sessionCode, id: sessionId } = gameSession;
  const { currentPlayer, clearPlayer } = usePlayerContext(); // to be used later, should not be null
  const {
    players: gamePlayers,
    isLoadingPlayers,
    error: playersError,
  } = useGetPlayers(sessionId);
  const { updateSession, isUpdating } = useUpdateSession();
  const { deleteSession, isDeleting } = useDeleteSession();
  const navigate = useNavigate();

  if (isLoadingPlayers || isUpdating)
    return <Spinner />;
  if (playersError) return <Error message="player error" />;

  const isHostingId = localStorage.getItem("isHostingId");
  const isHost = isHostingId ? JSON.parse(isHostingId) === sessionId : false;

  function handleStartGame() {
    updateSession({ id: sessionId, updates: { status: "active" } });
  }

  function handleEndGame() {
    deleteSession(sessionId, {
      onSuccess: () => {
        navigate("/");
      },
    });
  }

  return (
    <Modal>
      <div className="w-full h-full flex flex-col items-center gap-4 relative">
        <div className="w-full px-6 py-4 rounded-xl bg-purple-800 flex flex-col md:flex-row md:justify-center md:gap-80 items-center gap-4">
          <div>
            <ul className="flex flex-col items-center">
              <li className="font-bold text-2xl">{title}</li>
              <li className="font-bold">{gameType}</li>
              <li className="text-center">{description}</li>
            </ul>
          </div>
          <div className="bg-green-900 rounded-xl p-2">
            <h2 className="font-bold text-xl text-center">Session Code:</h2>
            <p className="font-bold text-center">{sessionCode}</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
          <div className="w-full px-6 py-4 rounded-xl bg-pink-600 flex flex-col items-center gap-4">
            <h2 className="font-bold text-xl text-center italic">Players</h2>
            <ul className="grid grid-cols-3 gap-2 items-center">
              {gamePlayers.map((player) => (
                <li key={player.id} className="text-center">
                  {player.nickname}
                </li>
              ))}
            </ul>
          </div>
          {isHost && (
            <div className="grid grid-cols-[2fr_1fr] w-full gap-5">
              <button
                onClick={handleStartGame}
                className="bg-green-900 rounded-xl p-2 uppercase italic cursor-pointer hover:bg-green-800 transition-colors"
              >
                Start Game
              </button>
              <Modal.Open opens="end-game">
                <button className="bg-red-900 rounded-xl p-2 uppercase italic cursor-pointer hover:bg-red-800 transition-colors">
                  End Game
                </button>
              </Modal.Open>
            </div>
          )}
        </div>
        <Modal.Window name="end-game">
          <ConfirmAction
            message="Are you sure you want to end this session? This action cannot be undone."
            disabled={isDeleting}
            onAction={handleEndGame}
          />
        </Modal.Window>
      </div>
    </Modal>
  );
}
