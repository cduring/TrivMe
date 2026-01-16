import { useGetPlayers, useDeletePlayer } from "../hooks/usePlayer";
import Spinner from "../pages/Spinner";
import Error from "./Error";
import { usePlayerContext } from "../contexts/PlayerContext";
import { useUpdateSession, useDeleteSession } from "../hooks/useSession";
import { useNavigate } from "react-router";
import Modal from "./Modal";
import ConfirmAction from "./ConfirmAction";
import EditName from "./EditName";

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
  const { deletePlayer, isDeletingPlayer } = useDeletePlayer(sessionId);
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

  function handleLeaveGame() {
    if (currentPlayer?.id) {
      deletePlayer(currentPlayer.id, {
        onSuccess: () => {
          navigate("/");
        },
      });
    }
  }

  return (
    <Modal>
      <div className="w-full h-full flex flex-col items-center gap-4 relative">
        <div className="w-full md:w-7/10 px-6 py-4 rounded-xl bg-purple-800 flex flex-col md:flex-row md:justify-center items-center gap-4">
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
        <EditName sessionId={sessionId} />
        <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
          <div className="w-full px-6 py-4 rounded-xl bg-pink-600 flex flex-col items-center gap-4 relative">
            <span className="absolute top-4 right-6 bg-pink-800 text-white font-bold px-3 py-1 rounded-full text-sm">
              {gamePlayers.length}
            </span>
            <h2 className="font-bold text-xl text-center italic">Players</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4">
              {gamePlayers.map((player) => {
                const isCurrentUser = player.id === currentPlayer?.id;
                return (
                  <li
                    key={player.id}
                    className={`
                      text-center text-lg sm:text-xl md:text-2xl font-sans tracking-wide font-medium break-words
                      transition-all duration-300 transform
                      ${
                        isCurrentUser
                          ? "font-bold text-yellow-300 scale-105 border-2 border-yellow-300/50 rounded-lg py-2 bg-white/10"
                          : "text-white"
                      }
                    `}
                  >
                    {player.nickname} {isCurrentUser && <span className="text-sm block font-sans not-italic text-yellow-200/80">(You)</span>}
                  </li>
                );
              })}
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
          {!isHost && (
            <div className="w-full">
              <Modal.Open opens="leave-game">
                <button
                  disabled={isDeletingPlayer}
                  className="w-full bg-red-900 rounded-xl p-2 uppercase italic cursor-pointer hover:bg-red-800 transition-colors"
                >
                  Leave Game
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
        <Modal.Window name="leave-game">
          <ConfirmAction
            message="Are you sure you want to leave this game?"
            disabled={isDeletingPlayer}
            onAction={handleLeaveGame}
          />
        </Modal.Window>
      </div>
    </Modal>
  );
}
