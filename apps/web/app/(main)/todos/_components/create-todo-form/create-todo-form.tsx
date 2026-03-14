"use client";

import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { type JSX, useActionState } from "react";
import { ErrorMessagePanel } from "#components/message-panel";
import { SessionUserId } from "#lib/session-types";
import { createTodo, type CreateTodoState } from "./action";

type Props = {
  readonly userId: SessionUserId;
};

export function CreateTodoForm({ userId }: Props): JSX.Element {
  const [state, action] = useActionState(
    createTodo.bind(null, userId),
    undefined,
  );

  return (
    <Box>
      <form action={action}>
        <Flex gap="2">
          <TextField.Root
            name="title"
            placeholder="新しいタスクを入力..."
            defaultValue={state?.title}
            style={{ flex: 1 }}
          />
          <Button type="submit">追加</Button>
        </Flex>
        {state?.errors?.title && (
          <ErrorMessagePanel messages={state.errors.title} />
        )}
        {state?.messages && <ErrorMessagePanel messages={state.messages} />}
      </form>
    </Box>
  );
}
