import "server-only";

import { SessionLogger } from "@app/infrastructure/logger";
import {
  DisplayNameDTO,
  UserDTO,
  UserIdDTO,
  UsernameDTO,
} from "@app/query/dto";
import { createTodoProcessor } from "@app/query/processors";
import { cache } from "react";
import { GetCurrentUser, GetTodos } from "./dal-type";
import { verifySession } from "./session";

/**
 * @public
 */
export const getCurrentUser: GetCurrentUser = cache(async () => {
  const session = await verifySession();
  // TODO: ユーザー情報取得プロセッサーに委譲
  const userId = UserIdDTO(session.userId);
  return UserDTO({
    id: userId,
    username: UsernameDTO(session.userId),
    displayName: DisplayNameDTO("User"),
  });
});

/**
 * @public
 */
export const getTodos: GetTodos = cache(async () => {
  const session = await verifySession();
  const processor = createTodoProcessor(
    SessionLogger.create(session.sessionId),
  );
  return processor.list(UserIdDTO(session.userId));
});
