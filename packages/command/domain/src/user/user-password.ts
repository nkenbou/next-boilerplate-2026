import type { Result } from "@app/infrastructure/result";
import { DomainError } from "../domain-error";

const __type = Symbol();

export class UserPassword {
  readonly __type = __type;

  private constructor(public readonly value: string) {
    if (value.length === 0) {
      throw new DomainError(
        "INVALID_USER_PASSWORD",
        "UserPassword cannot be empty",
      );
    }
  }

  toString(): string {
    return `UserPassword([REDACTED])`;
  }

  equals(other: UserPassword): boolean {
    return this.value === other.value;
  }

  static validate(
    value: string,
  ): Result<UserPassword, DomainError<"INVALID_USER_PASSWORD">> {
    try {
      return { type: "success", value: UserPassword.of(value) };
    } catch (error) {
      if (error instanceof DomainError)
        return {
          type: "failure",
          error: error as DomainError<"INVALID_USER_PASSWORD">,
        };
      throw error;
    }
  }

  static of(value: string): UserPassword {
    return new UserPassword(value);
  }
}
