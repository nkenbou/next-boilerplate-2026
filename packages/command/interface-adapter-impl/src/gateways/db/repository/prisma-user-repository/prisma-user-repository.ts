import {
  DisplayName,
  User,
  UserId,
  UserPassword,
  Username,
} from "@app/command-domain";
import type { UserRepository } from "@app/command-interface-adapter-if";
import { prisma } from "@app/db/client";
import { Prisma } from "@app/db/prisma-client";

type UserRecord = NonNullable<
  Prisma.Result<typeof prisma.user, unknown, "findUnique">
>;

export class PrismaUserRepository implements UserRepository {
  async store(user: User): Promise<void> {
    await prisma.user.upsert({
      where: { userId: user.id.value },
      update: {
        username: user.username.value,
        password: user.password.value,
        displayName: user.displayName.value,
      },
      create: {
        userId: user.id.value,
        username: user.username.value,
        password: user.password.value,
        displayName: user.displayName.value,
      },
    });
  }

  async findById(userId: UserId): Promise<User | null> {
    const record = await prisma.user.findUnique({
      where: { userId: userId.value },
    });
    if (record === null) return null;
    return this.reconstruct(record);
  }

  async findByUsername(username: Username): Promise<User | null> {
    const record = await prisma.user.findUnique({
      where: { username: username.value },
    });
    if (record === null) return null;
    return this.reconstruct(record);
  }

  private reconstruct(record: UserRecord): User {
    return new User(
      UserId.of(record.userId),
      Username.of(record.username),
      UserPassword.of(record.password),
      DisplayName.of(record.displayName),
    );
  }
}
