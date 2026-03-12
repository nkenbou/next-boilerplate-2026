export type ActionState<
  T extends Record<string, unknown> = Record<string, never>,
> =
  | (T & {
      errors?: {
        [K in keyof T]?: string[];
      };
      messages?: string[];
    })
  | undefined;
