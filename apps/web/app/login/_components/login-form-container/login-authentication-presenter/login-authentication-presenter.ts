import { UserPassword, Username } from "@app/command-domain";
import { createSession as _createSession } from "#lib/session";
import { SessionUserId } from "#lib/session-types";
import { LoginAuthenticationState } from "../../type";

const ADMIN_USER_ID = "00000000-0000-0000-0000-000000000001";

export const MESSAGES = {
  INVALID_USERNAME: "ユーザー名を入力してください。",
  INVALID_USER_PASSWORD: "パスワードを入力してください。",
  ERROR_INVALID_CREDENTIALS: "ユーザー名またはパスワードが正しくありません。",
  ERROR_UNEXPECTED: "想定外のエラーが発生しました。",
};

export class LoginAuthenticationPresenter {
  constructor(
    private readonly createSession: typeof _createSession,
    private readonly redirect: (url: string) => void,
  ) {}

  async authenticate(formData: FormData): Promise<LoginAuthenticationState> {
    const username = formData.get("username");
    const password = formData.get("password");

    const state = {
      username: typeof username === "string" ? username : "",
      password: typeof password === "string" ? password : "",
    };

    const errors: { username?: string[]; password?: string[] } = {};

    const usernameResult = Username.validate(state.username);
    if (usernameResult.type === "failure") {
      errors.username = [MESSAGES[usernameResult.error.type]];
    }
    const passwordResult = UserPassword.validate(state.password);
    if (passwordResult.type === "failure") {
      errors.password = [MESSAGES[passwordResult.error.type]];
    }
    if (errors.username || errors.password) {
      return { ...state, errors };
    }

    const adminUsername = process.env.ADMIN_USERNAME ?? "admin";
    const adminPassword = process.env.ADMIN_PASSWORD ?? "password";

    if (state.username !== adminUsername || state.password !== adminPassword) {
      return { ...state, messages: [MESSAGES.ERROR_INVALID_CREDENTIALS] };
    }

    await this.createSession(SessionUserId(ADMIN_USER_ID));
    this.redirect("/");
  }
}
