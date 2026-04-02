import type { DataAccessClientManager } from "@app/command-interface-adapter-if";
import { prisma } from "@app/db/client";
import { Prisma, PrismaClient } from "@app/db/prisma-client";

type Client = PrismaClient | Prisma.TransactionClient;

export class PrismaClientManager implements DataAccessClientManager<Client> {
  private client: Client = prisma;

  setClient(client: Client): void {
    this.client = client;
  }

  getClient(): Client {
    return this.client;
  }
}
