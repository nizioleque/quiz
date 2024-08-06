import { Dispatch, SetStateAction } from "react";
import { Question, QuestionId } from "../types";

interface LoaderProps {
  setQuestions: Dispatch<SetStateAction<Question[] | null>>;
  setIsQuestionShown: Dispatch<SetStateAction<Record<QuestionId, boolean>>>;
}

function Loader({ setQuestions, setIsQuestionShown }: LoaderProps) {
  const loadFile = async (file: File | undefined) => {
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      if (!("questions" in json)) throw new Error("Invalid JSON");

      const isShown: Record<QuestionId, boolean> = {};
      for (const question of json.questions) {
        isShown[question.id] = !question.defaultHidden;
      }

      setQuestions(json.questions);
      setIsQuestionShown(isShown);
    } catch {
      // TODO handle error
    }
  };

  return (
    <div className="flex flex-col gap-3 m-auto">
      <h1 className="text-3xl font-light mb-3">Questionnaire app</h1>
      <p>Upload a quiz definition to get started</p>
      <label className="self-start">
        <input
          type="file"
          accept=".json"
          hidden
          onChange={(event) => loadFile(event.currentTarget.files?.[0])}
        />
        <span className="button">Select file</span>
      </label>
    </div>
  );
}

export default Loader;
