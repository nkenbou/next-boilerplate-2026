import { describe, expect, it, vi } from "vitest";
import { createTodoController } from "./controller";

const makePresenter = () => ({
  presentFormData: vi.fn(),
  presentValidationError: vi.fn(),
});

describe("createTodoController", () => {
  it("空のタイトルでバリデーションエラーを呼ぶ", async () => {
    const presenter = makePresenter();
    const command = { create: vi.fn() };
    const formData = new FormData();
    formData.set("title", "");

    await createTodoController("user-1", formData, command as any, presenter);

    expect(presenter.presentValidationError).toHaveBeenCalledWith(
      "",
      "INVALID_TODO_TITLE_EMPTY",
    );
    expect(command.create).not.toHaveBeenCalled();
  });

  it("200文字超のタイトルでバリデーションエラーを呼ぶ", async () => {
    const presenter = makePresenter();
    const command = { create: vi.fn() };
    const formData = new FormData();
    formData.set("title", "a".repeat(201));

    await createTodoController("user-1", formData, command as any, presenter);

    expect(presenter.presentValidationError).toHaveBeenCalledWith(
      "a".repeat(201),
      "INVALID_TODO_TITLE_TOO_LONG",
    );
    expect(command.create).not.toHaveBeenCalled();
  });

  it("正常なタイトルで command.create を呼ぶ", async () => {
    const presenter = makePresenter();
    const command = { create: vi.fn().mockResolvedValue(undefined) };
    const formData = new FormData();
    formData.set("title", "新しいタスク");

    await createTodoController("user-1", formData, command as any, presenter);

    expect(presenter.presentValidationError).not.toHaveBeenCalled();
    expect(command.create).toHaveBeenCalledOnce();
  });
});
