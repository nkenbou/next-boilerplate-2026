"use client";

import { Label } from "@radix-ui/react-label";
import { Box, Button, Text, TextField } from "@radix-ui/themes";
import { type JSX, useId } from "react";
import { useFormStatus } from "react-dom";
import { ErrorMessagePanel } from "#components/message-panel";
import { LoginAuthenticationState } from "./type";

function LoginButton(): JSX.Element {
  const { pending } = useFormStatus();
  return (
    <Button
      aria-disabled={pending}
      size="4"
      style={{ width: "100%" }}
      type="submit"
    >
      ログイン
    </Button>
  );
}

type Props = {
  readonly state?: LoginAuthenticationState;
  readonly loginAction: (formData: FormData) => void;
};

export function LoginForm({ state, loginAction }: Props): JSX.Element {
  const usernameErrorId = useId();
  const passwordErrorId = useId();

  return (
    <form action={loginAction} aria-label="ログインフォーム">
      <Box mb="5">
        <Label>
          <Text as="div" mb="2" size="2" weight="bold">
            ユーザー名
          </Text>
          <TextField.Root
            name="username"
            placeholder="ユーザー名を入力してください"
            defaultValue={state?.username}
            aria-describedby={
              typeof state?.errors?.username !== "undefined"
                ? usernameErrorId
                : undefined
            }
          />
        </Label>
        {state?.errors?.username && (
          <ErrorMessagePanel
            id={usernameErrorId}
            messages={state.errors.username}
          />
        )}
      </Box>
      <Box mb="5">
        <Label>
          <Text as="div" mb="2" size="2" weight="bold">
            パスワード
          </Text>
          <TextField.Root
            name="password"
            placeholder="パスワードを入力してください"
            type="password"
            defaultValue={state?.password}
            aria-describedby={
              typeof state?.errors?.password !== "undefined"
                ? passwordErrorId
                : undefined
            }
          />
        </Label>
        {state?.errors?.password && (
          <ErrorMessagePanel
            id={passwordErrorId}
            messages={state.errors.password}
          />
        )}
      </Box>
      <Box mt="6">
        {state?.messages && <ErrorMessagePanel messages={state.messages} />}
        <LoginButton />
      </Box>
    </form>
  );
}
