export default function TriviaQuestionDisplay({ 
  question, 
  selectedAnswer, 
  isAnswerLocked, 
  onAnswerSelect 
}) {
  return (
    <>
      <div className="bg-white p-5 rounded-lg shadow-sm text-center mb-8">
        <h3 className="text-xl text-gray-800 font-medium leading-relaxed">{question.text}</h3>
      </div>

      <div className="mb-8">
        <h4 className="text-gray-600 mb-4 font-medium">Select your answer:</h4>
        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`
                p-4 border-2 rounded-lg text-left text-lg transition-all duration-200
                ${selectedAnswer === index 
                  ? "border-blue-400 bg-blue-50" 
                  : "border-gray-200 bg-white hover:border-blue-400 hover:bg-gray-50 hover:-translate-y-0.5"
                }
                ${isAnswerLocked ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
              `}
              onClick={() => onAnswerSelect(index)}
              disabled={isAnswerLocked}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
