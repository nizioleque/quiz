interface QuestionBase {
  type: string;
  question: string;

  /** Image URL */
  image?: string;
  title?: string;
  description?: string;
}

interface SingleChoiceQuestion extends QuestionBase {
  type: "single-choice";
  options: string[];
  correctIndex: number;
}

interface MultipleChoiceQuestion extends QuestionBase {
  type: "multiple-choice";
  options: string[];
  correctIndices: number[];
}

interface InputQuestion extends QuestionBase {
  type: "input";
  correctAnswers: string[];
}

export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | InputQuestion;
