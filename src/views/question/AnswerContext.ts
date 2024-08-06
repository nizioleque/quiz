import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { Answer, QuestionId } from "../../types";

interface AnswerContextValue {
  answers: Record<QuestionId, Answer>;
  setAnswers: Dispatch<SetStateAction<Record<QuestionId, Answer>>>;
}

const AnswerContext = createContext<AnswerContextValue | null>(null);

export default AnswerContext;

export function useAnswerContext(currentId: QuestionId) {
  const { answers, setAnswers } = useContext(AnswerContext)!;

  const answer = useMemo(
    () => (currentId !== null ? answers[currentId] : undefined),
    [answers, currentId]
  );

  const updateAnswer = useCallback(
    (answer: SetStateAction<Answer>) => {
      if (currentId === null) return;

      setAnswers((prevAnswers) => {
        const newAnswer =
          typeof answer === "function"
            ? answer(prevAnswers[currentId])
            : answer;
        return { ...prevAnswers, [currentId]: newAnswer };
      });
    },
    [currentId, setAnswers]
  );

  return { answer, updateAnswer };
}
