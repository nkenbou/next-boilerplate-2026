const __type = Symbol();

export class TodoId {
  readonly __type = __type;

  private constructor(public readonly value: string) {}

  toDTO(): string {
    return this.value;
  }

  toString(): string {
    return `TodoId(${this.value})`;
  }

  equals(other: TodoId): boolean {
    return this.value === other.value;
  }

  static of(value: string): TodoId {
    return new TodoId(value);
  }
}
