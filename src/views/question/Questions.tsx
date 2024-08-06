import { Dispatch, SetStateAction, useMemo } from "react";
import { Question as QuestionType } from "../../types";
import QuestionLayout from "./layout/QuestionLayout";
import Question from "./Question";
import useQuestionNavigation from "./useQuestionNavigation";

interface QuestionsProps {
  questions: QuestionType[];
  setAreQuestionsDone: Dispatch<SetStateAction<boolean>>;
}

function Questions({ questions, setAreQuestionsDone }: QuestionsProps) {
  const navigationState = useQuestionNavigation(questions, setAreQuestionsDone);
  const { currentId } = navigationState;

  const currentQuestion = useMemo(
    () => questions.find((question) => question.id === currentId),
    [currentId, questions]
  );

  if (currentId === null || currentQuestion === undefined) return null;

  return (
    <QuestionLayout navigationState={navigationState}>
      <Question question={currentQuestion} />
    </QuestionLayout>
  );
}

export default Questions;
