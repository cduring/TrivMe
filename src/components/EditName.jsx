import { useState } from "react";
import { usePlayerContext } from "../contexts/PlayerContext";
import { useUpdatePlayer } from "../hooks/usePlayer";

import { FaCheckCircle } from "react-icons/fa";

export default function EditName({ sessionId }) {
  const { currentPlayer } = usePlayerContext();
  const { updatePlayer, isUpdating } = useUpdatePlayer(sessionId);
  const [name, setName] = useState(currentPlayer?.nickname || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !currentPlayer) return;

    updatePlayer({
      id: currentPlayer.id,
      updates: { nickname: name.trim() },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center w-full max-w-xs mt-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isUpdating}
        className="flex-1 px-4 py-3 rounded-lg text-gray-800 text-lg font-bold bg-white/90 focus:outline-none focus:ring-4 focus:ring-green-400 shadow-lg"
        placeholder="Enter nickname"
      />
      <button
        type="submit"
        disabled={isUpdating || !name.trim()}
        className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center aspect-square h-full"
      >
        <FaCheckCircle size={24} />
      </button>
    </form>
  );
}
