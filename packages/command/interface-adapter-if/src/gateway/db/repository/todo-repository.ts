import { TodoId, UserId } from "@app/command-domain";
import type { Todo } from "@app/command-domain";

export interface TodoRepository {
  store: (todo: Todo) => Promise<void>;
  findById: (todoId: TodoId) => Promise<Todo | null>;
  findByUserId: (userId: UserId) => Promise<Todo[]>;
}

export class TodoRepositoryMock implements TodoRepository {
  public todos: Todo[] = [];

  store(todo: Todo): Promise<void> {
    const todos = this.todos.filter((t) => !t.id.equals(todo.id));
    todos.push(todo);
    this.todos = todos;
    return Promise.resolve();
  }

  findById(todoId: TodoId): Promise<Todo | null> {
    const todo = this.todos.find((t) => t.id.equals(todoId));
    if (typeof todo === "undefined") return Promise.resolve(null);
    return Promise.resolve(todo);
  }

  findByUserId(userId: UserId): Promise<Todo[]> {
    return Promise.resolve(this.todos.filter((t) => t.userId.equals(userId)));
  }
}
