import type { Result } from "@app/infrastructure/result";
import { DomainError } from "../domain-error";

const __type = Symbol();

export class TodoTitle {
  readonly __type = __type;

  private constructor(public readonly value: string) {
    if (value.trim().length === 0) {
      throw new DomainError(
        "INVALID_TODO_TITLE_EMPTY",
        "TodoTitle cannot be empty",
      );
    }
    if (value.length > 200) {
      throw new DomainError(
        "INVALID_TODO_TITLE_TOO_LONG",
        "TodoTitle cannot exceed 200 characters",
      );
    }
  }

  toDTO(): string {
    return this.value;
  }

  toString(): string {
    return `TodoTitle(${this.value})`;
  }

  static validate(
    value: string,
  ): Result<
    TodoTitle,
    DomainError<"INVALID_TODO_TITLE_EMPTY" | "INVALID_TODO_TITLE_TOO_LONG">
  > {
    try {
      return { type: "success", value: TodoTitle.of(value) };
    } catch (error) {
      if (error instanceof DomainError)
        return {
          type: "failure",
          error: error as DomainError<
            "INVALID_TODO_TITLE_EMPTY" | "INVALID_TODO_TITLE_TOO_LONG"
          >,
        };
      throw error;
    }
  }

  static of(value: string): TodoTitle {
    return new TodoTitle(value);
  }
}
