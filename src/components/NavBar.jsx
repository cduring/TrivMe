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
      className="my-6 flex w-4/5 md:w-1/2 items-center px-4 py-2 justify-between md:justify-around rounded-full bg-purple-800 text-sm md:text-lg font-bold
     text-purple-50 uppercase title-text"
    >
      <NavLink to="/create">
        <span className="flex items-center gap-1">
          <HiMiniLightBulb />
          New
        </span>
      </NavLink>
      <NavLink to="/">
        <span className="flex items-center gap-1">
          <HiMiniHome />
          Home
        </span>
      </NavLink>
      <NavLink to="/join">
        <span className="flex items-center gap-1">
          <HiPuzzlePiece />
          Join
        </span>
      </NavLink>
      <NavLink to="/login">
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
