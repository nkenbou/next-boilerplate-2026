"use server";

import { createTodoProcessor } from "@app/command-interface-adapter-impl/processors";
import { revalidatePath } from "next/cache";
import {
  CompleteTodoFormState,
  type CompleteTodoState,
} from "./complete-todo-state";
import { completeTodoController } from "./controller";

export type { CompleteTodoState };

export async function completeTodo(
  todoId: string,
  prevState: CompleteTodoState,
  _formData: FormData,
): Promise<CompleteTodoState> {
  const presenter = new CompleteTodoFormState(prevState, revalidatePath);
  const command = createTodoProcessor(presenter);
  await completeTodoController(todoId, command);
  return presenter.getState();
}
