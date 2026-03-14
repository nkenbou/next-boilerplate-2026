import { UserId } from "../user";
import { Todo } from "./todo";
import { TodoDescription } from "./todo-description";
import { TodoId } from "./todo-id";
import { TodoTitle } from "./todo-title";

describe("Todo", () => {
  const id = TodoId.of("todo-id-1");
  const title = TodoTitle.of("Test Todo");
  const userId = UserId.of("user-id-1");
  const description = TodoDescription.of("");

  describe("create()", () => {
    it("pending ステータスの Todo を作成する", () => {
      const todo = Todo.create(id, title, userId, description);
      expect(todo.status.isPending()).toBe(true);
      expect(todo.id.value).toBe("todo-id-1");
      expect(todo.title.value).toBe("Test Todo");
    });
  });

  describe("complete()", () => {
    it("pending の Todo を completed に変更できる", () => {
      const todo = Todo.create(id, title, userId, description);
      const completed = todo.complete();
      expect(completed.status.isCompleted()).toBe(true);
    });

    it("completed の Todo を再度 complete するとエラーになる", () => {
      const todo = Todo.create(id, title, userId, description).complete();
      expect(() => todo.complete()).toThrow("Todo is already completed");
    });
  });

  describe("toDTO()", () => {
    it("DTO に変換できる", () => {
      const todo = Todo.create(id, title, userId, description);
      const dto = todo.toDTO();
      expect(dto.id).toBe("todo-id-1");
      expect(dto.title).toBe("Test Todo");
      expect(dto.status).toBe("pending");
      expect(dto.createdAt).toBeInstanceOf(Date);
    });
  });
});
