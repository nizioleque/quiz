import Label from "../../../components/Label";
import { MultipleChoiceQuestion } from "../../../types";
import { useQuestionContext } from "../QuestionContext";

interface MultipleChoiceAnswersProps {
  question: MultipleChoiceQuestion;
}

function MultipleChoiceAnswers({ question }: MultipleChoiceAnswersProps) {
  const { answer, updateAnswer } = useQuestionContext();

  return question.options.map((option, index) => (
    <Label key={index}>
      <input
        type="checkbox"
        className="appearance-none size-5 border-2 border-stone-500 rounded-sm grid place-items-center before:size-[14px] before:clip-close checked:before:bg-teal-700"
        value={index}
        checked={Array.isArray(answer) && answer.includes(index)}
        onChange={() =>
          updateAnswer((currentAnswer) => {
            if (!Array.isArray(currentAnswer)) return [index];
            if (currentAnswer.includes(index)) {
              return currentAnswer.filter((value) => value !== index);
            }
            return [...currentAnswer, index];
          })
        }
      />
      {option}
    </Label>
  ));
}

export default MultipleChoiceAnswers;
