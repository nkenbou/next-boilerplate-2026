"use server";

import { redirect } from "next/navigation";
import { deleteSession } from "#lib/session";

/**
 * @public
 */
export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
