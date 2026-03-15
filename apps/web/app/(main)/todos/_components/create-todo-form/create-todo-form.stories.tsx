import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CreateTodoForm } from "./create-todo-form";
import { ANY_ERROR_MESSAGE, MESSAGES } from "./create-todo-form-state";
import { type CreateTodoState } from "./create-todo-form-state";

const meta: Meta<typeof CreateTodoForm> = {
  component: CreateTodoForm,
  args: {
    createTodoAction: fn(),
  },
  excludeStories: [
    "initialState",
    "titleEmptyErrorState",
    "titleTooLongErrorState",
    "descriptionTooLongErrorState",
    "anyErrorState",
  ],
} satisfies Meta<typeof CreateTodoForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const initialState: CreateTodoState = undefined;
export const Default: Story = {
  name: "初期表示",
};

export const titleEmptyErrorState: CreateTodoState = {
  title: "",
  errors: {
    title: [MESSAGES.INVALID_TODO_TITLE_EMPTY],
  },
};
export const TitleEmptyError: Story = {
  name: "タイトル空エラー",
  args: {
    state: titleEmptyErrorState,
  },
};

export const titleTooLongErrorState: CreateTodoState = {
  title: "a".repeat(201),
  errors: {
    title: [MESSAGES.INVALID_TODO_TITLE_TOO_LONG],
  },
};
export const TitleTooLongError: Story = {
  name: "タイトル文字数超過エラー",
  args: {
    state: titleTooLongErrorState,
  },
};

export const descriptionTooLongErrorState: CreateTodoState = {
  title: "テストタスク",
  description: "a".repeat(501),
  errors: {
    description: [MESSAGES.INVALID_TODO_DESCRIPTION_TOO_LONG],
  },
};
export const DescriptionTooLongError: Story = {
  name: "説明文字数超過エラー",
  args: {
    state: descriptionTooLongErrorState,
  },
};

export const anyErrorState: CreateTodoState = {
  messages: [ANY_ERROR_MESSAGE],
};
export const AnyError: Story = {
  name: "汎用エラー",
  args: {
    state: anyErrorState,
  },
};
