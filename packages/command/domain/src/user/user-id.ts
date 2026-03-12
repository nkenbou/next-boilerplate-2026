const __type = Symbol();

export class UserId {
  readonly __type = __type;

  private constructor(public readonly value: string) {}

  toDTO(): string {
    return this.value;
  }

  toString(): string {
    return `UserId(${this.value})`;
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }

  static of(value: string): UserId {
    return new UserId(value);
  }
}
