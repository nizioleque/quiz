import { useState } from "react";
import { Question as QuestionType } from "./types";
import Loader from "./views/Loader";
import Questions from "./views/question/Questions";
import ThankYou from "./views/ThankYou";

function AppContent() {
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [areQuestionsDone, setAreQuestionsDone] = useState<boolean>(false);

  // TODO handle empty questions file

  if (questions === null) return <Loader setQuestions={setQuestions} />;
  if (areQuestionsDone) return <ThankYou />;
  return (
    <Questions
      questions={questions}
      setAreQuestionsDone={setAreQuestionsDone}
    />
  );
}

export default AppContent;
