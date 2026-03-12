type ErrorType = "UNKNOWN_USER" | "INVALID_PASSWORD";

export class LoginAuthenticationError extends Error {
  constructor(
    public readonly type: ErrorType,
    ...params: Parameters<ErrorConstructor>
  ) {
    const [message, ...rest] = params;
    super(`${type}: ${message}`, ...rest);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LoginAuthenticationError);
    }
    this.name = "LoginAuthenticationError";
  }
}
