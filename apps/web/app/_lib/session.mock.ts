import { fn } from "storybook/test";
import { SessionPayload } from "./session";
import { SessionId, SessionUserId } from "./session-types";

export { encrypt, decrypt, createSession, deleteSession } from "./session";

export const verifySession: () => Promise<SessionPayload> =
  fn().mockResolvedValue({
    sessionId: SessionId("mock-session-id"),
    userId: SessionUserId("mock-user-id"),
  });
