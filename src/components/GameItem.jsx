import { HiPlay, HiOutlinePuzzlePiece } from "react-icons/hi2";

export default function GameItem({ game }) {
  const { id, title, gameType, description, image, link, isPrivate } = game;

  return (
    <div className="w-full flex justify-between items-center border-2 rounded-2xl px-3 py-2 transition-transform duration-200 ease-in-out hover:-translate-y-[3px]">
      <ul>
        <li className="font-bold">{title}</li>
        <li>{gameType}</li>
        <li>
          Recommended players: <span className="font-semibold">4-8</span>
        </li>
      </ul>
      <div className="flex flex-col items-center justify-between gap-2">
        <span className="*:fill-purple-100 *:text-5xl">
          <HiOutlinePuzzlePiece />
        </span>
        <button className="rounded-xl bg-purple-800 text-pink-600 px-2 py-1 flex items-center gap-1 italic transition-all duration-200 ease-in-out hover:-translate-y-[2px] hover:bg-green-600 hover:text-purple-50 cursor-pointer">
          PLAY <HiPlay />
        </button>
      </div>
    </div>
  );
}
