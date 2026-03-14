import { describe, expect, it, vi } from "vitest";
import { CreateTodoFormState } from "./form-state";

describe("CreateTodoFormState", () => {
  it("初期状態は undefined", () => {
    const state = new CreateTodoFormState(undefined, vi.fn());
    expect(state.getState()).toBeUndefined();
  });

  it("presentValidationError でエラー状態を設定する", () => {
    const state = new CreateTodoFormState(undefined, vi.fn());
    state.presentValidationError("", "INVALID_TODO_TITLE_EMPTY");
    expect(state.getState()).toEqual({
      title: "",
      errors: { title: ["タイトルを入力してください。"] },
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
    state.presentTodo({} as any);
    expect(revalidate).toHaveBeenCalledWith("/todos");
    expect(state.getState()).toBeUndefined();
  });

  it("prevState を渡すと初期状態がそれになる", () => {
    const prevState = { title: "before", errors: { title: ["error"] } };
    const state = new CreateTodoFormState(prevState, vi.fn());
    expect(state.getState()).toEqual(prevState);
  });

  it("presentFormData は title のみをセットし errors はリセットされる", () => {
    const prevState = { title: "before", errors: { title: ["error"] } };
    const state = new CreateTodoFormState(prevState, vi.fn());
    state.presentFormData("new title");
    expect(state.getState()).toEqual({ title: "new title" });
  });
});
