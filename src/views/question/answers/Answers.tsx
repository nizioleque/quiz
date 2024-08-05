import { Question } from "../../../types";
import InputAnswers from "./InputAnswers";
import MultipleChoiceAnswers from "./MultipleChoiceAnswers";
import SingleChoiceAnswers from "./SingleChoiceAnswers";

interface QuestionAnswersProps {
  question: Question;
}

function QuestionAnswers({ question }: QuestionAnswersProps) {
  switch (question.type) {
    case "single-choice":
      return <SingleChoiceAnswers question={question} />;
    case "multiple-choice":
      return <MultipleChoiceAnswers question={question} />;
    case "input":
      return <InputAnswers question={question} />;
  }
}

export default QuestionAnswers;
