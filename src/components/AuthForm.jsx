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
          className="flex flex-col items-stretch w-full max-w-md bg-purple-900/60 border border-purple-500/30 rounded-3xl px-8 py-8 gap-5 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-2 relative z-10">
            <h1 className="font-black text-3xl md:text-4xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 drop-shadow-sm uppercase italic tracking-tight">
              {title}
            </h1>
            <p className="text-purple-200/60 text-sm mt-2 font-medium tracking-wide">
              {isSignup
                ? "Join TrivMe and build your own game with AI"
                : "Log in to continue your game"}
            </p>
          </div>

          <button
            type="button"
            className="relative z-10 flex items-center justify-center gap-3 rounded-2xl bg-white text-gray-900 py-3 px-4 hover:bg-gray-50 active:scale-[0.98] transition-all shadow-lg font-bold group"
            onClick={() => onOAuthSignIn("google")}
          >
            <FcGoogle size={24} className="group-hover:scale-110 transition-transform" />
            <span className="font-bold tracking-tight">{googleCta}</span>
          </button>

          <div className="relative my-2 flex items-center z-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
            <span className="px-3 text-xs uppercase tracking-[0.2em] text-purple-300/50 font-bold">
              or
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
          </div>

          <FormRow label="Email" error={errors?.email?.message}>
            <input
              type="email"
              className="bg-purple-950/40 border border-purple-500/20 rounded-2xl w-full px-4 py-3 text-center placeholder-purple-400/30 focus:outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 transition-all text-white font-medium tracking-wide shadow-inner"
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
              className="bg-purple-950/40 border border-purple-500/20 rounded-2xl w-full px-4 py-3 text-center placeholder-purple-400/30 focus:outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 transition-all text-white font-medium tracking-wide shadow-inner"
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
                className="bg-purple-950/40 border border-purple-500/20 rounded-2xl w-full px-4 py-3 text-center placeholder-purple-400/30 focus:outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 transition-all text-white font-medium tracking-wide shadow-inner"
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
            className="uppercase bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl px-4 py-3 mt-4 font-black tracking-[0.1em] shadow-lg shadow-purple-900/40 hover:-translate-y-0.5 hover:shadow-purple-900/60 active:translate-y-0 transition-all z-10 text-white"
          >
            {ctaText}
          </button>
        </form>
        <div className="text-xl font-normal text-purple-100/80">
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
      </div>
    </>
  );
}

export default AuthForm;
