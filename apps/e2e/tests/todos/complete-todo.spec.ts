import { test, expect } from "../../fixtures";
import { TodoFactory } from "@app/db/factories";
import { TodoPage } from "../../page-objects";

test.describe("Todo 完了", () => {
  test("完了ボタンを押すと Todo が完了状態になる", async ({
    authenticatedPage,
    prisma,
  }) => {
    const username = process.env.ADMIN_USERNAME ?? "admin";
    const user = await prisma.user.findFirst({ where: { username } });
    await TodoFactory.create({
      title: "完了させる Todo",
      user: { connect: { userId: user!.userId } },
    });

    const todoPage = new TodoPage(authenticatedPage);
    await todoPage.goto();

    const completeButton = todoPage.getCompleteButton("完了させる Todo");
    await expect(completeButton).toBeVisible();
    await completeButton.click();

    await expect(completeButton).not.toBeVisible();
  });
});
