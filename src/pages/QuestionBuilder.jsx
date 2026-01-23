import { useState } from "react";
import QuestionItem from "../components/QuestionItem";
import QuestionList from "../components/QuestionList";
import { useGetGame } from "../hooks/useGame";
import { useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import Spinner from "./Spinner";
import Error from "../components/Error";
import {
  useCreateQuestions,
} from "../hooks/useQuestions";
import { HiPlay } from "react-icons/hi2";
import { ImConfused2 } from "react-icons/im";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import ConfirmAction from "../components/ConfirmAction";
import { useStartGame } from "../hooks/useStartGame";

const defaultQuestions = [
  {
    text: "",
    options: ["", "", "", ""],
    answer: 0,
    points: 20,
  },
];

export default function QuestionBuilder() {
  const { gameId } = useParams();
  const { user, isAuthenticated, isLoading: isLoadingUser } = useAuth();
  const { game, isLoadingGame, error } = useGetGame(gameId);
  const { createQuestions, isCreatingQuestions } = useCreateQuestions(gameId);
  const { startGame, isStartingGame } = useStartGame();
  const [questions, setQuestions] = useState(defaultQuestions);
  const navigate = useNavigate();

  function handleQuestionChange(index, updated) {
    setQuestions((prev) => prev.map((q, i) => (i === index ? updated : q)));
  }

  function handleAddQuestion() {
    setQuestions((prev) => [
      ...prev,
      {
        text: "",
        options: ["", "", "", ""],
        answer: 0,
        points: 20,
      },
    ]);
  }

  function handleDeleteQuestion(index) {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmitQuestions() {
    const readyToSubmit = questions.reduce((acc, question) => 
      acc && question.text !== "" && question.options.every((option) => option !== "") && question.points !== 0, true);

    if (!readyToSubmit) {
      toast.error("Please fill out all fields!");
      return;
    } else if (questions.length === 0) {
      toast.error("Please add at least one question!");
      return;
    }

    const questionsToSubmit = questions.map((q) => ({ ...q, gameId, user_id: user.id }));
    createQuestions(questionsToSubmit);
    setQuestions(defaultQuestions);
  }

  if (!isAuthenticated) {
    return (
      <>
        {isLoadingUser && <Spinner />}
        <div className="h-[400px] flex flex-col font-normal justify-center items-center px-4 gap-10">
          <ImConfused2 size={200} />
          <div className="flex flex-col md:flex-row text-3xl gap-2">
            <h3 className="text-center">
              Sorry, you need to be{" "}
              <strong className="text-red-400">logged in</strong> to edit a TrivMe!
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

  if (isLoadingGame || isCreatingQuestions) return <Spinner />;
  if (error || !isAuthenticated) return <Error />;

  return (
    <div className="flex flex-col gap-8 items-center w-full max-w-5xl mx-auto px-4 py-8 pb-20">
      
      {/* Header Card */}
      <section className="w-full bg-white/5 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 shadow-2xl shadow-purple-900/20 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="space-y-2">
            <h1 className="font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-sm">
              {game?.title}
            </h1>
            <p className="font-medium text-purple-200 text-lg max-w-2xl mx-auto font-sans leading-relaxed">
              {game?.description}
            </p>
          </div>

          <Modal>
            <Modal.Open opens="play-game">
              <button className="mt-4 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-2xl font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-green-500/40 hover:-translate-y-1 transform duration-200 cursor-pointer">
                <HiPlay size={24} />
                Play Now
              </button>
            </Modal.Open>
            <Modal.Window name="play-game">
              <ConfirmAction
                message="Ready to start this game?"
                disabled={isStartingGame}
                onAction={() => startGame(gameId)}
                confirmLabel="Let's Play!"
              />
            </Modal.Window>
          </Modal>
        </div>
      </section>

      {/* Existing Questions */}
      <div className="w-full">
        <QuestionList gameId={gameId} />
      </div>

      {/* Builder Section */}
      <section className="w-full bg-indigo-950/40 backdrop-blur-md border border-indigo-500/30 rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl">
        <div className="flex flex-col items-center gap-2 pb-4 border-b border-white/10">
          <h2 className="font-bold text-2xl md:text-3xl uppercase text-center text-white tracking-wide">
            Add New Questions
          </h2>
          <p className="text-indigo-200/60 font-medium">Build your quiz question by question</p>
        </div>
        
        <div className="w-full space-y-6">
          {questions.length > 0 ? (
            questions.map((q, i) => (
              <div key={i} className="transform transition-all duration-300 hover:scale-[1.01]">
                <QuestionItem
                  question={q}
                  index={i}
                  onChange={handleQuestionChange}
                  onDelete={handleDeleteQuestion}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-black/20 rounded-2xl border border-white/5 border-dashed">
              <p className="text-indigo-200 text-lg">Start by adding a question below!</p>
            </div>
          )}
        </div>

        <section className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={handleAddQuestion}
            className="w-full md:w-auto uppercase bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-8 py-4 font-bold transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
          >
            + Add Another Question
          </button>
          
          <button
            onClick={handleSubmitQuestions}
            className="w-full md:w-auto uppercase bg-pink-600 hover:bg-pink-500 text-white rounded-xl px-8 py-4 font-bold transition-all shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:-translate-y-0.5"
          >
            Submit All Questions
          </button>
        </section>
      </section>
    </div>
  );
}


