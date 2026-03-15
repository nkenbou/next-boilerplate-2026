import { type Mock, describe, expect, it, vi } from "vitest";
import { loginController } from "./login-controller";

type PresenterMock = {
  presentFormData: Mock;
  presentValidationError: Mock;
};

type CommandMock = {
  authenticate: Mock;
};

const makePresenter = (): PresenterMock => ({
  presentFormData: vi.fn(),
  presentValidationError: vi.fn(),
});

const makeCommand = (): CommandMock => ({
  authenticate: vi.fn().mockResolvedValue(undefined),
});

describe("loginController", () => {
  it("空のユーザー名でバリデーションエラーを呼ぶ", async () => {
    const presenter = makePresenter();
    const command = makeCommand();
    const formData = new FormData();
    formData.set("username", "");
    formData.set("password", "password");

    await loginController(formData, command, presenter);

    expect(presenter.presentFormData).toHaveBeenCalledWith({
      username: "",
      password: "password",
    });
    expect(presenter.presentValidationError).toHaveBeenCalledWith(
      "username",
      "INVALID_USERNAME",
    );
    expect(command.authenticate).not.toHaveBeenCalled();
  });

  it("空のパスワードでバリデーションエラーを呼ぶ", async () => {
    const presenter = makePresenter();
    const command = makeCommand();
    const formData = new FormData();
    formData.set("username", "admin");
    formData.set("password", "");

    await loginController(formData, command, presenter);

    expect(presenter.presentValidationError).toHaveBeenCalledWith(
      "password",
      "INVALID_USER_PASSWORD",
    );
    expect(command.authenticate).not.toHaveBeenCalled();
  });

  it("正常な入力で command.authenticate を呼ぶ", async () => {
    const presenter = makePresenter();
    const command = makeCommand();
    const formData = new FormData();
    formData.set("username", "admin");
    formData.set("password", "password");

    await loginController(formData, command, presenter);

    expect(presenter.presentValidationError).not.toHaveBeenCalled();
    expect(command.authenticate).toHaveBeenCalledOnce();
  });
});
