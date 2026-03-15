"use client";

import { type JSX, useActionState } from "react";
import { createTodo } from "./create-todo-action";
import { CreateTodoForm } from "./create-todo-form";

export function CreateTodoFormContainer(): JSX.Element {
  const [state, action] = useActionState(createTodo, undefined);
  return <CreateTodoForm state={state} createTodoAction={action} />;
}
