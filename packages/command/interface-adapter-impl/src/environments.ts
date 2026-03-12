export type EnvironmentVars = {
  DATABASE_URL: string;
  SESSION_SECRET: string;
};

export function environments(): EnvironmentVars {
  if (typeof process.env.DATABASE_URL === "undefined") {
    throw new Error("DATABASE_URL is not set");
  }
  if (typeof process.env.SESSION_SECRET === "undefined") {
    throw new Error("SESSION_SECRET is not set");
  }

  return {
    DATABASE_URL: process.env.DATABASE_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
  };
}
