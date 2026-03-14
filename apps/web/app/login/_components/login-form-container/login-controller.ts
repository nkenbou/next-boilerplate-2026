import { UserPassword, Username } from "@app/command-domain";
import { type LoginAuthenticationCommandProcessor } from "@app/command-interface-adapter-if";

export type LoginFormErrorType = "INVALID_USERNAME" | "INVALID_USER_PASSWORD";

export interface LoginFormPresenter {
  presentFormData(fields: { username: string; password: string }): void;
  presentValidationError(
    field: "username" | "password",
    errorType: LoginFormErrorType,
  ): void;
}

export async function loginController(
  formData: FormData,
  command: LoginAuthenticationCommandProcessor,
  presenter: LoginFormPresenter,
): Promise<void> {
  const username = formData.get("username");
  const password = formData.get("password");
  const usernameStr = typeof username === "string" ? username : "";
  const passwordStr = typeof password === "string" ? password : "";

  presenter.presentFormData({ username: usernameStr, password: passwordStr });

  const validatedUsername = Username.validate(usernameStr);
  if (validatedUsername.type === "failure") {
    presenter.presentValidationError("username", validatedUsername.error.type);
    return;
  }

  const validatedPassword = UserPassword.validate(passwordStr);
  if (validatedPassword.type === "failure") {
    presenter.presentValidationError("password", validatedPassword.error.type);
    return;
  }

  await command.authenticate(validatedUsername.value, validatedPassword.value);
}
