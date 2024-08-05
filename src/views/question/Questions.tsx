import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";
import { QuestionId, Question as QuestionType } from "../../types";
import Question from "./Question";
import QuestionLayout from "./layout/QuestionLayout";

interface QuestionsProps {
  questions: QuestionType[];
  setAreQuestionsDone: Dispatch<SetStateAction<boolean>>;
}

function Questions({ questions, setAreQuestionsDone }: QuestionsProps) {
  const [currentId, setCurrentId] = useState<QuestionId | null>(null);

  // TODO record answers for previous questions
  const [previousIds, setPreviousIds] = useState<QuestionId[]>([]);

  useLayoutEffect(() => {
    if (questions === null || questions.length === 0) return;
    const firstId = questions[0].id;
    setCurrentId(firstId);
  }, [questions]);

  if (currentId === null) return null;

  const currentQuestion = questions.find(
    (question) => question.id === currentId
  )!;

  const handleNext = () => {
    const nextId = currentQuestion.nextQuestionId;

    if (nextId === undefined) {
      setAreQuestionsDone(true);
      return;
    }

    setPreviousIds((ids) => [...ids, currentId]);
    setCurrentId(nextId);
  };

  const handleBack =
    previousIds.length > 0
      ? () => {
          const previousId = previousIds.at(-1);
          if (previousId === undefined) return;

          setPreviousIds((ids) => ids.slice(0, -1));
          setCurrentId(previousId);
        }
      : undefined;

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
