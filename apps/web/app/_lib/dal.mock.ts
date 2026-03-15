import {
  DisplayNameDTO,
  TodoCreatedAtDTO,
  TodoDTO,
  TodoDescriptionDTO,
  TodoDueDateDTO,
  TodoIdDTO,
  TodoStatusDTO,
  TodoTitleDTO,
  UserDTO,
  UserIdDTO,
  UsernameDTO,
} from "@app/query/dto";
import { fn } from "storybook/test";
import { GetCurrentUser, GetTodos } from "./dal-type";

export const getCurrentUser: GetCurrentUser = fn().mockResolvedValue(
  UserDTO({
    id: UserIdDTO("mock-user-id"),
    username: UsernameDTO("mock-user"),
    displayName: DisplayNameDTO("Mock User"),
  }),
);

export const getTodos: GetTodos = fn().mockResolvedValue([
  TodoDTO({
    id: TodoIdDTO("todo-id-1"),
    title: TodoTitleDTO("Sample Todo"),
    status: TodoStatusDTO("pending"),
    createdAt: TodoCreatedAtDTO(new Date("2024-01-01")),
    dueDate: TodoDueDateDTO(null),
    userId: UserIdDTO("mock-user-id"),
    description: TodoDescriptionDTO(""),
  }),
]);
