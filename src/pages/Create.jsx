import { useForm } from "react-hook-form";
import FormRow from "../components/FormRow";
import { useCreateGame } from "../hooks/useGame";
import { HiBolt } from "react-icons/hi2";
import Spinner from "./Spinner";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { ImConfused2 } from "react-icons/im";
import GenerateGame from "./GenerateGame";

function Create() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      title: "",
      description: "",
      gameType: "Trivia",
      isPrivate: false,
    },
  });
  const { isCreating, createGame } = useCreateGame();
  const { user, isLoading: isLoadingUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { errors } = formState;

  function onSubmit(data) {
    const gameData = { ...data, ownerId: user.id };
    createGame(gameData, {
      onSuccess: (game) => {
        const { id } = game;
        navigate(`${id}`);
      },
    });
  }

  function onError() {
    // console.log(errors);
  }

  if (!isAuthenticated) {
    return (
      <>
        {isLoadingUser && <Spinner />}
        <div className="h-[400px] flex flex-col font-normal justify-center items-center px-4 gap-10">
          <ImConfused2 size={200} />
          <div className="flex flex-col md:flex-row text-3xl gap-2">
            <h3 className="text-center">
              Sorry, you need to be{" "}
              <strong className="text-red-400">logged in</strong> to create a
              new TrivMe!
              <br />
            </h3>
            <button
              className="font-semibold underline hover:text-red-500 transition-colors duration-150 ease-in-out cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log in here.
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {(isCreating || isLoadingUser) && <Spinner />}
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col items-center w-full bg-purple-800 border-4 rounded-2xl px-4 py-2 gap-3"
      >
        <h1 className="font-bold text-2xl">Create TrivMe</h1>
        <FormRow label="Title" error={errors?.title?.message}>
          <input
            className="bg-purple-600 rounded-2xl w-full md:w-3/5 px-2 py-1 text-center"
            {...register("title", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Description" error={errors?.description?.message}>
          <textarea
            className="bg-purple-600 rounded-2xl w-full md:w-3/5 px-2 py-1 h-30"
            {...register("description", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Game Type" error={errors?.gameType?.message}>
          <select
            className="bg-purple-600 rounded-2xl w-4/5 md:w-2/5 text-center px-2 py-1"
            {...register("gameType", {
              required: "This field is required",
            })}
          >
            <option value="Trivia">Trivia</option>
          </select>
        </FormRow>
        <FormRow label="Game Privacy" error={errors?.isPrivate?.message}>
          <select
            className="bg-purple-600 rounded-2xl w-4/5 md:w-2/5 text-center px-2 py-1"
            {...register("isPrivate", {
              required: "This field is required",
            })}
            defaultValue={false}
          >
            <option value={false}>Public</option>
            <option value={true}>Private</option>
          </select>
        </FormRow>
        <button
          disabled={isCreating}
          className="uppercase bg-purple-600 rounded-xl px-4 py-2 mt-8 hover:bg-green-600 hover:text-green-100 hover:-translate-y-[2px] transition-all duration-300 ease-in-out flex items-center gap-0.5"
        >
          <HiBolt /> Create
        </button>
      </form>
      <GenerateGame />
    </>
  );
}

export default Create;
