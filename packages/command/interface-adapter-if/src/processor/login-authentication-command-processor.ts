import { UserPassword, Username } from "@app/command-domain";

export interface LoginAuthenticationCommandProcessor {
  authenticate(username: Username, password: UserPassword): Promise<void>;
}
