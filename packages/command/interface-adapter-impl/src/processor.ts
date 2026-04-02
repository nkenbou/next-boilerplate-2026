import "./bootstrap";
import {
  type LoginAuthenticationCommandProcessor,
  type LoginAuthenticationPresenter,
  LoginAuthenticationPresenterMock,
  type TodoCommandProcessor,
  type TodoPresenter,
} from "@app/command-interface-adapter-if";
import {
  LoginAuthenticationCommandProcessorImpl,
  TodoCommandProcessorImpl,
} from "@app/command-processor";
import { type Logger, LoggerMock } from "@app/infrastructure/logger";
import { container } from "tsyringe";

export type {
  LoginAuthenticationPresenter,
  LoginAuthenticationCommandProcessor,
  TodoPresenter,
  TodoCommandProcessor,
};
export { LoginAuthenticationPresenterMock };

export function createLoginAuthenticationProcessor(
  presenter: LoginAuthenticationPresenter,
  logger: Logger = LoggerMock.create(),
): LoginAuthenticationCommandProcessor {
  const childContainer = container.createChildContainer();
  childContainer.register("LoginAuthenticationPresenter", {
    useValue: presenter,
  });
  childContainer.register("Logger", { useValue: logger });
  return childContainer.resolve(LoginAuthenticationCommandProcessorImpl);
}

export function createTodoProcessor(
  presenter: TodoPresenter,
  logger: Logger = LoggerMock.create(),
): TodoCommandProcessor {
  const childContainer = container.createChildContainer();
  childContainer.register("TodoPresenter", { useValue: presenter });
  childContainer.register("Logger", { useValue: logger });
  return childContainer.resolve(TodoCommandProcessorImpl);
}
