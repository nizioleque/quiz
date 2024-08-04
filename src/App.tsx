import { useState } from "react";
import Loader from "./Loader";
import Questions from "./question/Questions";
import ThankYou from "./ThankYou";
import { Question as QuestionType } from "./types";

function App() {
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

export default App;
