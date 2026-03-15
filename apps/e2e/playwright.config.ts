import { defineConfig, devices } from "@playwright/test";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.e2e.local if present (values do not override existing env vars)
const envFile = path.resolve(__dirname, ".env.e2e.local");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  }
}

// Ensure DATABASE_URL always targets the e2e schema
if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("schema=e2e")) {
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", "e2e");
  process.env.DATABASE_URL = url.toString();
}

const isCI = Boolean(process.env.CI);
const baseURL = process.env.BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: 1,
  reporter: "html",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],
  webServer: isCI
    ? {
        command: "pnpm --filter web start",
        url: baseURL,
        reuseExistingServer: false,
        timeout: 120_000,
      }
    : {
        command: "pnpm --filter web dev",
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
