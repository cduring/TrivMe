import React from "react";
import GameItem from "./GameItem";

const tempGames = [
  {
    id: 1,
    title: "Harry Potter Trivia",
    gameType: "Trivia",
    description: "Description 1",
    image: "https://via.placeholder.com/150",
    link: "https://www.google.com",
    isPrivate: false,
  },
  {
    id: 2,
    title: "The Office Season 3",
    gameType: "Trivia",
    description: "Description 2",
    image: "https://via.placeholder.com/150",
    link: "https://www.google.com",
    isPrivate: false,
  },
  {
    id: 3,
    title: "US Presidents",
    gameType: "Trivia",
    description: "Description 3",
    image: "https://via.placeholder.com/150",
    link: "https://www.google.com",
    isPrivate: false,
  },
  {
    id: 4,
    title: "90s Rap Music",
    gameType: "Trivia",
    description: "Description 4",
    image: "https://via.placeholder.com/150",
    link: "https://www.google.com",
    isPrivate: false,
  },
  {
    id: 5,
    title: "Swiftie Trivia",
    gameType: "Trivia",
    description: "Description 5",
    image: "https://via.placeholder.com/150",
    link: "https://www.google.com",
    isPrivate: false,
  },
  {
    id: 6,
    title: "Summer Olympic London 2012",
    gameType: "Trivia",
    description: "Description 6",
    image: "https://via.placeholder.com/150",
    link: "https://www.google.com",
    isPrivate: false,
  },
];

export default function GameList() {
  return (
    <div className="grid md:grid-cols-3 gap-3 w-full">
      {tempGames.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
    </div>
  );
}
