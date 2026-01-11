import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createSession as createSessionApi,
  getSession,
  updateSession as updateSessionApi,
  deleteSession as deleteSessionApi,
} from "../services/apiSession";
import supabase from "../services/supabase";

export function useCreateSession() {
  const { mutate: createSession, isPending: isCreating } = useMutation({
    mutationFn: ({ gameId, hostId }) => createSessionApi(gameId, hostId),
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createSession };
}

export function useGetSession(sessionCode) {
  const queryClient = useQueryClient();

  const {
    data: session,
    isPending: isLoadingSession,
    error,
  } = useQuery({
    queryFn: () => getSession(sessionCode),
    queryKey: ["session", sessionCode],
    enabled: !!sessionCode,
    staleTime: 1000,
    retry: 1,
  });

  useEffect(function() {
    const channel = supabase
    .channel(`realtime-session-${sessionCode}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'gameSessions',
        filter: `sessionCode=eq.${sessionCode}`,
      },
      (payload) => {
        console.log(`Update for session ${sessionCode} received!`);
        queryClient.invalidateQueries({ queryKey: ["session", sessionCode] });
      }
    ).subscribe();

    return () => supabase.removeChannel(channel);
  }, [queryClient, sessionCode]);

  return { isLoadingSession, session, error };
}

export function useUpdateSession() {
  const { mutate: updateSession, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, updates }) => updateSessionApi(id, updates),
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSession };
}

export function useDeleteSession() {
  const queryClient = useQueryClient();

  const { mutate: deleteSession, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteSessionApi(id),
    onSuccess: () => {
      toast.success("Ended game successfully.");
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteSession };
}
