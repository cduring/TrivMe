import { useLocation } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { useSignOut } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";

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
      <>
        {isSigningOut && <Spinner />}
        <div className="h-[400px] flex flex-col md:flex-row text-3xl font-normal justify-center items-center px-4">
          <h3>You are already logged in, &nbsp;</h3>
          <button
            className="font-semibold underline hover:text-red-500 transition-colors duration-150 ease-in-out cursor-pointer"
            disabled={isSigningOut}
            onClick={handleClick}
          >
            click here to logout.
          </button>
        </div>
      </>
    );

  return <AuthForm mode={isSignup ? "signup" : "login"} />;
}

export default Login;
