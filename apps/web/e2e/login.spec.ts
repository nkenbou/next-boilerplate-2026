import { expect, test } from "@playwright/test";

test.describe("ログイン", () => {
  test("正しい資格情報でログインできる", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL("/login");

    await page.locator('[name="username"]').fill("admin");
    await page.locator('[name="password"]').fill("password");
    await page.locator('[type="submit"]').click();

    await expect(page).toHaveURL("/");
  });

  test("間違ったパスワードでエラーメッセージが表示される", async ({ page }) => {
    await page.goto("/login");

    await page.locator('[name="username"]').fill("admin");
    await page.locator('[name="password"]').fill("wrong-password");
    await page.locator('[type="submit"]').click();

    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page).toHaveURL("/login");
  });

  test("空のフォームでバリデーションエラーが表示される", async ({ page }) => {
    await page.goto("/login");
    await page.locator('[type="submit"]').click();

    await expect(page.getByRole("alert")).toBeVisible();
  });
});
