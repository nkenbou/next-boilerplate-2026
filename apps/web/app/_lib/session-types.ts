import { Brand } from "@app/infrastructure/brand";

/**
 * @public
 */
export type SessionId = string & Brand<"SessionId">;
/**
 * @public
 */
export function SessionId(value: string): SessionId {
  return value as SessionId;
}

/**
 * @public
 */
export type SessionUserId = string & Brand<"SessionUserId">;
/**
 * @public
 */
export function SessionUserId(value: string): SessionUserId {
  return value as SessionUserId;
}
