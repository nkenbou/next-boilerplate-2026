import { TodoId, TodoTitle, UserId } from "@app/command-domain";

export interface TodoCommandProcessor {
  create(userId: UserId, title: TodoTitle, dueDate?: Date): Promise<void>;
  complete(todoId: TodoId): Promise<void>;
}
