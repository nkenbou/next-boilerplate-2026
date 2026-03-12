import type { Result } from "@app/infrastructure/result";
import { DomainError } from "../domain-error";

const __type = Symbol();

export class Username {
  readonly __type = __type;

  private constructor(public readonly value: string) {
    if (value.trim().length === 0) {
      throw new DomainError("INVALID_USERNAME", "Username cannot be empty");
    }
    if (value.length > 50) {
      throw new DomainError(
        "INVALID_USERNAME",
        "Username cannot exceed 50 characters",
      );
    }
  }

  toDTO(): string {
    return this.value;
  }

  toString(): string {
    return `Username(${this.value})`;
  }

  equals(other: Username): boolean {
    return this.value === other.value;
  }

  static validate(
    value: string,
  ): Result<Username, DomainError<"INVALID_USERNAME">> {
    try {
      return { type: "success", value: Username.of(value) };
    } catch (error) {
      if (error instanceof DomainError)
        return {
          type: "failure",
          error: error as DomainError<"INVALID_USERNAME">,
        };
      throw error;
    }
  }

  static of(value: string): Username {
    return new Username(value);
  }
}
