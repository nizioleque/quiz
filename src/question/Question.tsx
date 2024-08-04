import { Question as QuestionType } from "../types";
import QuestionAnswers from "./Answers";

interface QuestionProps {
  question: QuestionType;
}

function Question({ question }: QuestionProps) {
  return (
    <form
      // prevent showing answers in URL when JS is disabled
      // TODO prevent submission?
      method="post"
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

      <button type="submit">Next</button>
    </form>
  );
}

export default Question;
