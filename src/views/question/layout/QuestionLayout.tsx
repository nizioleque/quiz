import clsx from "clsx";
import { ReactNode } from "react";
import { QuestionId } from "../../../types";
import ProgressBar from "./ProgressBar";
import QuestionLayoutButtons from "./QuestionLayoutButtons";
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

  return (
    <form
      className="flex items-center flex-col justify-center lg:flex-row gap-y-6 lg:w-full lg:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
    >
      <div
        key={currentId}
        className="flex-1 max-w-[600px] relative flex flex-col justify-center"
      >
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
        <ProgressBar
          heightOffset={heightOffset}
          // TODO calculate and pass correct values
          answeredQuestions={3}
          maxQuestions={7}
        />
        <div
          ref={childrenContainerRef}
          className={clsx(
            animationDirection === "left"
              ? "animate-slideInLeft"
              : "animate-slideInRight"
          )}
        >
          {children}
        </div>
      </div>

      <QuestionLayoutButtons
        onBack={onBack}
        setAnimationDirection={setAnimationDirection}
      />
    </form>
  );
}

export default QuestionLayout;
