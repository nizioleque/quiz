import { MultipleChoiceQuestion } from "../types";

interface MultipleChoiceAnswersProps {
  question: MultipleChoiceQuestion;
}

function MultipleChoiceAnswers({ question }: MultipleChoiceAnswersProps) {
  return question.options.map((option, index) => (
    <label key={index}>
      {/* TODO remove name? */}
      <input type="checkbox" name={`${question.id}-${index}`} />
      {option}
    </label>
  ));
}

export default MultipleChoiceAnswers;
