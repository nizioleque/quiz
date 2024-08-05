import { Dispatch, SetStateAction } from "react";
import { Question } from "../types";

interface LoaderProps {
  setQuestions: Dispatch<SetStateAction<Question[] | null>>;
}

function Loader({ setQuestions }: LoaderProps) {
  const loadFile = async (file: File | undefined) => {
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      if (!("questions" in json)) throw new Error("Invalid JSON");

      // TODO remove/replace?
      for (const questionIndex in json.questions) {
        const question = json.questions[questionIndex];
        const nextQuestionIndex = parseInt(questionIndex) + 1;
        if (nextQuestionIndex < json.questions.length) {
          question.nextQuestionId = json.questions[nextQuestionIndex].id;
        }
      }

      setQuestions(json.questions);
    } catch {
      // TODO handle error
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-light mb-3">Questionnaire app</h1>
      <p>Upload a quiz definition to get started</p>
      <label>
        <input
          type="file"
          accept=".json"
          hidden
          onChange={(event) => loadFile(event.currentTarget.files?.[0])}
        />
        {/* TODO fix clicking next to the button */}
        <span className="button">Select file</span>
      </label>
    </div>
  );
}

export default Loader;
