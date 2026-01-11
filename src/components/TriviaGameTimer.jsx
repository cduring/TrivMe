export default function TriviaGameTimer({ timeRemaining }) {
  const isUrgent = timeRemaining <= 5;
  
  return (
    <div className={`text-xl font-bold ${isUrgent ? "text-red-500" : "text-green-600"}`}>
      Time: {timeRemaining}s
    </div>
  );
}
