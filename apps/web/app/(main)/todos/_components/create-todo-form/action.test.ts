import { describe, expect, it, vi } from "vitest";
import { createTodo } from "./action";

describe("createTodo", () => {
  it("空のタイトルでバリデーションエラーになる", async () => {
    const formData = new FormData();
    formData.set("title", "");

    const state = await createTodo("user-1", formData, vi.fn(), vi.fn());

    expect(state?.errors?.title).toContain("タイトルを入力してください。");
  });

  it("正常なタイトルで undefined を返す（成功時）", async () => {
    const mockCreateProcessor = vi
      .fn()
      .mockReturnValue({ create: vi.fn().mockResolvedValue(undefined) });
    const mockRevalidate = vi.fn();
    const formData = new FormData();
    formData.set("title", "新しいタスク");

    const state = await createTodo(
      "user-1",
      formData,
      mockCreateProcessor,
      mockRevalidate,
    );

    expect(state).toBeUndefined();
    expect(mockRevalidate).toHaveBeenCalledWith("/todos");
  });

  it("プロセッサーがエラーを返したときエラーメッセージを返す", async () => {
    const mockCreateProcessor = vi
      .fn()
      .mockImplementation(
        (presenter: { presentAnyError: (e: unknown) => void }) => ({
          create: async () => {
            presenter.presentAnyError(new Error("DB error"));
          },
        }),
      );
    const formData = new FormData();
    formData.set("title", "新しいタスク");

    const state = await createTodo(
      "user-1",
      formData,
      mockCreateProcessor,
      vi.fn(),
    );

    expect(state?.messages).toContain("タスクの作成に失敗しました。");
  });
});
