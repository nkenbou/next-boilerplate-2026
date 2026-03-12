import bcrypt from "bcryptjs";
import { DisplayName, User, UserId, UserPassword, Username } from "../user";
import { LoginAuthentication } from "./login-authentication";
import { LoginAuthenticationError } from "./login-authentication-error";

describe("LoginAuthentication", () => {
  describe("authenticate()", () => {
    it("ユーザーが存在してパスワードが有効なとき、LoginAuthentication を返す", async () => {
      const hashedPassword = await bcrypt.hash("password", 10);
      const user = new User(
        UserId.of("user-id-1"),
        Username.of("admin"),
        UserPassword.of(hashedPassword),
        DisplayName.of("Admin User"),
      );
      const auth = await LoginAuthentication.authenticate(
        user,
        UserPassword.of("password"),
      );
      expect(auth.userId).toBe("user-id-1");
    });

    it('ユーザーが存在しないとき、"UNKNOWN_USER" の例外になる', async () => {
      await expect(
        LoginAuthentication.authenticate(null, UserPassword.of("password")),
      ).rejects.toThrow(new LoginAuthenticationError("UNKNOWN_USER"));
    });

    it('パスワードが無効なとき、"INVALID_PASSWORD" の例外になる', async () => {
      const hashedPassword = await bcrypt.hash("password", 10);
      const user = new User(
        UserId.of("user-id-1"),
        Username.of("admin"),
        UserPassword.of(hashedPassword),
        DisplayName.of("Admin User"),
      );
      await expect(
        LoginAuthentication.authenticate(
          user,
          UserPassword.of("wrong-password"),
        ),
      ).rejects.toThrow(new LoginAuthenticationError("INVALID_PASSWORD"));
    });
  });
});
