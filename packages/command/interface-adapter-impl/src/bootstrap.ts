import "reflect-metadata";
import { Lifecycle, container } from "tsyringe";
import {
  PrismaClientManager,
  PrismaTodoRepository,
  PrismaTransactionManager,
  PrismaUserRepository,
} from "./gateways";

container.register(
  "DataAccessClientManager",
  {
    useClass: PrismaClientManager,
  },
  { lifecycle: Lifecycle.ResolutionScoped },
);

container.register("TransactionManager", {
  useClass: PrismaTransactionManager,
});

container.register("UserRepository", {
  useClass: PrismaUserRepository,
});

container.register("TodoRepository", {
  useClass: PrismaTodoRepository,
});
