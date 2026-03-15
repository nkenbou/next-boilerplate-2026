import type { Todo } from "@app/command-domain";
import type { TodoPresenter } from "@app/command-interface-adapter-if";
import type {
  CreateTodoFormPresenter,
  TodoFormErrorType,
} from "./create-todo-controller";

export const MESSAGES: Record<TodoFormErrorType, string> = {
  INVALID_TODO_TITLE_EMPTY: "タイトルを入力してください。",
  INVALID_TODO_TITLE_TOO_LONG: "タイトルは200文字以内にしてください。",
  INVALID_TODO_DESCRIPTION_TOO_LONG: "説明は500文字以内にしてください。",
};

export const ANY_ERROR_MESSAGE = "タスクの作成に失敗しました。";

export type CreateTodoState =
  | {
      title?: string;
      description?: string;
      errors?: { title?: string[]; description?: string[] };
      messages?: string[];
    }
  | undefined;

export class CreateTodoFormState
  implements TodoPresenter, CreateTodoFormPresenter
{
  private state: CreateTodoState;
  private successful = false;

  constructor(
    prevState: CreateTodoState = undefined,
    private readonly revalidate: (path: string) => void,
  ) {
    this.state = prevState;
  }

  // CreateTodoFormPresenter — called by controller
  presentFormData(fields: { title: string; description: string }): void {
    this.state = { ...fields };
  }

  presentValidationError(
    field: "title" | "description",
    errorType: TodoFormErrorType,
  ): void {
    this.state = {
      ...this.state,
      errors: { ...this.state?.errors, [field]: [MESSAGES[errorType]] },
    };
  }

  // TodoPresenter — called by command processor
  presentTodo(_todo: Todo): void {
    this.successful = true;
  }

  presentAnyError(_err: unknown): void {
    this.state = { messages: [ANY_ERROR_MESSAGE] };
  }

  next(): CreateTodoState {
    if (this.successful) {
      this.revalidate("/todos");
    }
    return this.state;
  }
}
