import { InputQuestion } from "../../../types";

interface InputAnswersProps {
  question: InputQuestion;
}

function InputAnswers({ question }: InputAnswersProps) {
  return (
    // TODO remove name?
    <input name={question.id.toString()} />
  );
}

export default InputAnswers;
