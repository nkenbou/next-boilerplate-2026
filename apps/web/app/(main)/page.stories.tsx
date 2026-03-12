import type { Meta, StoryObj } from "@storybook/nextjs-vite";
// eslint-disable-next-line import-access/jsdoc -- Storybook
import { Top } from "./_components/top";

const meta: Meta<typeof Top> = {
  component: Top,
  args: {
    userName: "テストユーザー",
  },
} satisfies Meta<typeof Top>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "トップページ",
};
