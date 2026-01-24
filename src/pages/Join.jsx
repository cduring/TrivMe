import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import { getSession } from "../services/apiSession";

function Join() {
  const [sessionCode, setSessionCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  async function handleJoin() {
    if (!sessionCode) return;
    if (sessionCode.length !== 6) {
      toast.error("Session code must be 6 characters");
      return;
    }
    setIsSearching(true);
    try {
      const session = await getSession(sessionCode);
      if (!session) {
        toast.error("Session not found");
        setIsSearching(false);
        return;
      }
    } catch (error) {
      toast.error("Session not found");
      setIsSearching(false);
      return;
    }
    navigate(`/game/${sessionCode}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {isSearching && <Spinner />}
      <div className="w-full max-w-md bg-violet-600/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl shadow-violet-900/50 border border-violet-400 text-center space-y-8 transform transition-all hover:scale-[1.01]">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Join a Game
          </h1>
          <p className="text-violet-200 text-lg">
            Enter your session code to start playing!
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <input
              value={sessionCode}
              onChange={(e) => setSessionCode(e.target.value)}
              placeholder="123456"
              className="w-full py-4 text-center text-3xl font-bold tracking-[0.2em] rounded-2xl bg-violet-900/50 border-2 border-violet-400 text-white placeholder:text-violet-400/50 placeholder:tracking-normal focus:border-pink-400 focus:ring-4 focus:ring-pink-400/30 transition-all duration-300 outline-none uppercase shadow-inner"
              maxLength={6}
            />
          </div>

          <button
            onClick={handleJoin}
            disabled={isSearching}
            className="w-full py-4 px-8 bg-green-800 hover:bg-green-400 disabled:bg-green-950 disabled:text-green-300 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-500/30 text-xl flex items-center justify-center gap-3"
          >
            {isSearching ? "Checking..." : "Enter Lobby 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Join;
