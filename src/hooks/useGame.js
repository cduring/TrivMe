import { useMutation } from "@tanstack/react-query";
import { createGame as createGameApi } from "../services/apiGames";
import toast from "react-hot-toast";

export function useCreateGame() {
  const { mutate: createGame, isPending: isCreating } = useMutation({
    mutationFn: createGameApi,
    onSuccess: () => {
      console.log("Success!");
      toast.success("Game has successfully been created!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createGame };
}
