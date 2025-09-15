import React from "react";

export default function WaitingRoom({ game, gameSession, gamePlayers }) {
  const { title, gameType, description } = game;
  const { sessionCode, status } = gameSession;

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <div className="w-full px-6 py-4 rounded-xl bg-purple-800 flex flex-col md:flex-row md:justify-center md:gap-80 items-center gap-4">
        <div>
          <ul className="flex flex-col items-center">
            <li className="font-bold text-2xl">{title}</li>
            <li className="font-bold">{gameType}</li>
            <li className="text-center">{description}</li>
          </ul>
        </div>
        <div className="bg-green-900 rounded-xl p-2">
          <h2 className="font-bold text-xl text-center">Session Code:</h2>
          <p className="font-bold text-center">{sessionCode}</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
        <div className="w-full px-6 py-4 rounded-xl bg-pink-600 flex flex-col items-center gap-4">
          <h2 className="font-bold text-xl text-center italic">Players</h2>
          <ul className="grid grid-cols-3 gap-2 items-center">
            {gamePlayers.map((player) => (
              <li key={player.nickname} className="text-center">
                {player.nickname}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-[2fr_1fr] w-full gap-5">
          <button className="bg-green-900 rounded-xl p-2 uppercase italic">
            Start Game
          </button>
          <button className="bg-red-900 rounded-xl p-2 uppercase italic">
            End/Quit Game
          </button>
        </div>
      </div>
    </div>
  );
}
