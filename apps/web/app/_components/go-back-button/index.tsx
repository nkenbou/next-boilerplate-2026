"use client";

import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { type JSX } from "react";

/**
 * @public
 */
export function GoBackButton(): JSX.Element {
  const router = useRouter();
  return (
    <Button variant="soft" onClick={() => router.back()}>
      戻る
    </Button>
  );
}
