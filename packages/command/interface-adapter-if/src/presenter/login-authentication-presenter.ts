import {
  LoginAuthentication,
  LoginAuthenticationError,
} from "@app/command-domain";
import { AnyErrorPresenter } from "./any-error-presenter";

export interface LoginAuthenticationPresenter extends AnyErrorPresenter {
  presentLoginAuthentication: (
    loginAuthentication: LoginAuthentication,
  ) => void;
  presentError: (loginAuthenticationError: LoginAuthenticationError) => void;
}

export class LoginAuthenticationPresenterMock implements LoginAuthenticationPresenter {
  public loginAuthentication?: LoginAuthentication;
  public loginAuthenticationError?: LoginAuthenticationError;
  public anyError?: unknown;

  presentLoginAuthentication(loginAuthentication: LoginAuthentication): void {
    this.loginAuthentication = loginAuthentication;
  }

  presentError(loginAuthenticationError: LoginAuthenticationError): void {
    this.loginAuthenticationError = loginAuthenticationError;
  }

  presentAnyError(error: unknown): void {
    this.anyError = error;
  }
}
