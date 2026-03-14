const __type = Symbol();

export class CreatedAt {
  readonly __type = __type;

  private constructor(public readonly value: Date) {}

  toDTO(): Date {
    return this.value;
  }

  toString(): string {
    return `CreatedAt(${this.value.toISOString()})`;
  }

  equals(other: CreatedAt): boolean {
    return this.value.getTime() === other.value.getTime();
  }

  static of(value: Date): CreatedAt {
    return new CreatedAt(value);
  }

  static now(): CreatedAt {
    return new CreatedAt(new Date());
  }
}
