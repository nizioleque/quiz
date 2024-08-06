import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Answer } from "../../types";

interface AnswerContextValue {
  answer: Answer | undefined;
  updateAnswer: Dispatch<SetStateAction<Answer>>;
}

const AnswerContext = createContext<AnswerContextValue | null>(null);

export default AnswerContext;

export function useAnswerContext() {
  return useContext(AnswerContext)!;
}
