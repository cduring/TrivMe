export default function TriviaGameResults({ 
  question, 
  answers, 
  isHost, 
  onNextQuestion,
  players,
  isLastQuestion
}) {
  // Filter answers for current question
  const currentQuestionAnswers = answers?.filter(a => a.questionId === question.id) || [];

  return (
    <div className="bg-gray-50 p-5 rounded-lg">
      <h4 className="text-gray-600 mb-4 font-medium">Results:</h4>
      <p className="text-lg text-gray-800 mb-4">
        Correct Answer: <span className="font-bold text-green-600">{question.options[question.answer]}</span>
      </p>
      
      <div className="mb-5 space-y-2">
        {currentQuestionAnswers.map((answer, index) => {
          const player = players?.find((p) => p.id === answer.playerId);
          return (
            <div
              key={index}
              className={`
              px-4 py-2 rounded font-bold border
              ${
                answer.isCorrect
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-red-100 text-red-800 border-red-200"
              }
            `}
            >
              {answer.nickname}: {answer.isCorrect ? "Correct" : "Incorrect"}
              {player && ` (Points: ${player.score})`}
            </div>
          );
        })}
      </div>

      {isHost && (
        <button 
          className="bg-green-600 text-white border-0 px-6 py-3 rounded text-lg cursor-pointer hover:bg-green-700 transition-colors w-full md:w-auto"
          onClick={onNextQuestion}
        >
          {isLastQuestion ? "See Final Results" : "Next Question"}
        </button>
      )}
    </div>
  );
}
