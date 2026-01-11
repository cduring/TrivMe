import { HiCheck, HiXMark } from "react-icons/hi2";

export default function ConfirmAction({
  message,
  onAction,
  onCloseModal,
  disabled,
}) {
  return (
    <div className="flex flex-col items-center space-y-6 p-2">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-pink-600 mt-3 italic">
          {message}
        </h3>
      </div>
      <div className="flex gap-4 w-full max-w-xs">
        <button
          onClick={onCloseModal}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl font-bold italic transition-all duration-200 ease-in-out hover:bg-red-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/25 cursor-pointer"
        >
          <HiXMark className="w-4 h-4" />
          No
        </button>
        <button
          onClick={() => {
            onAction();
            onCloseModal();
          }}
          disabled={disabled}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-bold italic transition-all duration-200 ease-in-out hover:bg-green-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/25 cursor-pointer"
        >
          <HiCheck className="w-4 h-4" />
          Yes
        </button>
      </div>
    </div>
  );
}
