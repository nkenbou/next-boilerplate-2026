import { DomainError } from "../domain-error";
import { UserId } from "../user";
import { CreatedAt } from "./created-at";
import { DueDate } from "./due-date";
import { TodoDescription } from "./todo-description";
import { TodoId } from "./todo-id";
import { TodoStatus } from "./todo-status";
import { TodoTitle } from "./todo-title";

export type TodoCompleteError = DomainError<"TODO_NOT_FOUND">;

const __type = Symbol();

export class Todo {
  readonly __type = __type;

  private constructor(
    public readonly id: TodoId,
    public readonly title: TodoTitle,
    public readonly status: TodoStatus,
    public readonly createdAt: CreatedAt,
    public readonly userId: UserId,
    public readonly description: TodoDescription,
    public readonly dueDate: DueDate,
  ) {}

  complete(): Todo {
    if (this.status.isCompleted()) {
      throw new DomainError(
        "TODO_ALREADY_COMPLETED",
        "Todo is already completed",
      );
    }
    return new Todo(
      this.id,
      this.title,
      TodoStatus.completed(),
      this.createdAt,
      this.userId,
      this.description,
      this.dueDate,
    );
  }

  toDTO(): {
    id: string;
    title: string;
    status: "pending" | "completed";
    createdAt: Date;
    dueDate: Date | null;
    userId: string;
    description: string;
  } {
    return {
      id: this.id.toDTO(),
      title: this.title.toDTO(),
      status: this.status.toDTO(),
      createdAt: this.createdAt.toDTO(),
      dueDate: this.dueDate.toDTO(),
      userId: this.userId.toDTO(),
      description: this.description.toDTO(),
    };
  }

  static create(
    id: TodoId,
    title: TodoTitle,
    userId: UserId,
    description: TodoDescription,
    dueDate?: DueDate,
  ): Todo {
    return new Todo(
      id,
      title,
      TodoStatus.pending(),
      CreatedAt.now(),
      userId,
      description,
      dueDate ?? DueDate.of(),
    );
  }

  static of(
    id: TodoId,
    title: TodoTitle,
    status: TodoStatus,
    createdAt: CreatedAt,
    userId: UserId,
    description: TodoDescription,
    dueDate: DueDate,
  ): Todo {
    return new Todo(id, title, status, createdAt, userId, description, dueDate);
  }
}
