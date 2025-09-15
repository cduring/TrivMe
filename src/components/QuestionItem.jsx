export default function QuestionItem({ question, index, onChange, onDelete }) {
  const handleChange = (field, value) => {
    onChange(index, { ...question, [field]: value });
  };

  return (
    <div className="bg-purple-600 border-2 border-purple-500 rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-purple-50">
          Question {index + 1}
        </h3>
        <button
          onClick={() => onDelete(index)}
          className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-1 text-sm font-semibold transition-colors"
        >
          Delete
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-purple-100 font-semibold uppercase text-sm">
          Question Text
        </label>
        <textarea
          type="text"
          placeholder="Enter your question here..."
          value={question.text}
          onChange={(e) => handleChange("text", e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-purple-700 text-purple-50 placeholder:text-purple-300 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div className="space-y-2">
        <label className="text-purple-100 font-semibold uppercase text-sm">
          Answer Options
        </label>
        {question.options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-purple-200 font-medium w-8">{i + 1}.</span>
            <input
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const newOptions = [...question.options];
                newOptions[i] = e.target.value;
                handleChange("options", newOptions);
              }}
              className="flex-1 px-3 py-2 rounded-lg bg-purple-700 text-purple-50 placeholder:text-purple-300 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-purple-100 font-semibold uppercase text-sm">
          Correct Answer
        </label>
        <select
          value={question.answer}
          onChange={(e) => handleChange("answer", parseInt(e.target.value))}
          className="w-full px-3 py-2 rounded-lg bg-purple-700 text-purple-50 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {question.options.map((opt, i) => (
            <option key={i} value={i} className="bg-purple-700">
              Option {i + 1}: {opt || `Answer ${i + 1}`}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-purple-100 font-semibold uppercase text-sm">
          Points
        </label>
        <input
          type="number"
          placeholder="Points"
          value={question.points}
          onChange={(e) =>
            handleChange("points", parseInt(e.target.value) || 0)
          }
          className="w-24 px-3 py-2 rounded-lg bg-purple-700 text-purple-50 placeholder:text-purple-300 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>
    </div>
  );
}
