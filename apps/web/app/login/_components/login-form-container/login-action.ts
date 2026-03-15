"use server";

import { createLoginAuthenticationProcessor } from "@app/command-interface-adapter-impl/processors";
import { SessionLogger } from "@app/infrastructure/logger";
import { redirect } from "next/navigation";
import { createSession, verifySession } from "#lib/session";
import { type LoginAuthenticationState } from "../type";
import { loginController } from "./login-controller";
import { LoginFormState } from "./login-form-state";

export async function login(
  prevState: LoginAuthenticationState,
  formData: FormData,
): Promise<LoginAuthenticationState> {
  const session = await verifySession();
  const logger = SessionLogger.create(session.sessionId);
  const presenter = new LoginFormState(prevState, createSession, redirect);
  const command = createLoginAuthenticationProcessor(presenter, logger);
  await loginController(formData, command, presenter);
  return presenter.next();
}
