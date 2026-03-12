import type { TodoQueryProcessor } from "@app/query/processors";
import { fn } from "storybook/test";

export type { TodoQueryProcessor };

export const listTodosMock: TodoQueryProcessor["list"] = fn().mockResolvedValue(
  [],
);

export function createTodoProcessor(): TodoQueryProcessor {
  return {
    list: listTodosMock,
  };
}
