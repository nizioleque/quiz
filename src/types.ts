export type QuestionId = string | number;

interface QuestionBase {
  id: QuestionId;
  type: string;

  /** Image URL */
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  defaultHidden?: boolean;

  question: string;
}

export interface SingleChoiceQuestion extends QuestionBase {
  type: "single-choice";
  options: string[];
  conditions?: ChoiceQuestionCondition[];
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: "multiple-choice";
  options: string[];
  conditions?: ChoiceQuestionCondition[];
}

export interface InputQuestion extends QuestionBase {
  type: "input";
  variant?: "single-line" | "multi-line";
  optional?: boolean;
  conditions?: InputQuestionCondition[];
}

export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | InputQuestion;

export type Answer = number | number[] | string;

export interface QuestionCondition {
  affectedQuestionId: QuestionId;
  action: "show" | "hide";
}

/** The condition will be true if the answer at `answerIndex`
 * has the value `condition`.
 *
 * Then `action` will be performed on the question with the ID `affectedQuestionId`.
 *  */
export interface ChoiceQuestionCondition extends QuestionCondition {
  answerIndex: number;
  condition: "selected" | "not-selected";
}

/** The condition will be true if the answer is `condition` to `answerValue`.
 *
 * Then `action` will be performed on the question with the ID `affectedQuestionId`.
 *  */
export interface InputQuestionCondition extends QuestionCondition {
  answerValue: number;
  condition: "equal" | "not-equal";
}
