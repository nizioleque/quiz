import { ReactNode, useLayoutEffect, useRef, useState } from "react";

function useProgressBarAnimation(exitingChildren: ReactNode | null) {
  const [heightOffset, setHeightOffset] = useState<number | null>(null);
  const exitingChildrenContainerRef = useRef<HTMLDivElement>(null);
  const childrenContainerRef = useRef<HTMLDivElement>(null);

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

  const handleAnimationEnd = () => {
    setHeightOffset(null);
  };

  return {
    heightOffset,
    handleAnimationEnd,
    exitingChildrenContainerRef,
    childrenContainerRef,
  };
}

export default useProgressBarAnimation;
