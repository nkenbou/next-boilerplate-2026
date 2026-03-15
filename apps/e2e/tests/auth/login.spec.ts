import { test as dbTest, expect } from "../../fixtures/db.fixture";
import { UserFactory } from "@app/db/factories";
import { initialize } from "@app/db/fabbrica";
import bcrypt from "bcryptjs";
import { LoginPage } from "../../page-objects";

const test = dbTest.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page, prisma }, use) => {
    initialize({ prisma });
    const username = process.env.ADMIN_USERNAME ?? "admin";
    const password = process.env.ADMIN_PASSWORD ?? "password";
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserFactory.create({ username, password: hashedPassword });
    await use(new LoginPage(page));
  },
});

test.describe("ログイン", () => {
  test("正しい資格情報でログインできる", async ({ page, loginPage }) => {
    const username = process.env.ADMIN_USERNAME ?? "admin";
    const password = process.env.ADMIN_PASSWORD ?? "password";

    await loginPage.goto();
    await loginPage.login(username, password);

    await expect(page).toHaveURL("/");
  });

  test("誤ったパスワードでエラーアラートが表示される", async ({
    loginPage,
    page,
  }) => {
    const username = process.env.ADMIN_USERNAME ?? "admin";

    await loginPage.goto();
    await loginPage.login(username, "wrong-password");

    await expect(loginPage.errorAlert).toBeVisible();
    await expect(page).toHaveURL("/login");
  });

  test("空のフォームを送信するとバリデーションエラーが表示される", async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.submitButton.click();

    await expect(loginPage.errorAlert).toBeVisible();
  });
});
