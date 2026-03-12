import { Todo, TodoId, TodoTitle, UserId } from "@app/command-domain";
import {
  TodoPresenterMock,
  TodoRepositoryMock,
} from "@app/command-interface-adapter-if";
import { TodoCommandProcessorImpl } from "./todo-command-processor";

describe("TodoCommandProcessor", () => {
  describe("create", () => {
    it("Todo を作成できる", async () => {
      const presenter = new TodoPresenterMock();
      const todoRepository = new TodoRepositoryMock();
      const processor = new TodoCommandProcessorImpl(presenter, todoRepository);

      await processor.create(
        UserId.of("user-id-1"),
        TodoTitle.of("新しいタスク"),
      );

      expect(presenter.todo?.title.value).toBe("新しいタスク");
      expect(presenter.todo?.status.value).toBe("pending");
      expect(todoRepository.todos).toHaveLength(1);
    });

    it("空のタイトルでエラーになる", () => {
      expect(() => TodoTitle.of("")).toThrow("TodoTitle cannot be empty");
    });
  });

  describe("complete", () => {
    it("Todo を完了にできる", async () => {
      const presenter = new TodoPresenterMock();
      const todoRepository = new TodoRepositoryMock();
      const todo = Todo.create(
        TodoId.of("todo-id-1"),
        TodoTitle.of("Test"),
        UserId.of("user-id-1"),
      );
      await todoRepository.store(todo);

      const processor = new TodoCommandProcessorImpl(presenter, todoRepository);
      await processor.complete(TodoId.of("todo-id-1"));

      expect(presenter.todo?.status.value).toBe("completed");
    });

    it("存在しない TodoId では notFound になる", async () => {
      const presenter = new TodoPresenterMock();
      const todoRepository = new TodoRepositoryMock();
      const processor = new TodoCommandProcessorImpl(presenter, todoRepository);

      await processor.complete(TodoId.of("non-existent"));

      expect(presenter.error?.type).toBe("TODO_NOT_FOUND");
    });
  });
});
