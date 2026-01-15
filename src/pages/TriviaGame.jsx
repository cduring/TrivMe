import { useState, useEffect } from "react";
import { usePlayerContext } from "../contexts/PlayerContext";
import { useGetQuestions } from "../hooks/useQuestions";
import { useUpdateSession } from "../hooks/useSession";
import { useCreateAnswer, useGetAnswers } from "../hooks/useAnswers";
import Spinner from "./Spinner";
import Error from "../components/Error";
import TriviaGameTimer from "../components/TriviaGameTimer";
import TriviaQuestionDisplay from "../components/TriviaQuestionDisplay";
import TriviaGameResults from "../components/TriviaGameResults";
import { useUpdatePlayer, useGetPlayers } from "../hooks/usePlayer";

export default function TriviaGame({ game, session }) {
  const { currentPlayer } = usePlayerContext();
  const { questions, isLoadingQuestions, error: questionsError } = useGetQuestions(game.id);
  const { updateSession } = useUpdateSession();
  const { createAnswer } = useCreateAnswer();
  const { answers: gameAnswers, isLoadingAnswers } = useGetAnswers(session.id);
  const { updatePlayer } = useUpdatePlayer(session.id);
  const { players } = useGetPlayers(session.id);
  
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  
  const currentQuestionId = session.currentQuestionId;
  const currentQuestion = currentQuestionId ? questions?.find((q) => q.id === currentQuestionId) : null;
  const questionIndex = currentQuestionId ? questions?.findIndex((q) => q.id === currentQuestionId) : null;
  const isLastQuestion = questions ? questionIndex === questions.length - 1 : false;


  const isHostingId = localStorage.getItem("isHostingId");
  const isHost = isHostingId ? JSON.parse(isHostingId) === session.id : false;

  const handleNextQuestion = () => {
    if (!questions) return;
    
    let nextQuestionIndex;
    if (!currentQuestion) {
     nextQuestionIndex = 0;
    } else {
     nextQuestionIndex = questionIndex + 1;
    }
  
    if (nextQuestionIndex < questions.length) {
      const nextQuestion = questions[nextQuestionIndex];
      updateSession({
        id: session.id,
        updates: {
          currentQuestionId: nextQuestion.id,
          currentQuestionStartTime: new Date().toISOString(),
        },
      });
    } else {
      // End game
      updateSession({
        id: session.id,
        updates: {
          status: "finished",
        },
      });
    }
  };

  // Timer logic
  useEffect(() => {
    if (!session.currentQuestionStartTime) return;

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const startTime = new Date(session.currentQuestionStartTime).getTime();
      const elapsed = Math.floor((now - startTime) / 1000);
      // Default 20s duration if not specified
      const duration = session.questionDuration || 20;
      const remaining = Math.max(0, duration - elapsed);
      setTimeRemaining(remaining);

      if (remaining === 0 && !showAnswers) {
        setShowAnswers(true);
      } else if (remaining > 0 && showAnswers) {
        // Reset showAnswers if we moved to next question (time > 0)
        setShowAnswers(false);
        setSelectedAnswer(null);
        setIsAnswerLocked(false);
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [session.currentQuestionStartTime, session.questionDuration, showAnswers]);

  const handleAnswerSelect = (answerIndex) => {
    if (!isAnswerLocked && timeRemaining > 0) {
      setSelectedAnswer(answerIndex);
      setIsAnswerLocked(true);

      // Submit answer
      if (currentPlayer) {
        const isCorrect = answerIndex === currentQuestion.answer;
        createAnswer({
          sessionId: session.id,
          playerId: currentPlayer.id, // Using player ID, not auth user ID
          questionId: currentQuestion.id,
          isCorrect,
          nickname: currentPlayer.nickname,
          // got rid of answer index field for now
        });
        if (isCorrect) {
          const updates = {score: currentPlayer.score + currentQuestion.points};
          updatePlayer({id: currentPlayer.id, updates});
        }
      }
    }
  };


  if (isLoadingQuestions || isLoadingAnswers) return <Spinner />;
  if (questionsError) return <Error message="Failed to load questions" />;

  if (!currentQuestion) {
    return (
      <div className="text-center p-10 text-white">
        {isHost ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-xl mb-4">Start with the first question!</p>
            <button className="next-question-btn" onClick={handleNextQuestion}>
              Start Game
            </button>
          </div>
        ) : (
          <p className="text-xl">Waiting for first question...</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto p-5 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-gray-800 text-3xl font-bold mb-5">{game.title}</h1>
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <h2 className="text-gray-600 font-bold m-0 text-xl">
             Question {questions.findIndex(q => q.id === currentQuestionId) + 1}
          </h2>
          <TriviaGameTimer timeRemaining={timeRemaining} />
        </div>
      </div>

      {!showAnswers ? (
        <TriviaQuestionDisplay
           question={currentQuestion}
           selectedAnswer={selectedAnswer}
           isAnswerLocked={isAnswerLocked}
           onAnswerSelect={handleAnswerSelect}
        />
      ) : (
        <TriviaGameResults
           question={currentQuestion}
           answers={gameAnswers}
           isHost={isHost}
           onNextQuestion={handleNextQuestion}
           players={players}
           isLastQuestion={isLastQuestion}
        />
      )}
    </div>
  );
}
