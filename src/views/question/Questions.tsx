import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Answer, QuestionId, Question as QuestionType } from "../../types";
import AnswerContext from "./AnswerContext";
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

  const [answers, setAnswers] = useState<Record<QuestionId, Answer>>({});

  const currentQuestion = useMemo(
    () => questions.find((question) => question.id === currentId),
    [currentId, questions]
  );

  if (currentId === null || currentQuestion === undefined) return null;

  return (
    <QuestionLayout navigationState={navigationState}>
      <AnswerContext.Provider value={{ answers, setAnswers }}>
        <Question question={currentQuestion} />
      </AnswerContext.Provider>
    </QuestionLayout>
  );
}

export default Questions;
