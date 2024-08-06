import { useQuestionContext } from "../QuestionContext";

function InputAnswers() {
  const { answer, updateAnswer } = useQuestionContext();

  return (
    <input
      value={answer?.toString() ?? ""}
      onChange={(event) => updateAnswer(event.currentTarget.value)}
    />
  );
}

export default InputAnswers;
