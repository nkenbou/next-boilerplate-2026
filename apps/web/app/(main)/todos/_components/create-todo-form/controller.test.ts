/* eslint-disable @typescript-eslint/unbound-method -- vitest spy assertions require method references */
import type { TodoCommandProcessor } from "@app/command-interface-adapter-if";
import { type Mock, describe, expect, it, vi } from "vitest";
import { createTodoController } from "./controller";

type PresenterMock = {
  presentFormData: Mock;
  presentValidationError: Mock;
};

const makePresenter = (): PresenterMock => ({
  presentFormData: vi.fn(),
  presentValidationError: vi.fn(),
});

const makeCommand = (): TodoCommandProcessor => ({
  create: vi.fn().mockResolvedValue(undefined),
  complete: vi.fn().mockResolvedValue(undefined),
});

describe("createTodoController", () => {
  it("空のタイトルでバリデーションエラーを呼ぶ", async () => {
    const presenter = makePresenter();
    const command = makeCommand();
    const formData = new FormData();
    formData.set("title", "");
    formData.set("description", "");

    await createTodoController("user-1", formData, command, presenter);

    expect(presenter.presentFormData).toHaveBeenCalledWith({
      title: "",
      description: "",
    });
    expect(presenter.presentValidationError).toHaveBeenCalledWith(
      "title",
      "INVALID_TODO_TITLE_EMPTY",
    );
    expect(command.create).not.toHaveBeenCalled();
  });

  it("200文字超のタイトルでバリデーションエラーを呼ぶ", async () => {
    const presenter = makePresenter();
    const command = makeCommand();
    const formData = new FormData();
    formData.set("title", "a".repeat(201));
    formData.set("description", "");

    await createTodoController("user-1", formData, command, presenter);

    expect(presenter.presentValidationError).toHaveBeenCalledWith(
      "title",
      "INVALID_TODO_TITLE_TOO_LONG",
    );
    expect(command.create).not.toHaveBeenCalled();
  });

  it("500文字超のdescriptionでバリデーションエラーを呼ぶ", async () => {
    const presenter = makePresenter();
    const command = makeCommand();
    const formData = new FormData();
    formData.set("title", "有効なタイトル");
    formData.set("description", "a".repeat(501));

    await createTodoController("user-1", formData, command, presenter);

    expect(presenter.presentValidationError).toHaveBeenCalledWith(
      "description",
      "INVALID_TODO_DESCRIPTION_TOO_LONG",
    );
    expect(command.create).not.toHaveBeenCalled();
  });

  it("正常なタイトルと空のdescriptionで command.create を呼ぶ", async () => {
    const presenter = makePresenter();
    const command = makeCommand();
    const formData = new FormData();
    formData.set("title", "新しいタスク");
    formData.set("description", "");

    await createTodoController("user-1", formData, command, presenter);

    expect(presenter.presentValidationError).not.toHaveBeenCalled();
    expect(command.create).toHaveBeenCalledOnce();
  });

  it("正常なタイトルとdescriptionで command.create を呼ぶ", async () => {
    const presenter = makePresenter();
    const command = makeCommand();
    const formData = new FormData();
    formData.set("title", "新しいタスク");
    formData.set("description", "タスクの説明");

    await createTodoController("user-1", formData, command, presenter);

    expect(presenter.presentValidationError).not.toHaveBeenCalled();
    expect(command.create).toHaveBeenCalledOnce();
  });
});
/* eslint-enable @typescript-eslint/unbound-method -- re-enable after test file */
