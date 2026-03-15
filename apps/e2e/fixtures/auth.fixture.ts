import { UserFactory } from "@app/db/factories";
import { initialize } from "@app/db/fabbrica";
import bcrypt from "bcryptjs";
import type { Page } from "@playwright/test";
import { test as dbTest } from "./db.fixture";

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = dbTest.extend<AuthFixtures>({
  authenticatedPage: async ({ page, prisma }, use) => {
    initialize({ prisma });

    const username = process.env.ADMIN_USERNAME ?? "admin";
    const password = process.env.ADMIN_PASSWORD ?? "password";
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserFactory.create({ username, password: hashedPassword });

    await page.goto("/login");
    await page.locator('[name="username"]').fill(username);
    await page.locator('[name="password"]').fill(password);
    await page.locator('[type="submit"]').click();
    await page.waitForURL("/");

    await use(page);
  },
});

export { expect } from "@playwright/test";
