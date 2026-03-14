import {
  TodoDescription,
  TodoId,
  TodoTitle,
  UserId,
} from "@app/command-domain";

export interface TodoCommandProcessor {
  create(
    userId: UserId,
    title: TodoTitle,
    description: TodoDescription,
    dueDate?: Date,
  ): Promise<void>;
  complete(todoId: TodoId): Promise<void>;
}
