export interface DataAccessClientManager<T> {
  setClient: (client: T) => void;
  getClient: () => T;
}
