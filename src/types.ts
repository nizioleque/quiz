export type QuestionId = string | number;

interface QuestionBase {
  id: QuestionId;
  type: string;
  nextQuestionId?: QuestionId;

  /** Image URL */
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;

  question: string;
}

export interface SingleChoiceQuestion extends QuestionBase {
  type: "single-choice";
  options: string[];
  correctIndex: number;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: "multiple-choice";
  options: string[];
  correctIndices: number[];
}

export interface InputQuestion extends QuestionBase {
  type: "input";
  correctAnswers: string[];
}

export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | InputQuestion;
