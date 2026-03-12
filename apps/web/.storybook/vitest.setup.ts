import "reflect-metadata";
import "@testing-library/jest-dom";

import { setProjectAnnotations } from "@storybook/nextjs-vite";
import { createNavigation } from "@storybook/nextjs-vite/navigation.mock";
import { screenshot } from "@storycap-testrun/browser";
import { page } from "@vitest/browser/context";
import * as projectAnnotations from "./preview";

createNavigation(undefined);

const project = setProjectAnnotations([projectAnnotations]);
beforeAll(project.beforeAll);

afterEach(async (context) => {
  const file = context.task.file?.filepath ?? "";
  if (!file.endsWith(".stories.tsx")) return;
  await screenshot(page, context);
});
