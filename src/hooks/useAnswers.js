import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAnswer as createAnswerApi, getAnswers } from "../services/apiAnswers";
import supabase from "../services/supabase";
import toast from "react-hot-toast";

export function useCreateAnswer() {
  const { mutate: createAnswer, isPending: isCreatingAnswer } = useMutation({
    mutationFn: createAnswerApi,
    onError: (err) => toast.error(err.message),
  });

  return { createAnswer, isCreatingAnswer };
}

export function useGetAnswers(sessionId) {
  const queryClient = useQueryClient();

  const {
    data: answers,
    isPending: isLoadingAnswers,
    error,
  } = useQuery({
    queryFn: () => getAnswers(sessionId),
    queryKey: ["answers", sessionId],
    enabled: !!sessionId,
  });

  useEffect(function() {
    const channel = supabase
    .channel(`realtime-answers-${sessionId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'gameAnswers',
        filter: `sessionId=eq.${sessionId}`,
      },
      (payload) => {
        console.log(`Update for answers in session ${sessionId} received!`);
        queryClient.invalidateQueries({ queryKey: ["answers", sessionId] });
      }
    ).subscribe();

    return () => supabase.removeChannel(channel);
  }, [queryClient, sessionId]);

  return { answers, isLoadingAnswers, error };
}
