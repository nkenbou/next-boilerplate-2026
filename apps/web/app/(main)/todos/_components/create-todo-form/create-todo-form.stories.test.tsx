// create-todo-form.stories.tsx のストーリー定義を composeStories で再利用するテストファイル。
// args・decorator・loaders が合成されたコンポーネントをブラウザ上でレンダリングし、
// DOM の状態を検証・スナップショットに記録する。
//
// このファイルでのテストは以下の2つの観点で使い分ける:
//
// 1. ストーリーの静的なレンダリング検証（DOM の初期状態・エラー表示など）
//    args を差し替えるだけで再現できる状態は、ストーリーをそのままレンダリングして検証する。
//
// 2. ユーザー操作を伴う詳細な検証
//    Storybook のカタログとして見せるには細かすぎてストーリーに含めたくない操作シナリオや、
//    操作後にのみ到達できる DOM 状態（ダイアログが開いた状態など）の検証に使う。
//    操作手順はストーリーの play 関数に定義して Story.play() で流用するか、
//    userEvent を直接記述する。
import { composeStories } from "@storybook/nextjs-vite";
import { render, screen } from "@testing-library/react";
import { ANY_ERROR_MESSAGE, MESSAGES } from "./create-todo-form-state";
import * as stories from "./create-todo-form.stories";

const {
  Default,
  TitleEmptyError,
  TitleTooLongError,
  DescriptionTooLongError,
  AnyError,
  SubmitWithTitle,
} = composeStories(stories);

describe("CreateTodoForm", () => {
  it(Default.name, () => {
    const { container } = render(<Default />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it(TitleEmptyError.name, () => {
    const { container } = render(<TitleEmptyError />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      MESSAGES.INVALID_TODO_TITLE_EMPTY,
    );
    expect(container).toMatchSnapshot();
  });

  it(TitleTooLongError.name, () => {
    const { container } = render(<TitleTooLongError />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      MESSAGES.INVALID_TODO_TITLE_TOO_LONG,
    );
    expect(container).toMatchSnapshot();
  });

  it(DescriptionTooLongError.name, () => {
    const { container } = render(<DescriptionTooLongError />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      MESSAGES.INVALID_TODO_DESCRIPTION_TOO_LONG,
    );
    expect(container).toMatchSnapshot();
  });

  it(AnyError.name, () => {
    const { container } = render(<AnyError />);
    expect(screen.getByRole("alert")).toHaveTextContent(ANY_ERROR_MESSAGE);
    expect(container).toMatchSnapshot();
  });

  // create-todo-form.stories.tsx の SubmitWithTitle.play() を呼び出してフォーム送信を再現する。
  // 動作の検証（アクションが呼ばれたか）は play 関数内で完結しているため、
  // ここでは操作後の DOM 状態をスナップショットで記録することに集中できる。
  it(SubmitWithTitle.name, async () => {
    const { container } = render(<SubmitWithTitle />);

    await SubmitWithTitle.play!({ canvasElement: container });

    expect(container).toMatchSnapshot();
  });
});
