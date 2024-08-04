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
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
    >
      {question.title && <h1>{question.title}</h1>}

      {question.description && <p>{question.description}</p>}

      {question.image && (
        <img
          src={question.image}
          // TODO add/remove alt text?
          alt="Question"
        />
      )}

      <fieldset>
        <legend>{question.question}</legend>

        <QuestionAnswers question={question} />
      </fieldset>

      {onBack && (
        <button type="button" onClick={onBack}>
          Back
        </button>
      )}
      <button type="submit">Next</button>
    </form>
  );
}

export default Question;
