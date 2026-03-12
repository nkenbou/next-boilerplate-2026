import type { JSX } from "react";
import { getCurrentUser } from "#lib/dal";
import { Top } from "./_components";

export default async function Page(): Promise<JSX.Element> {
  const user = await getCurrentUser();
  return <Top userName={user?.displayName ?? "ゲスト"} />;
}
