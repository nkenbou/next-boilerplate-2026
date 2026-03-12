import type { User } from "@app/command-domain";
import { UserId, Username } from "@app/command-domain";

export interface UserRepository {
  store: (user: User) => Promise<void>;
  findById: (userId: UserId) => Promise<User | null>;
  findByUsername: (username: Username) => Promise<User | null>;
}

export class UserRepositoryMock implements UserRepository {
  public users: User[] = [];

  store(user: User): Promise<void> {
    const users = this.users.filter((u) => !u.id.equals(user.id));
    users.push(user);
    this.users = users;
    return Promise.resolve();
  }

  findById(userId: UserId): Promise<User | null> {
    const user = this.users.find((u) => u.id.equals(userId));
    if (typeof user === "undefined") return Promise.resolve(null);
    return Promise.resolve(user);
  }

  findByUsername(username: Username): Promise<User | null> {
    const user = this.users.find((u) => u.username.equals(username));
    if (typeof user === "undefined") return Promise.resolve(null);
    return Promise.resolve(user);
  }
}
