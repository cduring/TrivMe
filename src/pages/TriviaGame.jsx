import React, { useState, useEffect } from "react";

const player = {
  id: 1,
  nickname: "SneakySnake",
  score: 0,
  // if this were a guest player we would also need the session id and user id
};

const gameAnswers = [
  {
    id: 1,
    sessionId: 1,
    userId: 1,
    // questionId: 1,
    isCorrect: true,
  },
  {
    id: 2,
    sessionId: 1,
    userId: 2,
    // questionId: 1,
    isCorrect: false,
  },
  {
    id: 2,
    sessionId: 1,
    userId: 3,
    // questionId: 1,
    isCorrect: true,
  },
];

const tempQuestions = [
  {
    questionId: 1,
    questionNum: 1,
    text: "What are the names of Harry's parents?",
    options: [
      "James & Lily",
      "Tom & Martha",
      "Severus & Eileen",
      "Ron & Hermoine",
    ],
    answer: 0,
    points: 20,
  },
  {
    questionId: 2,
    questionNum: 2,
    text: "What's the name of the third book?",
    options: [
      "Prisoner of Azkaban",
      "Order of The Pheonix",
      "Half Blood Prince",
      "Cursed Child",
    ],
    answer: 0,
    points: 20,
  },
  {
    questionId: 3,
    questionNum: 3,
    text: "Who is Harry's uncle?",
    options: [
      "Remus Lupin",
      "Sirius Black",
      "Severus Snape",
      "Albus Dumbledore",
    ],
    answer: 1,
    points: 20,
  },
  {
    questionId: 4,
    questionNum: 4,
    text: "What position did Harry play in Quidditch?",
    options: ["Seeker", "Batter", "Keeper", "Snitch"],
    answer: 0,
    points: 20,
  },
];

let tempGameSession = {
  id: 1,
  hostId: 1,
  gameId: 1,
  sessionCode: 123456,
  status: "active",
  currentQuestionId: 1,
  currentQuestionStart: "2025-08-26T16:53:00Z",
  questionDuration: 20, // seconds
};

const tempGame = {
  id: 1,
  ownerId: 1,
  title: "Harry Potter Trivia",
  gameType: "Trivia",
  description:
    "Answer some general trivia questions about everyone's favourite Wizarding franchise!",
  isPrivate: false,
};

export default function TriviaGame() {
  const [gameSession, setGameSession] = useState(tempGameSession);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);

  // Get current question based on currentQuestionId
  const currentQuestion = tempQuestions.find(
    (q) => q.questionId === gameSession.currentQuestionId
  );

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const startTime = new Date(gameSession.currentQuestionStart).getTime();
      const elapsed = Math.floor((now - startTime) / 1000);
      const remaining = Math.max(0, gameSession.questionDuration - elapsed);
      setTimeRemaining(remaining);

      if (remaining === 0 && !showAnswers) {
        setShowAnswers(true);
      }
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [
    gameSession.currentQuestionStart,
    gameSession.questionDuration,
    showAnswers,
  ]);

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    if (!isAnswerLocked && timeRemaining > 0) {
      setSelectedAnswer(answerIndex);
      setIsAnswerLocked(true);
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    const nextQuestionId = gameSession.currentQuestionId + 1;
    const now = new Date().toISOString();

    setGameSession((prev) => ({
      ...prev,
      currentQuestionId: nextQuestionId,
      currentQuestionStart: now,
    }));

    // Reset state for new question
    setSelectedAnswer(null);
    setIsAnswerLocked(false);
    setShowAnswers(false);
  };

  return (
    <div className="trivia-game">
      <div className="game-header">
        <h1>{tempGame.title}</h1>
        <div className="question-info">
          <h2>Question {currentQuestion?.questionNum}</h2>
          <div className="time-remaining">Time: {timeRemaining}s</div>
        </div>
      </div>

      <div className="question-section">
        <h3 className="question-text">{currentQuestion?.text}</h3>
      </div>

      {!showAnswers ? (
        <div className="answers-section">
          <h4>Select your answer:</h4>
          <div className="answers-list">
            {currentQuestion?.options.map((option, index) => (
              <button
                key={index}
                className={`answer-option ${
                  selectedAnswer === index ? "selected" : ""
                } ${isAnswerLocked ? "locked" : ""}`}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswerLocked}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="results-section">
          <h4>Results:</h4>
          <div className="game-answers">
            {gameAnswers.map((answer, index) => (
              <div
                key={index}
                className={`answer-result ${
                  answer.isCorrect ? "correct" : "incorrect"
                }`}
              >
                Player {answer.userId}:{" "}
                {answer.isCorrect ? "Correct" : "Incorrect"}
              </div>
            ))}
          </div>

          {player.id === gameSession.hostId && (
            <button className="next-question-btn" onClick={handleNextQuestion}>
              Next Question
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        .trivia-game {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .game-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .game-header h1 {
          color: #333;
          margin-bottom: 20px;
        }

        .question-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f5f5f5;
          padding: 15px;
          border-radius: 8px;
        }

        .question-info h2 {
          margin: 0;
          color: #555;
        }

        .time-remaining {
          font-size: 1.2em;
          font-weight: bold;
          color: ${timeRemaining <= 5 ? "#e74c3c" : "#27ae60"};
        }

        .question-section {
          margin-bottom: 30px;
        }

        .question-text {
          font-size: 1.3em;
          line-height: 1.5;
          color: #333;
          text-align: center;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .answers-section h4,
        .results-section h4 {
          color: #555;
          margin-bottom: 15px;
        }

        .answers-list {
          display: grid;
          gap: 10px;
        }

        .answer-option {
          padding: 15px 20px;
          border: 2px solid #ddd;
          border-radius: 8px;
          background: #fff;
          cursor: pointer;
          font-size: 1.1em;
          transition: all 0.2s ease;
          text-align: left;
        }

        .answer-option:hover:not(.locked) {
          border-color: #3498db;
          background: #f8f9fa;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .answer-option.selected {
          border-color: #3498db;
          background: #e3f2fd;
        }

        .answer-option.locked {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .answer-option:disabled {
          cursor: not-allowed;
        }

        .results-section {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
        }

        .game-answers {
          margin-bottom: 20px;
        }

        .answer-result {
          padding: 10px 15px;
          margin: 5px 0;
          border-radius: 5px;
          font-weight: bold;
        }

        .answer-result.correct {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .answer-result.incorrect {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .next-question-btn {
          background: #28a745;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 5px;
          font-size: 1.1em;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .next-question-btn:hover {
          background: #218838;
        }
      `}</style>
    </div>
  );
}
