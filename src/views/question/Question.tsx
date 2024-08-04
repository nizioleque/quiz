import { Question as QuestionType } from "../../types";
import QuestionAnswers from "./Answers";

interface QuestionProps {
  question: QuestionType;
  onNext: () => void;
  onBack?: () => void;
}

function Question({ question, onBack, onNext }: QuestionProps) {
  const backButton = onBack ? (
    <button type="button" onClick={onBack}>
      Back
    </button>
  ) : null;

  const nextButton = (
    <button type="submit" onClick={onNext}>
      Next
    </button>
  );

  return (
    <form
      className="flex items-center flex-col justify-center lg:flex-row gap-y-8 lg:w-full lg:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
    >
      <div className="bg-stone-200/25 border-stone-300 border-2 rounded-md p-8 overflow-hidden flex-1 max-w-[600px] lg:mx-8">
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
            <legend className="text-xl font-semibold mb-3">
              {question.question}
            </legend>
            <div className="flex flex-col gap-2">
              <QuestionAnswers question={question} />
            </div>
          </fieldset>
        </div>
      </div>

      {/* back/forward buttons for desktop */}
      <div className="order-first overflow-visible hidden lg:flex w-0 justify-end">
        {backButton}
      </div>
      <div className="order-last overflow-visible hidden lg:block w-0">
        {nextButton}
      </div>

      {/* back/forward buttons for mobile */}
      <div className="flex justify-between self-stretch lg:hidden">
        {backButton}
        <div className="ms-auto">{nextButton}</div>
      </div>
    </form>
  );
}

export default Question;
