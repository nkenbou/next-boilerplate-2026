import bcrypt from "bcryptjs";
import { User, UserPassword } from "../user";
import { LoginAuthenticationError } from "./login-authentication-error";

const __type = Symbol();

export class LoginAuthentication {
  readonly __type = __type;

  private constructor(public readonly userId: string) {}

  toDTO(): { userId: string } {
    return { userId: this.userId };
  }

  static async authenticate(
    user: User | null,
    password: UserPassword,
  ): Promise<LoginAuthentication> {
    if (user === null) {
      throw new LoginAuthenticationError("UNKNOWN_USER");
    }

    const isValid = await bcrypt.compare(password.value, user.password.value);
    if (!isValid) {
      throw new LoginAuthenticationError("INVALID_PASSWORD");
    }

    return new LoginAuthentication(user.id.value);
  }
}
