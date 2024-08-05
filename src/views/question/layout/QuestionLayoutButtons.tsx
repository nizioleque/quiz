import { Dispatch, SetStateAction } from "react";
import NavButton from "./NavButton";

interface QuestionLayoutButtonsProps {
  onBack?: () => void;
  setAnimationDirection: Dispatch<SetStateAction<"left" | "right">>;
}

function QuestionLayoutButtons({
  onBack,
  setAnimationDirection,
}: QuestionLayoutButtonsProps) {
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
    <>
      {/* back/forward buttons for desktop */}
      <div className="order-first overflow-visible hidden lg:flex w-0 justify-end">
        {backButton}
      </div>
      <div className="order-last overflow-visible hidden lg:block w-0">
        {nextButton}
      </div>

      {/* back/forward buttons for mobile */}
      <div className="flex justify-between self-stretch lg:hidden -mx-2">
        {backButton}
        <div className="ms-auto">{nextButton}</div>
      </div>
    </>
  );
}

export default QuestionLayoutButtons;
