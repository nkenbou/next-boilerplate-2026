import type {
  LoginAuthentication,
  LoginAuthenticationError,
} from "@app/command-domain";
import type { LoginAuthenticationPresenter } from "@app/command-interface-adapter-if";
import { SessionUserId } from "#lib/session-types";
import type { LoginAuthenticationState } from "../type";
import type {
  LoginFormErrorType,
  LoginFormPresenter,
} from "./login-controller";

/**
 * @public
 */
export const MESSAGES = {
  INVALID_USERNAME: "ユーザー名を入力してください。",
  INVALID_USER_PASSWORD: "パスワードを入力してください。",
  ERROR_INVALID_CREDENTIALS: "ユーザー名またはパスワードが正しくありません。",
} as const satisfies Record<
  LoginFormErrorType | "ERROR_INVALID_CREDENTIALS",
  string
>;

const CREDENTIAL_ERROR_MESSAGES: Record<string, string> = {
  UNKNOWN_USER: MESSAGES.ERROR_INVALID_CREDENTIALS,
  INVALID_PASSWORD: MESSAGES.ERROR_INVALID_CREDENTIALS,
};

export class LoginFormState
  implements LoginFormPresenter, LoginAuthenticationPresenter
{
  private state: LoginAuthenticationState;
  private pendingSession: Promise<void> | null = null;

  constructor(
    prevState: LoginAuthenticationState = undefined,
    private readonly createSession: (userId: SessionUserId) => Promise<void>,
    private readonly redirect: (url: string) => void,
  ) {
    this.state = prevState;
  }

  // LoginFormPresenter
  presentFormData(fields: { username: string; password: string }): void {
    this.state = { ...fields };
  }

  presentValidationError(
    field: "username" | "password",
    errorType: LoginFormErrorType,
  ): void {
    this.state = {
      ...this.state,
      errors: { ...this.state?.errors, [field]: [MESSAGES[errorType]] },
    };
  }

  // LoginAuthenticationPresenter
  presentLoginAuthentication(loginAuthentication: LoginAuthentication): void {
    const userId = loginAuthentication.toDTO().userId;
    this.pendingSession = this.createSession(SessionUserId(userId));
  }

  presentError(error: LoginAuthenticationError): void {
    this.state = {
      ...this.state,
      messages: [
        CREDENTIAL_ERROR_MESSAGES[error.type] ?? "認証エラーが発生しました。",
      ],
    };
  }

  presentAnyError(_error: unknown): void {
    this.state = { messages: ["想定外のエラーが発生しました。"] };
  }

  async commit(): Promise<void> {
    if (this.pendingSession !== null) {
      await this.pendingSession;
      this.redirect("/");
    }
  }

  getState(): LoginAuthenticationState {
    return this.state;
  }
}
