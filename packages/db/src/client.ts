import { PrismaClient } from "../.prisma/client";

const prismaClientSingleton = (): PrismaClient => {
  return new PrismaClient();
};

declare global {
  var appPrisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.appPrisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.appPrisma = prisma;
