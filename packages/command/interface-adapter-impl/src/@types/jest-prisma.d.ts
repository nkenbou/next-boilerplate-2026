import type { PrismaClient } from "@app/db/client";
import type { JestPrisma } from "@quramy/jest-prisma-core";

declare global {
  var jestPrisma: JestPrisma<PrismaClient>;
}
