import type { JSX } from "react";
import { getTodos } from "#lib/dal";
import { verifySession } from "#lib/session";
import { CreateTodoForm, TodoList } from "./_components";

export default async function Page(): Promise<JSX.Element> {
  const session = await verifySession();
  const todos = await getTodos();

  return (
    <div>
      <CreateTodoForm userId={session.userId} />
      <TodoList todos={todos} />
    </div>
  );
}
