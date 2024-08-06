import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { QuestionId } from "../../../types";

function useQuestionAnimation(
  children: ReactNode,
  currentId: QuestionId | null
) {
  const [exitingChildren, setExitingChildren] = useState<ReactNode | null>(
    null
  );
  const [lastChildren, setLastChildren] = useState<ReactNode | null>(null);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "right"
  >("left");

  useEffect(() => {
    setLastChildren(children);
  }, [children]);

  // only set exiting children when the question changes,
  // not when the same question is re-rendered
  useLayoutEffect(() => {
    setExitingChildren(lastChildren);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  const handleAnimationEnd = () => {
    setExitingChildren(null);
  };

  return {
    exitingChildren,
    handleAnimationEnd,
    animationDirection,
    setAnimationDirection,
  };
}

export default useQuestionAnimation;
