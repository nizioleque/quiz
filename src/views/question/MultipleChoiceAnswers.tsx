import Label from "../../components/Label";
import { MultipleChoiceQuestion } from "../../types";

interface MultipleChoiceAnswersProps {
  question: MultipleChoiceQuestion;
}

function MultipleChoiceAnswers({ question }: MultipleChoiceAnswersProps) {
  return question.options.map((option, index) => (
    <Label key={index}>
      {/* TODO remove name? */}
      <input
        type="checkbox"
        name={`${question.id}-${index}`}
        className="appearance-none size-5 border-2 border-stone-500 rounded-sm grid place-items-center before:size-[14px] before:clip-close checked:before:bg-teal-700"
      />
      {option}
    </Label>
  ));
}

export default MultipleChoiceAnswers;
