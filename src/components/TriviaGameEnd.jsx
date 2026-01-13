
import { useNavigate } from "react-router";
import { useGetPlayers } from "../hooks/usePlayer";
import { useUpdateSession, useDeleteSession } from "../hooks/useSession";
import Modal from "./Modal";
import ConfirmAction from "./ConfirmAction";
import Spinner from "../pages/Spinner";
import Error from "./Error";

export default function TriviaGameEnd({ game, session }) {
  const { title } = game; // removed gameType, description as they weren't used in the design explicitly, can add back if needed
  const { sessionCode, id: sessionId } = session;
  const navigate = useNavigate();

  const {
    players,
    isLoadingPlayers,
    error: playersError,
  } = useGetPlayers(sessionId);

  const { updateSession, isUpdating } = useUpdateSession();
  const { deleteSession, isDeleting } = useDeleteSession();

  if (isLoadingPlayers || isUpdating) return <Spinner />;
  if (playersError) return <Error message="Error loading players" />;

  // Sort players by score (descending)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  // Determine winners/ties
  const highestScore = sortedPlayers.length > 0 ? sortedPlayers[0].score : 0;
  const winners = sortedPlayers.filter(p => p.score === highestScore);
  const isTie = winners.length > 1;

  const isHostingId = localStorage.getItem("isHostingId");
  const isHost = isHostingId ? JSON.parse(isHostingId) === sessionId : false;

  function handlePlayAgain() {
    // TODO: Reset player scores
    // TODO: Delete previous answers
    updateSession({ id: sessionId, updates: { status: "waiting" } });
  }

  function handleEndGame() {
    deleteSession(sessionId, {
      onSuccess: () => {
        navigate("/");
      },
    });
  }

  function handleLeaveGame() {
    // TODO: Implement leave game logic for players
    // For now, maybe just navigate home? User said "okay if this button does not do anything"
    // navigate("/"); 
  }

  return (
    <Modal>
      <div className="w-full h-full flex flex-col items-center gap-6 p-4 overflow-y-auto">
        {/* Title Section */}
        <div className="w-full max-w-4xl px-8 py-6 rounded-2xl bg-gradient-to-r from-purple-800 to-indigo-900 shadow-xl flex flex-col items-center gap-2 border border-white/10">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-200 uppercase tracking-wider drop-shadow-lg text-center">
            {title}
          </h1>
          <h2 className="text-2xl font-bold text-white/90 tracking-widest uppercase">
            Game Over
          </h2>
        </div>

        {/* Winner Announcement */}
        {sortedPlayers.length > 0 && (
          <div className="animate-bounce mt-4">
            {isTie ? (
               <h3 className="text-4xl font-extrabold text-blue-300 drop-shadow-[0_0_10px_rgba(147,197,253,0.5)] text-center uppercase">
                🤝 It's a Tie! 🤝
               </h3>
            ) : (
               <h3 className="text-4xl font-extrabold text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)] text-center">
                🏆 {winners[0].nickname} wins! 🏆
               </h3>
            )}
          </div>
        )}

        {/* Leaderboard */}
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/5">
          <h3 className="text-2xl font-bold text-white mb-6 text-center uppercase tracking-widest border-b border-white/10 pb-4">
            Leaderboard
          </h3>
          <ul className="flex flex-col gap-3">
            {sortedPlayers.map((player, index) => {
              const isWinner = player.score === highestScore;
              
              let listStyle = "bg-white/5 hover:bg-white/10 border-transparent";
              let rankColor = "text-gray-400";
              let nameColor = "text-gray-200";
              let scoreColor = "text-pink-400";

              if (isWinner) {
                if (isTie) {
                    // Tie Winner Styling
                    listStyle = "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/50 scale-105 shadow-lg shadow-blue-500/10";
                    rankColor = "text-blue-300";
                    nameColor = "text-white scale-105";
                    scoreColor = "text-blue-300";
                } else {
                    // Sole Winner Styling
                    listStyle = "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50 scale-105 shadow-lg shadow-yellow-500/10";
                    rankColor = "text-yellow-400";
                    nameColor = "text-white scale-110";
                    scoreColor = "text-yellow-400";
                }
              }

              return (
                <li
                  key={player.id}
                  className={`flex justify-between items-center p-4 rounded-xl transition-all duration-300 border ${listStyle}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono font-bold text-xl ${rankColor}`}>
                      #{index + 1}
                    </span>
                    <span className={`font-semibold text-lg ${nameColor}`}>
                      {player.nickname}
                    </span>
                  </div>
                  <span className={`font-bold font-mono text-xl ${scoreColor}`}>
                    {player.score} pts
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Actions */}
        <div className="w-full max-w-md flex flex-col gap-4 mt-4">
          {isHost ? (
            <>
              <button
                onClick={handlePlayAgain}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-xl shadow-lg hover:shadow-green-500/30 hover:-translate-y-1 transition-all duration-200 uppercase tracking-wide"
              >
                Play Again
              </button>
              
              <Modal.Open opens="end-game-confirmation">
                <button className="w-full py-3 bg-white/10 text-red-400 border border-red-500/30 rounded-xl font-bold text-lg hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-200 uppercase tracking-wide">
                  End Game
                </button>
              </Modal.Open>
            </>
          ) : (
            <button
               onClick={handleLeaveGame}
               className="w-full py-4 bg-gray-700 text-gray-300 rounded-xl font-bold text-xl hover:bg-gray-600 transition-all duration-200 uppercase tracking-wide cursor-not-allowed opacity-75"
            >
              Leave Game (Coming Soon)
            </button>
          )}
        </div>

        {/* Modals */}
        <Modal.Window name="end-game-confirmation">
          <ConfirmAction
            message="Are you sure you want to completely end this game session for everyone?"
            disabled={isDeleting}
            onAction={handleEndGame}
          />
        </Modal.Window>
      </div>
    </Modal>
  );
}