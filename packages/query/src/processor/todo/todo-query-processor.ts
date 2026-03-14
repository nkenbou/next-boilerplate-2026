import { type PrismaClient } from "@app/db/prisma-client";
import { type Logger, LoggerMock } from "@app/infrastructure/logger";
import { inject, injectable } from "tsyringe";
import {
  TodoCreatedAtDTO,
  TodoDTO,
  TodoDescriptionDTO,
  TodoDueDateDTO,
  TodoIdDTO,
  TodoStatusDTO,
  TodoTitleDTO,
  UserIdDTO,
} from "../../dto";

export interface TodoQueryProcessor {
  list(userId: UserIdDTO): Promise<TodoDTO[]>;
}

@injectable()
export class TodoQueryProcessorImpl implements TodoQueryProcessor {
  private readonly logger: Logger;

  constructor(
    @inject("PrismaClient") private readonly prisma: PrismaClient,
    @inject("Logger") logger: Logger = LoggerMock.create(),
  ) {
    this.logger = logger.classLogger(TodoQueryProcessorImpl);
  }

  async list(userId: UserIdDTO): Promise<TodoDTO[]> {
    this.logger.info("start");
    const todos = await this.prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
    this.logger.info("end");
    return todos.map((t) =>
      TodoDTO({
        id: TodoIdDTO(t.todoId),
        title: TodoTitleDTO(t.title),
        status: TodoStatusDTO(t.status),
        createdAt: TodoCreatedAtDTO(t.createdAt),
        dueDate: TodoDueDateDTO(t.dueDate),
        userId: UserIdDTO(t.userId),
        description: TodoDescriptionDTO(t.description),
      }),
    );
  }
}
