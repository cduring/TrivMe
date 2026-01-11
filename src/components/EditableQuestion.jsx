import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useUpdateQuestion, useDeleteQuestion } from "../hooks/useQuestions";

export default function EditableQuestion({ question, index }) {
  const [visible, setVisible] = useState(false);
  const [tempQuestion, setTempQuestion] = useState(question);
  const { updateQuestion, isUpdatingQuestion } = useUpdateQuestion();
  const { deleteQuestion, isDeletingQuestion } = useDeleteQuestion();

  function handleChange(field, value) {
    setTempQuestion((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    const readyToSubmit = tempQuestion.text !== "" && tempQuestion.options.every((option) => option !== "") && tempQuestion.points !== 0;
    if (!readyToSubmit) {
      toast.error("Please fill out all fields!");
      return;
    }

    updateQuestion({ id: question.id, question: tempQuestion });
  }

  function handleDelete() {
    deleteQuestion(question.id);
  }

  if (!visible) {
    return (
      <div className="bg-purple-800 p-3 rounded-lg flex justify-between items-center border border-purple-600">
        <span className="font-semibold text-white">
          {index + 1}. {question.text}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-purple-300 text-sm">{question.points} pts</span>
          <button
            className="cursor-pointer text-purple-200 hover:text-white"
            onClick={() => setVisible(true)}
          >
            <HiEyeSlash size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-purple-800 border-2 border-purple-500 rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-purple-50">
          Question {index + 1}
        </h3>
        <div className="flex items-center justify-end gap-2">
          <button
            className="cursor-pointer text-purple-200 hover:text-white"
            onClick={() => setVisible(false)}
          >
            <HiEye size={20} />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeletingQuestion}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-1 text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            {isDeletingQuestion ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-purple-100 font-semibold uppercase text-sm">
          Question Text
        </label>
        <textarea
          type="text"
          placeholder="Enter your question here..."
          value={tempQuestion.text}
          onChange={(e) => handleChange("text", e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-purple-700 text-purple-50 placeholder:text-purple-300 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div className="space-y-2">
        <label className="text-purple-100 font-semibold uppercase text-sm">
          Answer Options
        </label>
        {tempQuestion.options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-purple-200 font-medium w-8">{i + 1}.</span>
            <input
              type="text"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const newOptions = [...tempQuestion.options];
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
          value={tempQuestion.answer}
          onChange={(e) => handleChange("answer", parseInt(e.target.value))}
          className="w-full px-3 py-2 rounded-lg bg-purple-700 text-purple-50 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {tempQuestion.options.map((opt, i) => (
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
          value={tempQuestion.points}
          onChange={(e) =>
            handleChange("points", parseInt(e.target.value) || 0)
          }
          className="w-24 px-3 py-2 rounded-lg bg-purple-700 text-purple-50 placeholder:text-purple-300 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={isUpdatingQuestion}
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-2 font-semibold transition-colors cursor-pointer disabled:opacity-50"
        >
          {isUpdatingQuestion ? "Saving..." : "Update Question"}
        </button>
      </div>
    </div>
  );
}
