import "reflect-metadata";
import { initialize } from "@app/db/fabbrica";
import { PrismaClient } from "@app/db/prisma-client";

jestPrisma.initializeClient(new PrismaClient());
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
globalThis.appPrisma = jestPrisma.client;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
initialize({ prisma: jestPrisma.client });
