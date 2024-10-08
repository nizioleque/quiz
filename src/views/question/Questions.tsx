import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { Answer } from "../../types";
import useQuestions from "../../useQuestions";
import QuestionLayout from "./layout/QuestionLayout";
import Question from "./Question";
import QuestionContext from "./QuestionContext";
import useQuestionNavigation from "./useQuestionNavigation";

interface QuestionsProps {
  questionsState: ReturnType<typeof useQuestions>;
  setAreQuestionsDone: Dispatch<SetStateAction<boolean>>;
}

function Questions({ questionsState, setAreQuestionsDone }: QuestionsProps) {
  const {
    questions,
    answers,
    updateAnswer: updateContextAnswer,
  } = questionsState;

  const navigationState = useQuestionNavigation(
    questionsState,
    setAreQuestionsDone
  );
  const { currentId } = navigationState;

  const question = useMemo(
    () => questions?.find((question) => question.id === currentId),
    [currentId, questions]
  );

  const answer = useMemo(
    () => (currentId !== null ? answers[currentId] : undefined),
    [answers, currentId]
  );

  const updateAnswer = useCallback(
    (update: SetStateAction<Answer>) => {
      if (currentId === null) return;
      updateContextAnswer(currentId, update);
    },
    [currentId, updateContextAnswer]
  );

  if (currentId === null || question === undefined) return null;

  return (
    <QuestionLayout
      navigationState={navigationState}
      maxQuestions={questions?.length ?? 0}
    >
      <QuestionContext.Provider value={{ question, answer, updateAnswer }}>
        <Question question={question} />
      </QuestionContext.Provider>
    </QuestionLayout>
  );
}

export default Questions;
