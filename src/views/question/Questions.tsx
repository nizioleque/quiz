import { Dispatch, SetStateAction, useMemo } from "react";
import { Question as QuestionType } from "../../types";
import Question from "./Question";
import QuestionLayout from "./layout/QuestionLayout";
import useQuestionNavigation from "./useQuestionNavigation";

interface QuestionsProps {
  questions: QuestionType[];
  setAreQuestionsDone: Dispatch<SetStateAction<boolean>>;
}

function Questions({ questions, setAreQuestionsDone }: QuestionsProps) {
  const { currentId, handleBack, handleNext } = useQuestionNavigation(
    questions,
    setAreQuestionsDone
  );

  const currentQuestion = useMemo(
    () => questions.find((question) => question.id === currentId),
    [currentId, questions]
  );

  if (currentId === null || currentQuestion === undefined) return null;

  return (
    <QuestionLayout
      currentId={currentId}
      onNext={handleNext}
      onBack={handleBack}
    >
      <Question question={currentQuestion} />
    </QuestionLayout>
  );
}

export default Questions;
