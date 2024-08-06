import { useLayoutEffect, useMemo, useState } from "react";
import { QuestionId } from "../../types";
import useQuestions from "../../useQuestions";

function useQuestionNavigation(
  questionsState: ReturnType<typeof useQuestions>,
  setAreQuestionsDone: (value: boolean) => void
) {
  const { questions, isQuestionShown } = questionsState;

  const filteredQuestions = useMemo(
    () => questions?.filter((question) => isQuestionShown[question.id]) ?? [],
    [isQuestionShown, questions]
  );

  const [currentId, setCurrentId] = useState<QuestionId | null>(null);

  const currentIndex = useMemo(
    () => questions?.findIndex((question) => question.id === currentId) ?? 0,
    [currentId, questions]
  );

  const previousId = useMemo(() => {
    const index = filteredQuestions.findIndex(
      (question) => question.id === currentId
    );
    return filteredQuestions[index - 1]?.id;
  }, [currentId, filteredQuestions]);

  const nextId = useMemo(() => {
    const index = filteredQuestions.findIndex(
      (question) => question.id === currentId
    );
    return filteredQuestions[index + 1]?.id;
  }, [currentId, filteredQuestions]);

  useLayoutEffect(() => {
    // TODO remove when empty lists are handled?
    if (filteredQuestions.length === 0) return;
    const firstId = filteredQuestions[0].id;
    setCurrentId(firstId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const navigateNext = () => {
    if (nextId === undefined) {
      setAreQuestionsDone(true);
      return;
    }

    setCurrentId(nextId);
  };

  const navigateBack =
    previousId !== undefined ? () => setCurrentId(previousId) : undefined;

  return {
    currentId,
    currentIndex,
    navigateBack,
    navigateNext,
  };
}

export default useQuestionNavigation;
