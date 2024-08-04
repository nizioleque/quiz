import { ComponentProps } from "react";

function Label(props: Omit<ComponentProps<"label">, "className">) {
  return <label className="flex gap-2 items-center" {...props} />;
}

export default Label;
