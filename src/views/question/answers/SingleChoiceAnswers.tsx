import Label from "../../../components/Label";
import { SingleChoiceQuestion } from "../../../types";
import { useQuestionContext } from "../QuestionContext";

interface SingleChoiceAnswersProps {
  question: SingleChoiceQuestion;
}

function SingleChoiceAnswers({ question }: SingleChoiceAnswersProps) {
  const { answer, updateAnswer } = useQuestionContext();

  return question.options.map((option, index) => (
    <Label key={index}>
      <input
        type="radio"
        className="appearance-none size-5 border-2 border-stone-500 rounded-full grid place-items-center before:size-3 before:rounded-full checked:before:bg-teal-700"
        value={index}
        checked={answer === index}
        onChange={(event) => updateAnswer(parseInt(event.target.value))}
      />
      {option}
    </Label>
  ));
}

export default SingleChoiceAnswers;
