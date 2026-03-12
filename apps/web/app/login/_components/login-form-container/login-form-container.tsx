"use client";

import { type JSX, useActionState } from "react";
import { LoginForm } from "../login-form";
import { login } from "./actions";

export function LoginFormContainer(): JSX.Element {
  const [state, action] = useActionState(login, undefined);
  return <LoginForm state={state} loginAction={action} />;
}
