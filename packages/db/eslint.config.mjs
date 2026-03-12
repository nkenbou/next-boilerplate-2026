import { config } from "@app/eslint-config/library";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        jestPrisma: "readonly",
      },
    },
  },
  {
    rules: {
      "import-access/jsdoc": [
        "warn",
        {
          defaultImportability: "package",
          excludeSourcePatterns: [".prisma/**", "**/__generated__/**"],
        },
      ],
    },
  },
  {
    ignores: [".prisma/", "**/__generated__/"],
  },
];
