import clsx from "clsx";
import { CSSProperties } from "react";

interface ProgressBarProps {
  heightOffset: number | null;
  onAnimationEnd: () => void;
  answeredQuestions: number;
  maxQuestions: number;
}

function ProgressBar({
  heightOffset,
  onAnimationEnd,
  answeredQuestions,
  maxQuestions,
}: ProgressBarProps) {
  const remainingQuestions = maxQuestions - answeredQuestions;

  return (
    <div className="flex-1 flex flex-col justify-end">
      <div
        className={clsx(heightOffset && "animate-slideToHeight")}
        onAnimationEnd={onAnimationEnd}
        style={{ "--slide-height": `${heightOffset}px` } as CSSProperties}
      >
        <nav className="w-full -z-10">
          <div
            className="w-full rounded-md h-2 bg-stone-300 mb-2 overflow-hidden"
            aria-hidden
          >
            <div
              className="bg-teal-700 h-full transition-width duration-[400ms]"
              style={{ width: `${(answeredQuestions / maxQuestions) * 100}%` }}
            />
          </div>
          <div className="text-end text-stone-700 text-sm">
            Up to {remainingQuestions} questions left
          </div>
        </nav>
      </div>
    </div>
  );
}

export default ProgressBar;
