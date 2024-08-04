import clsx from "clsx";

interface NavButtonProps {
  direction: "next" | "back";
  onClick: () => void;
}

const BackIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="size-5"
  >
    <path
      fillRule="evenodd"
      d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
      clipRule="evenodd"
    />
  </svg>
);

const NextIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="size-5"
  >
    <path
      fillRule="evenodd"
      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

function NavButton({ direction, onClick }: NavButtonProps) {
  const icon = direction === "next" ? NextIcon : BackIcon;
  const text = direction === "next" ? "Next" : "Back";
  const type = direction === "next" ? "submit" : "button";

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "group flex items-center",
        direction === "back" && "flex-row-reverse",
        "hover:bg-stone-200 p-2 rounded-md uppercase text-sm tracking-wider text-stone-700 transition-colors"
      )}
    >
      {text}
      <div
        className={clsx(
          direction === "next"
            ? "group-hover:translate-x-1"
            : "group-hover:-translate-x-1",
          "transition-transform"
        )}
      >
        {icon}
      </div>
    </button>
  );
}

export default NavButton;
