import { ReactNode, useLayoutEffect, useState } from "react";

function useQuestionAnimation(children: ReactNode) {
  const [exitingChildren, setExitingChildren] = useState<ReactNode | null>(
    null
  );
  const [lastChildren, setLastChildren] = useState<ReactNode | null>(null);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "right"
  >("left");

  useLayoutEffect(() => {
    if (children === lastChildren) return;

    setExitingChildren(lastChildren);
    setLastChildren(children);
  }, [children, lastChildren]);

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
