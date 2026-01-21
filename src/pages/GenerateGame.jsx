import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGenerateGame, useCreateGame } from "../hooks/useGame";
import { useCreateQuestions } from "../hooks/useQuestions";
import { useStartGame } from "../hooks/useStartGame";
import { useAuth } from "../contexts/AuthContext";
import Modal, { ModalContext } from "../components/Modal";
import { HiSparkles } from "react-icons/hi2";

function GenerateGame() {
  const [prompt, setPrompt] = useState("");
  const { generateGame, isLoading: isGenerating } = useGenerateGame();
  const { createGame, isCreating } = useCreateGame();
  const { createQuestions, isCreatingQuestions } = useCreateQuestions();
  const { startGame, isStartingGame } = useStartGame();
  const { user } = useAuth();
  const [generatedGame, setGeneratedGame] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt) return;

    generateGame(prompt, {
      onSuccess: (data) => {
        const newGame = {
          title: data.title,
          description: data.description,
          ownerId: user?.id,
          gameType: "Trivia",
          isPrivate: false,
        };
        
        createGame(newGame, {
          onSuccess: (savedGame) => {
            // Prepare questions with gameId and ownerId
            const questions = data.questions.map(q => ({
              ...q,
              gameId: savedGame.id,
              user_id: user?.id,
              points: 20, 
            }));

            createQuestions(questions, {
              onSuccess: () => {
                setGeneratedGame({ ...savedGame, questions: questions });
                setShowPreview(true);
              }
            });
          },
        });
      },
    });
  };

  const isLoading = isGenerating || isCreating || isCreatingQuestions;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-violet-900 mb-2">
          Generate a Trivia Game with AI
        </h1>
        <p className="text-stone-600 text-lg mb-8">
          Describe the quiz you want, and let our AI build it for you in seconds.
        </p>

        <form onSubmit={handleGenerate} className="w-full space-y-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Make me a quiz about the fifth Harry Potter Book, focusing on the Department of Mysteries..."
            className="w-full h-40 p-6 rounded-2xl border-2 border-violet-100 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 text-lg resize-none shadow-sm placeholder:text-stone-400"
            disabled={isLoading}
          />
          
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading || !prompt}
            className="w-full py-4 px-8 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 text-xl shadow-lg shadow-violet-200"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Magic...
              </span>
            ) : (
              <>
                <HiSparkles className="w-6 h-6" />
                Generate Game
              </>
            )}
          </button>
        </form>
      </div>

      <Modal>
        <ModalController shouldOpen={showPreview} windowName="preview" />
        <Modal.Window name="preview">
          <GamePreview 
            game={generatedGame} 
            onPlay={() => startGame(generatedGame.id)}
            isStarting={isStartingGame}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}

function ModalController({ shouldOpen, windowName }) {
  const { open } = useContext(ModalContext);

  useEffect(() => {
    if (shouldOpen) {
      open(windowName);
    }
  }, [shouldOpen, windowName, open]);
  
  return null;
}

function GamePreview({ game, onCloseModal, onPlay, isStarting }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-[500px] max-h-[80vh]">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-violet-900">{game.title}</h2>
        <p className="text-stone-500">{game.numQuestions} Questions Generated</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-stone-50 p-4 rounded-xl space-y-3">
        {game.questions.map((q, i) => (
          <div key={i} className="bg-white p-3 rounded-lg border border-stone-100 shadow-sm">
            <p className="font-medium text-stone-800">
              <span className="text-violet-500 mr-2">{i + 1}.</span>
              {q.text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-2">
        <button
          onClick={() => navigate(`/create/${game.id}`)}
          className="flex-1 py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg transition-colors"
        >
          Edit Game
        </button>
        <button
          onClick={onPlay}
          disabled={isStarting}
          className="flex-1 py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-colors shadow-md shadow-violet-200 disabled:opacity-70"
        >
           {isStarting ? "Starting..." : "Play Now"}
        </button>
      </div>
    </div>
  );
}

export default GenerateGame;
