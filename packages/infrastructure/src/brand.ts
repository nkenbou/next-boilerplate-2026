declare const __brand: unique symbol;
export interface Brand<in out ID extends string | symbol> {
  readonly [__brand]: {
    readonly [id in ID]: ID;
  };
}
