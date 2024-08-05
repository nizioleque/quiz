import { CSSProperties } from "react";

interface ProgressBarProps {
  heightOffset: number;
  answeredQuestions: number;
  maxQuestions: number;
}

function ProgressBar({
  heightOffset,
  answeredQuestions,
  maxQuestions,
}: ProgressBarProps) {
  const remainingQuestions = maxQuestions - answeredQuestions;

  return (
    <div
      className="animate-slideToHeight"
      style={{ "--slide-height": `${heightOffset}px` } as CSSProperties}
    >
      <nav className="absolute top-0 -translate-y-full pb-4 w-full -z-10">
        <div
          className="w-full rounded-md h-2 bg-stone-300 mb-2 overflow-hidden"
          aria-hidden
        >
          <div
            className="bg-teal-700 h-full"
            style={{ width: `${(answeredQuestions / maxQuestions) * 100}%` }}
          />
        </div>
        <div className="text-end text-stone-700 text-sm">
          Up to {remainingQuestions} questions left
        </div>
      </nav>
    </div>
  );
}

export default ProgressBar;
