import WaitingRoom from "../components/WaitingRoom";
import TriviaGame from "./TriviaGame";

const tempGameSession = {
  id: 1,
  hostId: 1,
  gameId: 1,
  sessionCode: 123456,
  status: "active",
};

const tempGame = {
  id: 1,
  title: "Harry Potter Trivia",
  gameType: "Trivia",
  description:
    "Answer some general trivia questions about everyone's favourite Wizarding franchise!",
  image: "https://via.placeholder.com/150",
  link: "https://www.google.com",
  isPrivate: false,
};

const tempGamePlayers = [
  {
    nickname: "Slimeball",
    score: 20,
  },
  {
    nickname: "Jeffery",
    score: 69,
  },
  {
    nickname: "Naruto Uzumaki",
    score: 161,
  },
];

function Game() {
  const { status } = tempGameSession;

  if (status === "waiting") {
    return (
      <WaitingRoom
        game={tempGame}
        gamePlayers={tempGamePlayers}
        gameSession={tempGameSession}
      />
    );
  }

  return <TriviaGame />;
}

export default Game;
