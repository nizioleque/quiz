import { useAnswerContext } from "../AnswerContext";

function InputAnswers() {
  const { answer, updateAnswer } = useAnswerContext();

  return (
    <input
      value={answer?.toString() ?? ""}
      onChange={(event) => updateAnswer(event.currentTarget.value)}
    />
  );
}

export default InputAnswers;
