import { describe, expect, it, vi } from "vitest";
import { CreateTodoFormState } from "./form-state";

describe("CreateTodoFormState", () => {
  it("初期状態は undefined", () => {
    const state = new CreateTodoFormState(undefined, vi.fn());
    expect(state.getState()).toBeUndefined();
  });

  it("presentValidationError でタイトルエラー状態を設定する", () => {
    const state = new CreateTodoFormState(undefined, vi.fn());
    state.presentFormData({ title: "", description: "" });
    state.presentValidationError("title", "INVALID_TODO_TITLE_EMPTY");
    expect(state.getState()).toEqual({
      title: "",
      description: "",
      errors: { title: ["タイトルを入力してください。"] },
    });
  });

  it("presentValidationError で description エラー状態を設定する", () => {
    const state = new CreateTodoFormState(undefined, vi.fn());
    state.presentFormData({ title: "test", description: "a".repeat(501) });
    state.presentValidationError(
      "description",
      "INVALID_TODO_DESCRIPTION_TOO_LONG",
    );
    expect(state.getState()).toEqual({
      title: "test",
      description: "a".repeat(501),
      errors: { description: ["説明は500文字以内にしてください。"] },
    });
  });

  it("presentValidationError は errors をマージする（複数フィールド）", () => {
    const state = new CreateTodoFormState(undefined, vi.fn());
    state.presentFormData({ title: "", description: "a".repeat(501) });
    state.presentValidationError("title", "INVALID_TODO_TITLE_EMPTY");
    state.presentValidationError(
      "description",
      "INVALID_TODO_DESCRIPTION_TOO_LONG",
    );
    expect(state.getState()).toEqual({
      title: "",
      description: "a".repeat(501),
      errors: {
        title: ["タイトルを入力してください。"],
        description: ["説明は500文字以内にしてください。"],
      },
    });
  });

  it("presentAnyError でエラーメッセージを設定する", () => {
    const state = new CreateTodoFormState(undefined, vi.fn());
    state.presentAnyError(new Error("DB error"));
    expect(state.getState()).toEqual({
      messages: ["タスクの作成に失敗しました。"],
    });
  });

  it("presentTodo で revalidate('/todos') を呼び、状態は undefined のまま", () => {
    const revalidate = vi.fn();
    const state = new CreateTodoFormState(undefined, revalidate);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument -- minimal Todo stub for testing presenter side-effect only
    state.presentTodo({} as any);
    expect(revalidate).toHaveBeenCalledWith("/todos");
    expect(state.getState()).toBeUndefined();
  });

  it("prevState を渡すと初期状態がそれになる", () => {
    const prevState = {
      title: "before",
      description: "",
      errors: { title: ["error"] },
    };
    const state = new CreateTodoFormState(prevState, vi.fn());
    expect(state.getState()).toEqual(prevState);
  });

  it("presentFormData は全フィールドをセットし errors はリセットされる", () => {
    const prevState = {
      title: "before",
      description: "old",
      errors: { title: ["error"] },
    };
    const state = new CreateTodoFormState(prevState, vi.fn());
    state.presentFormData({ title: "new title", description: "new desc" });
    expect(state.getState()).toEqual({
      title: "new title",
      description: "new desc",
    });
  });
});
