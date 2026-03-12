import "reflect-metadata";
import { prisma } from "@app/db/client";
import { container } from "tsyringe";

container.register("PrismaClient", { useValue: prisma });
