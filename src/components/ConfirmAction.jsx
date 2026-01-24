import { HiCheck, HiXMark, HiOutlineQuestionMarkCircle } from "react-icons/hi2";

export default function ConfirmAction({
  message,
  onAction,
  onCloseModal,
  disabled,
}) {
  return (
    <div className="flex flex-col items-center space-y-6 p-2">
      <div className="text-center flex flex-col items-center gap-4">
        <HiOutlineQuestionMarkCircle className="text-6xl text-gray-200 animate-[bounce_2s_infinite] drop-shadow-md" />
        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 italic leading-tight px-4 drop-shadow-sm">
          {message}
        </h3>
      </div>
      <div className="flex gap-4 w-full max-w-xs">
        <button
          onClick={onCloseModal}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-xl font-bold italic transition-all duration-200 ease-in-out hover:from-red-400 hover:to-rose-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/40 cursor-pointer shadow-red-500/20"
        >
          <HiXMark className="w-5 h-5 stroke-2" />
          No
        </button>
        <button
          onClick={() => {
            onAction();
            onCloseModal();
          }}
          disabled={disabled}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl font-bold italic transition-all duration-200 ease-in-out hover:from-green-400 hover:to-emerald-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/40 cursor-pointer shadow-green-500/20"
        >
          <HiCheck className="w-5 h-5 stroke-2" />
          Yes
        </button>
      </div>
    </div>
  );
}
