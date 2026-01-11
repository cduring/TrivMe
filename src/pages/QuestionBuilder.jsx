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
  const { createQuestions, isCreatingQuestions } = useCreateQuestions();
  const { startGame, isStartingGame } = useStartGame(gameId);
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
    <div className="flex flex-col gap-3 items-center w-full md:w-4/5 px-4">
      <section className="flex flex-col items-center w-full px-4 py-6 text-pink-600 text-center gap-1">
        <h1 className="font-bold italic text-2xl md:text-4xl uppercase">
          {game?.title}
        </h1>
        <p className="font-[600]">{game?.description}</p>
        <Modal>
          <Modal.Open opens="play-game">
            <button className="mt-2 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-bold uppercase transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-150 cursor-pointer">
              <HiPlay size={24} />
              Play Now!!
            </button>
          </Modal.Open>
          <Modal.Window name="play-game">
            <ConfirmAction
              message="Ready to start this game?"
              disabled={isStartingGame}
              onAction={startGame}
              confirmLabel="Let's Play!"
            />
          </Modal.Window>
        </Modal>
      </section>
      <QuestionList gameId={gameId} />
      <section className="flex flex-col items-center w-full bg-purple-800 border-4 rounded-2xl px-4 py-6 gap-6">
        <h1 className="font-bold text-xl md:text-2xl uppercase text-center">
          Create Questions for <span className="italic font-black">{game?.title}</span>
        </h1>
        <div className="w-full space-y-4">
          {questions.length > 0 ? (
            questions.map((q, i) => (
              <QuestionItem
                key={i}
                question={q}
                index={i}
                onChange={handleQuestionChange}
                onDelete={handleDeleteQuestion}
              />
            ))
          ) : (
            <div className="text-center">
              Create some new questions now!
            </div>
          )}
        </div>
        <section className="flex flex-row items-center justify-around gap-2 md:gap-10">
        <button
          onClick={handleSubmitQuestions}
          className="uppercase bg-yellow-600 hover:bg-yellow-700 text-pink-100 rounded-xl px-6 py-2 font-semibold transition-colors cursor-pointer"
        >
          Submit Questions
        </button>
        <button
          onClick={handleAddQuestion}
          className="uppercase bg-green-600 hover:bg-green-700 rounded-xl px-6 py-2 font-semibold transition-colors cursor-pointer"
        >
          Add Question
        </button>
        <button
          className="uppercase bg-sky-600 hover:bg-sky-700 rounded-xl px-6 py-2 font-semibold transition-colors cursor-pointer"
        >
          Generate With AI
        </button>
        </section>
      </section>
    </div>
  );
}


