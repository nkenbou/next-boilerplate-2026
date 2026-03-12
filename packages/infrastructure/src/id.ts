import { UUID, uuidv7 } from "uuidv7";

export function generateId(): string {
  return uuidv7();
}

export function isId(id: string): boolean {
  return UUID.parse(id).getVersion() === 7;
}
