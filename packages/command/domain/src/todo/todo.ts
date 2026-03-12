import { DomainError } from "../domain-error";
import { UserId } from "../user";
import { DueDate } from "./due-date";
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
    public readonly createdAt: Date,
    public readonly userId: UserId,
    public readonly dueDate: DueDate | null,
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
  } {
    return {
      id: this.id.value,
      title: this.title.value,
      status: this.status.value,
      createdAt: this.createdAt,
      dueDate: this.dueDate?.value ?? null,
      userId: this.userId.value,
    };
  }

  static create(
    id: TodoId,
    title: TodoTitle,
    userId: UserId,
    dueDate?: DueDate,
  ): Todo {
    return new Todo(
      id,
      title,
      TodoStatus.pending(),
      new Date(),
      userId,
      dueDate ?? null,
    );
  }

  static of(
    id: TodoId,
    title: TodoTitle,
    status: TodoStatus,
    createdAt: Date,
    userId: UserId,
    dueDate: DueDate | null,
  ): Todo {
    return new Todo(id, title, status, createdAt, userId, dueDate);
  }
}
