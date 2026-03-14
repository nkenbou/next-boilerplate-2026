"use client";

import { Box, Button, Flex, TextArea, TextField } from "@radix-ui/themes";
import { type JSX } from "react";
import { ErrorMessagePanel } from "#components/message-panel";
import { type CreateTodoState } from "./form-state";

type Props = {
  readonly state?: CreateTodoState;
  readonly createTodoAction: (formData: FormData) => void;
};

export function CreateTodoForm({
  state,
  createTodoAction,
}: Props): JSX.Element {
  return (
    <Box>
      <form action={createTodoAction}>
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
