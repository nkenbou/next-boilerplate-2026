import eslint from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginJest from "eslint-plugin-jest";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginPlaywright from "eslint-plugin-playwright";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginStorybook from "eslint-plugin-storybook";
import pluginTestingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import tseslint from "typescript-eslint";
import { config as baseConfig } from "./base.js";

/** @type {import("eslint").Linter.Config} */
export const config = [
  ...baseConfig,
  eslint.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      "@typescript-eslint/require-await": "off",
      "import-access/jsdoc": [
        "warn",
        {
          defaultImportability: "package",
        },
      ],
    },
  },
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  pluginJsxA11y.flatConfigs.recommended,
  {
    files: ["*.stories.jsx", "*.stories.tsx"],
    ...pluginStorybook.configs["flat/recommended"],
  },
  {
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    plugins: {
      jest: pluginJest,
    },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    ...pluginJest.configs["flat/recommended"],
    ...pluginTestingLibrary.configs["flat/react"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
    ignores: ["**/e2e/**/*"],
  },
  {
    files: ["**/e2e/**/?(*.)+(spec|test).[jt]s?(x)"],
    ...pluginPlaywright.configs["flat/recommended"],
  },
  {
    ignores: [".next/", "coverage/"],
  },
];
