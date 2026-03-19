import path from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { storybookNextJsPlugin } from "@storybook/nextjs-vite/vite-plugin";
import storycap from "@storycap-testrun/browser/vitest-plugin";
import { defineConfig, defineProject } from "vitest/config";

process.env.STORYBOOK_COMPONENT_PATHS = "**/*.stories.test.tsx";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["app/**/*.{ts,tsx}"],
      exclude: ["**/*.stories.*", "**/*.test.*", "**/*.mock.*"],
    },
    projects: [
      defineProject({
        test: {
          name: "unit",
          globals: true,
          include: ["**/*.test.ts"],
        },
      }),
      defineProject({
        plugins: [
          storybookTest(),
          storybookNextJsPlugin(),
          storycap({
            output: {
              dir: path.resolve("./vrt/actual"),
              file: (context) => {
                const relPath = context.file
                  .replace(/^app\//, "")
                  .replace(/\.stories\.[^.]+$/, "");
                return path.join(relPath, `${context.name}.png`);
              },
            },
          }),
        ],
        optimizeDeps: {
          include: [
            "reflect-metadata",
            "@storybook/nextjs-vite",
            "@radix-ui/themes",
            "next/cache",
          ],
        },
        test: {
          name: "storybook",
          globals: true,
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      }),
    ],
  },
});
