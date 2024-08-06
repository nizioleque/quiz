import { Dispatch, SetStateAction } from "react";
import { Question, QuestionId } from "../types";

interface LoaderProps {
  setQuestions: Dispatch<SetStateAction<Question[] | null>>;
  setIsQuestionShown: Dispatch<SetStateAction<Record<QuestionId, boolean>>>;
}

function Loader({ setQuestions, setIsQuestionShown }: LoaderProps) {
  const loadFile = async (file: Blob | undefined) => {
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

  const loadServerFile = async (name: string) => {
    const file = await fetch(`/example-quizes/${name}.json`);
    loadFile(await file.blob());
  };

  return (
    <div className="flex flex-col items-start m-auto">
      <h1 className="text-3xl font-light mb-12">Welcome to the Quiz app!</h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p>Upload a quiz definition to get started</p>
          <label className="group">
            <input
              type="file"
              accept=".json"
              // input cannot be hidden because we need focus for accessibility
              className="size-0"
              onChange={(event) => loadFile(event.currentTarget.files?.[0])}
            />
            <div className="button max-w-[200px] w-full group-focus-within:outline group-focus-within:outline-2 group-focus-within:outline-black">
              Select file
            </div>
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <p>Or select one of the examples</p>
          <button
            className="button max-w-[200px]"
            onClick={() => loadServerFile("medical-questionnaire")}
          >
            Medical questionnaire
          </button>
          <button
            className="button max-w-[200px]"
            onClick={() => loadServerFile("conditional-navigation")}
          >
            Conditional navigation
          </button>
        </div>
      </div>
    </div>
  );
}

export default Loader;
