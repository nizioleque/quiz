import { ReactNode } from "react";
import NavButton from "./NavButton";

interface QuestionLayoutProps {
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
}

function QuestionLayout({ children, onBack, onNext }: QuestionLayoutProps) {
  const backButton = onBack ? (
    <NavButton direction="back" onClick={onBack} />
  ) : null;

  const nextButton = <NavButton direction="next" onClick={onNext} />;

  return (
    <form
      className="flex items-center flex-col justify-center lg:flex-row gap-y-8 lg:w-full lg:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
    >
      {children}

      {/* back/forward buttons for desktop */}
      <div className="order-first overflow-visible hidden lg:flex w-0 justify-end">
        {backButton}
      </div>
      <div className="order-last overflow-visible hidden lg:block w-0">
        {nextButton}
      </div>

      {/* back/forward buttons for mobile */}
      <div className="flex justify-between self-stretch lg:hidden">
        {backButton}
        <div className="ms-auto">{nextButton}</div>
      </div>
    </form>
  );
}

export default QuestionLayout;
