import { ReactNode } from "react";
import { QuestionId } from "../../../types";
import ProgressBar from "./ProgressBar";
import QuestionAnimation from "./QuestionAnimation";
import useNavButtons from "./useNavButtons";
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
    handleAnimationEnd,
    animationDirection,
    setAnimationDirection,
  } = useQuestionAnimation(children);

  const { heightOffset, exitingChildrenContainerRef, childrenContainerRef } =
    useProgressBarAnimation(exitingChildren);

  const { desktopButtons, mobileButtons } = useNavButtons(
    setAnimationDirection,
    onBack
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
        <QuestionAnimation
          exitingChildren={exitingChildren}
          onAnimationEnd={handleAnimationEnd}
          animationDirection={animationDirection}
          exitingChildrenContainerRef={exitingChildrenContainerRef}
          childrenContainerRef={childrenContainerRef}
        >
          {children}
        </QuestionAnimation>

        {desktopButtons}
      </div>

      {/* empty div to ensure even spacing */}
      <div className="flex-1 invisible hidden lg:block" />

      {mobileButtons}
    </form>
  );
}

export default QuestionLayout;
