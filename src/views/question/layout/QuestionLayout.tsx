import clsx from "clsx";
import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { QuestionId } from "../../../types";
import NavButton from "./NavButton";
import ProgressBar from "./ProgressBar";

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
  const [exitingChildren, setExitingChildren] = useState<ReactNode | null>(
    null
  );
  const [lastChildren, setLastChildren] = useState<ReactNode | null>(null);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "right"
  >("left");

  const [heightOffset, setHeightOffset] = useState<number>(0);
  const exitingChildrenContainerRef = useRef<HTMLDivElement>(null);
  const childrenContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (children === lastChildren) return;

    setExitingChildren(lastChildren);
    setLastChildren(children);
  }, [children, lastChildren]);

  useLayoutEffect(() => {
    if (
      !exitingChildren ||
      !exitingChildrenContainerRef.current ||
      !childrenContainerRef.current
    ) {
      return;
    }

    const exitingTop =
      exitingChildrenContainerRef.current.getBoundingClientRect().top;
    const currentTop = childrenContainerRef.current.getBoundingClientRect().top;
    const heightOffset = exitingTop - currentTop;
    setHeightOffset(heightOffset);
  }, [exitingChildren]);

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
        <ProgressBar heightOffset={heightOffset} />
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
    </form>
  );
}

export default QuestionLayout;
