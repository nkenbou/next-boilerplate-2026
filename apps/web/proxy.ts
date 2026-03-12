import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt, updateSession } from "#lib/session";

export default async function proxy(
  request: NextRequest,
): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = pathname === "/login";

  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (isPublicRoute && payload?.userId) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicRoute && !payload?.userId) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  await updateSession();
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
