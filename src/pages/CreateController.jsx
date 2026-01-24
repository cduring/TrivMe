import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import GenerateGame from "./GenerateGame";
import Create from "./Create";
import { HiSparkles, HiPencilSquare } from "react-icons/hi2";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { ImConfused2 } from "react-icons/im";

function CreateController() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("generate"); // "generate" or "create"
  const { isLoading: isLoadingUser, isAuthenticated } = useAuth();

  if (isLoadingUser) return <Spinner />;

  if (!isAuthenticated) {
    return (
      <>
        {isLoadingUser && <Spinner />}
        <style>{`
          @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.15); opacity: 1; }
          }
        `}</style>
        <div className="h-[400px] flex flex-col font-normal justify-center items-center px-4 gap-10">
          <div className="animate-[spin_10s_linear_infinite]">
            <ImConfused2 size={200} className="text-purple-300" style={{ animation: 'breathe 3s ease-in-out infinite' }} />
          </div>
          <div className="flex flex-col text-3xl gap-2">
            <h3 className="text-center">
              Sorry, you need to be{" "}
              <strong className="text-red-400">logged in</strong> to create a
              new TrivMe!
              <br />
            </h3>
            <button
              className="font-semibold underline hover:text-red-500 transition-colors duration-150 ease-in-out cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log in here.
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-8 px-4 gap-8">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 text-center animate-pulse">
        {mode === "generate"
          ? "Generate your own Game with AI"
          : "Build your own Trivia Game"}
      </h1>

      {/* Toggle Switch */}
      <div className="flex bg-purple-900/50 p-1 rounded-full border border-purple-700/50 shadow-inner">
        <button
          onClick={() => setMode("generate")}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300
            ${
              mode === "generate"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30 scale-105"
                : "text-purple-300 hover:text-white hover:bg-white/5"
            }
          `}
        >
          <HiSparkles className={mode === "generate" ? "animate-pulse" : ""} />
          Generate with AI
        </button>
        <button
          onClick={() => setMode("create")}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300
            ${
              mode === "create"
                ? "bg-pink-600 text-white shadow-lg shadow-pink-500/30 scale-105"
                : "text-purple-300 hover:text-white hover:bg-white/5"
            }
          `}
        >
          <HiPencilSquare />
          Build Manually
        </button>
      </div>

      {/* Content Area */}
      <div className="w-full transition-all duration-500 ease-in-out">
        {mode === "generate" ? (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <GenerateGame />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <Create />
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateController;
