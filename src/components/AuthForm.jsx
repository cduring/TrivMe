import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import FormRow from "./FormRow";
import { FcGoogle } from "react-icons/fc";
import { useSignIn, useSignUp, useSignInGoogle } from "../hooks/useAuth";
import Spinner from "../pages/Spinner";
import toast from "react-hot-toast";

function AuthForm({ mode = "login" }) {
  const isSignup = mode === "signup";
  const { signIn, isSigningIn } = useSignIn();
  const { signInGoogle, isSigningInGoogle } = useSignInGoogle();
  const { signUp, isSigningUp } = useSignUp();
  const navigate = useNavigate();

  const isSubmitting = isSigningIn || isSigningInGoogle || isSigningUp;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: {} });

  const title = useMemo(
    () => (isSignup ? "Create your account" : "Welcome back"),
    [isSignup]
  );
  const ctaText = useMemo(() => (isSignup ? "Sign up" : "Log in"), [isSignup]);
  const googleCta = useMemo(
    () => (isSignup ? "Sign up with Google" : "Log in with Google"),
    [isSignup]
  );

  useEffect(
    function () {
      reset();
    },
    [mode, reset]
  );

  function onSubmit(data) {
    if (isSignup) {
      const userData = { email: data.email, password: data.password };
      signUp(userData, {
        onSuccess: () => {
          reset();
          navigate("/");
        },
      });
    } else {
      signIn(data, {
        onSuccess: () => {
          reset();
          navigate("/");
        },
      });
    }
  }
  
  function onOAuthSignIn(provider) {
    switch (provider) {
      case 'google':
        signInGoogle({
          onSuccess: () => {
            reset();
            navigate("/");
            toast.success("User successfully logged in!");
          },
        });
        break;
      default:
        break;
    }
  }

  function onError(formErrors) {
    console.log(formErrors);
  }

  return (
    <>
      {isSubmitting && <Spinner />}
      <div className="flex flex-col items-center w-full gap-6 pt-3">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col items-stretch w-full max-w-md bg-purple-800/70 border-4 border-purple-700 rounded-3xl px-6 py-6 gap-4 shadow-xl backdrop-blur-md"
        >
          <div className="text-center mb-2">
            <h1 className="font-extrabold text-3xl leading-tight">{title}</h1>
            <p className="text-purple-200/80 text-sm mt-1">
              {isSignup
                ? "Join TrivMe and start creating games"
                : "Log in to continue your game"}
            </p>
          </div>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-2xl bg-white text-gray-900 py-2.5 px-4 hover:opacity-90 active:opacity-80 transition-opacity"
            onClick={() => onOAuthSignIn("google")}
          >
            <FcGoogle size={22} />
            <span className="font-semibold">{googleCta}</span>
          </button>
          <div className="relative my-1 flex items-center">
            <div className="flex-1 h-px bg-purple-600/70" />
            <span className="px-3 text-xs uppercase tracking-wider text-purple-200/80">
              or
            </span>
            <div className="flex-1 h-px bg-purple-600/70" />
          </div>

          <FormRow label="Email" error={errors?.email?.message}>
            <input
              type="email"
              className="bg-purple-600/80 focus:bg-purple-600 rounded-2xl w-full px-3 py-2 text-center placeholder-purple-200/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="you@example.com"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email",
                },
              })}
            />
          </FormRow>

          <FormRow label="Password" error={errors?.password?.message}>
            <input
              type="password"
              className="bg-purple-600/80 focus:bg-purple-600 rounded-2xl w-full px-3 py-2 text-center placeholder-purple-200/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder={
                isSignup ? "Create a strong password" : "Your password"
              }
              {...register("password", {
                required: "This field is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
            />
          </FormRow>
          {isSignup && (
            <FormRow
              label="Confirm password"
              error={errors?.passwordConfirm?.message}
            >
              <input
                type="password"
                className="bg-purple-600/80 focus:bg-purple-600 rounded-2xl w-full px-3 py-2 text-center placeholder-purple-200/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Repeat your password"
                {...register("passwordConfirm", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues().password || "Passwords do not match",
                })}
              />
            </FormRow>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="uppercase bg-purple-600 hover:bg-purple-500 disabled:opacity-60 rounded-2xl px-4 py-2 mt-2 font-bold tracking-wide shadow-md transition-colors"
          >
            {ctaText}
          </button>
        </form>
        <div className="text-xl font-normal">
          {isSignup ? (
            <>
              <span className="italic">
                Already have an account? &nbsp;&nbsp;
              </span>
              <Link
                to="/login"
                className="font-semibold underline hover:text-pink-600 transition-colors duration-150 ease-in-out"
                onClick={reset}
              >
                Log in here
              </Link>
            </>
          ) : (
            <>
              <span className="italic">
                Don't have an account? &nbsp;&nbsp;
              </span>
              <Link
                to="/signup"
                className="font-semibold underline hover:text-pink-600 transition-colors duration-150 ease-in-out"
                onClick={reset}
              >
                Sign up here
              </Link>
            </>
          )}
        </div>
        <button onClick={() => reset()}>Click to reset</button>
      </div>
    </>
  );
}

export default AuthForm;
