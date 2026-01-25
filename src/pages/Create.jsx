import { useForm } from "react-hook-form";
import { useCreateGame } from "../hooks/useGame";
import { HiBolt } from "react-icons/hi2";
import Spinner from "./Spinner";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

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
  const { user, isLoading: isLoadingUser } = useAuth();
  const navigate = useNavigate();

  const { errors } = formState;

  function onSubmit(data) {
    const gameData = { ...data, ownerId: user.id, gameType: "Trivia" };
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

  return (
    <div className="flex flex-col items-center justify-center py-4 px-4 w-full">
      {(isCreating || isLoadingUser) && <Spinner />}
      <div className="max-w-2xl w-full space-y-4">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="w-full bg-pink-100/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl shadow-pink-200 border border-pink-200 space-y-6"
        >
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-pink-50 ml-1">Title</label>
              <input
                className="w-full p-4 rounded-xl border-2 border-pink-400 bg-pink-500/50 text-white placeholder:text-pink-200 focus:border-white focus:ring-4 focus:ring-pink-400/30 transition-all duration-300 text-lg outline-none placeholder:text-stone-300"
                placeholder="e.g. The Ultimate 90s Quiz"
                {...register("title", {
                  required: "Title is required",
                })}
              />
              {errors?.title?.message && (
                <span className="text-red-500 text-sm ml-1">{errors.title.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-pink-50 ml-1">Description</label>
              <textarea
                className="w-full p-4 rounded-xl border-2 border-pink-400 bg-pink-500/50 text-white placeholder:text-pink-200 focus:border-white focus:ring-4 focus:ring-pink-400/30 transition-all duration-300 text-lg outline-none min-h-[120px] resize-none"
                placeholder="What is this quiz about?"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors?.description?.message && (
                <span className="text-red-500 text-sm ml-1">{errors.description.message}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-pink-50 ml-1">Category</label>
                <div className="relative">
                  <select
                    className="w-full p-4 rounded-xl border-2 border-pink-400 bg-pink-500/50 text-white focus:border-white focus:ring-4 focus:ring-pink-400/30 transition-all duration-300 text-lg outline-none appearance-none"
                    {...register("category", { required: "Required" })}
                    defaultValue={"General Knowledge"}
                  >
                    <option value="General Knowledge" className="text-stone-800">General Knowledge</option>
                    <option value="Science & Nature" className="text-stone-800">Science & Nature</option>
                    <option value="History" className="text-stone-800">History</option>
                    <option value="Geography" className="text-stone-800">Geography</option>
                    <option value="Entertainment" className="text-stone-800">Entertainment</option>
                    <option value="Sports" className="text-stone-800">Sports</option>
                    <option value="Art & Literature" className="text-stone-800">Art & Literature</option>
                    <option value="Technology" className="text-stone-800">Technology</option>
                    <option value="Music" className="text-stone-800">Music</option>
                    <option value="Movies" className="text-stone-800">Movies</option>
                    <option value="Television" className="text-stone-800">Television</option>
                    <option value="Politics" className="text-stone-800">Politics</option>
                    <option value="Celebrities" className="text-stone-800">Celebrities</option>
                    <option value="Animals" className="text-stone-800">Animals</option>
                    <option value="Video Games" className="text-stone-800">Video Games</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-pink-200">
                    ▼
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-pink-50 ml-1">Privacy</label>
                <div className="relative">
                  <select
                    className="w-full p-4 rounded-xl border-2 border-pink-400 bg-pink-500/50 text-white focus:border-white focus:ring-4 focus:ring-pink-400/30 transition-all duration-300 text-lg outline-none appearance-none"
                    {...register("isPrivate", { required: "Required" })}
                    defaultValue={false}
                  >
                    <option value={false} className="text-stone-800">Public</option>
                    <option value={true} className="text-stone-800">Private</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-pink-200">
                    ▼
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            disabled={isCreating}
            className="w-full py-4 px-8 bg-white hover:bg-pink-50 disabled:bg-pink-200 text-pink-700 font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 text-xl shadow-lg shadow-pink-900/20 mt-8 cursor-pointer"
          >
            {isCreating ? (
              <span className="flex items-center gap-2">
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 Creating...
              </span>
            ) : (
              <>
                <HiBolt className="w-6 h-6" />
                Create Game
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
