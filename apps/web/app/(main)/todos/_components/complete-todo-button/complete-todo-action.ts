"use server";

import { createTodoProcessor } from "@app/command-interface-adapter-impl/processor";
import { SessionLogger } from "@app/infrastructure/logger";
import { revalidatePath } from "next/cache";
import { verifySession } from "#lib/session";
import { completeTodoController } from "./complete-todo-controller";
import {
  CompleteTodoFormState,
  type CompleteTodoState,
} from "./complete-todo-form-state";

export async function completeTodo(
  todoId: string,
  prevState: CompleteTodoState,
  _formData: FormData,
): Promise<CompleteTodoState> {
  const session = await verifySession();
  const logger = SessionLogger.create(session.sessionId);
  const presenter = new CompleteTodoFormState(prevState, revalidatePath);
  const command = createTodoProcessor(presenter, logger);
  await completeTodoController(todoId, command);
  return presenter.next();
}
