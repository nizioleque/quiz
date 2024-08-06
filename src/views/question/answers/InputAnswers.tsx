import { InputQuestion } from "../../../types";
import { useQuestionContext } from "../QuestionContext";

interface InputAnswersProps {
  question: InputQuestion;
}

function InputAnswers({ question }: InputAnswersProps) {
  const { answer, updateAnswer } = useQuestionContext();

  const Component = question.variant === "multi-line" ? "textarea" : "input";

  return (
    <Component
      className="border-2 border-stone-300 rounded-md p-2"
      placeholder="Type here..."
      value={answer?.toString() ?? ""}
      onChange={(event) => updateAnswer(event.currentTarget.value)}
    />
  );
}

export default InputAnswers;
