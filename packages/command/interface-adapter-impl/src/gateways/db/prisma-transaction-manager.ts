import type { TransactionManager } from "@app/command-interface-adapter-if";
import { prisma } from "@app/db/client";
import { inject, injectable } from "tsyringe";
import { PrismaClientManager } from "./prisma-client-manager";

@injectable()
export class PrismaTransactionManager implements TransactionManager {
  constructor(
    @inject("DataAccessClientManager")
    private clientManager: PrismaClientManager,
  ) {}

  async begin<T>(callback: () => Promise<T>): Promise<T> {
    return prisma.$transaction(async (transaction) => {
      this.clientManager.setClient(transaction);
      const res = await callback();
      this.clientManager.setClient(prisma);
      return res;
    });
  }
}
