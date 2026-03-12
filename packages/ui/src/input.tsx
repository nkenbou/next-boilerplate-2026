import { InputHTMLAttributes, JSX } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: Props): JSX.Element {
  return <input {...props} />;
}
