import { JSX } from "react";
import { verifySession } from "#lib/session";
import { Header, MainLayout } from "./_components";

export default async function MainGroupLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  await verifySession();
  return <MainLayout header={<Header />}>{children}</MainLayout>;
}
