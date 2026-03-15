import {
  LoginAuthentication,
  LoginAuthenticationError,
} from "@app/command-domain";
import { describe, expect, it, vi } from "vitest";
import { SessionUserId } from "#lib/session-types";
import { LoginFormState } from "./login-form-state";

describe("LoginFormState", () => {
  it("初期状態は undefined", async () => {
    const state = new LoginFormState(undefined, vi.fn(), vi.fn());
    expect(await state.next()).toBeUndefined();
  });

  it("presentFormData でフィールドをセットし errors はリセットされる", async () => {
    const prevState = {
      username: "old",
      password: "old",
      errors: { username: ["エラー"] },
    };
    const state = new LoginFormState(prevState, vi.fn(), vi.fn());
    state.presentFormData({ username: "admin", password: "pass" });
    expect(await state.next()).toEqual({ username: "admin", password: "pass" });
  });

  it("presentValidationError で errors をマージする", async () => {
    const state = new LoginFormState(undefined, vi.fn(), vi.fn());
    state.presentFormData({ username: "", password: "" });
    state.presentValidationError("username", "INVALID_USERNAME");
    state.presentValidationError("password", "INVALID_USER_PASSWORD");
    expect(await state.next()).toEqual({
      username: "",
      password: "",
      errors: {
        username: ["ユーザー名を入力してください。"],
        password: ["パスワードを入力してください。"],
      },
    });
  });

  it("presentLoginAuthentication 後 next() で createSession と redirect が呼ばれる", async () => {
    const createSession = vi.fn().mockResolvedValue(undefined);
    const redirect = vi.fn();
    const state = new LoginFormState(undefined, createSession, redirect);
    const loginAuth = Object.create(
      LoginAuthentication.prototype,
    ) as LoginAuthentication;
    Object.defineProperty(loginAuth, "toDTO", {
      value: () => ({ userId: "user-123" }),
    });
    state.presentLoginAuthentication(loginAuth);
    await state.next();
    expect(createSession).toHaveBeenCalledWith(SessionUserId("user-123"));
    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("認証失敗後 next() は createSession も redirect も呼ばない", async () => {
    const createSession = vi.fn();
    const redirect = vi.fn();
    const state = new LoginFormState(undefined, createSession, redirect);
    state.presentError(new LoginAuthenticationError("INVALID_PASSWORD"));
    await state.next();
    expect(createSession).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("presentError で messages にクレデンシャルエラーメッセージが入る", async () => {
    const state = new LoginFormState(undefined, vi.fn(), vi.fn());
    state.presentFormData({ username: "admin", password: "wrong" });
    state.presentError(new LoginAuthenticationError("INVALID_PASSWORD"));
    expect(await state.next()).toEqual({
      username: "admin",
      password: "wrong",
      messages: ["ユーザー名またはパスワードが正しくありません。"],
    });
  });

  it("presentError(UNKNOWN_USER) で messages にクレデンシャルエラーメッセージが入る", async () => {
    const state = new LoginFormState(undefined, vi.fn(), vi.fn());
    state.presentError(new LoginAuthenticationError("UNKNOWN_USER"));
    expect((await state.next())?.messages).toEqual([
      "ユーザー名またはパスワードが正しくありません。",
    ]);
  });

  it("presentAnyError で messages に汎用エラーメッセージが入る", async () => {
    const state = new LoginFormState(undefined, vi.fn(), vi.fn());
    state.presentAnyError(new Error("unexpected"));
    expect(await state.next()).toEqual({
      messages: ["想定外のエラーが発生しました。"],
    });
  });
});
