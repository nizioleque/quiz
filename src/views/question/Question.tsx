import { Question as QuestionType } from "../../types";
import QuestionAnswers from "./Answers";

interface QuestionProps {
  question: QuestionType;
  onNext: () => void;
  onBack?: () => void;
}

function Question({ question, onBack, onNext }: QuestionProps) {
  return (
    <form
      className="flex items-center"
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
    >
      <div className="bg-stone-200/25 border-stone-300 border-2 rounded-md p-8 overflow-hidden max-w-[600px]">
        {question.image && (
          <div className="-mt-8 -mx-8 mb-8">
            <img
              className="w-full h-auto object-cover"
              src={question.image}
              // TODO add/remove alt text?
              alt="Question"
            />
          </div>
        )}

        <div className="flex flex-col gap-4">
          {question.title && (
            <h1 className="text-2xl text-stone-700">{question.title}</h1>
          )}

          {question.description && (
            <p className="text-stone-700">{question.description}</p>
          )}

          <fieldset className="mt-4 first:mt-0">
            <legend className="text-lg font-semibold mb-2">
              {question.question}
            </legend>
            <div className="flex flex-col gap-1">
              <QuestionAnswers question={question} />
            </div>
          </fieldset>
        </div>
      </div>

      {onBack && (
        <div className="order-first overflow-visible">
          <button type="button" onClick={onBack}>
            Back
          </button>
        </div>
      )}
      <div className="order-last overflow-visible">
        <button type="submit">Next</button>
      </div>
    </form>
  );
}

export default Question;
