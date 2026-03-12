"use client";

import { TodoIdDTO } from "@app/query/dto";
import { Button } from "@radix-ui/themes";
import { JSX } from "react";
import { completeTodo } from "./action";

type Props = {
  readonly todoId: TodoIdDTO;
};

export function CompleteTodoButton({ todoId }: Props): JSX.Element {
  return (
    <form action={() => completeTodo(todoId)}>
      <Button type="submit" variant="soft" size="1">
        完了
      </Button>
    </form>
  );
}
