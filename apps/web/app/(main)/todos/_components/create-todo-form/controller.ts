import { TodoDescription, TodoTitle, UserId } from "@app/command-domain";
import { type TodoCommandProcessor } from "@app/command-interface-adapter-if";

export type TodoFormErrorType =
  | "INVALID_TODO_TITLE_EMPTY"
  | "INVALID_TODO_TITLE_TOO_LONG"
  | "INVALID_TODO_DESCRIPTION_TOO_LONG";

export interface CreateTodoFormPresenter {
  presentFormData(fields: { title: string; description: string }): void;
  presentValidationError(
    field: "title" | "description",
    errorType: TodoFormErrorType,
  ): void;
}

export async function createTodoController(
  userId: string,
  formData: FormData,
  command: TodoCommandProcessor,
  presenter: CreateTodoFormPresenter,
): Promise<void> {
  const title = formData.get("title");
  const description = formData.get("description");
  const titleStr = typeof title === "string" ? title : "";
  const descriptionStr = typeof description === "string" ? description : "";

  presenter.presentFormData({ title: titleStr, description: descriptionStr });

  const validatedTitle = TodoTitle.validate(titleStr);
  if (validatedTitle.type === "failure") {
    presenter.presentValidationError("title", validatedTitle.error.type);
    return;
  }

  const validatedDescription = TodoDescription.validate(descriptionStr);
  if (validatedDescription.type === "failure") {
    presenter.presentValidationError(
      "description",
      validatedDescription.error.type,
    );
    return;
  }

  await command.create(
    UserId.of(userId),
    validatedTitle.value,
    validatedDescription.value,
  );
}
