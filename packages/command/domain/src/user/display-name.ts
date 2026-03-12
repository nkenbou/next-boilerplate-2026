import type { Result } from "@app/infrastructure/result";
import { DomainError } from "../domain-error";

const __type = Symbol();

export class DisplayName {
  readonly __type = __type;

  private constructor(public readonly value: string) {
    if (value.trim().length === 0) {
      throw new DomainError(
        "INVALID_DISPLAY_NAME",
        "DisplayName cannot be empty",
      );
    }
    if (value.length > 50) {
      throw new DomainError(
        "INVALID_DISPLAY_NAME",
        "DisplayName cannot exceed 50 characters",
      );
    }
  }

  toDTO(): string {
    return this.value;
  }

  toString(): string {
    return `DisplayName(${this.value})`;
  }

  static validate(
    value: string,
  ): Result<DisplayName, DomainError<"INVALID_DISPLAY_NAME">> {
    try {
      return { type: "success", value: DisplayName.of(value) };
    } catch (error) {
      if (error instanceof DomainError)
        return {
          type: "failure",
          error: error as DomainError<"INVALID_DISPLAY_NAME">,
        };
      throw error;
    }
  }

  static of(value: string): DisplayName {
    return new DisplayName(value);
  }
}
