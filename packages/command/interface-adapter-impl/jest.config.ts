import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  testEnvironment: "@quramy/jest-prisma-node/environment",
  setupFiles: ["<rootDir>/.jest/setup.ts"],
  setupFilesAfterEnv: ["<rootDir>/.jest/setupAfterEnv.ts"],
  maxWorkers: 1,
  collectCoverage: true,
  coverageDirectory: "coverage",
};

export default config;
