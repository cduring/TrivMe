import { useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getPlayers,
  createPlayer as createPlayerApi,
  deletePlayer as deletePlayerApi,
} from "../services/apiPlayers";
import { usePlayerContext } from "../contexts/PlayerContext";
import supabase from "../services/supabase";
import toast from "react-hot-toast";

export function useGetPlayers(sessionId) {
  const queryClient = useQueryClient();

  const {
    data: players,
    isPending: isLoadingPlayers,
    error,
  } = useQuery({
    queryFn: () => getPlayers(sessionId),
    queryKey: ["players", sessionId],
    staleTime: 20 * 1000,
    enabled: !!sessionId,
  });

  useEffect(function() {
    const channel = supabase
    .channel(`realtime-players-${sessionId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'gamePlayers',
        filter: `sessionId=eq.${sessionId}`,
      },
      (payload) => {
        console.log(`Update for players in session ${sessionId} received!`);
        queryClient.invalidateQueries({ queryKey: ["players", sessionId] });
      }
    ).subscribe();

    return () => supabase.removeChannel(channel);
  }, [queryClient, sessionId]);

  return { players, isLoadingPlayers, error };
}

export function useCreatePlayer(sessionId) {
  const queryClient = useQueryClient();
  const { setCurrentPlayer } = usePlayerContext();

  const { mutate: createPlayer, isPending: isCreatingPlayer } = useMutation({
    mutationFn: createPlayerApi,
    onSuccess: (player) => {
      // Set in both React Query cache and context
      queryClient.setQueryData(["currentPlayer"], player);
      setCurrentPlayer(player);
      queryClient.invalidateQueries({ queryKey: ["players", sessionId] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreatingPlayer, createPlayer };
}

export function useDeletePlayer(sessionId) {
  const queryClient = useQueryClient();
  const { clearPlayer } = usePlayerContext();

  const { mutate: deletePlayer, isPending: isDeletingPlayer } = useMutation({
    mutationFn: (id) => deletePlayerApi(id),
    onSuccess: () => {
      toast.success("You are now spectating!");
      
      // Clear from context and cache
      clearPlayer();
      queryClient.setQueryData(["currentPlayer"], null);
      queryClient.invalidateQueries({ queryKey: ["players", sessionId] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeletingPlayer, deletePlayer };
}

