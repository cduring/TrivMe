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
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 p-4">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Game Info */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl flex flex-col justify-center gap-2">
            <h1 className="font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-white mb-1">
              {title}
            </h1>
            <div className="flex items-center gap-3 text-purple-200 font-medium">
              <span className="px-3 py-1 bg-purple-500/30 rounded-lg text-sm uppercase tracking-wider">{gameType}</span>
              <span>{description}</span>
            </div>
          </div>

          {/* Session Code */}
          {/* Session Code */}
          <div 
             className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 border border-white/10 shadow-xl flex flex-col items-center justify-center gap-2 relative overflow-hidden group cursor-pointer"
             onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/game/${sessionCode}`);
                // Optional: You could use a toast here if available, or local state to show "Copied!"
             }}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-indigo-100 uppercase text-sm font-bold tracking-widest">Session Code</span>
            <p className="text-5xl font-black text-white tracking-widest font-mono select-all">
              {sessionCode}
            </p>
            <p className="mt-2 text-indigo-200 text-xs font-mono bg-black/20 px-3 py-1 rounded-full flex items-center gap-2 group-active:scale-95 transition-transform">
               <span>{window.location.origin}/game/{sessionCode}</span>
            </p>
            <span className="text-[10px] text-white/50 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click to Copy Link</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Players List */}
          <div className="md:col-span-2 bg-black/20 backdrop-blur-md rounded-3xl p-8 border border-white/5 min-h-[400px] flex flex-col">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-4 border-b border-white/10">
              <h2 className="font-bold text-2xl uppercase tracking-wider flex items-center gap-3">
                Players
                <span className="bg-white/10 text-white text-base px-3 py-1 rounded-full font-mono">
                  {gamePlayers.length}
                </span>
              </h2>
              <EditName sessionId={sessionId} />
            </div>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-min">
              {gamePlayers.map((player) => {
                const isCurrentUser = player.id === currentPlayer?.id;
                return (
                  <li
                    key={player.id}
                    className={`
                      relative p-4 rounded-xl flex items-center justify-between gap-3 overflow-hidden transition-all duration-300 transform hover:scale-[1.02]
                      ${isCurrentUser 
                        ? "bg-gradient-to-r from-pink-500/80 to-purple-600/80 border border-pink-400/50 shadow-lg shadow-pink-900/20" 
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }
                    `}
                  >
                    <span className={`font-bold text-lg truncate ${isCurrentUser ? "text-white" : "text-purple-100"}`}>
                      {player.nickname}
                    </span>
                    {isCurrentUser && (
                      <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-bold text-white uppercase tracking-wider">
                        You
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            
            {gamePlayers.length === 0 && (
               <div className="flex-1 flex items-center justify-center text-white/30 italic">
                 Waiting for players to join...
               </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-4">
             {isHost ? (
               <div className="flex flex-col gap-4 h-full">
                 <button
                    onClick={handleStartGame}
                    className="flex-1 bg-green-500 hover:bg-green-400 border-b-4 border-green-700 hover:border-green-600 active:border-0 active:translate-y-1 text-white rounded-3xl p-6 uppercase font-black text-2xl tracking-wide shadow-xl transition-all flex items-center justify-center gap-3"
                  >
                    Start Game 🚀
                  </button>
                  
                  <Modal.Open opens="end-game">
                    <button className="h-20 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 rounded-2xl uppercase font-bold tracking-wider transition-all">
                      End Session
                    </button>
                  </Modal.Open>
               </div>
             ) : (
                <div className="flex flex-col gap-4 h-full">
                  <div className="flex-1 bg-white/5 rounded-3xl p-6 flex items-center justify-center text-center text-purple-200 italic border border-white/10">
                    <p>Wait for the host to start the game!</p>
                  </div>
                  
                  <Modal.Open opens="leave-game">
                    <button
                      disabled={isDeletingPlayer}
                      className="h-20 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 rounded-2xl uppercase font-bold tracking-wider transition-all"
                    >
                      Leave Game
                    </button>
                  </Modal.Open>
                </div>
             )}
          </div>
        </div>

        {/* Modals */}
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
