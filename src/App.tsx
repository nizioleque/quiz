import { useState } from "react";
import Loader from "./Loader";
import Question from "./question/Question";
import { Question as QuestionType } from "./types";

function App() {
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);

  return (
    <>
      <Loader setQuestions={setQuestions} />
      {questions?.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </>
  );
}

export default App;
