"use server";

import { redirect } from "next/navigation";
import { createSession } from "#lib/session";
import { LoginAuthenticationState } from "../type";
import { LoginAuthenticationPresenter } from "./login-authentication-presenter";

export async function login(
  state: LoginAuthenticationState,
  formData: FormData,
): Promise<LoginAuthenticationState> {
  const presenter = new LoginAuthenticationPresenter(createSession, redirect);
  return presenter.authenticate(formData);
}
