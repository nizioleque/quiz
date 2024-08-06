import { Question as QuestionType } from "../../types";
import QuestionAnswers from "./answers/Answers";

interface QuestionProps {
  question: QuestionType;
}

function Question({ question }: QuestionProps) {
  return (
    <div className="bg-stone-150 border-stone-300 border-2 rounded-md p-8 overflow-hidden">
      {question.image && (
        <div className="-mt-8 -mx-8 mb-8">
          <img
            className="w-full h-auto object-cover"
            src={question.image}
            alt={question.imageAlt ?? ""}
          />
        </div>
      )}

      <div className="flex flex-col gap-4">
        {question.title && (
          <h1 className="text-2xl text-stone-700">{question.title}</h1>
        )}

        {question.description && (
          <p className="text-stone-700 text-justify">{question.description}</p>
        )}

        <fieldset className="mt-4 first:mt-0">
          <legend className="text-xl font-semibold mb-3">
            {question.question}
          </legend>
          <div className="flex flex-col gap-2">
            <QuestionAnswers question={question} />
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default Question;
