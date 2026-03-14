"use server";

import { createTodoProcessor } from "@app/command-interface-adapter-impl/processors";
import { revalidatePath } from "next/cache";
import { createTodoController } from "./create-todo-controller";
import { CreateTodoFormState, type CreateTodoState } from "./form-state";

export type { CreateTodoState };

export async function createTodo(
  userId: string,
  prevState: CreateTodoState,
  formData: FormData,
): Promise<CreateTodoState> {
  const presenter = new CreateTodoFormState(prevState, revalidatePath);
  const command = createTodoProcessor(presenter);
  await createTodoController(userId, formData, command, presenter);
  return presenter.getState();
}
