import React from "react";
import GameItem from "./GameItem";

export default function GameList({ type, games }) {
  return (
    <div className="w-full flex flex-col gap-3 pb-10">
      <header className="font-bold italic text-2xl md:text-4xl md:pl-8 uppercase text-pink-500">
        {type === "private" && "My TrivMes"}
        {type === "public" && "Popular TrivMes"}
      </header>
      <section className="grid md:grid-cols-3 gap-3 w-full">
        {games.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </section>
    </div>
  );
}
