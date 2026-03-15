"use server";

import { createTodoProcessor } from "@app/command-interface-adapter-impl/processors";
import { SessionLogger } from "@app/infrastructure/logger";
import { revalidatePath } from "next/cache";
import { verifySession } from "#lib/session";
import { createTodoController } from "./create-todo-controller";
import {
  CreateTodoFormState,
  type CreateTodoState,
} from "./create-todo-form-state";

export async function createTodo(
  userId: string,
  prevState: CreateTodoState,
  formData: FormData,
): Promise<CreateTodoState> {
  const session = await verifySession();
  const logger = SessionLogger.create(session.sessionId);
  const presenter = new CreateTodoFormState(prevState, revalidatePath);
  const command = createTodoProcessor(presenter, logger);
  await createTodoController(userId, formData, command, presenter);
  return presenter.next();
}
