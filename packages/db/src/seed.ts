import bcrypt from "bcryptjs";
import { prisma } from "./client";

async function main(): Promise<void> {
  const hashedPassword = await bcrypt.hash("password", 10);

  const user = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      userId: "00000000-0000-0000-0000-000000000001",
      username: "admin",
      password: hashedPassword,
      displayName: "Admin User",
    },
  });

  console.log(`Seeded user: ${user.username}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
