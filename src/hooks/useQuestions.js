import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createQuestions as createQuestionsApi,
  getQuestions,
  updateQuestion as updateQuestionApi,
  deleteQuestion as deleteQuestionApi,
} from "../services/apiQuestions";
import toast from "react-hot-toast";

export function useCreateQuestions() {
  const { mutate: createQuestions, isPending: isCreatingQuestions } =
    useMutation({
      mutationFn: createQuestionsApi,
      onSuccess: () => {
        toast.success("Questions successfully created!");
      },
      onError: (err) => toast.error(err.message),
    });

  return { createQuestions, isCreatingQuestions };
}

export function useGetQuestions(gameId) {
  const {
    data: questions,
    isPending: isLoadingQuestions,
    error,
  } = useQuery({
    queryFn: () => getQuestions(gameId),
    queryKey: ["questions", gameId],
    enabled: !!gameId,
    staleTime: Infinity,
  });

  return { questions, isLoadingQuestions, error };
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  const { mutate: updateQuestion, isPending: isUpdatingQuestion } = useMutation(
    {
      mutationFn: ({ id, question }) => updateQuestionApi(id, question),
      onSuccess: () => {
        toast.success("Question successfully updated!");
        queryClient.invalidateQueries({ queryKey: ["questions"] });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { updateQuestion, isUpdatingQuestion };
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  const { mutate: deleteQuestion, isPending: isDeletingQuestion } = useMutation(
    {
      mutationFn: deleteQuestionApi,
      onSuccess: () => {
        toast.success("Question successfully deleted!");
        queryClient.invalidateQueries({ queryKey: ["questions"] });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { deleteQuestion, isDeletingQuestion };
}
