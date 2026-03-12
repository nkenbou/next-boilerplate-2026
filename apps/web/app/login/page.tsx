import type { JSX } from "react";
import { Login, LoginFormContainer } from "./_components";

export default function Page(): JSX.Element {
  return <Login loginFormNode={<LoginFormContainer />} />;
}
