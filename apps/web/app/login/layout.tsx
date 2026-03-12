import { JSX } from "react";
import { LoginBox } from "./_components";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <LoginBox>{children}</LoginBox>;
}
