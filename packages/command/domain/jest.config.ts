import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
};

export default config;
