"use server";

import { createLoginAuthenticationProcessor } from "@app/command-interface-adapter-impl/processors";
import { redirect } from "next/navigation";
import { createSession } from "#lib/session";
import { type LoginAuthenticationState } from "../type";
import { loginController } from "./login-controller";
import { LoginFormState } from "./login-state";

export async function login(
  prevState: LoginAuthenticationState,
  formData: FormData,
): Promise<LoginAuthenticationState> {
  const presenter = new LoginFormState(prevState, createSession, redirect);
  const command = createLoginAuthenticationProcessor(presenter);
  await loginController(formData, command, presenter);
  await presenter.commit();
  return presenter.getState();
}
