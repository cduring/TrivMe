import { HiPlay, HiPencilSquare, HiCommandLine } from "react-icons/hi2";
import { formatDesc } from "../utils/stringHelpers";
import Modal from "./Modal";
import ConfirmAction from "./ConfirmAction";
import { useStartGame } from "../hooks/useStartGame";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function GameItemV2({ game }) {
  const { startGame, isStartingGame } = useStartGame();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { id: gameId, title, category, description, ownerId } = game;
  const isOwned = isAuthenticated && ownerId === user?.id;

  function handleEdit() {
    navigate(`/create/${gameId}`);
  }

  return (
    <Modal>
      <div className="group relative w-full h-full min-h-[220px] flex flex-col justify-between bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30">
        
        {/* Dynamic Background Gradient Blob */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-colors duration-500" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500" />

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-extrabold text-2xl text-white leading-tight break-words line-clamp-2">
              {title}
            </h3>
            <span className="shrink-0 px-2 py-1 rounded-lg bg-white/10 border border-white/5 text-xs font-bold uppercase tracking-wider text-purple-200">
              {category}
            </span>
          </div>
          
          <p className="text-purple-200/80 text-sm font-medium leading-relaxed line-clamp-3">
            {description || "No description provided."}
          </p>
        </div>

        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="flex-1">
             <Modal.Open opens={`start-game-${gameId}`}>
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white py-3 px-4 rounded-xl font-bold uppercase tracking-wide text-sm shadow-lg shadow-green-900/20 transition-all duration-200 flex items-center justify-center gap-2 group-hover:translate-y-0">
                Play <HiPlay className="text-lg" />
              </button>
            </Modal.Open>
          </div>

          {isOwned && (
            <button 
              onClick={handleEdit}
              className="p-3 bg-white/5 hover:bg-white/10 text-pink-300 hover:text-white rounded-xl border border-white/5 hover:border-pink-500/30 transition-all duration-200 group/edit"
              title="Edit Game"
            >
              <HiPencilSquare className="text-xl group-hover/edit:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </div>

      <Modal.Window name={`start-game-${gameId}`}>
        <ConfirmAction
          message={`Ready to play "${title}"?`}
          disabled={isStartingGame}
          onAction={() => startGame(gameId)}
          confirmLabel="Let's Go!"
        />
      </Modal.Window>
    </Modal>
  );
}
