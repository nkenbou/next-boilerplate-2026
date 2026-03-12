import { describe, expect, it, jest } from "@jest/globals";
import { TodoQueryProcessorImpl } from "./todo-query-processor";

describe("TodoQueryProcessor", () => {
  it("ユーザーの Todo 一覧を取得できる", async () => {
    const mockPrisma = {
      todo: {
        findMany: jest.fn().mockImplementation(() =>
          Promise.resolve([
            {
              todoId: "t1",
              title: "Task 1",
              status: "pending",
              createdAt: new Date(),
              dueDate: null,
              userId: "u1",
            },
          ]),
        ),
      },
    };
    const processor = new TodoQueryProcessorImpl(mockPrisma as never);
    const todos = await processor.list("u1" as never);
    expect(todos).toHaveLength(1);
  });

  it("findMany に userId が渡る（別ユーザーのデータは DB レベルで除外される）", async () => {
    const mockPrisma = {
      todo: {
        findMany: jest.fn().mockImplementation(() => Promise.resolve([])),
      },
    };
    const processor = new TodoQueryProcessorImpl(mockPrisma as never);
    const todos = await processor.list("u1" as never);
    expect(mockPrisma.todo.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: "u1" } }),
    );
    expect(todos).toHaveLength(0);
  });
});
