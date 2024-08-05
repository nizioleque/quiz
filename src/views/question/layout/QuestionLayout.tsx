import clsx from "clsx";
import { ReactNode } from "react";
import { QuestionId } from "../../../types";
import NavButton from "./NavButton";
import ProgressBar from "./ProgressBar";
import useProgressBarAnimation from "./useProgressBarAnimation";
import useQuestionAnimation from "./useQuestionAnimation";

interface QuestionLayoutProps {
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  currentId: QuestionId;
}

function QuestionLayout({
  children,
  onBack,
  onNext,
  currentId,
}: QuestionLayoutProps) {
  const {
    exitingChildren,
    setExitingChildren,
    animationDirection,
    setAnimationDirection,
  } = useQuestionAnimation(children);

  const { heightOffset, exitingChildrenContainerRef, childrenContainerRef } =
    useProgressBarAnimation(exitingChildren);

  const backButton = onBack ? (
    <NavButton
      direction="back"
      onClick={() => {
        setAnimationDirection("right");
        onBack();
      }}
    />
  ) : null;

  const nextButton = (
    <NavButton
      direction="next"
      onClick={() => {
        setAnimationDirection("left");
      }}
    />
  );

  return (
    <form
      className="h-full flex flex-col gap-4 max-w-[600px] w-full mx-auto p-4"
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
    >
      <ProgressBar
        // TODO rerun animation instead of re-rendering
        key={`progress-${currentId}`}
        heightOffset={heightOffset}
        // TODO calculate and pass correct values
        answeredQuestions={3}
        maxQuestions={7}
      />
      <div key={currentId} className="flex items-center relative">
        <div
          ref={exitingChildrenContainerRef}
          className={clsx(
            "absolute w-full",
            animationDirection === "left"
              ? "animate-slideOutLeft"
              : "animate-slideOutRight"
          )}
          onAnimationEnd={() => setExitingChildren(null)}
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

        {/* back/forward buttons for desktop */}
        <div className="order-first overflow-visible hidden lg:flex w-0 justify-end">
          {backButton}
        </div>
        <div className="order-last overflow-visible hidden lg:block w-0">
          {nextButton}
        </div>
      </div>

      {/* empty div to ensure even spacing */}
      <div className="flex-1 invisible hidden lg:block" />

      {/* back/forward buttons for mobile */}
      <div className="flex-1 flex justify-between self-stretch lg:hidden -mx-2">
        <div>{backButton}</div>
        <div className="ms-auto">{nextButton}</div>
      </div>
    </form>
  );
}

export default QuestionLayout;
