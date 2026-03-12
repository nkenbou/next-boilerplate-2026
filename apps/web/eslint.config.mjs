import { config } from "@app/eslint-config/next-js";
import storybook from "eslint-plugin-storybook";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.mjs", ".*.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...storybook.configs["flat/recommended"],
];
