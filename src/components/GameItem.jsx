import { HiPlay, HiOutlinePuzzlePiece } from "react-icons/hi2";
import { formatDesc } from "../utils/stringHelpers";
import Modal from "./Modal";
import ConfirmAction from "./ConfirmAction";
import { useStartGame } from "../hooks/useStartGame";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function GameItem({ game }) {
  const { startGame, isStartingGame } = useStartGame(game.id);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { id: gameId, title, gameType, description, ownerId } = game;
  const isOwned = isAuthenticated && ownerId === user.id;

  function handleEdit() {
    navigate(`/create/${gameId}`);
  }

  return (
    <Modal>
      <div className="w-full flex justify-between items-start border-2 rounded-2xl px-3 py-2 transition-transform duration-200 ease-in-out hover:-translate-y-[3px] min-h-[120px]">
        <div className="flex-1 min-w-0 pr-3 items-center justify-center">
          <ul className="space-y-1 items-center justify-center">
            <li className="font-bold text-lg truncate">{title}</li>
            <li className="text-sm text-gray-300">{gameType}</li>
            <li className="italic text-pink-300 text-sm break-words">
              {formatDesc(description, 60)}
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0 h-full">
          <span className="*:fill-purple-100 *:text-5xl">
            <HiOutlinePuzzlePiece />
          </span>
          <Modal.Open opens={`start-game-${gameId}`}>
            <button className="rounded-xl bg-purple-800 text-pink-600 px-2 py-1 flex items-center gap-1 italic transition-all duration-200 ease-in-out hover:-translate-y-[2px] hover:bg-green-600 hover:text-purple-50 cursor-pointer text-sm">
              PLAY <HiPlay />
            </button>
          </Modal.Open>
          {isOwned && (
            <button onClick={handleEdit} className="rounded-xl bg-purple-800 text-pink-600 px-2 py-1 flex items-center gap-1 italic transition-all duration-200 ease-in-out hover:-translate-y-[2px] hover:bg-green-600 hover:text-purple-50 cursor-pointer text-sm">
                EDIT <HiPlay />
              </button>
          )}
        </div>
      </div>
      <Modal.Window name={`start-game-${gameId}`}>
        <ConfirmAction
          message="Would like like to start a new TrivMe?"
          disabled={isStartingGame}
          onAction={startGame}
        />
      </Modal.Window>
    </Modal>
  );
}
