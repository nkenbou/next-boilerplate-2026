import { DisplayName } from "./display-name";
import { UserId } from "./user-id";
import { UserPassword } from "./user-password";
import { Username } from "./username";

const __type = Symbol();

export class User {
  readonly __type = __type;

  constructor(
    public readonly id: UserId,
    public readonly username: Username,
    public readonly password: UserPassword,
    public readonly displayName: DisplayName,
  ) {}

  toDTO(): { id: string; username: string; displayName: string } {
    return {
      id: this.id.toDTO(),
      username: this.username.toDTO(),
      displayName: this.displayName.toDTO(),
    };
  }
}
