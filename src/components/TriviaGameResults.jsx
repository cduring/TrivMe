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
    <div className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in duration-300">
      
      <div className="text-center">
        <h4 className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Results</h4>
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 p-4 rounded-2xl inline-block w-full">
           <span className="block text-green-400 text-xs font-bold uppercase tracking-wide mb-1">Correct Answer</span>
           <span className="font-black text-2xl md:text-3xl text-white drop-shadow-md">{question.options[question.answer]}</span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {currentQuestionAnswers.map((answer, index) => {
          const player = players?.find((p) => p.id === answer.playerId);
          return (
            <div
              key={index}
              className={`
              px-4 py-3 rounded-xl font-bold border flex justify-between items-center transition-all
              ${
                answer.isCorrect
                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                  : "bg-red-500/20 text-red-300 border-red-500/30"
              }
            `}
            >
              <div className="flex items-center gap-3">
                 <span>{answer.nickname}</span>
                 {answer.isCorrect ? (
                    <span className="bg-green-500 text-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">Correct</span>
                 ) : (
                    <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-tighter">Wrong</span>
                 )}
              </div>
              {player && <span className="text-white/80 font-mono bg-black/30 px-2 py-1 rounded text-sm">+{answer.isCorrect ? question.points : '0'}</span>}
            </div>
          );
        })}
        {currentQuestionAnswers.length === 0 && (
           <p className="text-white/30 text-center italic py-4">No answers submitted!</p>
        )}
      </div>

      {isHost && (
        <button 
          className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white border-b-4 border-red-800 hover:border-red-700 active:border-0 active:translate-y-1 active:mt-1 px-6 py-4 rounded-2xl font-black text-xl uppercase tracking-widest shadow-xl shadow-rose-900/40 transition-all flex items-center justify-center gap-2 group"
          onClick={onNextQuestion}
        >
          {isLastQuestion ? "See Final Results 🏆" : (
             <>Next Question <span className="group-hover:translate-x-1 transition-transform">→</span></>
          )}
        </button>
      )}
    </div>
  );
}
