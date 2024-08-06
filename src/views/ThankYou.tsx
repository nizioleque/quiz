import { Answer, QuestionId } from "../types";

interface ThankYouProps {
  answers: Record<QuestionId, Answer>;
}

function ThankYou({ answers }: ThankYouProps) {
  return (
    <div className="flex flex-col items-start m-auto gap-4">
      <h1 className="text-3xl font-light">Thank you!</h1>
      <p>Here are your responses in a computer-friendly format</p>
      <pre>{JSON.stringify(answers, null, 2)}</pre>
    </div>
  );
}

export default ThankYou;
