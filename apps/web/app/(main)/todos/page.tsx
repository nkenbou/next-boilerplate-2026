import type { JSX } from "react";
import { getTodos } from "#lib/dal";
import { CreateTodoFormContainer, TodoList } from "./_components";

export default async function Page(): Promise<JSX.Element> {
  const todos = await getTodos();

  return (
    <div>
      <CreateTodoFormContainer />
      <TodoList todos={todos} />
    </div>
  );
}
