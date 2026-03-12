import "./bootstrap";
import { type Logger, LoggerMock } from "@app/infrastructure/logger";
import { container } from "tsyringe";
import { type TodoQueryProcessor, TodoQueryProcessorImpl } from "./processor";

export type { TodoQueryProcessor };

export function createTodoProcessor(
  logger: Logger = LoggerMock.create(),
): TodoQueryProcessor {
  const childContainer = container.createChildContainer();
  childContainer.register("Logger", { useValue: logger });
  return childContainer.resolve(TodoQueryProcessorImpl);
}
