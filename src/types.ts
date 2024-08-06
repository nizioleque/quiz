export type QuestionId = string | number;

interface QuestionBase {
  id: QuestionId;
  type: string;

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
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: "multiple-choice";
  options: string[];
}

export interface InputQuestion extends QuestionBase {
  type: "input";
}

export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | InputQuestion;

export type Answer = number | number[] | string;
