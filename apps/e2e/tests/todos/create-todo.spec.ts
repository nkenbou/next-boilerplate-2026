import { test, expect } from "../../fixtures";
import { TodoPage } from "../../page-objects";

test.describe("Todo 作成", () => {
  test("Todo を作成すると一覧に表示される", async ({ authenticatedPage }) => {
    const todoPage = new TodoPage(authenticatedPage);
    await todoPage.goto();

    await todoPage.createTodo("E2E テスト用 Todo");

    await expect(todoPage.getTodoCard("E2E テスト用 Todo")).toBeVisible();
  });

  test("タイトルが空のまま送信するとバリデーションエラーが表示される", async ({
    authenticatedPage,
  }) => {
    const todoPage = new TodoPage(authenticatedPage);
    await todoPage.goto();

    await todoPage.submitButton.click();

    await expect(
      authenticatedPage.getByRole("alert").first(),
    ).toBeVisible();
  });
});
