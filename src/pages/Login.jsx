import { useLocation } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { useSignOut } from "../hooks/useAuth";
import Spinner from "./Spinner";
import { ImSleepy } from "react-icons/im";


function Login() {
  const location = useLocation();
  const isSignup = location.pathname.endsWith("/signup");
  const { isAuthenticated } = useAuth();
  const { signOut, isSigningOut } = useSignOut();

  function handleClick() {
    signOut({
      onSuccess: () => {},
    });
  }

  if (isAuthenticated)
    return (
      <div className="h-[400px] flex flex-col font-normal justify-center items-center px-4 gap-15">
        {isSigningOut && <Spinner />}
        <style>{`
          @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.15); opacity: 1; }
          }
        `}</style>
        <div className="animate-[spin_10s_linear_infinite]">
          <ImSleepy size={200} className="text-purple-300" style={{ animation: 'breathe 3s ease-in-out infinite' }} />
        </div>
        <div className="flex flex-col md:flex-row text-3xl font-normal justify-center items-center px-4 text-center">
          <h3>You are already logged in, &nbsp;</h3>
          <button
            className="font-semibold underline hover:text-red-500 transition-colors duration-150 ease-in-out cursor-pointer"
            disabled={isSigningOut}
            onClick={handleClick}
          >
            click here to logout.
          </button>
        </div>
      </div>
    );

  return <AuthForm mode={isSignup ? "signup" : "login"} />;
}

export default Login;
