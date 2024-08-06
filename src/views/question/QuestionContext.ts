import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Answer, Question } from "../../types";

interface QuestionContextValue {
  question: Question;
  answer: Answer | undefined;
  updateAnswer: Dispatch<SetStateAction<Answer>>;
}

const QuestionContext = createContext<QuestionContextValue | null>(null);

export default QuestionContext;

export function useQuestionContext() {
  return useContext(QuestionContext)!;
}
