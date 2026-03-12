export type LoginAuthenticationState =
  | {
      username?: string;
      password?: string;
      errors?: {
        username?: string[];
        password?: string[];
      };
      messages?: string[];
    }
  | undefined;
