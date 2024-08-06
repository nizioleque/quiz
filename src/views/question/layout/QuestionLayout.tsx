import { ReactNode } from "react";
import useQuestionNavigation from "../useQuestionNavigation";
import ProgressBar from "./ProgressBar";
import QuestionAnimation from "./QuestionAnimation";
import useNavButtons from "./useNavButtons";
import useProgressBarAnimation from "./useProgressBarAnimation";
import useQuestionAnimation from "./useQuestionAnimation";

interface QuestionLayoutProps {
  children: ReactNode;
  navigationState: ReturnType<typeof useQuestionNavigation>;
  maxQuestions: number;
}

function QuestionLayout({
  children,
  navigationState,
  maxQuestions,
}: QuestionLayoutProps) {
  const { currentId, navigateBack, navigateNext, currentIndex } =
    navigationState;

  const {
    exitingChildren,
    handleAnimationEnd,
    animationDirection,
    setAnimationDirection,
  } = useQuestionAnimation(children, currentId);

  const {
    heightOffset,
    handleAnimationEnd: handleProgressBarAnimationEnd,
    exitingChildrenContainerRef,
    childrenContainerRef,
  } = useProgressBarAnimation(exitingChildren);

  const handleBack = navigateBack
    ? () => {
        setAnimationDirection("right");
        navigateBack();
      }
    : undefined;

  const handleNext = () => {
    setAnimationDirection("left");
    navigateNext();
  };

  const { desktopButtons, mobileButtons } = useNavButtons(handleBack);

  return (
    <form
      className="h-full flex flex-col gap-4 max-w-[600px] w-full mx-auto p-4"
      onSubmit={(event) => {
        event.preventDefault();
        handleNext();
      }}
    >
      <ProgressBar
        heightOffset={heightOffset}
        onAnimationEnd={handleProgressBarAnimationEnd}
        answeredQuestions={currentIndex}
        maxQuestions={maxQuestions}
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
