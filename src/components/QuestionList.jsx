import { useGetQuestions } from "../hooks/useQuestions";
import EditableQuestion from "./EditableQuestion";

export default function QuestionList({ gameId }) {
  const { questions, isLoadingQuestions, error } = useGetQuestions(gameId);

  if (isLoadingQuestions) return <div className="text-white">Loading questions...</div>;
  if (error) return <div className="text-red-500">Error loading questions</div>;

  if (!questions?.length) return null;

  return (
    <section className="flex flex-col items-center w-full bg-purple-900/50 border-2 border-purple-500 rounded-2xl px-4 py-4 gap-4">
      <h2 className="font-bold text-lg md:text-xl uppercase text-center text-purple-200">
        Existing Questions
      </h2>
      <div className="w-full space-y-2">
        {questions.map((q, i) => (
          <EditableQuestion key={q.id} question={q} index={i} />
        ))}
      </div>
    </section>
  );
}
