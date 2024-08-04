import { ComponentProps } from "react";

function Label(props: Omit<ComponentProps<"label">, "className">) {
  return <label className="flex gap-1" {...props} />;
}

export default Label;
