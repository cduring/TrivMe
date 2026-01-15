import { useUpdatePlayers } from "./usePlayer";
import { useUpdateSession } from "./useSession";
import { useDeleteAnswers } from "./useAnswers";


export default function useResetSession(sessionId) {
    const { updateSession, isUpdating: isUpdatingSession } = useUpdateSession();
    const { updatePlayers, isUpdating: isUpdatingPlayers } = useUpdatePlayers(sessionId);
    const { deleteAnswers, isDeletingAnswers } = useDeleteAnswers(sessionId);

    const isResetting = isUpdatingPlayers || isDeletingAnswers || isUpdatingSession;

    const resetSession = () => {
        updateSession({ id: sessionId, updates: { status: "waiting", currentQuestionId: null, currentQuestionStartTime: null } });
        updatePlayers({ score: 0 });
        deleteAnswers();
    };

    return { resetSession, isResetting };
}