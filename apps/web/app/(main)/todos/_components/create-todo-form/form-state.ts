import type { Todo } from "@app/command-domain";
import type { TodoPresenter } from "@app/command-interface-adapter-if";
import type { CreateTodoFormPresenter } from "./controller";

const TITLE_MESSAGES: Record<
  "INVALID_TODO_TITLE_EMPTY" | "INVALID_TODO_TITLE_TOO_LONG",
  string
> = {
  INVALID_TODO_TITLE_EMPTY: "タイトルを入力してください。",
  INVALID_TODO_TITLE_TOO_LONG: "タイトルは200文字以内にしてください。",
};

export type CreateTodoState =
  | {
      title?: string;
      errors?: { title?: string[] };
      messages?: string[];
    }
  | undefined;

export class CreateTodoFormState
  implements TodoPresenter, CreateTodoFormPresenter
{
  private state: CreateTodoState;

  constructor(
    prevState: CreateTodoState = undefined,
    private readonly revalidate: (path: string) => void,
  ) {
    this.state = prevState;
  }

  // CreateTodoFormPresenter — called by controller
  presentFormData(title: string): void {
    this.state = { title };
  }

  presentValidationError(
    title: string,
    errorType: "INVALID_TODO_TITLE_EMPTY" | "INVALID_TODO_TITLE_TOO_LONG",
  ): void {
    this.state = { title, errors: { title: [TITLE_MESSAGES[errorType]] } };
  }

  // TodoPresenter — called by command processor
  presentTodo(_todo: Todo): void {
    this.revalidate("/todos");
  }

  presentAnyError(_err: unknown): void {
    this.state = { messages: ["タスクの作成に失敗しました。"] };
  }

  getState(): CreateTodoState {
    return this.state;
  }
}
