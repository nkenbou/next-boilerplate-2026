import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
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

// Storybook Interaction Test。
// play 関数でユーザー操作を再現し、動作を検証する。
// storybook プロジェクト (Playwright/Chromium) で Vitest テストとして自動実行され、
// Storybook UI の「Interactions」タブでも操作ステップを確認できる。
//
// テストの観点: ユーザー操作 (入力・クリック) がアクションに正しく繋がるか (動作の検証)。
// カタログとして見せる価値のある操作シナリオをここに定義する。
// カタログに含めるには細かすぎる詳細なシナリオは create-todo-form.stories.test.tsx に書く。
//
// この play 関数は create-todo-form.stories.test.tsx から Story.play() で流用でき、
// 操作後の DOM 状態の検証やスナップショット記録に使える。
export const SubmitWithTitle: Story = {
  name: "タイトルを入力して送信",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByRole("textbox", { name: "タイトル" }),
      "新しいタスク",
    );
    await userEvent.click(canvas.getByRole("button", { name: "追加" }));

    await expect(args.createTodoAction).toHaveBeenCalledOnce();
  },
};
