import "server-only";

import { generateId } from "@app/infrastructure/id";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { SessionId, SessionUserId } from "./session-types";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * @public
 */
export type SessionPayload = {
  sessionId: SessionId;
  userId: SessionUserId;
};

/**
 * @public
 */
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

/**
 * @public
 */
export async function decrypt(
  session: string | undefined = "",
): Promise<JWTPayload | undefined> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (_error) {
    console.log("Failed to verify session");
  }
}

/**
 * @public
 */
export async function createSession(userId: SessionUserId): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    sessionId: SessionId(generateId()),
    userId,
  });
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * @public
 */
export async function updateSession(): Promise<void> {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) return;

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * @public
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

/**
 * @public
 */
export const verifySession: () => Promise<SessionPayload> = cache(async () => {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!payload?.userId) {
    redirect("/login");
  }

  return {
    sessionId: SessionId(payload.sessionId as string),
    userId: SessionUserId(payload.userId as string),
  };
});
