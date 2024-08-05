import { CSSProperties } from "react";

interface ProgressBarProps {
  heightOffset: number;
}

function ProgressBar({ heightOffset }: ProgressBarProps) {
  return (
    <div
      className="animate-slideToHeight"
      style={{ "--slide-height": `${heightOffset}px` } as CSSProperties}
    >
      <div className="bg-red-400 absolute top-0 -translate-y-full">
        progress bar
      </div>
    </div>
  );
}

export default ProgressBar;
