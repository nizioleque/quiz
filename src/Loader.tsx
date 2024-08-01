import { Dispatch, SetStateAction } from "react";
import { Question } from "./types";

interface LoaderProps {
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}

function Loader({ setQuestions }: LoaderProps) {
  const loadFile = async (file: File | undefined) => {
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      setQuestions(json);
    } catch {
      // TODO handle error
    }
  };

  return (
    <input
      type="file"
      accept=".json"
      onChange={(event) => loadFile(event.currentTarget.files?.[0])}
    />
  );
}

export default Loader;
