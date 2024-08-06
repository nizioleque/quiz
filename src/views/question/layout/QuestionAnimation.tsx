import clsx from "clsx";
import { ReactNode, RefObject } from "react";

interface QuestionAnimationProps {
  children: ReactNode;
  exitingChildren: ReactNode;
  onAnimationEnd: () => void;
  animationDirection: "left" | "right";
  exitingChildrenContainerRef: RefObject<HTMLDivElement>;
  childrenContainerRef: RefObject<HTMLDivElement>;
}

function QuestionAnimation({
  children,
  animationDirection,
  exitingChildren,
  exitingChildrenContainerRef,
  childrenContainerRef,
  onAnimationEnd,
}: QuestionAnimationProps) {
  return (
    <>
      <div
        ref={exitingChildrenContainerRef}
        className={clsx(
          "absolute w-full",
          animationDirection === "left"
            ? "animate-slideOutLeft"
            : "animate-slideOutRight"
        )}
        onAnimationEnd={onAnimationEnd}
        aria-hidden
      >
        {exitingChildren}
      </div>
      <div
        ref={childrenContainerRef}
        className={clsx(
          "flex-1",
          animationDirection === "left"
            ? "animate-slideInLeft"
            : "animate-slideInRight"
        )}
      >
        {children}
      </div>
    </>
  );
}

export default QuestionAnimation;
