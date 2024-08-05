import Label from "../../../components/Label";
import { SingleChoiceQuestion } from "../../../types";

interface SingleChoiceAnswersProps {
  question: SingleChoiceQuestion;
}

function SingleChoiceAnswers({ question }: SingleChoiceAnswersProps) {
  return question.options.map((option, index) => (
    <Label key={index}>
      {/* TODO remove name? */}
      <input
        type="radio"
        name={question.id.toString()}
        value={index}
        className="appearance-none size-5 border-2 border-stone-500 rounded-full grid place-items-center before:size-3 before:rounded-full checked:before:bg-teal-700"
      />
      {option}
    </Label>
  ));
}

export default SingleChoiceAnswers;
