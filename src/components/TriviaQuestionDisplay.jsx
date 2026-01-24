export default function TriviaQuestionDisplay({ 
  question, 
  selectedAnswer, 
  isAnswerLocked, 
  onAnswerSelect 
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gradient-to-br from-rose-900/60 to-red-900/60 p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-white/10 text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-rose-400 to-orange-400"></div>
        <h3 className="text-2xl md:text-3xl text-white font-black leading-tight tracking-tight drop-shadow-md relative z-10">
          {question.text}
        </h3>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-colors duration-500"></div>
      </div>

      <div className="mb-4">
        <h4 className="text-rose-200/80 mb-4 font-bold uppercase tracking-widest text-sm text-center">Select your answer</h4>
        <div className="grid gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`
                relative p-5 rounded-2xl text-left text-xl font-bold transition-all duration-300 transform shadow-lg group overflow-hidden
                ${selectedAnswer === index 
                  ? "bg-gradient-to-r from-rose-600 to-red-600 border-2 border-rose-400 text-white scale-[1.02] shadow-rose-900/30" 
                  : "bg-white/10 border-2 border-white/10 text-white hover:bg-white/20 hover:border-white/30 hover:-translate-y-1 hover:shadow-xl"
                }
                ${isAnswerLocked ? "cursor-not-allowed opacity-80 grayscale-[0.3]" : "cursor-pointer"}
              `}
              onClick={() => onAnswerSelect(index)}
              disabled={isAnswerLocked}
            >
              <div className="flex items-center gap-4 relative z-10">
                <span className={`
                  flex items-center justify-center w-10 h-10 rounded-full text-lg font-black
                  ${selectedAnswer === index ? "bg-white text-rose-600" : "bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white"}
                `}>
                  {["A", "B", "C", "D"][index] || index + 1}
                </span>
                {option}
              </div>
              {selectedAnswer === index && (
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
