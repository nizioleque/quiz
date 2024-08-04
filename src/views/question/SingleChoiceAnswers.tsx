import Label from "../../components/Label";
import { SingleChoiceQuestion } from "../../types";

interface SingleChoiceAnswersProps {
  question: SingleChoiceQuestion;
}

function SingleChoiceAnswers({ question }: SingleChoiceAnswersProps) {
  return question.options.map((option, index) => (
    <Label key={index}>
      {/* TODO remove name? */}
      <input type="radio" name={question.id.toString()} value={index} />
      {option}
    </Label>
  ));
}

export default SingleChoiceAnswers;
