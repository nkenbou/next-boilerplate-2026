"use client";

import { type JSX, useActionState } from "react";
import { SessionUserId } from "#lib/session-types";
import { createTodo } from "./create-todo-action";
import { CreateTodoForm } from "./create-todo-form";

type Props = {
  readonly userId: SessionUserId;
};

export function CreateTodoFormContainer({ userId }: Props): JSX.Element {
  const [state, action] = useActionState(
    createTodo.bind(null, userId),
    undefined,
  );
  return <CreateTodoForm state={state} createTodoAction={action} />;
}
