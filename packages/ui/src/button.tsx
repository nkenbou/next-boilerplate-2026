import { ButtonHTMLAttributes, JSX } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly variant?: "primary" | "secondary";
};

export function Button({
  variant = "primary",
  children,
  ...props
}: Props): JSX.Element {
  return (
    <button data-variant={variant} {...props}>
      {children}
    </button>
  );
}
