import type { Result } from "@app/infrastructure/result";
import { DomainError } from "../domain-error";

const __type = Symbol();

export type TodoDescriptionError =
  DomainError<"INVALID_TODO_DESCRIPTION_TOO_LONG">;

export class TodoDescription {
  readonly __type = __type;

  private constructor(public readonly value: string) {
    if (value.length > 500) {
      throw new DomainError(
        "INVALID_TODO_DESCRIPTION_TOO_LONG",
        "TodoDescription cannot exceed 500 characters",
      );
    }
  }

  toDTO(): string {
    return this.value;
  }

  toString(): string {
    return `TodoDescription(${this.value})`;
  }

  static validate(
    value: string,
  ): Result<TodoDescription, TodoDescriptionError> {
    try {
      return { type: "success", value: TodoDescription.of(value) };
    } catch (error) {
      if (error instanceof DomainError)
        return { type: "failure", error: error as TodoDescriptionError };
      throw error;
    }
  }

  static of(value: string): TodoDescription {
    return new TodoDescription(value);
  }
}
