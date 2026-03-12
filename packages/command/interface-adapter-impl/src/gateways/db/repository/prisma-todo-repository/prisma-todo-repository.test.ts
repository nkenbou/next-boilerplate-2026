import { TodoId, UserId } from "@app/command-domain";
import { TodoFactory, UserFactory } from "@app/db/factories";
import { PrismaTodoRepository } from "./prisma-todo-repository";

describe("PrismaTodoRepository", () => {
  const repository = new PrismaTodoRepository();

  it("userId で Todo 一覧を取得できる", async () => {
    const user = await UserFactory.create();
    await TodoFactory.createList(2, {
      user: { connect: { userId: user.userId } },
    });

    const todos = await repository.findByUserId(UserId.of(user.userId));
    expect(todos).toHaveLength(2);
  });

  it("存在しない todoId では null を返す", async () => {
    const todo = await repository.findById(TodoId.of("non-existent"));
    expect(todo).toBeNull();
  });
});
