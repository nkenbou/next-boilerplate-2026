import {
  LoginAuthentication,
  LoginAuthenticationError,
  UserPassword,
  Username,
} from "@app/command-domain";
import type {
  LoginAuthenticationCommandProcessor,
  LoginAuthenticationPresenter,
  UserRepository,
} from "@app/command-interface-adapter-if";
import { type Logger, LoggerMock } from "@app/infrastructure/logger";
import { inject, injectable } from "tsyringe";

@injectable()
export class LoginAuthenticationCommandProcessorImpl implements LoginAuthenticationCommandProcessor {
  private readonly logger: Logger;

  constructor(
    @inject("LoginAuthenticationPresenter")
    private presenter: LoginAuthenticationPresenter,
    @inject("UserRepository")
    private readonly userRepository: UserRepository,
    @inject("Logger")
    logger: Logger = LoggerMock.create(),
  ) {
    this.logger = logger.classLogger(LoginAuthenticationCommandProcessorImpl);
  }

  async authenticate(
    username: Username,
    password: UserPassword,
  ): Promise<void> {
    this.logger.info(`start: ${username.toString()}`);

    try {
      const user = await this.userRepository.findByUsername(username);
      const loginAuthentication = await LoginAuthentication.authenticate(
        user,
        password,
      );

      this.presenter.presentLoginAuthentication(loginAuthentication);

      this.logger.info("end:");
    } catch (error) {
      if (error instanceof LoginAuthenticationError) {
        this.presenter.presentError(error);
        return;
      }

      this.logger.error(error);
      this.presenter.presentAnyError(error);
    }
  }
}
