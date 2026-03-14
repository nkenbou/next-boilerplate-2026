"use client";

import { Box, Button, Flex, TextArea, TextField } from "@radix-ui/themes";
import { type JSX, useActionState } from "react";
import { ErrorMessagePanel } from "#components/message-panel";
import { SessionUserId } from "#lib/session-types";
import { createTodo } from "./action";

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
        <Flex direction="column" gap="2">
          <TextField.Root
            name="title"
            placeholder="新しいタスクを入力..."
            defaultValue={state?.title}
          />
          {state?.errors?.title && (
            <ErrorMessagePanel messages={state.errors.title} />
          )}
          <TextArea
            name="description"
            placeholder="説明（任意）"
            defaultValue={state?.description}
          />
          {state?.errors?.description && (
            <ErrorMessagePanel messages={state.errors.description} />
          )}
          <Button type="submit">追加</Button>
        </Flex>
        {state?.messages && <ErrorMessagePanel messages={state.messages} />}
      </form>
    </Box>
  );
}
