import {
  DisplayName,
  User,
  UserId,
  UserPassword,
  Username,
} from "@app/command-domain";
import {
  LoginAuthenticationPresenterMock,
  UserRepositoryMock,
} from "@app/command-interface-adapter-if";
import bcrypt from "bcryptjs";
import { LoginAuthenticationCommandProcessorImpl } from "./login-authentication-command-processor";

describe("LoginAuthenticationCommandProcessor", () => {
  async function setup(): Promise<{
    processor: LoginAuthenticationCommandProcessorImpl;
    presenter: LoginAuthenticationPresenterMock;
    userRepository: UserRepositoryMock;
  }> {
    const presenter = new LoginAuthenticationPresenterMock();
    const userRepository = new UserRepositoryMock();
    const hashedPassword = await bcrypt.hash("password", 10);
    await userRepository.store(
      new User(
        UserId.of("user-id-1"),
        Username.of("admin"),
        UserPassword.of(hashedPassword),
        DisplayName.of("Admin User"),
      ),
    );

    const processor = new LoginAuthenticationCommandProcessorImpl(
      presenter,
      userRepository,
    );
    return { processor, presenter, userRepository };
  }

  it("正しい資格情報でログイン認証できる", async () => {
    const { processor, presenter } = await setup();
    await processor.authenticate(
      Username.of("admin"),
      UserPassword.of("password"),
    );
    expect(presenter.loginAuthentication?.userId).toBe("user-id-1");
  });

  it("存在しないユーザー名でエラーになる", async () => {
    const { processor, presenter } = await setup();
    await processor.authenticate(
      Username.of("unknown"),
      UserPassword.of("password"),
    );
    expect(presenter.loginAuthenticationError?.type).toBe("UNKNOWN_USER");
  });

  it("間違ったパスワードでエラーになる", async () => {
    const { processor, presenter } = await setup();
    await processor.authenticate(
      Username.of("admin"),
      UserPassword.of("wrong"),
    );
    expect(presenter.loginAuthenticationError?.type).toBe("INVALID_PASSWORD");
  });
});
