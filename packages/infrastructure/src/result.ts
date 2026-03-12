export type Success<T> = { type: "success"; value: T };
export type Failure<E> = { type: "failure"; error: E };
export type Result<T, E> = Success<T> | Failure<E>;
