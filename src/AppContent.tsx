import { useState } from "react";
import useQuestions from "./useQuestions";
import Loader from "./views/Loader";
import Questions from "./views/question/Questions";
import ThankYou from "./views/ThankYou";

function AppContent() {
  const questionsState = useQuestions();
  const { questions, answers, setQuestions, setIsQuestionShown } =
    questionsState;

  const [areQuestionsDone, setAreQuestionsDone] = useState<boolean>(false);

  // TODO handle empty questions file

  if (questions === null)
    return (
      <Loader
        setQuestions={setQuestions}
        setIsQuestionShown={setIsQuestionShown}
      />
    );
  if (areQuestionsDone) return <ThankYou answers={answers} />;
  return (
    <Questions
      questionsState={questionsState}
      setAreQuestionsDone={setAreQuestionsDone}
    />
  );
}

export default AppContent;
