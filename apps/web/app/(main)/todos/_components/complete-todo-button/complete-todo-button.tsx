"use client";

import { TodoIdDTO } from "@app/query/dto";
import { Button } from "@radix-ui/themes";
import { JSX, useActionState } from "react";
import { completeTodo } from "./complete-todo-action";

type Props = {
  readonly todoId: TodoIdDTO;
};

export function CompleteTodoButton({ todoId }: Props): JSX.Element {
  const [, action] = useActionState(completeTodo.bind(null, todoId), undefined);
  return (
    <form action={action}>
      <Button type="submit" variant="soft" size="1">
        完了
      </Button>
    </form>
  );
}
