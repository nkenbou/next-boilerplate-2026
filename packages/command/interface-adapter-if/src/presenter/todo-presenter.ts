import { Todo, TodoCompleteError } from "@app/command-domain";
import { AnyErrorPresenter } from "./any-error-presenter";

export interface TodoPresenter extends AnyErrorPresenter {
  presentTodo: (todo: Todo) => void;
  presentCompleteError?: (error: TodoCompleteError) => void;
}

export class TodoPresenterMock implements TodoPresenter {
  public todo?: Todo;
  public error?: TodoCompleteError;
  public anyError?: unknown;

  presentTodo(todo: Todo): void {
    this.todo = todo;
  }

  presentCompleteError(error: TodoCompleteError): void {
    this.error = error;
  }

  presentAnyError(error: unknown): void {
    this.anyError = error;
  }
}
