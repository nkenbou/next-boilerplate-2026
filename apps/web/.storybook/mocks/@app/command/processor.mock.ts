import type {
  LoginAuthenticationCommandProcessor,
  TodoCommandProcessor,
} from "@app/command-interface-adapter-if";
import { fn } from "storybook/test";

export type {
  LoginAuthenticationPresenter,
  LoginAuthenticationCommandProcessor,
  TodoPresenter,
  TodoCommandProcessor,
} from "@app/command-interface-adapter-if";

export class LoginAuthenticationPresenterMock {
  public loginAuthenticationDTO?: { userId: string };
  public loginAuthenticationError?: unknown;
  public anyError?: unknown;

  presentLoginAuthentication(loginAuthenticationDTO: { userId: string }): void {
    this.loginAuthenticationDTO = loginAuthenticationDTO;
  }

  presentError(loginAuthenticationError: unknown): void {
    this.loginAuthenticationError = loginAuthenticationError;
  }

  presentAnyError(error: unknown): void {
    this.anyError = error;
  }
}

export const authenticateMock = fn().mockResolvedValue(undefined);

export function createLoginAuthenticationProcessor(
  _presenter: LoginAuthenticationPresenterMock,
): LoginAuthenticationCommandProcessor {
  return {
    authenticate: authenticateMock,
  };
}

export const createTodoMock = fn().mockResolvedValue(undefined);
export const completeTodoMock = fn().mockResolvedValue(undefined);

export function createTodoProcessor(): TodoCommandProcessor {
  return {
    create: createTodoMock,
    complete: completeTodoMock,
  };
}
