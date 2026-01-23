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
      <h1 className="text-4xl font-bold text-pink-600 text-shadow-xs text-shadow-green-500 py-2">
        Triv Me!
      </h1>
    );

  return (
    <header
      className="my-6 flex w-4/5 md:w-1/2 items-center px-4 py-2 justify-between md:justify-around rounded-full bg-purple-800 text-sm md:text-lg font-bold uppercase"
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
