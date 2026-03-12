export type RequestDTO = {
  readonly headers: {
    readonly [name: string]: unknown;
  };
  readonly body: {
    readonly [name: string]: unknown;
  };
};
