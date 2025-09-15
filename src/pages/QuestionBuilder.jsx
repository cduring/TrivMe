import { useState } from "react";
import QuestionItem from "../components/QuestionItem";

const tempQuestions = [
  {
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
    text: "What position did Harry play in Quidditch?",
    options: ["Seeker", "Batter", "Keeper", "Snitch"],
    answer: 0,
    points: 20,
  },
];

const tempGame = {
  id: 1,
  ownerId: 1,
  title: "Harry Potter Trivia",
  gameType: "Trivia",
  description:
    "Answer some general trivia questions about everyone's favourite Wizarding franchise!",
  isPrivate: false,
};

export default function QuestionBuilder({ game }) {
  const [questions, setQuestions] = useState(tempQuestions);

  const handleQuestionChange = (index, updated) => {
    setQuestions((prev) => prev.map((q, i) => (i === index ? updated : q)));
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        text: "",
        options: ["", "", "", ""],
        answer: 0,
        points: 20,
      },
    ]);
  };

  const handleDeleteQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3 items-center w-9/10 px-4">
      <div className="flex flex-col items-center w-full px-4 py-6 text-pink-600 text-center gap-1">
        <h1 className="font-bold italic text-2xl md:text-4xl uppercase">
          {tempGame.title}
        </h1>
        <p className="font-[600]">{tempGame.description}</p>
      </div>
      <div className="flex flex-col items-center w-full bg-purple-800 border-4 rounded-2xl px-4 py-6 gap-6">
        <h1 className="font-bold text-xl md:text-2xl uppercase">
          Create Trivia Questions
        </h1>
        <div className="w-full space-y-4">
          {questions.map((q, i) => (
            <QuestionItem
              key={i}
              question={q}
              index={i}
              onChange={handleQuestionChange}
              onDelete={handleDeleteQuestion}
            />
          ))}
        </div>
        <button
          onClick={handleAddQuestion}
          className="uppercase bg-green-600 hover:bg-green-700 rounded-xl px-6 py-2 font-semibold transition-colors"
        >
          Add Question
        </button>
      </div>
    </div>
  );
}
