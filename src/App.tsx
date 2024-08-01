import { useState } from "react";
import Loader from "./Loader";
import { Question } from "./types";

function App() {
  const [questions, setQuesitons] = useState<Question[]>([]);

  return (
    <>
      <Loader setQuestions={setQuesitons} />
      <pre>{JSON.stringify(questions, null, 2)}</pre>
    </>
  );
}

export default App;
