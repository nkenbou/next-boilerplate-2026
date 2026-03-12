import { Brand } from "@app/infrastructure/brand";

export type UserIdDTO = string & Brand<"UserId">;
export function UserIdDTO(value: string): UserIdDTO {
  return value as UserIdDTO;
}

export type UsernameDTO = string & Brand<"Username">;
export function UsernameDTO(value: string): UsernameDTO {
  return value as UsernameDTO;
}

export type DisplayNameDTO = string & Brand<"DisplayName">;
export function DisplayNameDTO(value: string): DisplayNameDTO {
  return value as DisplayNameDTO;
}

type UserDTOValue = {
  readonly id: UserIdDTO;
  readonly username: UsernameDTO;
  readonly displayName: DisplayNameDTO;
};
export type UserDTO = UserDTOValue & Brand<"User">;
export function UserDTO(value: UserDTOValue): UserDTO {
  return { ...value } as UserDTO;
}

export type TodoIdDTO = string & Brand<"TodoId">;
export function TodoIdDTO(value: string): TodoIdDTO {
  return value as TodoIdDTO;
}

export type TodoTitleDTO = string & Brand<"TodoTitle">;
export function TodoTitleDTO(value: string): TodoTitleDTO {
  return value as TodoTitleDTO;
}

export type TodoStatusDTO = "pending" | "completed";

type TodoDTOValue = {
  readonly id: TodoIdDTO;
  readonly title: TodoTitleDTO;
  readonly status: TodoStatusDTO;
  readonly createdAt: Date;
  readonly dueDate: Date | null;
  readonly userId: UserIdDTO;
};
export type TodoDTO = TodoDTOValue & Brand<"Todo">;
export function TodoDTO(value: TodoDTOValue): TodoDTO {
  return { ...value } as TodoDTO;
}
