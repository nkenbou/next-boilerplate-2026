import {
  DueDate,
  Todo,
  TodoId,
  TodoStatus,
  TodoTitle,
  UserId,
} from "@app/command-domain";
import type { TodoRepository } from "@app/command-interface-adapter-if";
import { prisma } from "@app/db/client";
import { Prisma } from "@app/db/prisma-client";

type TodoRecord = NonNullable<
  Prisma.Result<typeof prisma.todo, unknown, "findUnique">
>;

export class PrismaTodoRepository implements TodoRepository {
  async store(todo: Todo): Promise<void> {
    await prisma.todo.upsert({
      where: { todoId: todo.id.value },
      update: {
        title: todo.title.value,
        status: todo.status.value,
        dueDate: todo.dueDate?.value ?? null,
      },
      create: {
        todoId: todo.id.value,
        title: todo.title.value,
        status: todo.status.value,
        createdAt: todo.createdAt,
        dueDate: todo.dueDate?.value ?? null,
        userId: todo.userId.value,
      },
    });
  }

  async findById(todoId: TodoId): Promise<Todo | null> {
    const record = await prisma.todo.findUnique({
      where: { todoId: todoId.value },
    });
    if (record === null) return null;
    return this.reconstruct(record);
  }

  async findByUserId(userId: UserId): Promise<Todo[]> {
    const records = await prisma.todo.findMany({
      where: { userId: userId.value },
      orderBy: { createdAt: "desc" },
    });
    return records.map((r) => this.reconstruct(r));
  }

  private reconstruct(record: TodoRecord): Todo {
    return Todo.of(
      TodoId.of(record.todoId),
      TodoTitle.of(record.title),
      TodoStatus.of(record.status),
      record.createdAt,
      UserId.of(record.userId),
      record.dueDate ? DueDate.of(record.dueDate) : null,
    );
  }
}
