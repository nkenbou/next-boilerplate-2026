const __type = Symbol();

export class DueDate {
  readonly __type = __type;

  private constructor(public readonly value: Date) {}

  toDTO(): Date {
    return this.value;
  }

  toString(): string {
    return `DueDate(${this.value.toISOString()})`;
  }

  static of(value: Date): DueDate {
    return new DueDate(value);
  }
}
