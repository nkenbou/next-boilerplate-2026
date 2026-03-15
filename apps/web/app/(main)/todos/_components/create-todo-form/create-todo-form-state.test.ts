import {
  Todo,
  TodoDescription,
  TodoId,
  TodoTitle,
  UserId,
} from "@app/command-domain";
import { describe, expect, it, vi } from "vitest";
import { CreateTodoFormState } from "./create-todo-form-state";

describe("CreateTodoFormState", () => {
  it("初期状態は undefined", () => {
    const state = new CreateTodoFormState(undefined, vi.fn());
    expect(state.next()).toBeUndefined();
  });

  it("presentValidationError でタイトルエラー状態を設定する", () => {
    const state = new CreateTodoFormState(undefined, vi.fn());
    state.presentFormData({ title: "", description: "" });
    state.presentValidationError("title", "INVALID_TODO_TITLE_EMPTY");
    expect(state.next()).toEqual({
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
    expect(state.next()).toEqual({
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
    expect(state.next()).toEqual({
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
    expect(state.next()).toEqual({
      messages: ["タスクの作成に失敗しました。"],
    });
  });

  it("presentTodo → next() で revalidate('/todos') を呼ぶ", () => {
    const revalidate = vi.fn();
    const state = new CreateTodoFormState(undefined, revalidate);
    state.presentTodo(
      Todo.create(
        TodoId.of("todo-1"),
        TodoTitle.of("テストタスク"),
        UserId.of("user-1"),
        TodoDescription.of(""),
      ),
    );
    state.next();
    expect(revalidate).toHaveBeenCalledWith("/todos");
  });

  it("prevState を渡すと初期状態がそれになる", () => {
    const prevState = {
      title: "before",
      description: "",
      errors: { title: ["error"] },
    };
    const state = new CreateTodoFormState(prevState, vi.fn());
    expect(state.next()).toEqual(prevState);
  });

  it("presentFormData は全フィールドをセットし errors はリセットされる", () => {
    const prevState = {
      title: "before",
      description: "old",
      errors: { title: ["error"] },
    };
    const state = new CreateTodoFormState(prevState, vi.fn());
    state.presentFormData({ title: "new title", description: "new desc" });
    expect(state.next()).toEqual({
      title: "new title",
      description: "new desc",
    });
  });
});
