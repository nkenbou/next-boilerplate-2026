export interface TransactionManager {
  begin: <T>(callback: () => Promise<T>) => Promise<T>;
}

export class TransactionManagerMock implements TransactionManager {
  async begin<T>(callback: () => Promise<T>): Promise<T> {
    return callback();
  }
}
