import { InputQuestion } from "../../../types";
import { useAnswerContext } from "../AnswerContext";

interface InputAnswersProps {
  question: InputQuestion;
}

function InputAnswers({ question }: InputAnswersProps) {
  const { answer, updateAnswer } = useAnswerContext(question.id);

  return (
    <input
      value={answer?.toString() ?? ""}
      onChange={(event) => updateAnswer(event.currentTarget.value)}
    />
  );
}

export default InputAnswers;
