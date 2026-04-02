import { createRequire } from "node:module";
import path from "node:path";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const require = createRequire(import.meta.url);

function getAbsolutePath(value: string): string {
  return path.dirname(require.resolve(path.join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: [{ from: "../public", to: "/" }],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/nextjs-vite"),
    options: {},
  },

  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@app/command-interface-adapter-impl/processor": path.resolve(
        import.meta.dirname,
        "./mocks/@app/command/processor.mock.ts",
      ),
      "@app/query/processors": path.resolve(
        import.meta.dirname,
        "./mocks/@app/query/processors.mock.ts",
      ),
    };
    return config;
  },
};
export default config;
