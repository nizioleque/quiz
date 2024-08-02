import { useState } from "react";
import Loader from "./Loader";
import { Question } from "./types";

function App() {
  const [questions, setQuestions] = useState<Question[] | null>(null);

  return (
    <>
      <Loader setQuestions={setQuestions} />
    </>
  );
}

export default App;
