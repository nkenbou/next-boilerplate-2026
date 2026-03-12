import { type PrismaClient } from "@app/db/prisma-client";
import { type Logger, LoggerMock } from "@app/infrastructure/logger";
import { inject, injectable } from "tsyringe";
import { TodoDTO, TodoIdDTO, TodoTitleDTO, UserIdDTO } from "../../dto";

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
        status: t.status as "pending" | "completed",
        createdAt: t.createdAt,
        dueDate: t.dueDate,
        userId: UserIdDTO(t.userId),
      }),
    );
  }
}
