import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createGame as createGameApi,
  generateGame as generateGameApi,
  getGame,
  getGames,
} from "../services/apiGames";
import toast from "react-hot-toast";

export function useGenerateGame() {
  const {
    mutate: generateGame,
    data: game,
    isPending: isGenerating,
  } = useMutation({
    mutationFn: generateGameApi,
    onError: (err) => toast.error("Failed to generate :("),
  });

  return { generateGame, game, isLoading: isGenerating };
}

export function useCreateGame() {
  const queryClient = useQueryClient();

  const { mutate: createGame, isPending: isCreating } = useMutation({
    mutationFn: createGameApi,
    onSuccess: () => {
      toast.success("Game has successfully been created!");
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createGame };
}

export function useGetGame(id, options = {}) {
  const {
    data: game,
    isPending: isLoadingGame,
    error,
  } = useQuery({
    queryFn: () => getGame(id),
    queryKey: ["game", id],
    staleTime: 5 * 60 * 1000,
    ...options,
  });

  return { isLoadingGame, game, error };
}

export function useGetGames() {
  const {
    data: games,
    isPending: isLoadingGames,
    error,
  } = useQuery({
    queryFn: getGames,
    queryKey: ["games"],
    staleTime: 5 * 60 * 1000,
  });

  return { games, isLoadingGames, error };
}
