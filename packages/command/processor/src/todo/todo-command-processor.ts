import {
  DomainError,
  DueDate,
  Todo,
  TodoDescription,
  TodoId,
  TodoTitle,
  UserId,
} from "@app/command-domain";
import type {
  TodoCommandProcessor,
  TodoPresenter,
  TodoRepository,
} from "@app/command-interface-adapter-if";
import { generateId } from "@app/infrastructure/id";
import { type Logger, LoggerMock } from "@app/infrastructure/logger";
import { inject, injectable } from "tsyringe";

@injectable()
export class TodoCommandProcessorImpl implements TodoCommandProcessor {
  private readonly logger: Logger;

  constructor(
    @inject("TodoPresenter")
    private presenter: TodoPresenter,
    @inject("TodoRepository")
    private readonly todoRepository: TodoRepository,
    @inject("Logger")
    logger: Logger = LoggerMock.create(),
  ) {
    this.logger = logger.classLogger(TodoCommandProcessorImpl);
  }

  async create(
    userId: UserId,
    title: TodoTitle,
    description: TodoDescription,
    dueDate?: DueDate,
  ): Promise<void> {
    this.logger.info("start");

    try {
      const todo = Todo.create(
        TodoId.of(generateId()),
        title,
        userId,
        description,
        dueDate,
      );

      await this.todoRepository.store(todo);
      this.presenter.presentTodo(todo);

      this.logger.info("end");
    } catch (error) {
      this.logger.error(error);
      this.presenter.presentAnyError(error);
    }
  }

  async complete(todoId: TodoId): Promise<void> {
    this.logger.info(`start: ${todoId.toString()}`);

    try {
      const todo = await this.todoRepository.findById(todoId);

      if (todo === null) {
        this.presenter.presentCompleteError?.(
          new DomainError("TODO_NOT_FOUND", "Todo not found"),
        );
        return;
      }

      const completed = todo.complete();
      await this.todoRepository.store(completed);
      this.presenter.presentTodo(completed);

      this.logger.info("end");
    } catch (error) {
      this.logger.error(error);
      this.presenter.presentAnyError(error);
    }
  }
}
