import pluginEslintComments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import pluginImportAccess from "eslint-plugin-import-access/flat-config";
import pluginOnlyWarn from "eslint-plugin-only-warn";
import pluginTurbo from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config} */
export const config = [
  eslint.configs.recommended,
  {
    rules: {
      "no-await-in-loop": "warn",
      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
        },
      ],
    },
  },
  eslintConfigPrettier,
  ...tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": [
        "warn",
        {
          allowExpressions: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: false,
          vars: "all",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  pluginImport.flatConfigs.recommended,
  {
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "import/order": [
        "warn",
        {
          alphabetize: {
            order: "asc",
          },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "never",
        },
      ],
    },
  },
  {
    plugins: {
      "import-access": pluginImportAccess,
    },
    rules: {
      "import-access/jsdoc": "warn",
    },
  },
  pluginEslintComments.recommended,
  {
    rules: {
      "@eslint-community/eslint-comments/require-description": "warn",
    },
  },
  {
    plugins: {
      turbo: pluginTurbo,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn: pluginOnlyWarn,
    },
  },
  {
    ignores: ["dist/"],
  },
];
