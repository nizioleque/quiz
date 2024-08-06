import { useQuestionContext } from "../QuestionContext";
import NavButton from "./NavButton";

function useNavButtons(onBack: (() => void) | undefined) {
  const { question, answer } = useQuestionContext();

  const backButton = (
    <NavButton
      direction="back"
      onClick={onBack}
      disabled={onBack === undefined}
    />
  );

  const nextButton = (
    <NavButton
      direction="next"
      disabled={
        (question.type === "single-choice" && answer === undefined) ||
        (question.type === "input" && (answer === undefined || answer === ""))
      }
    />
  );

  const desktopButtons = (
    <>
      <div className="order-first overflow-visible hidden lg:flex w-0 justify-end">
        {backButton}
      </div>
      <div className="order-last overflow-visible hidden lg:block w-0">
        {nextButton}
      </div>
    </>
  );

  const mobileButtons = (
    <div className="flex-1 flex justify-between self-stretch lg:hidden -mx-2">
      <div>{backButton}</div>
      <div className="ms-auto">{nextButton}</div>
    </div>
  );

  return { desktopButtons, mobileButtons };
}

export default useNavButtons;
