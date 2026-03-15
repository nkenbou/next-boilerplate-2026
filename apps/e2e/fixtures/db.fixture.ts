import { PrismaClient } from "@app/db/prisma-client";
import { test as base } from "@playwright/test";

function createE2ePrisma(): PrismaClient {
  return new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
  });
}

type DbFixtures = {
  prisma: PrismaClient;
};

export const test = base.extend<DbFixtures>({
  prisma: async ({}, use: (prisma: PrismaClient) => Promise<void>) => {
    const prisma = createE2ePrisma();
    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();
    await use(prisma);
    await prisma.$disconnect();
  },
});

export { expect } from "@playwright/test";
