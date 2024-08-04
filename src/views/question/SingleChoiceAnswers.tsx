import { SingleChoiceQuestion } from "../../types";

interface SingleChoiceAnswersProps {
  question: SingleChoiceQuestion;
}

function SingleChoiceAnswers({ question }: SingleChoiceAnswersProps) {
  return question.options.map((option, index) => (
    <label key={index}>
      {/* TODO remove name? */}
      <input type="radio" name={question.id.toString()} value={index} />
      {option}
    </label>
  ));
}

export default SingleChoiceAnswers;
