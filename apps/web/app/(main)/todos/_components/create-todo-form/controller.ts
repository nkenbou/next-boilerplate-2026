import { TodoTitle, UserId } from "@app/command-domain";
import { type TodoCommandProcessor } from "@app/command-interface-adapter-if";

type TodoTitleErrorType = "INVALID_TODO_TITLE_EMPTY" | "INVALID_TODO_TITLE_TOO_LONG";

export interface CreateTodoFormPresenter {
  presentFormData(title: string): void;
  presentValidationError(title: string, errorType: TodoTitleErrorType): void;
}

export async function createTodoController(
  userId: string,
  formData: FormData,
  command: TodoCommandProcessor,
  presenter: CreateTodoFormPresenter,
): Promise<void> {
  const title = formData.get("title");
  const titleStr = typeof title === "string" ? title : "";

  presenter.presentFormData(titleStr);

  const validated = TodoTitle.validate(titleStr);
  if (validated.type === "failure") {
    presenter.presentValidationError(titleStr, validated.error.type);
    return;
  }

  await command.create(UserId.of(userId), validated.value);
}
