"use server";

import { TodoId } from "@app/command-domain";
import { createTodoProcessor } from "@app/command-interface-adapter-impl/processors";
import { revalidatePath } from "next/cache";

export async function completeTodo(todoId: string): Promise<void> {
  const presenter = {
    presentTodo(): void {},
    presentAnyError(_err: unknown): void {},
  };

  const processor = createTodoProcessor(presenter);
  await processor.complete(TodoId.of(todoId));
  revalidatePath("/todos");
}
