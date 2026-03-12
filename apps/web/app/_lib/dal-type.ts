import { TodoDTO, UserDTO } from "@app/query/dto";

export type GetCurrentUser = () => Promise<UserDTO | null>;
export type GetTodos = () => Promise<TodoDTO[]>;
