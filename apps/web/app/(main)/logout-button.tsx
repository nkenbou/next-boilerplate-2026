"use client";

import { Button } from "@radix-ui/themes";
import { JSX } from "react";
import { logout } from "#actions/auth";

export function LogoutButton(): JSX.Element {
  return (
    <form action={logout}>
      <Button
        type="submit"
        variant="soft"
        style={{ color: "white", backgroundColor: "transparent" }}
      >
        ログアウト
      </Button>
    </form>
  );
}
