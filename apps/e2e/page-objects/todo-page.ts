import type { Locator, Page } from "@playwright/test";

export class TodoPage {
  readonly titleInput: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.titleInput = page.getByRole("textbox", { name: "タイトル" });
    this.submitButton = page.getByRole("button", { name: "追加" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/todos");
  }

  async createTodo(title: string): Promise<void> {
    await this.titleInput.fill(title);
    await this.submitButton.click();
  }

  getTodoCard(title: string): Locator {
    return this.page.getByRole("article", { name: title });
  }

  getCompleteButton(title: string): Locator {
    return this.getTodoCard(title).getByRole("button", { name: "完了" });
  }
}
