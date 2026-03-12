import { describe, expect, it, vi } from "vitest";
import {
  LoginAuthenticationPresenter,
  MESSAGES,
} from "./login-authentication-presenter";

describe("LoginAuthenticationPresenter", () => {
  it("空のユーザー名でバリデーションエラーになる", async () => {
    const createSession = vi.fn().mockResolvedValue(undefined);
    const redirect = vi.fn();

    const presenter = new LoginAuthenticationPresenter(createSession, redirect);

    const formData = new FormData();
    formData.set("username", "");
    formData.set("password", "password");

    const state = await presenter.authenticate(formData);
    expect(state?.errors?.username).toContain(MESSAGES.INVALID_USERNAME);
  });

  it("空のパスワードでバリデーションエラーになる", async () => {
    const createSession = vi.fn().mockResolvedValue(undefined);
    const redirect = vi.fn();

    const presenter = new LoginAuthenticationPresenter(createSession, redirect);

    const formData = new FormData();
    formData.set("username", "admin");
    formData.set("password", "");

    const state = await presenter.authenticate(formData);
    expect(state?.errors?.password).toContain(MESSAGES.INVALID_USER_PASSWORD);
  });

  it("誤ったクレデンシャルでエラーメッセージが返る", async () => {
    const createSession = vi.fn().mockResolvedValue(undefined);
    const redirect = vi.fn();

    const presenter = new LoginAuthenticationPresenter(createSession, redirect);

    const formData = new FormData();
    formData.set("username", "wrong");
    formData.set("password", "wrong");

    const state = await presenter.authenticate(formData);
    expect(state?.messages).toContain(MESSAGES.ERROR_INVALID_CREDENTIALS);
  });

  it("正しいクレデンシャルでセッションが作成されリダイレクトされる", async () => {
    const createSession = vi.fn().mockResolvedValue(undefined);
    const redirect = vi.fn();

    process.env.ADMIN_USERNAME = "admin";
    process.env.ADMIN_PASSWORD = "password";

    const presenter = new LoginAuthenticationPresenter(createSession, redirect);

    const formData = new FormData();
    formData.set("username", "admin");
    formData.set("password", "password");

    await presenter.authenticate(formData);
    expect(createSession).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledWith("/");
  });
});
