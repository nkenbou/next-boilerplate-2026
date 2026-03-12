export class DomainError<T extends string = string> extends Error {
  constructor(
    public readonly type: T,
    ...params: Parameters<ErrorConstructor>
  ) {
    const [message, ...rest] = params;
    super(`${type}: ${message}`, ...rest);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DomainError);
    }
    this.name = "DomainError";
  }
}
