import { ImBaffled2 } from "react-icons/im";
import { Link } from "react-router-dom";

function Error({ message = "Something went wrong!" }) {
  return (
    <div className="absolute bg-red-50/50 inset-0 backdrop-blur-xs flex items-center justify-center z-100">
      <div className="bg-red-100 border-4 border-red-500 rounded-2xl p-8 flex flex-col items-center gap-4 max-w-md mx-4">
        <ImBaffled2 className="text-red-500 text-6xl" />
        <p className="text-red-700 text-lg font-semibold text-center">
          {message}
        </p>
        <Link to="/" className="text-red-700 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default Error;
