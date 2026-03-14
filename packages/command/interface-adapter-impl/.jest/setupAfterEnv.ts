import "reflect-metadata";
import { initialize } from "@app/db/fabbrica";
import { PrismaClient } from "@app/db/prisma-client";

jestPrisma.initializeClient(new PrismaClient());

globalThis.prisma = jestPrisma.client as PrismaClient;
initialize({ prisma: jestPrisma.client as PrismaClient });
