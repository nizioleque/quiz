import { produce } from "immer";
import { SetStateAction, useCallback, useState } from "react";
import {
  Answer,
  ChoiceQuestionCondition,
  InputQuestionCondition,
  Question,
  QuestionCondition,
  QuestionId,
} from "./types";

function useQuestions() {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [answers, setAnswers] = useState<Record<QuestionId, Answer>>({});
  const [isQuestionShown, setIsQuestionShown] = useState<
    Record<QuestionId, boolean>
  >({});

  const updateAnswer = useCallback(
    (id: QuestionId, answer: SetStateAction<Answer>) => {
      if (id === null) return;

      // evaluate and set new answer
      const newAnswer =
        typeof answer === "function" ? answer(answers[id]) : answer;
      setAnswers(
        produce((answers) => {
          answers[id] = newAnswer;
        })
      );

      // check conditions and update isQuestionShown accordingly
      const question = questions?.find((question) => question.id === id);
      if (!question || !questions) return;

      if (question.type === "input") {
        handleInputConditions(question.conditions);
      } else {
        handleOptionConditions(question.conditions);
      }

      function handleInputConditions(conditions?: InputQuestionCondition[]) {
        for (const condition of conditions ?? []) {
          const isEqual = newAnswer === condition.answerValue;
          const shouldActivate =
            (isEqual && condition.condition === "equal") ||
            (!isEqual && condition.condition === "not-equal");

          executeCondition(condition, shouldActivate);
        }
      }

      function handleOptionConditions(conditions?: ChoiceQuestionCondition[]) {
        for (const condition of conditions ?? []) {
          const isAnswerSelected = Array.isArray(newAnswer)
            ? newAnswer.includes(condition.answerIndex)
            : newAnswer === condition.answerIndex;
          const shouldActivate =
            (isAnswerSelected && condition.condition === "selected") ||
            (!isAnswerSelected && condition.condition === "not-selected");

          executeCondition(condition, shouldActivate);
        }
      }

      function executeCondition(
        { affectedQuestionId: id, action }: QuestionCondition,
        enabled: boolean
      ) {
        const affectedQuestion = questions?.find(
          (question) => question.id === id
        );

        setIsQuestionShown(
          produce((isQuestionShown) => {
            if (enabled) {
              isQuestionShown[id] = action === "show";
            } else {
              // restore defaultHidden
              // TODO improve logic to handle cases where multiple
              // conditions affect the same question
              isQuestionShown[id] = !affectedQuestion?.defaultHidden;
            }
          })
        );

        // remove answers if the question is hidden
        if (
          (!enabled && affectedQuestion?.defaultHidden) ||
          (enabled && action === "hide" && !affectedQuestion?.defaultHidden)
        ) {
          setAnswers(
            produce((answers) => {
              delete answers[id];
            })
          );
        }
      }
    },
    [answers, questions]
  );

  return {
    questions,
    setQuestions,
    isQuestionShown,
    setIsQuestionShown,
    answers,
    updateAnswer,
  };
}

export default useQuestions;
