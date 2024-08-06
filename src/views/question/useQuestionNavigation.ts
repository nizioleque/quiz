import { useLayoutEffect, useMemo, useState } from "react";
import { Question, QuestionId } from "../../types";

function useQuestionNavigation(
  questions: Question[],
  setAreQuestionsDone: (value: boolean) => void
) {
  const [currentId, setCurrentId] = useState<QuestionId | null>(null);

  const previousId = useMemo(() => {
    const index = questions.findIndex((question) => question.id === currentId);
    return questions[index - 1]?.id;
  }, [currentId, questions]);

  const nextId = useMemo(() => {
    const index = questions.findIndex((question) => question.id === currentId);
    return questions[index + 1]?.id;
  }, [currentId, questions]);

  useLayoutEffect(() => {
    if (questions === null || questions.length === 0) return;
    const firstId = questions[0].id;
    setCurrentId(firstId);
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
    navigateBack,
    navigateNext,
  };
}

export default useQuestionNavigation;
