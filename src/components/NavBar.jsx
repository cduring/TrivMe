import { NavLink, useLocation } from "react-router-dom";
import {
  HiMiniHome,
  HiPuzzlePiece,
  HiMiniArrowRightEndOnRectangle,
  HiMiniArrowRightStartOnRectangle,
  HiMiniLightBulb,
} from "react-icons/hi2";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const showNavBar = !location.pathname.includes("game");

  if (!showNavBar)
    return (
      <div className="py-6 animate-pulse hover:animate-none transition-all duration-300">
        <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-sm transform skew-x-[-10deg]">
          Triv Me!
        </h1>
      </div>
    );

  return (
    <header
      className="my-6 flex w-4/5 md:w-1/2 items-center px-6 py-3 justify-between md:justify-around rounded-full bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 shadow-xl shadow-purple-900/40 border border-white/10 text-sm md:text-lg font-bold uppercase backdrop-blur-md"
    >
      <NavLink
        to="/create"
        className={({ isActive }) =>
          `transition-all duration-300 hover:scale-105 ${
            isActive ? "text-pink-400 scale-110" : "text-purple-50 hover:text-purple-200"
          }`
        }
      >
        <span className="flex items-center gap-1">
          <HiMiniLightBulb />
          New
        </span>
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `transition-all duration-300 hover:scale-105 ${
            isActive ? "text-pink-400 scale-110" : "text-purple-50 hover:text-purple-200"
          }`
        }
      >
        <span className="flex items-center gap-1">
          <HiMiniHome />
          Home
        </span>
      </NavLink>
      <NavLink
        to="/join"
        className={({ isActive }) =>
          `transition-all duration-300 hover:scale-105 ${
            isActive ? "text-pink-400 scale-110" : "text-purple-50 hover:text-purple-200"
          }`
        }
      >
        <span className="flex items-center gap-1">
          <HiPuzzlePiece />
          Join
        </span>
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `transition-all duration-300 hover:scale-105 ${
            isActive ? "text-pink-400 scale-110" : "text-purple-50 hover:text-purple-200"
          }`
        }
      >
        {isAuthenticated ? (
          <span className="flex items-center gap-1">
            <HiMiniArrowRightStartOnRectangle />
            Logout
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <HiMiniArrowRightEndOnRectangle />
            Login
          </span>
        )}
      </NavLink>
    </header>
  );
}

export default NavBar;
