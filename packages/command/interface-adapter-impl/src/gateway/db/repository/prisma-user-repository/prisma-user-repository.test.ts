import { Username } from "@app/command-domain";
import { UserFactory } from "@app/db/factories";
import { PrismaUserRepository } from "./prisma-user-repository";

describe("PrismaUserRepository", () => {
  const repository = new PrismaUserRepository();

  it("username でユーザーを検索できる", async () => {
    await UserFactory.create({ username: "test-user" });

    const user = await repository.findByUsername(Username.of("test-user"));
    expect(user?.username.value).toBe("test-user");
  });

  it("存在しない username では null を返す", async () => {
    const user = await repository.findByUsername(Username.of("non-existent"));
    expect(user).toBeNull();
  });
});
