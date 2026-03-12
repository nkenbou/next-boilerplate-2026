import type { Result } from "@app/infrastructure/result";
import { DomainError } from "../domain-error";

const __type = Symbol();

export class TodoStatus {
  readonly __type = __type;

  private constructor(public readonly value: "pending" | "completed") {
    if (value !== "pending" && value !== "completed") {
      throw new DomainError(
        "INVALID_TODO_STATUS",
        `Invalid TodoStatus: ${value as string}`,
      );
    }
  }

  toDTO(): "pending" | "completed" {
    return this.value;
  }

  isPending(): boolean {
    return this.value === "pending";
  }

  isCompleted(): boolean {
    return this.value === "completed";
  }

  static pending(): TodoStatus {
    return new TodoStatus("pending");
  }

  static completed(): TodoStatus {
    return new TodoStatus("completed");
  }

  static validate(
    value: string,
  ): Result<TodoStatus, DomainError<"INVALID_TODO_STATUS">> {
    try {
      return { type: "success", value: TodoStatus.of(value) };
    } catch (error) {
      if (error instanceof DomainError)
        return {
          type: "failure",
          error: error as DomainError<"INVALID_TODO_STATUS">,
        };
      throw error;
    }
  }

  static of(value: string): TodoStatus {
    return new TodoStatus(value as "pending" | "completed");
  }
}
