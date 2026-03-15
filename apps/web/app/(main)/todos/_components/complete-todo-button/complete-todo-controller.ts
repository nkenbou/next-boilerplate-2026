import { TodoId } from "@app/command-domain";
import { type TodoCommandProcessor } from "@app/command-interface-adapter-if";

export async function completeTodoController(
  todoId: string,
  command: TodoCommandProcessor,
): Promise<void> {
  await command.complete(TodoId.of(todoId));
}
